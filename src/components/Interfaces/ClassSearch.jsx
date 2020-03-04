import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Button, Typography, CircularProgress } from '@material-ui/core';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { programTypeToText } from '../../globals';
import * as Styled from './styles';

import InfoCardHeader from '../Classes/InfoCardHeader';

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
  const [filters, setFilters] = useState(Object.keys(programTypeToText));
  const [isLoading, setIsLoading] = useState(true);

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
      if (isLoading) {
        setIsLoading(false);
      }
    });
  }, [db, setClassList, location, isLoading]);

  const toggleFilter = f => {
    const filts = [...filters];
    const i = filts.indexOf(f);
    if (i !== -1) {
      filts.splice(i, 1);
    } else {
      filts.push(f);
    }
    setFilters(filts);
  };

  return (
    <Styled.PageContent style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={classes.headerWrapper}>
        <Typography variant="h3" className={classes.pageHeader}>
          Class Search
        </Typography>
        <div className={classes.typesWrapper}>
          <p>Filter by:</p>
          <div className={classes.types}>
            {Object.keys(programTypeToText).map(programType => (
              <button
                type="button"
                key={programType}
                className={classes.blankButton}
                onClick={() => toggleFilter(programType)}
              >
                <p
                  className={
                    filters.includes(programType) ? classes.typeFilterActive : classes.typeFilter
                  }
                >
                  {programTypeToText[programType]}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className={classes.spinnerWrapper}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        classList.map(cls =>
          ((cls.endDate.seconds * 1000 > Date.now() || showOldClasses) &&
            filters.includes(cls.programType)) ||
          filters.length === 0 ? (
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
  headerWrapper: {
    width: '80%',
    marginLeft: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      width: '100%',
      marginLeft: 0
    }
  },
  blankButton: {
    outline: 'none',
    border: 'none',
    margin: '0 10px',
    padding: 0,
    background: 'none',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      margin: '0 2px'
    }
  },
  typesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    '& > p': {
      margin: '4px 15px 4px 0'
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '20px',
      maxWidth: '450px',
      flexWrap: 'wrap'
    }
  },
  types: {
    maxWidth: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start'
    }
  },
  typeFilter: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: '0.8rem',
    color: 'var(--secondary-color)',
    padding: '2px 8px',
    margin: 0,
    borderRadius: '4px',
    boxSizing: 'border-box',
    lineHeight: '23px',
    border: '1px solid var(--secondary-color)'
  },
  typeFilterActive: {
    backgroundColor: 'var(--secondary-color)',
    fontSize: '0.8rem',
    color: '#fff',
    padding: '2px 8px',
    margin: '1px',
    borderRadius: '4px',
    lineHeight: '23px',
    boxSizing: 'border-box'
  },
  cardWrapper: {
    width: '60%',
    maxWidth: '800px',
    alignSelf: 'center',
    marginBottom: 12,
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
