import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, makeStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Modal from '../../UI/Modal';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const HelpModal = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.wrapper}
      title="Help Modal"
      description="Need help with something during your code contest?"
    >
      <Typography variant="h2">Need Help?</Typography>
      <Typography variant="h3">Follow These Steps</Typography>
      <Typography variant="body1">
        Step 1: Proofread and triple check that your code doesn’t have any spelling errors.
      </Typography>
      <Typography variant="body1">
        Step 2: Ask a classmate, check the tutorial again, look at the Docs section on the website,
        and then ask your teacher or room supervisor!
      </Typography>
      <Typography variant="body1">
        Step 3: Message Mentors by clicking on the chat bubble on the bottom right of your screen!
      </Typography>
      <Typography variant="h3">Important!</Typography>
      <Typography variant="body1">
        Make sure to check your chat often. Be ready to add the mentor to your repl and also be
        ready to paste the link to your repl in the chat so the mentor can look at your code.
      </Typography>
      <Button variant="outlined" onClick={onClose} endIcon={<DoneIcon />}>
        Okay
      </Button>
    </Modal>
  );
};
HelpModal.propTypes = propTypes;

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& h2': { margin: '14px 0' },
    '& h3': { margin: '12px 0 ' },
    '& p': { margin: '10px 0' },
    '& a': { color: 'var(--pink-color)' },
    '& button': { margin: '10px 0', alignSelf: 'flex-end' }
  }
});

export default HelpModal;
