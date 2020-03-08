import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, TextField, Button } from '@material-ui/core';
import Modal from '../../UI/Modal';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  faq: PropTypes.object,
  index: PropTypes.number.isRequired
};

const defaultProps = {
  faq: { q: '', a: '' }
};

const FAQModal = ({ open, onClose, onSubmit, faq, index }) => {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');

  useEffect(() => {
    if (faq !== null && !faq.new) {
      setQ(faq.q);
      setA(faq.a);
    }
  }, [faq]);

  const clear = () => {
    setQ('');
    setA('');
    onClose();
  };

  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="FAQ Modal"
      description="Create or Update FAQs to provide more detail about your class."
    >
      <Typography variant="h4" style={{ marginBottom: '30px' }}>
        {faq.new ? 'Add a FAQ' : 'Edit this FAQ'}
      </Typography>
      <TextField
        label="Question"
        variant="outlined"
        value={q}
        onChange={e => setQ(e.target.value)}
        className={classes.input}
      />
      <TextField
        label="Answer"
        variant="outlined"
        value={a}
        onChange={e => setA(e.target.value)}
        className={classes.input}
        multiline
        rows={3}
      />
      <div className={classes.options}>
        <Button variant="outlined" onClick={clear}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onSubmit({ q, a }, index, faq.new || false);
            clear();
          }}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

FAQModal.propTypes = propTypes;
FAQModal.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  input: {
    width: '60%',
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  options: {
    width: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& button': {
      width: '40%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  }
}));

export default FAQModal;
