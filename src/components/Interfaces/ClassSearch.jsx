import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';

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
  }
};

const propTypes = {
  classes: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

const ClassSearchInterface = ({ classes, db }) => {
  const [classList, setClassList] = useState([]);
  const [showOldClasses] = useState(false);

  useEffect(() => {
    return db.collection('classes').onSnapshot(classDocs => {
      const classesData = [];
      classDocs.forEach(classDoc => {
        const classData = { ...classDoc.data(), id: classDoc.id, ref: classDoc.ref };
        classesData.push(classData);
      });
      classesData.sort((a, b) => b.endDate.seconds - a.endDate.seconds);
      setClassList(classesData);
    });
  }, [db, setClassList]);

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 className={classes.pageHeader}>Class Search</h1>
      {classList.map(cls =>
        cls.endDate.seconds * 1000 > Date.now() || showOldClasses ? (
          <Paper key={cls.id} className={classes.cardWrapper}>
            <InfoCardHeader cls={cls} hideImage />
          </Paper>
        ) : null
      )}
    </div>
  );
};

ClassSearchInterface.propTypes = propTypes;

export default withStyles(styles)(ClassSearchInterface);
