import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CircularProgress, Typography, makeStyles, Paper, Button } from '@material-ui/core';
import * as Styled from './styles';
import InfoCardHeader from '../Classes/InfoCardHeader';
import DSUlogo from '../../assets/images/dsu.png';

const propTypes = {
  location: PropTypes.object.isRequired
};

const ClassInfoInterface = ({ location, db }) => {
  const [cls, setCls] = useState({});
  const [foundClass, setFoundClass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { pathname } = location;
    if (pathname) {
      db.collection('classes')
        .doc(pathname.replace('/parent/info/', ''))
        .get()
        .then(classDoc => {
          if (classDoc.exists) {
            setCls({ ...classDoc.data(), id: classDoc.id, ref: classDoc.ref });
            setFoundClass(true);
          }
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [location, db]);

  const classes = useStyles();

  return isLoading ? (
    <Styled.PageContent>
      <CircularProgress color="primary" />
    </Styled.PageContent>
  ) : (
    <Styled.PageContent>
      <Typography variant="h3" style={{ marginBottom: '36px', textAlign: 'center' }}>
        {foundClass ? cls.name : 'Class not found...'}
      </Typography>
      {foundClass && (
        <div className={classes.content}>
          <Paper className={classes.cardWrapper}>
            <div className={classes.right}>
              <img src={DSUlogo} alt="DSU_Logo" className={classes.logo} />
              <iframe
                title="maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3182.079959868037!2d-113.56743758422124!3d37.10321407988719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ca5b29bfd1899f%3A0x96dee69b51421265!2sDixie%20State%20University!5e0!3m2!1sen!2sus!4v1581868804818!5m2!1sen!2sus"
                frameBorder="0"
                allowFullScreen=""
                className={classes.maps}
              ></iframe>
            </div>
            <div className={classes.left}>
              <InfoCardHeader cls={cls} hideImage>
                <Button
                  disabled={cls.children.length >= cls.maxStudents}
                  variant="contained"
                  color="primary"
                >
                  Sign Up!
                </Button>
              </InfoCardHeader>
            </div>
          </Paper>
        </div>
      )}
    </Styled.PageContent>
  );
};

ClassInfoInterface.propTypes = propTypes;

const useStyles = makeStyles({
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardWrapper: {
    width: '100%',
    maxWidth: '1000px',
    minWidth: '300px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap-reverse'
  },
  left: {
    width: '60%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1
  },
  right: {
    width: '38%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingBottom: '20px',
    flexGrow: 1
  },
  logo: {
    maxWidth: '90%',
    maxHeight: '140px',
    marginBottom: '10px'
  },
  maps: {
    maxWidth: '75%',
    height: '250px',
    borderRadius: '3px',
    border: '2px solid rgba(120,120,120,0.3)'
  }
});

export default withRouter(ClassInfoInterface);
