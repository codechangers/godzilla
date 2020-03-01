import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Modal, Paper, Typography, TextField, Button } from '@material-ui/core';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  faq: PropTypes.object
};

const defaultProps = {
  faq: { q: '', a: '' }
};

const FAQModal = ({ open, onClose, onSubmit, faq }) => {
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
    <Modal open={open} onClose={onClose} disableAutoFocus className={classes.modal}>
      <Paper className={classes.paper}>
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
              onSubmit({ q, a });
              clear();
            }}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

FAQModal.propTypes = propTypes;
FAQModal.defaultProps = defaultProps;

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
