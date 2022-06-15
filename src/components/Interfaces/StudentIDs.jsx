import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Typography,
  TablePagination,
  Paper,
  CircularProgress,
  Grid,
  Button
} from '@material-ui/core';
import IDGenerator from './interfaceHelpers/IDGenerator';
import StudentInfo from '../Classes/StudentInfo';
import { db } from '../../utils/firebase';

const StudentIDs = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

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
      <div className={classes.options}>
        <Button variant="outlined" color="primary" onClick={() => setShowGenerator(true)}>
          Generate Student IDs
        </Button>
      </div>
      <Grid container>
        <Grid item xs={false} md={1} lg={2} />
        <Grid item xs={12} md={10} lg={8}>
          <Paper className={classes.paper}>
            <div className={classes.tableWrapper}>
              <div className={classes.students}>
                <StudentInfo showLabels />
                {!isLoading && students.map((s, i) => <StudentInfo key={i} student={s} />)}
              </div>
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
      <IDGenerator open={showGenerator} onClose={() => setShowGenerator(false)} />
    </div>
  );
};

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
    overflowX: 'auto'
  },
  students: {
    padding: '0 24px',
    minWidth: 936
  },
  options: {
    marginBottom: 14
  }
}));

export default StudentIDs;
