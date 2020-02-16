import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CircularProgress, Typography, makeStyles, Paper } from '@material-ui/core';
import * as Styled from './styles';
import InfoCardHeader from '../Classes/InfoCardHeader';
import DSUlogo from '../../assets/images/dsu.png';
import MapsTemp from '../../assets/images/maps.png';

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
            <InfoCardHeader cls={cls} hideImage></InfoCardHeader>
          </Paper>
          <Paper className={classes.locationWrapper}>
            <img src={DSUlogo} alt="DSU_Logo" className={classes.logo} />
            <img src={MapsTemp} alt="Loading_Maps" className={classes.maps} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  cardWrapper: {
    width: '60%',
    maxWidth: '800px',
    minWidth: '300px',
    marginBottom: '20px'
  },
  locationWrapper: {
    width: '38%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '20px 0'
  },
  logo: {
    maxWidth: '90%',
    maxHeight: '200px'
  },
  maps: {
    maxWidth: '90%',
    borderRadius: '3px',
    border: '2px solid rgba(120,120,120,0.3)'
  }
});

export default withRouter(ClassInfoInterface);
