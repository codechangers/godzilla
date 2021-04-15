import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField, Tooltip, IconButton, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import { db } from '../../utils/firebase';

const propTypes = {
  cls: PropTypes.object.isRequired,
  promoDoc: PropTypes.object,
  setPromoDoc: PropTypes.func.isRequired,
  getPromoUses: PropTypes.func.isRequired
};

const PromoInput = ({ cls, promoDoc, setPromoDoc, getPromoUses }) => {
  const [promo, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const applyPromo = () => {
    db.collection('promos')
      .where('code', '==', promo)
      .get()
      .then(qSnap => {
        qSnap.forEach(doc => {
          const data = doc.data();
          if (doc.exists && data.teacher.id === cls.teacher.id && data.active && !data.deletedOn) {
            setPromoDoc({ ...data, id: doc.id, ref: doc.ref });
            setPromoCode('');
            setPromoError('');
          } else {
            setPromoError('Invalid Promo Code');
          }
        });
        if (qSnap.empty) {
          setPromoError('Invalid Promo Code');
        }
      });
  };

  const classes = useStyles();
  return promoDoc !== null ? (
    <Typography variant="body1" className={classes.text1}>
      <strong>{promoDoc.code}</strong>
      {' - '}
      {promoDoc.discountType === '$'
        ? `$${promoDoc.discountAmount}`
        : `${promoDoc.discountAmount}%`}{' '}
      off each student!
      <Tooltip title="Remove Discount" placement="top">
        <IconButton
          style={{ margin: '0 0 3px 10px' }}
          aria-label="Remove Discount"
          size="small"
          onClick={() => setPromoDoc(null)}
        >
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <br />
      <span className={classes.text2}>{getPromoUses()}</span>
    </Typography>
  ) : (
    <div className={classes.promoWrapper}>
      <TextField
        label="Promo Code"
        onChange={e => setPromoCode(e.target.value)}
        value={promo}
        helperText={promoError}
        error={promoError.length > 0}
      />
      <Tooltip title="Apply Discount" placement="top">
        <IconButton
          style={{ margin: '12px 0 0 10px' }}
          aria-label="Apply Discount"
          size="small"
          color="primary"
          onClick={applyPromo}
        >
          <SendIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

PromoInput.propTypes = propTypes;
PromoInput.defaultProps = { promoDoc: null };

const useStyles = makeStyles(theme => ({
  promoWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '14px'
  },
  text1: {
    fontSize: '1rem',
    margin: '15px 0 0 0',
    lineHeight: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem'
    }
  },
  text2: {
    fontSize: '0.8rem',
    color: 'rgba(0,0,0,0.7)',
    lineHeight: '12px'
  }
}));

export default PromoInput;
