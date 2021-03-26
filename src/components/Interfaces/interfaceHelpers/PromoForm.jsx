import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography
} from '@material-ui/core';
import Modal from '../../UI/Modal';

const propTypes = {
  showForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editPromo: PropTypes.object.isRequired
};

const dataMemberToValidation = {
  code: data =>
    data.code.length >= 6 && data.code.length <= 10
      ? ''
      : 'Promo Code must be between 6 and 10 characters long',
  discountType: data =>
    data.discountType === '$' || data.discountType === '%' ? '' : 'Invalid Discount Type',
  discountAmount: data => (data.discountAmount > 0 ? '' : 'Discount must be more than 0'),
  uses: data => (data.limited && data.uses <= 0 ? 'Must have at least 1 use' : ''),
  limited: data => (data.limited === true || data.limited === false ? '' : 'Invalid limited value'),
  startUses: () => ''
};

const PromoForm = ({ showForm, closeForm, onSubmit, editPromo }) => {
  const initialState = {
    code: '',
    discountType: '$',
    discountAmount: '',
    uses: '',
    limited: false
  };
  const [promoCode, setPromoCode] = useState(initialState);
  const [errors, setErrors] = useState({});

  const setState = newState => {
    const approvedState = {};
    Object.keys(newState).forEach(key => {
      if (Object.keys(promoCode).includes(key)) {
        approvedState[key] = newState[key];
      }
    });
    setPromoCode({ ...promoCode, ...approvedState });
  };

  useEffect(() => {
    if (editPromo.isSet) {
      setState(editPromo);
    } else {
      setState(initialState);
    }
  }, [editPromo]);

  const handleSubmit = e => {
    e.preventDefault();
    promoCode.discountAmount = Number(promoCode.discountAmount);
    promoCode.uses = Number(promoCode.uses);
    let dataIsValid = true;
    const newErrors = {};
    Object.keys(promoCode).forEach(key => {
      const v = dataMemberToValidation[key](promoCode);
      newErrors[key] = v;
      if (v !== '') {
        dataIsValid = false;
      }
    });
    setErrors({ ...errors, ...newErrors });
    if (dataIsValid) {
      onSubmit(promoCode);
      if (!editPromo.isSet) {
        closeForm();
      }
    }
  };

  const getErrorStatus = error => error && error.length > 0;

  const classes = useStyles();

  return (
    <Modal
      open={showForm}
      onClose={closeForm}
      title="Promo Edit"
      description="Create or update promo codes for customers to use!"
    >
      <Typography variant="h4" className={classes.formHeader}>
        {editPromo.isSet ? 'Edit your Promo Code' : 'Create a Promo Code'}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formRow}>
          <TextField
            variant="outlined"
            type="text"
            value={promoCode.code}
            name="code"
            label="Code"
            className={classes.inputFull}
            onChange={e => setState({ code: e.target.value })}
            error={getErrorStatus(errors.code)}
            helperText={errors.code}
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            variant="outlined"
            type="number"
            value={promoCode.discountAmount}
            name="discountAmount"
            label="Discount Amount"
            className={classes.input}
            onChange={e => setState({ discountAmount: e.target.value })}
            error={getErrorStatus(errors.discountAmount)}
            helperText={errors.discountAmount}
          />
          <TextField
            variant="outlined"
            value={promoCode.discountType}
            name="discountType"
            label="Discount Type"
            className={classes.input}
            onChange={e => setState({ discountType: e.target.value })}
            error={getErrorStatus(errors.discountType)}
            helperText={errors.discountType}
            select
          >
            <MenuItem value="$">($) Dollars Off</MenuItem>
            <MenuItem value="%">(%) Percent Off</MenuItem>
          </TextField>
        </div>
        <div className={classes.formRow}>
          <FormControlLabel
            control={
              <Checkbox
                checked={promoCode.limited}
                onChange={e => setState({ limited: e.target.checked })}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                color="primary"
              />
            }
            label={<Typography variant="body1">Limit number of uses</Typography>}
          />
          <TextField
            variant="outlined"
            type="number"
            value={promoCode.uses}
            name="uses"
            label="Number of Uses"
            disabled={!promoCode.limited}
            className={classes.input}
            onChange={e => setState({ uses: e.target.value })}
            error={getErrorStatus(errors.uses)}
            helperText={errors.uses}
          />
        </div>
        <div className={classes.formRow}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className={classes.submitButton}
          >
            {editPromo.isSet ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

PromoForm.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  form: {
    width: '90%',
    maxWidth: '460px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '30px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  formHeader: {
    marginBottom: 12,
    marginTop: 18,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem'
    }
  },
  formRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 0
    }
  },
  input: {
    width: '48%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: '12px 0'
    }
  },
  inputFull: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 6
    }
  },
  submitButton: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginTop: 6
    }
  }
}));

export default PromoForm;
