import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Button, Typography, CircularProgress } from '@material-ui/core';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { db } from '../../utils/firebase';
import * as Styled from './styles';

import InfoCardHeader from '../Classes/InfoCardHeader';

const propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  useCustomAppBar: PropTypes.func,
  user: PropTypes.object,
  accounts: PropTypes.object
};

const defaultProps = {
  useCustomAppBar: () => {},
  user: { isSignedIn: false },
  accounts: { helper: true }
};

const ClassSearchInterface = ({ useCustomAppBar, classes, location, user, accounts }) => {
  const [classList, setClassList] = useState([]);
  const [showOldClasses] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Customize App Bar
  useEffect(() => useCustomAppBar({ title: 'Register for a Code Contest' }), [classList]);

  useEffect(() => {
    let { pathname } = location;
    let id = '';
    if (pathname.includes('/parent')) {
      pathname = pathname.replace('/parent', '');
    } else {
      setIsPublic(true);
    }
    if (pathname.length > '/search/'.length) {
      id = pathname.replace('/search/', '');
      setSearchId(id);
      db.collection('classes')
        .doc(id)
        .get()
        .then(classDoc => {
          if (classDoc.exists) {
            const classData = { ...classDoc.data(), id: classDoc.id, ref: classDoc.ref };
            setClassList([classData]);
          }
          setIsLoading(false);
        });
      return () => {};
    }
    return db.collection('classes').onSnapshot(classDocs => {
      const classesData = [];
      classDocs.forEach(classDoc => {
        const classData = { ...classDoc.data(), id: classDoc.id, ref: classDoc.ref };
        classesData.push(classData);
      });
      classesData.sort((a, b) => b.endDate.seconds - a.endDate.seconds);
      setClassList(classesData);
      if (isLoading) {
        setIsLoading(false);
      }
    });
  }, [db, setClassList, location, isLoading]);

  return (
    <Styled.PageContent style={{ display: 'flex', flexDirection: 'column' }}>
      {isLoading ? (
        <div className={classes.spinnerWrapper}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        classList.map(cls =>
          cls.endDate.seconds * 1000 > Date.now() || showOldClasses ? (
            <Paper key={cls.id} className={classes.cardWrapper}>
              <InfoCardHeader cls={cls} preview hideImage>
                <div className={classes.buttonWrapper}>
                  <Link
                    className={classes.button}
                    to={{ pathname: `/parent/signup/${cls.id}`, state: { signupID: cls.id } }}
                  >
                    <Button style={{ width: '100%' }} variant="contained">
                      More Info
                    </Button>
                  </Link>
                </div>
              </InfoCardHeader>
            </Paper>
          ) : null
        )
      )}
      {isLoading
        ? null
        : classList.filter(a => a.endDate.seconds * 1000 > Date.now() || showOldClasses).length <=
            0 &&
          (searchId ? (
            <Typography variant="h6" className={classes.empty}>
              There is no class available with the id: {searchId} <br /> Make sure you typed the id
              in correctly, and that the class is still active.
            </Typography>
          ) : (
            <Typography variant="h6" className={classes.empty}>
              No Classes Available right now.... <br /> Check back later, new classes are added all
              the time!
            </Typography>
          ))}
      {isPublic && user.isSignedIn && accounts.parents ? (
        <Redirect
          to={{ pathname: `/parent/search${searchId ? '/' + searchId : ''}`, state: { searchId } }}
        />
      ) : null}
    </Styled.PageContent>
  );
};

ClassSearchInterface.propTypes = propTypes;
ClassSearchInterface.defaultProps = defaultProps;

const styles = theme => ({
  cardWrapper: {
    width: '60%',
    maxWidth: '800px',
    alignSelf: 'center',
    margin: '20px 0',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '96%',
      minWidth: '300px'
    }
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    textDecoration: 'none',
    color: '#fff',
    width: '40%'
  },
  spinnerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  empty: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem'
    }
  }
});

export default withStyles(styles)(withRouter(ClassSearchInterface));
