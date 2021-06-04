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
      <Typography variant="body1">Step 3: Hop on the Mentor Help Line!</Typography>
      <Typography variant="h3">Important!</Typography>
      <Typography variant="body1">
        Wait in the meeting room for a mentor to put you into a breakout room for help. If you do
        not see any mentors, they are helping others, but will be back to help you shortly! Be
        patient and read through your code again while you wait!
      </Typography>
      <Typography variant="body1">
        Click{' '}
        <a
          href="https://us02web.zoom.us/j/81684325483?pwd=Wi9qRHhzWU9ZVGphRm9ReDBnc3BzQT09"
          target="_blank"
          rel="noreferrer"
        >
          this link
        </a>{' '}
        to access the Zoom call.
      </Typography>
      <Typography variant="body1">
        Make sure to choose the option on the Zoom meeting that says Join From Browser and then once
        you join, click the Join with Computer Audio button
      </Typography>
      <Typography variant="body1">
        The passcode for your call is: <strong>UVUPREP</strong>
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
