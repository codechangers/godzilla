import React from 'react';
import { Button, Container, Typography, makeStyles } from '@material-ui/core';

const SubmitInterface = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h2" align="center" className={classes.heading}>
        Submit your Game!
      </Typography>
      <a href="https://forms.gle/sfVA4SnMVwvVdLH9A" target="blank" rel="noreferrer noopener">
        <Button variant="contained" color="primary" className={classes.button}>
          Go to form
        </Button>
      </a>
    </Container>
  );
};

const useStyles = makeStyles({
  container: {
    margin: 'auto auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 8px',
    boxSizing: 'border-box',
    '& a': {
      textDecoration: 'none',
      color: 'auto'
    }
  },
  heading: {
    marginBottom: 20
  },
  button: {
    padding: '6px 80px'
  }
});

export default SubmitInterface;
