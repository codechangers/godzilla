import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const propTypes = {
  account: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  orgAccount: PropTypes.bool
};

const defaultProps = {
  orgAccount: false
};

const RequestTable = ({ account, orgAccount, width }) => {
  const { parent } = account;
  const classes = useStyles();
  return (
    <div className={classes.tableWrapper}>
      <Table className={classes.table} size={isWidthDown('xs', width) ? 'small' : 'medium'}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.header}>Name</TableCell>
            <TableCell>{`${parent.fName} ${parent.lName}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.header}>Email</TableCell>
            <TableCell>{parent.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.header}>Phone</TableCell>
            <TableCell>{parent.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.header}>Date Applied</TableCell>
            <TableCell>{new Date(account.dateApplied.seconds * 1000).toDateString()}</TableCell>
          </TableRow>
          {orgAccount ? (
            <TableRow>
              <TableCell className={classes.header}>Bio</TableCell>
              <TableCell>{account.aboutMe}</TableCell>
            </TableRow>
          ) : (
            <>
              <TableRow>
                <TableCell className={classes.header}>Type of Teaching Location</TableCell>
                <TableCell>{account.location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.header}>Desired Region</TableCell>
                <TableCell>{account.region}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.header}>Why they want to Teach</TableCell>
                <TableCell>{account.whyTeach}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.header}>Previous Experience</TableCell>
                <TableCell>{account.prevExp}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

RequestTable.propTypes = propTypes;
RequestTable.defaultProps = defaultProps;

const useStyles = makeStyles({
  tableWrapper: {
    width: '100%',
    overflow: 'auto'
  },
  table: {
    minWidth: '400px'
  },
  header: {
    fontWeight: 'bold'
  }
});

export default withWidth()(RequestTable);
