import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const Help = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
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
          href="https://us02web.zoom.us/j/83598664504?pwd=bmJoZ25ldzBsVjJrT3lDVFkzNTR3dz09"
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
        The passcode for your call is: <strong>GWA</strong>
      </Typography>
    </div>
  );
};

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1000px',
    minHeight: '100vh',
    margin: 'auto',
    boxSizing: 'border-box',
    padding: '20px 8px 60px 8px',
    '& h2': { margin: '14px 0' },
    '& h3': { margin: '12px 0 ' },
    '& p': { margin: '10px 0' },
    '& a': { color: 'var(--pink-color)' }
  }
});

export default Help;
