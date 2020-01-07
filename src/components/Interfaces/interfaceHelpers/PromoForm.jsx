import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Paper,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  makeStyles
} from '@material-ui/core';

const propTypes = {
  showForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editPromo: PropTypes.object.isRequired
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPromo]);

  const handleSubmit = e => {
    e.preventDefault();
    promoCode.discountAmount = Number(promoCode.discountAmount);
    promoCode.uses = Number(promoCode.uses);
    onSubmit(promoCode);
    if (!editPromo.isSet) {
      closeForm();
    }
  };

  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={showForm}
      onClose={closeForm}
      disableAutoFocus
      className={classes.modal}
    >
      <Paper className={classes.paper}>
        <h1>{editPromo.isSet ? 'Edit your Promo Code' : 'Create a Promo Code'}</h1>
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
            />
            <TextField
              variant="outlined"
              value={promoCode.discountType}
              name="discountType"
              label="Discount Type"
              className={classes.input}
              onChange={e => setState({ discountType: e.target.value })}
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
              label="Limited number of uses"
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
      </Paper>
    </Modal>
  );
};

PromoForm.propTypes = propTypes;

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    width: '50%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 'none'
  },
  form: {
    width: '90%',
    maxWidth: '460px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '30px'
  },
  formRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0'
  },
  input: {
    width: '48%'
  },
  inputFull: {
    width: '100%'
  },
  submitButton: {
    width: '100%'
  }
});

export default PromoForm;
