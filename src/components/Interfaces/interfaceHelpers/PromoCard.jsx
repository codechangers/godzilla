import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, makeStyles } from '@material-ui/core';

const propTypes = {
  promoCode: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

const PromoCard = ({ promoCode, onEdit, onDelete }) => {
  const { code, discountType, discountAmount, startUses, uses, limited } = promoCode;
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <div className={classes.cardRow}>
          <p style={{ fontWeight: 'bold' }}>{code}</p>
          <p>Used: {startUses - uses} times</p>
        </div>
        <div className={classes.cardRow}>
          <p>
            {discountType === '$' ? discountType + discountAmount : discountAmount + discountType}{' '}
            Off
          </p>
          <p>{limited ? `${uses} uses left` : ''}</p>
        </div>
      </Card>
      <div className={classes.options}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => onEdit(promoCode)}
        >
          Edit Details
        </Button>
        <Button variant="outlined" className={classes.button} onClick={() => onDelete(promoCode)}>
          Deactivate
        </Button>
      </div>
    </div>
  );
};

PromoCard.propTypes = propTypes;

const useStyles = makeStyles({
  wrapper: {
    width: '80%',
    maxWidth: '500px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card: {
    width: 'calc(100% - 180px)',
    padding: '10px 30px',
    boxSizing: 'border-box'
  },
  cardRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  options: {
    width: '160px',
    height: '120px',
    padding: '16px 0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    width: '100%'
  }
});

export default PromoCard;
