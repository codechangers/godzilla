import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableBody,
  TablePagination
} from '@material-ui/core';
import StudentInfoRow from '../Classes/StudentInfoRow';

const propTypes = {
  db: PropTypes.object.isRequired
};

const StudentIDs = ({ db }) => {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    db.collection('children')
      .get()
      .then(res => {
        setCount(res.size);
        setAllStudents(res.docs);
      });
  }, [db]);

  useEffect(() => {
    const i = page * pageLimit;
    const docs = allStudents.slice(i, i + pageLimit);
    setStudents(docs.map(d => d.data()));
  }, [page, pageLimit, allStudents]);

  // useEffect(() => {
  //   let childrenCol = db.collection('children').orderBy('lName');
  //   if ((page + 1) * pageLimit > allStudents.length) {
  //     if (allStudents.length !== 0) {
  //       childrenCol = childrenCol.startAfter(allStudents[page * pageLimit - 1]);
  //     }
  //     childrenCol
  //       .limit(pageLimit)
  //       .get()
  //       .then(res => {
  //         setAllStudents([...allStudents, ...res.docs]);
  //       });
  //   } else {

  //   }
  // }, [db, page, pageLimit, allStudents]);

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
      <TablePagination
        component="div"
        page={page}
        onChangePage={(_, p) => setPage(p)}
        count={count}
        rowsPerPageOptions={[10, 25, 40]}
        rowsPerPage={pageLimit}
        onChangeRowsPerPage={e => {
          setPage(0);
          setPageLimit(e.target.value);
        }}
      />
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
