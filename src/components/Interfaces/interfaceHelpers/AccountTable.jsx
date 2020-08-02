import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Table, TableBody, TableRow, TableCell } from '@material-ui/core';

const propTypes = {
  account: PropTypes.object.isRequired,
  orgAccount: PropTypes.bool
};

const defaultProps = {
  orgAccount: false
};

const AccountTable = ({ account, orgAccount }) => {
  const { parent } = account;
  const classes = useStyles();
  return (
    <div className={classes.tableWrapper}>
      <Table className={classes.table}>
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

AccountTable.propTypes = propTypes;
AccountTable.defaultProps = defaultProps;

const useStyles = makeStyles({
  tableWrapper: {
    width: '100%',
    overflow: 'scroll'
  },
  table: {
    minWidth: '400px'
  },
  header: {
    fontWeight: 'bold'
  }
});

export default AccountTable;
