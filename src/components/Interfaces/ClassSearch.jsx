import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Button } from '@material-ui/core';
import { withRouter, Redirect, Link } from 'react-router-dom';

import InfoCardHeader from '../Classes/InfoCardHeader';

const styles = {
  pageHeader: {
    fontWeight: 300,
    fontSize: '48px',
    lineHeight: '56px',
    color: 'rgba(0,0,0,0.6)',
    alignSelf: 'flex-start',
    margin: 0,
    marginBottom: 36
  },
  cardWrapper: {
    width: '60%',
    maxWidth: '800px',
    alignSelf: 'center',
    marginBottom: 12
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    textDecoration: 'none',
    color: '#fff',
    width: '40%'
  }
};

const propTypes = {
  classes: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object,
  accounts: PropTypes.object
};

const defaultProps = {
  user: { isSignedIn: false },
  accounts: { helper: true }
};

const ClassSearchInterface = ({ classes, db, location, user, accounts }) => {
  const [classList, setClassList] = useState([]);
  const [showOldClasses] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [isPublic, setIsPublic] = useState(false);

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
        });
      return;
    }
    return db.collection('classes').onSnapshot(classDocs => {
      const classesData = [];
      classDocs.forEach(classDoc => {
        const classData = { ...classDoc.data(), id: classDoc.id, ref: classDoc.ref };
        classesData.push(classData);
      });
      classesData.sort((a, b) => b.endDate.seconds - a.endDate.seconds);
      setClassList(classesData);
    });
  }, [db, setClassList, location]);

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 className={classes.pageHeader}>Class Search</h1>
      {classList.map(cls =>
        cls.endDate.seconds * 1000 > Date.now() || showOldClasses ? (
          <Paper key={cls.id} className={classes.cardWrapper}>
            <InfoCardHeader cls={cls} hideImage>
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
      )}
      {classList.filter(a => a.endDate.seconds * 1000 > Date.now() || showOldClasses).length <= 0 &&
        (searchId ? (
          <h1 style={{ textAlign: 'center', lineHeight: '60px', color: 'rgba(0,0,0,0.8)' }}>
            There is no class available with the id: {searchId} <br /> Make sure you typed the id in
            correctly, and that the class is still active.
          </h1>
        ) : (
          <h1 style={{ textAlign: 'center', lineHeight: '60px', color: 'rgba(0,0,0,0.8)' }}>
            No Classes Available right now.... <br /> Check back later, new classes are added all
            the time!
          </h1>
        ))}
      {isPublic &&
      user.isSignedIn &&
      Object.keys(accounts).includes('parents') &&
      Object.keys(accounts).length === 1 ? (
        <Redirect to={{ pathname: `/parent/search/${searchId}`, state: { searchId } }} />
      ) : null}
    </div>
  );
};

ClassSearchInterface.propTypes = propTypes;
ClassSearchInterface.defaultProps = defaultProps;

export default withStyles(styles)(withRouter(ClassSearchInterface));
