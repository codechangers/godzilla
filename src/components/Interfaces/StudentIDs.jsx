import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  Paper,
  CircularProgress,
  Grid
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    db.collection('children')
      .get()
      .then(res => {
        setCount(res.size);
        setAllStudents(res.docs);
        setIsLoading(false);
      });
  }, [db]);

  useEffect(() => {
    const i = page * pageLimit;
    const docs = allStudents.slice(i, i + pageLimit);
    setStudents(docs.map(d => d.data()));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [page, pageLimit, allStudents]);

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h2" className={classes.header}>
        Student IDs
      </Typography>
      <Grid container>
        <Grid item xs={false} md={1} lg={2} />
        <Grid item xs={12} md={10} lg={8}>
          <Paper className={classes.paper}>
            <div className={classes.tableWrapper}>
              <Table>
                <TableHead>
                  <StudentInfoRow showLables={true} />
                </TableHead>
                <TableBody>
                  {!isLoading && students.map((s, i) => <StudentInfoRow key={i} student={s} />)}
                </TableBody>
              </Table>
            </div>
            {isLoading && <CircularProgress color="primary" />}
            {!isLoading && (
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
            )}
          </Paper>
        </Grid>
        <Grid item xs={false} md={1} lg={2} />
      </Grid>
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
    boxSizing: 'border-box',
    padding: '20px 8px 15px 8px'
  },
  header: {
    marginBottom: '15px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    }
  },
  paper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tableWrapper: {
    width: '100%',
    overflow: 'scroll'
  }
}));

export default StudentIDs;
