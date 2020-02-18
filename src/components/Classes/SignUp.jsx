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
  Checkbox
} from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';
import PromoInput from '../UI/PromoInput';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cls: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const ClassSignUp = ({ open, onClose, cls, db, user }) => {
  const [isProcessing] = useState(false);
  const [children, setChildren] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [promoDoc, setPromoDoc] = useState(null);

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

  const toggleChild = childId => {
    const selectedCopy = [...selectedChildren];
    const index = selectedCopy.indexOf(childId);
    if (index === -1) {
      selectedCopy.push(childId);
    } else {
      selectedCopy.splice(index, 1);
    }
    setSelectedChildren(selectedCopy);
  };
  const checkDisabled = childId => cls.children.some(c => c.id === childId);
  const checkToggle = childId => selectedChildren.includes(childId) || checkDisabled(childId);

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
        <Paper className={classes.modalContent}></Paper>
      ) : (
        <Paper className={classes.modalContent}>
          <Typography variant="h5">Register for: {cls.name}</Typography>
          {/* Table Goes Here */}
          <Typography variant="body1">Select Children to Register</Typography>
          <List>
            {children.map(child => (
              <ListItem
                key={child.id}
                button
                onClick={() => toggleChild(child.id)}
                disabled={checkDisabled(child.id)}
              >
                <ListItemAvatar>
                  <AccountIcon />
                </ListItemAvatar>
                <ListItemText primary={`${child.fName} ${child.lName}`} />
                <Checkbox edge="end" checked={checkToggle(child.id)} />
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
        </Paper>
      )}
    </Modal>
  );
};

ClassSignUp.propTypes = propTypes;

const useStyles = makeStyles({
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
    outline: 'none'
  },
  totalWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: '10px 20px 20px 20px'
  },
  totalText: {
    fontSize: '1rem',
    margin: '16px 0',
    lineHeight: '20px'
  }
});

export default ClassSignUp;
