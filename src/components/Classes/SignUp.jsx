import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Modal,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  Button
} from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PromoInput from '../UI/PromoInput';
import PaymentProcess from '../UI/PaymentProcess';
import { API_URL } from '../../globals';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cls: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  stripe: PropTypes.object.isRequired
};

const ClassSignUp = ({ open, onClose, cls, db, user, stripe }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [children, setChildren] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [promoDoc, setPromoDoc] = useState(null);
  const [invalidPayment, setInvalidPayment] = useState('');
  const [payment, setPayment] = useState({
    succeeded: false,
    error: '',
    failed: false
  });
  const updatePayment = changes => {
    setPayment({ ...payment, ...changes });
  };

  useEffect(() => {
    return db
      .collection('parents')
      .doc(user.uid)
      .onSnapshot(parentDoc => {
        const childrenData = [];
        const childrenRefs = parentDoc.data().children || [];
        childrenRefs.forEach(child => {
          child.get().then(childDoc => {
            const childData = { ...childDoc.data(), id: childDoc.id, ref: childDoc.ref };
            childrenData.push(childData);
            if (childrenData.length === childrenRefs.length) {
              setChildren(childrenData);
            }
          });
        });
      });
  }, [db, user]);

  const handleSubmit = async () => {
    let token;
    let errorMessage = 'Invalid Payment Information!';
    if (getTotal() > 0) {
      const stripePayment = await stripe.createToken({ name: 'Registration Payment' });
      token = stripePayment.token;
      if (stripePayment.error) {
        errorMessage = stripePayment.error.message;
      }
    }
    if ((getTotal() > 0 && token) || getTotal() === 0) {
      setIsProcessing(true);
      setInvalidPayment('');
      updatePayment({ error: '' });
      // eslint-disable-next-line
      fetch(`${API_URL}/charge`, {
        method: 'POST',
        body: JSON.stringify({
          token: token ? token.id : '1234',
          classID: cls.id,
          teacherID: cls.teacher.id,
          parentID: user.uid,
          promoId: promoDoc !== null ? promoDoc.id : '1234',
          numberOfChildren: selectedChildren.filter(c => !checkDisabled(c)).length
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            const children = cls.children || [];
            selectedChildren.forEach(child => {
              const classes = child.classes || [];
              classes.push(cls.ref);
              child.ref.update({ classes });
              children.push(child.ref);
            });
            cls.ref.update({ children });
            updatePayment({ succeeded: true });
          } else if (res.error) {
            console.log(res.error);
            if (res.error.code === 'card_declined') {
              setIsProcessing(false);
              setInvalidPayment('Your Card was Declined.');
            } else {
              updatePayment({ failed: true });
              updatePayment({ error: res.error.message });
            }
          } else {
            updatePayment({ failed: true });
          }
        })
        .catch(err => {
          console.log(err);
          updatePayment({ failed: true });
        });
    } else {
      setIsProcessing(false);
      setInvalidPayment(errorMessage);
    }
  };

  const toggleChild = child => {
    const selectedCopy = [...selectedChildren];
    const index = selectedCopy.indexOf(child);
    if (index === -1) {
      selectedCopy.push(child);
    } else {
      selectedCopy.splice(index, 1);
    }
    setSelectedChildren(selectedCopy);
  };
  const checkDisabled = child => cls.children.some(c => c.id === child.id);
  const checkToggle = child => selectedChildren.includes(child) || checkDisabled(child);

  const getPromoUses = () => {
    const registrations = selectedChildren.filter(c => !checkDisabled(c)).length;
    if (promoDoc !== null) {
      if (promoDoc.limited && registrations > promoDoc.uses) {
        return `${promoDoc.code} applied to ${promoDoc.uses} registration${
          promoDoc.uses === 1 ? '' : 's'
        } (redeemed max amount times)`;
      } else {
        return `${promoDoc.code} applied to ${registrations} registration${
          registrations === 1 ? '' : 's'
        }`;
      }
    }
    return '';
  };

  const getTotal = () => {
    let total = 0;
    const registrations = selectedChildren.filter(c => !checkDisabled(c)).length;
    if (promoDoc !== null) {
      const { discountType, discountAmount, uses, limited } = promoDoc;
      if (discountType === '$') {
        total =
          registrations > uses && limited
            ? (cls.price - discountAmount >= 0 ? cls.price - discountAmount : 0 * uses) +
              cls.price * (registrations - uses)
            : (cls.price - discountAmount) * registrations;
      } else {
        total =
          registrations > uses && limited
            ? cls.price * (0.01 * discountAmount) * uses + cls.price * registrations - uses
            : cls.price * (0.01 * discountAmount) * registrations;
      }
    } else {
      total = cls.price * registrations;
    }
    if (total < 0) {
      total = 0;
    }
    return total;
  };

  const classes = useStyles();
  return (
    <Modal className={classes.modalWrapper} open={open} onClose={onClose} disableAutoFocus>
      {isProcessing ? (
        <Paper className={classes.modalContent}>
          <PaymentProcess
            payment={payment}
            onClose={() => {
              setSelectedChildren([]);
              setIsProcessing(false);
              updatePayment({ succeeded: false });
              onClose();
            }}
          />
        </Paper>
      ) : (
        <Paper className={classes.modalContent}>
          <Typography variant="h5">
            Register for:
            <br className={classes.mobileBreak} />{' '}
            <span className={classes.mobileCenter}>{cls.name}</span>
          </Typography>
          {/* Table Goes Here */}
          <Typography variant="body1">Select Children to Register</Typography>
          <List>
            {children.map(child => (
              <ListItem
                key={child.id}
                button
                onClick={() => toggleChild(child)}
                disabled={checkDisabled(child)}
              >
                <ListItemAvatar>
                  <AccountIcon />
                </ListItemAvatar>
                <ListItemText primary={`${child.fName} ${child.lName}`} />
                <Checkbox edge="end" checked={checkToggle(child)} />
                <Typography
                  variant="body1"
                  style={{ marginLeft: 10 }}
                >{`$${cls.price}`}</Typography>
              </ListItem>
            ))}
          </List>
          <div className={classes.totalWrapper}>
            <PromoInput
              db={db}
              cls={cls}
              promoDoc={promoDoc}
              setPromoDoc={setPromoDoc}
              getPromoUses={getPromoUses}
            />
            <Typography variant="body1" className={classes.totalText}>
              <strong style={{ marginRight: '15px' }}>Total:</strong>
              {`$${getTotal()}`}
            </Typography>
          </div>
          {getTotal() > 0 && (
            <>
              <Typography variant="body1" className={classes.error}>
                {invalidPayment}
              </Typography>
              <div
                className={classes.cardInfo}
                style={invalidPayment ? { border: '1px solid red' } : null}
              >
                <CardElement />
              </div>
            </>
          )}
          <div className={classes.actionButtons}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              disabled={selectedChildren.filter(c => !checkDisabled(c)).length <= 0}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              Sign Up!
            </Button>
          </div>
        </Paper>
      )}
    </Modal>
  );
};

ClassSignUp.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  modalContent: {
    padding: '40px',
    width: '100%',
    maxWidth: '600px',
    minWidth: '300px',
    maxHeight: '100%',
    overflow: 'scroll',
    outline: 'none',
    boxSizing: 'border-box',
    [theme.breakpoints.down('xs')]: {
      padding: '20px 4px'
    }
  },
  mobileBreak: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  mobileCenter: {
    fontWeight: 500,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      textAlign: 'center',
      width: '100%'
    }
  },
  totalWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: '10px 20px 20px 20px',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 0'
    }
  },
  totalText: {
    fontSize: '1rem',
    margin: '16px 0',
    lineHeight: '20px'
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardInfo: {
    border: '1px solid rgba(224, 224, 224, 1)',
    padding: 14,
    marginBottom: 20
  },
  actionButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
}));

export default injectStripe(ClassSignUp);
