import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Chip } from '@material-ui/core';
import { CheckCircle, Block, Info } from '@material-ui/icons';

const propTypes = {
  account: PropTypes.object.isRequired
};

const ACCEPTED = 'ACCEPTED';
const DECLINED = 'DECLINED';
const PENDING = 'PENDING';

const statusColor = {
  ACCEPTED: 'primary',
  DECLINED: 'default',
  PENDING: 'secondary'
};

const statusIcon = {
  ACCEPTED: CheckCircle,
  DECLINED: Block,
  PENDING: Info
};

const getStatus = account => {
  if (account.isVerrified) {
    return ACCEPTED;
  } else if (account.isDeclined) {
    return DECLINED;
  } else {
    return PENDING;
  }
};

const Request = ({ account }) => {
  const classes = useStyles();
  const status = getStatus(account);
  const Icon = statusIcon[status];
  return (
    <div className={classes.wrapper}>
      <Typography variant="h5">
        {account.parent.fName} {account.parent.lName}
      </Typography>
      <Chip label={status} icon={<Icon />} color={statusColor[status]} />
    </div>
  );
};

Request.propTypes = propTypes;

const useStyles = makeStyles({
  wrapper: {
    width: '98%',
    padding: '10px 40px',
    boxSizing: 'border-box',
    borderTop: '1px solid rgba(100,100,100,0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default Request;
