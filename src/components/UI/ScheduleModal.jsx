import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper, Typography, makeStyles } from '@material-ui/core';
import { getDateFromTimestamp, getHrMn, getOrdinal } from '../../helpers';
import { months, fullWeekDays, weekDays } from '../../globals';

const propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cls: PropTypes.object.isRequired
};

const hrMnToString = hrMn => {
  let string = hrMn.replace(' ', '').toLowerCase();
  if (string[0] === '0') {
    string = string.slice(1, string.length);
  }
  return string;
};

const getTimeString = time => hrMnToString(getHrMn(getDateFromTimestamp(time)));

const getDateString = date =>
  `${fullWeekDays[date.getDay()]}, ${months[date.getMonth()]} ${getOrdinal(date.getDate())}`;

const getSchedule = cls => {
  const dates = [];
  let currentDate = getDateFromTimestamp(cls.startDate);
  while (currentDate.getTime() / 1000 <= cls.endDate.seconds) {
    if (cls.daysOfWeek.includes(weekDays[currentDate.getDay()])) {
      dates.push(getDateString(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const ScheduleModal = ({ showModal, onClose, cls }) => {
  const classes = useStyles();
  return (
    <Modal className={classes.modal} open={showModal} onClose={onClose} disableAutoFocus>
      <Paper className={classes.paper}>
        <Typography variant="h5">Class Schedule</Typography>
        <Typography variant="body1">
          Classes are from {getTimeString(cls.startTime)} - {getTimeString(cls.endTime)}
        </Typography>
        {getSchedule(cls).map(date => (
          <Typography key={date} variant="body1">
            {date}
          </Typography>
        ))}
      </Paper>
    </Modal>
  );
};

ScheduleModal.propTypes = propTypes;

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '50%',
    minWidth: '300px',
    maxHeight: '100%',
    overflow: 'scroll',
    outline: 'none',
    padding: 20
  }
});

export default ScheduleModal;
