import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Table, TableHead, TableBody } from '@material-ui/core';
import StudentInfoRow from '../Classes/StudentInfoRow';

const propTypes = {
  db: PropTypes.object.isRequired
};

const StudentIDs = ({ db }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    db.collection('children')
      .limit(30)
      .get()
      .then(res => {
        setStudents(res.docs.map(d => d.data()));
      });
  }, [db]);

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h2" className={classes.header}>
        Student IDs
      </Typography>
      <Table>
        <TableHead>
          <StudentInfoRow showLables={true} />
        </TableHead>
        <TableBody>
          {students.map((s, i) => (
            <StudentInfoRow key={i} student={s} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

StudentIDs.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px 8px 15px 8px'
  },
  header: {
    marginBottom: '15px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    }
  }
}));

export default StudentIDs;
