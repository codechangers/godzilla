import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, TextField, Button } from '@material-ui/core';
import Modal from '../../UI/Modal';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  prompt: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  acceptUrl: PropTypes.string,
  initialValue: PropTypes.string,
  children: PropTypes.node
};

const defaultProps = {
  prompt: 'Enter information:',
  label: '',
  placeholder: '',
  initialValue: '',
  acceptUrl: '',
  children: null
};

const InfoModal = ({
  open,
  onClose,
  onSubmit,
  prompt,
  label,
  placeholder,
  acceptUrl,
  initialValue,
  children
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (initialValue.length > 0) {
      setInput(initialValue);
    }
  }, [initialValue]);

  const checkInput = inp => {
    let r = inp;
    if (inp.includes('<iframe') && inp.includes('src="')) {
      r = inp.split('src="')[1].split('"')[0];
    }
    return r.includes(acceptUrl) ? r : '';
  };

  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose} title={prompt} description="Add or update Information">
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
        <Button
          variant="outlined"
          onClick={() => {
            setInput('');
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onSubmit(checkInput(input));
            setInput('');
            onClose();
          }}
        >
          Submit
        </Button>
      </div>
      {children}
    </Modal>
  );
};

InfoModal.propTypes = propTypes;
InfoModal.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
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
