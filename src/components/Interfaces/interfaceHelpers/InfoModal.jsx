import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Modal, Paper, Typography, TextField, Button } from '@material-ui/core';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  prompt: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string
};

const defaultProps = {
  prompt: 'Enter information:',
  label: '',
  placeholder: ''
};

const InfoModal = ({ open, onClose, onSubmit, prompt, label, placeholder }) => {
  const [input, setInput] = useState('');

  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose} disableAutoFocus className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>
          {prompt}
        </Typography>
        <TextField
          variant="outlined"
          color="primary"
          value={input}
          onChange={e => setInput(e.target.value)}
          label={label}
          placeholder={placeholder}
          className={classes.input}
        />
        <div className={classes.options}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={() => onSubmit(input)}>
            Submit
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

InfoModal.propTypes = propTypes;
InfoModal.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    padding: '20px',
    outline: 'none',
    width: '100%',
    maxWidth: '700px',
    minWidth: '300px',
    maxHeight: '100%',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  options: {
    width: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '18px',
    '& button': {
      width: '40%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  }
}));

export default InfoModal;
