import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
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
import ClassTable from './ClassTable';
import PromoInput from '../UI/PromoInput';
import PaymentProcess from '../UI/PaymentProcess';
import Modal from '../UI/Modal';
import { db } from '../../utils/firebase';
import { useParentsLiveChildren } from '../../hooks/children';

const propTypes = {
  accounts: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cls: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  stripe: PropTypes.object.isRequired
};

const ClassSignUp = ({ accounts, open, onClose, cls, user, stripe }) => {
  const children = useParentsLiveChildren(accounts);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleSubmit = async () => {
    let token;
    let errorMessage = 'Invalid Payment Information!';
    // Get Stripe Token.
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
      // Create Payment Document.
      const paymentRef = await db.collection('payments').add({
        stripeToken: token.id,
        classRef: cls.ref,
        seller: db.collection('stripeSellers').doc(cls.teacher.id),
        parent: accounts.parents.ref,
        promo: promoDoc !== null ? promoDoc.ref : null,
        kidsToRegister: selectedChildren.map(c => c.ref),
        userID: user.uid
      });
      // Listen for status updates.
      paymentRef.onSnapshot(paymentDoc => {
        console.log(paymentDoc.data());
        const { status } = paymentDoc.data();
        /**
         * TODO List:
         * 1. [X] Pull the latest child data on success.
         * 2. [ ] Test payment failures.
         * 3. [ ] Test payment for admin.
         * 3. [X] Test promoCode payment.
         * 4. [ ] Refactor all logic that uses the API_URL.
         * 5. [ ] Delete student ids functionality from codebase.
         */
        const stripeErrors = { card_declined: 'Your card was declined.' };
        if (status === 'succeeded') updatePayment({ succeeded: true });
        else if (Object.keys(stripeErrors).includes(status)) {
          setIsProcessing(false);
          setInvalidPayment(stripeErrors[status]);
        } else if (status === 'failed') {
          updatePayment({ failed: true, error: 'Failed to complete payment!' });
        }
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
      }
      return `${promoDoc.code} applied to ${registrations} registration${
        registrations === 1 ? '' : 's'
      }`;
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
    <Modal open={open} onClose={onClose} className={classes.modal}>
      {isProcessing ? (
        <PaymentProcess
          payment={payment}
          onClose={() => {
            setSelectedChildren([]);
            setIsProcessing(false);
            updatePayment({ succeeded: false });
            if (cls.hasWaiver) {
              window.open(cls.waiverURL, '_blank');
            }
            onClose();
          }}
        />
      ) : (
        <>
          <Typography variant="h5">
            Register for:
            <br className={classes.mobileBreak} />{' '}
            <span className={classes.mobileCenter}>{cls.name}</span>
          </Typography>
          <ClassTable cls={cls} />
          <Typography variant="body1">Select Children to Register</Typography>
          <List style={{ width: '100%' }}>
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
                <Typography variant="body1" style={{ marginLeft: 10 }}>
                  {`$${cls.price}`}
                </Typography>
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
                <CardElement style={{ base: { color: '#fafafa' } }} />
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
        </>
      )}
    </Modal>
  );
};

ClassSignUp.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  modal: {
    padding: '40px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    }
  },
  totalText: {
    fontSize: '1rem',
    margin: '16px 0',
    lineHeight: '20px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '10px'
    }
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardInfo: {
    width: 'calc(100% - 30px)',
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
