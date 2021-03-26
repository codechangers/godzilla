import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, makeStyles } from '@material-ui/core';
import Modal from './Modal';
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
  const currentDate = getDateFromTimestamp(cls.startDate);
  while (currentDate.getTime() / 1000 <= cls.endDate.seconds) {
    if (cls.daysOfWeek.includes(weekDays[currentDate.getDay()])) {
      dates.push([getDateString(currentDate), currentDate.getTime()]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const ScheduleModal = ({ showModal, onClose, cls }) => {
  const classes = useStyles();
  return (
    <Modal
      open={showModal}
      onClose={onClose}
      className={classes.modal}
      title="Schedule Modal"
      description="Displaying all days and times this class meets."
    >
      <Typography variant="h4" style={{ marginTop: 20 }}>
        Class Schedule
      </Typography>
      <Typography
        variant="body1"
        style={{ margin: '12px 30px', fontWeight: '200', fontSize: '1.2rem' }}
      >
        Classes are from {getTimeString(cls.startTime)} - {getTimeString(cls.endTime)}
      </Typography>
      {getSchedule(cls).map(([str, date]) => (
        <Typography
          className={classes.scheduleLine}
          key={str}
          variant="body1"
          style={
            date >= Date.now()
              ? { backgroundColor: 'rgba(200, 200, 200, 0.3)' }
              : { backgroundColor: 'rgba(60, 60, 60, 0.3)' }
          }
        >
          {str}
        </Typography>
      ))}
      <Button onClick={onClose} style={{ marginTop: '12px', alignSelf: 'center', width: '50%' }}>
        Close
      </Button>
      <div style={{ marginBottom: 30 }} />
    </Modal>
  );
};

ScheduleModal.propTypes = propTypes;

const useStyles = makeStyles({
  modal: {
    padding: '0 20px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  scheduleLine: {
    margin: '0 30px',
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    border: '3px solid #fff',
    boxSizing: 'border-box',
    padding: '10px 20px',
    borderRadius: '6px',
    width: 'calc(100% - 60px)'
  }
});

export default ScheduleModal;
