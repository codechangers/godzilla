import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, makeStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Modal from '../../UI/Modal';
import flowchart from '../../../assets/images/flowchart.png';
import { rgb } from '../../../utils/helpers';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gotoHelp: PropTypes.func.isRequired
};

const TeacherHelpModal = ({ open, onClose, gotoHelp }) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.wrapper}
      title="Help Modal"
      description="Need help with something during your code contest?"
    >
      <Typography variant="h2">Teacher Support Page</Typography>
      <Typography variant="h3">Want to help?</Typography>
      <Typography variant="body1">
        Here’s an overview of what the kids will be working on through their tutorials, and some
        helpful hints for teachers and room supervisors!
      </Typography>
      <img src={flowchart} alt="flowchart" width="500" />
      <Typography variant="h3">Pre Contest Setup Process:</Typography>
      <Typography variant="body1">1. Visit replit.com and make an account</Typography>
      <Typography variant="body1">
        2. Once created, paste in this tutorial link into the search bar{' '}
        <a
          href="https://replit.com/@macuyler/pre-starter/#game.js"
          target="_blank"
          rel="noreferrer"
        >
          https://replit.com/@macuyler/pre-starter/#game.js
        </a>{' '}
      </Typography>
      <Typography variant="body1">3. Click “Fork” </Typography>
      <Typography variant="h3">Code and Download</Typography>
      <Typography variant="body1">
        1. Follow the tutorials from the Pre Contest page to start coding on the template that was
        forked on replit.com
      </Typography>
      <Typography variant="body1">
        Download the code from replit.com as a zip using the three dots on the left
      </Typography>
      <Typography variant="h3">Create a Game</Typography>
      <Typography variant="body1">1. Click on the Games tab in the side bar.</Typography>
      <Typography variant="body1">2. Click the New Game button in the top bar.</Typography>
      <Typography variant="body1">(You should now see the Create a New Game form)</Typography>
      <Typography variant="body1">1. In the Name field, enter a name for your game.</Typography>
      <Typography variant="body1">
        2. Game names need to be all lower case letters, no numbers, symbols, or spaces.
      </Typography>
      <Typography variant="body1">3. In the Type field, select Default Template.</Typography>
      <Typography variant="body1">
        4. In the Code File field, upload the zip file that you downloaded from Repl.
      </Typography>
      <Typography variant="body1">
        5. Finally you can click the SUBMIT button to create your game!
      </Typography>
      <Typography variant="h3">
        Code Contest Process (Students must finish the Pre Contest Course before starting!):{' '}
      </Typography>
      <Typography variant="body1">1. Login to go.codecontest.org</Typography>
      <Typography variant="body1">2. Click on the student name</Typography>
      <Typography variant="body1">3. Click on “Contests”</Typography>
      <Typography variant="body1">4. Click on “Start”</Typography>
      <Typography variant="body1">5. Choose a game</Typography>
      <Typography variant="body1">
        6. Follow along with the tutorials to code on replit.com and upload the game to test
      </Typography>
      <Typography variant="h3">Mentor help</Typography>
      <Typography variant="body1">
        1. Competitors can access their mentors by visiting the{' '}
        <button className={classes.linkButton} onClick={gotoHelp}>
          Help!
        </button>{' '}
        modal.
      </Typography>
      <Typography variant="body1">
        2. Click on the zoom link, and wait in the waiting room for a mentor to assign a breakout
        room for help! A help chat button is also available for times when a mentor is not online.
      </Typography>
      <Typography variant="h3">Troubleshooting</Typography>
      <Typography variant="body1">
        1. Proofread, proofread, proofread! Most mistakes are spelling errors!
      </Typography>
      <Typography variant="body1">
        2. If the sites won’t load, please contact us! Most of the time this is a wifi or firewall
        issue and we can work with your site to get it resolved.
      </Typography>
      <Typography variant="h3">Still Have Questions?</Typography>
      <Typography variant="h5">
        Send us a chat question in the bubble below, or shoot us an email to,{' '}
        <a href="mailto:madi@codecontest.org">madi@codecontest.org</a>
      </Typography>
      <Button variant="outlined" onClick={onClose} endIcon={<DoneIcon />}>
        Okay
      </Button>
    </Modal>
  );
};
TeacherHelpModal.propTypes = propTypes;

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& h2': { margin: '14px 0' },
    '& h3': { margin: '12px 0 ' },
    '& p': { margin: '10px 0' },
    '& a': { color: 'var(--pink-color)' },
    '& button': { margin: '10px 0', alignSelf: 'flex-end' },
    '& img': {
      alignSelf: 'center ',
      border: `1px solid ${rgb(255, 255, 255)}`,
      boxSizing: 'border-box',
      margin: '12px 0',
      maxWidth: '99%',
      maxHeight: '90vh'
    }
  },
  linkButton: {
    margin: 0,
    padding: 0,
    alignSelf: 'auto',
    background: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    color: 'var(--pink-color)',
    textDecoration: 'underline',
    fontSize: 18
  }
});

export default TeacherHelpModal;
