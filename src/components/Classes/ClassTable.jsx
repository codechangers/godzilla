import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  withStyles,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { getDate, getTime, getWeekDays, calcSessions } from '../../helpers';

const propTypes = {
  cls: PropTypes.object.isRequired
};

const HeadTableCell = withStyles({
  head: {
    backgroundColor: 'rgba(31, 31, 31, 0.5)'
  }
})(TableCell);

const ClassTable = ({ cls }) => {
  const classes = useStyles();
  return (
    <div className={classes.tableWrapper}>
      <Table aria-label="customized table" style={{ minWidth: '605px' }}>
        <TableHead>
          <TableRow>
            <HeadTableCell>AGE</HeadTableCell>
            <HeadTableCell>START DATE</HeadTableCell>
            <HeadTableCell>{cls.daysOfWeek.length > 1 ? 'DAYS' : 'DAY'}</HeadTableCell>
            <HeadTableCell>TIME</HeadTableCell>
            <HeadTableCell>SESSIONS</HeadTableCell>
            <HeadTableCell align="right">COST</HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {`${cls.startAge} - ${cls.endAge}`}
            </TableCell>
            <TableCell>{`${getDate(cls.startDate)}`}</TableCell>
            <TableCell>{getWeekDays(cls.daysOfWeek)}</TableCell>
            <TableCell>{getTime(cls.startTime)}</TableCell>
            <TableCell>{calcSessions(cls)}</TableCell>
            <TableCell align="right">{`$${cls.price}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

ClassTable.propTypes = propTypes;

const useStyles = makeStyles({
  tableWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(31, 31, 31, 0.5)',
    '& *': {
      borderBottom: 'none'
    },
    margin: '14px 0',
    overflowX: 'scroll'
  }
});

export default ClassTable;
