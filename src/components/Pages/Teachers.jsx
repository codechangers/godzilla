import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import flowchart from '../../assets/images/flowchart.png';

const Teachers = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h2">Teacher Support Page</Typography>
      <Typography variant="h3">Want to help?</Typography>
      <Typography variant="body1">
        Here’s an overview of what the kids will be working on through their tutorials, and some
        helpful hints for teachers and room supervisors!
      </Typography>
      <img src={flowchart} alt="flowchart" width="500" />
      <Typography variant="h3">Tutorial Process:</Typography>
      <Typography variant="body1">1. Visit replit.com and make an account</Typography>
      <Typography variant="body1">
        2. Once created, paste in this tutorial link into the search bar{' '}
        <a href="https://replit.com/@codechangers/io-template" target="_blank" rel="noreferrer">
          https://replit.com/@codechangers/io-template
        </a>{' '}
      </Typography>
      <Typography variant="body1">3. Click “Fork” </Typography>
      <Typography variant="body1">
        4. On the top left side of the screen, click the three dots and “Download as Zip”
      </Typography>
      <Typography variant="h3">Create a blobbert.io account</Typography>
      <Typography variant="body1">1. Visit blobbert.io and make an account </Typography>
      <Typography variant="body1">2. Click “New Game” </Typography>
      <Typography variant="body1">3. Name the game (i.e. testgame, systemcheck, etc.)</Typography>
      <Typography variant="body1">4. Click “Default Template” </Typography>
      <Typography variant="body1">
        5. Click and drag the code downloaded from replit.com into the code box on the website
      </Typography>
      <Typography variant="body1">
        6. Wait for the server to go online (up to 10 minutes)
      </Typography>
      <Typography variant="h3">Code and test the game</Typography>
      <Typography variant="body1">
        1. Follow the tutorials from the tutorial link to start coding on the template that was
        forked on replit.com
      </Typography>
      <Typography variant="body1">
        2. Download the code from replit.com as a zip using the three dots on the left
      </Typography>
      <Typography variant="body1">
        3. Upload the edited code into the game you created on the blobbert.io website
      </Typography>
      <Typography variant="h3">Mentor help</Typography>
      <Typography variant="body1">
        1. Competitors can access their mentors by visiting{' '}
        <Link to="/help">https://go.codecontest.org/help</Link>{' '}
      </Typography>
      <Typography variant="body1">
        2. Click on the zoom link, and wait in the waiting room for a mentor to assign a breakout
        room for help!
      </Typography>
      <Typography variant="h3">Troubleshooting</Typography>
      <Typography variant="body1">
        1. Proofread, proofread, proofread! Most mistakes are spelling errors!{' '}
      </Typography>
      <Typography variant="body1">
        2. If the sites won’t load, please contact us! Most of the time this is a wifi or firewall
        issue and we can work with your site to get it resolved.
      </Typography>
      <Typography variant="h3">Still Have Questions?</Typography>
      <Typography variant="h5">
        Send us an email, <a href="mailto:madi@codecontest.org">madi@codecontest.org</a>
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
    '& a': { color: 'var(--pink-color)' },
    '& img': { alignSelf: 'center ', border: '1px solid #fff' }
  }
});

export default Teachers;
