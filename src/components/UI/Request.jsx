import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Chip } from '@material-ui/core';
import { CheckCircle, Block, Info, FiberManualRecord } from '@material-ui/icons';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const propTypes = {
  account: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
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

const Request = ({ account, show, width }) => {
  const classes = useStyles();
  const status = getStatus(account);
  const Icon = statusIcon[status];
  return (
    <div className={classes.wrapper} onClick={() => show(account.parent)}>
      <div className={classes.nameWrapper}>
        {!account.isRead && (
          <FiberManualRecord color="primary" fontSize="small" className={classes.nameNotify} />
        )}
        <Typography variant="h5" className={classes.name}>
          {account.parent.fName} {account.parent.lName}
        </Typography>
      </div>
      <Chip
        style={{ width: '116px' }}
        label={status}
        icon={<Icon />}
        color={statusColor[status]}
        size={isWidthDown('sm', width) ? 'small' : 'medium'}
      />
    </div>
  );
};

Request.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '98%',
    padding: '10px 40px',
    boxSizing: 'border-box',
    borderTop: '1px solid rgba(100,100,100,0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 50ms ease',
    '&:hover': {
      boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.1)'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '8px 18px'
    }
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  nameNotify: {
    marginLeft: -20 - 9,
    marginRight: 9,
    [theme.breakpoints.down('sm')]: {
      marginLeft: -10 - 1,
      marginRight: 1
    }
  },
  name: {
    fontSize: 'default',
    paddingRight: '8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem'
    }
  }
}));

export default withWidth()(Request);
