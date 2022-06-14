import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';
import { AccessTime, LocationOn } from '@material-ui/icons';
import clsx from 'clsx';
import { getDateString, getTime, rgb } from '../../utils/helpers';
import { programTypeToText } from '../../utils/globals';
import { Template2 } from '../Images';
import ScheduleModal from '../UI/ScheduleModal';
import { db } from '../../utils/firebase';

const SignUpsProgress = withStyles({
  root: {
    height: 6,
    backgroundColor: rgb(25, 25, 25),
    borderRadius: 8
  },
  bar: {
    backgroundColor: 'var(--primary-color)'
  }
})(LinearProgress);

class InfoCardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: null,
      showSchedule: false
    };
    this.safeSetState = this.setState;
  }

  componentDidMount() {
    if (db !== null) {
      db.collection('parents')
        .doc(this.props.cls.teacher.id)
        .get()
        .then(teacherDoc => {
          this.safeSetState({ teacher: teacherDoc.data() });
        });
    }
  }

  componentWillUnmount() {
    this.safeSetState = () => {};
  }

  render() {
    const { cls, children, hideImage, preview, hideAccountType, classes } = this.props;
    const { teacher, showSchedule } = this.state;
    return (
      <div
        className={clsx(classes.infoCardHeader, {
          [classes.parent]: children !== null,
          [classes.slim]: children !== null && !hideImage
        })}
      >
        <div style={hideImage ? { width: '100%' } : null}>
          <Typography variant="h5" style={{ marginBottom: '6px' }}>
            {cls.name}
          </Typography>
          {children === null || preview ? null : (
            <div className={`${classes.inliner} ${classes.col}`}>
              <Typography variant="body1">
                {cls.programType && !hideAccountType ? (
                  <span className={classes.programType}>{programTypeToText[cls.programType]}</span>
                ) : null}
              </Typography>
              <Typography variant="body1">{cls.locationName}</Typography>
              <Typography variant="body1">
                <LocationOn fontSize="inherit" />
                {cls.locationAddress}
              </Typography>
            </div>
          )}
          {children !== null && !preview ? null : (
            <div className={`${classes.inliner} ${classes.col}`}>
              <Typography variant="body1">
                {cls.programType && !hideAccountType ? (
                  <span className={classes.programType}>{programTypeToText[cls.programType]}</span>
                ) : null}
              </Typography>
            </div>
          )}
          <div className={classes.inliner}>
            <Typography variant="body1">{`Start Date: ${getDateString(cls.startDate)}`}</Typography>
            <Typography variant="body1">{`End Date: ${getDateString(cls.endDate)}`}</Typography>
          </div>
          <div className={classes.inliner}>
            <Typography variant="body1" style={{ textDecoration: 'underline' }}>
              <button
                onClick={() => this.setState({ showSchedule: true })}
                style={{
                  background: 'none',
                  outline: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: 'inherit',
                  color: 'inherit',
                  cursor: 'pointer'
                }}
              >
                View Schedule
              </button>
            </Typography>
            <Typography variant="body1">
              <AccessTime fontSize="inherit" />
              {getTime(cls.startTime)}
            </Typography>
            <Typography varaint="body1">{`$${cls.price} per Student`}</Typography>
          </div>
          {children !== null && !preview ? (
            <div className={classes.inliner}>
              <Typography variant="body1">
                {`Instructor: ${teacher !== null ? `${teacher.fName} ${teacher.lName}` : ''}`}
              </Typography>
              <Typography variant="body1">
                {`Phone: ${teacher !== null ? teacher.phone : ''}`}
              </Typography>
              <Typography variant="body1">
                {`Email: ${teacher !== null ? teacher.email : ''}`}
              </Typography>
            </div>
          ) : (
            <div className={`${classes.inliner} ${classes.col}`}>
              <Typography variant="body1">{cls.locationName}</Typography>
              <Typography variant="body1">
                <LocationOn fontSize="inherit" />
                {cls.locationAddress}
              </Typography>
            </div>
          )}
          <div className={classes.description}>{cls.description}</div>
          <div className={classes.progressLabel}>
            <h6>Students Sign-up</h6>
            <p>{`${cls.children.length}/${cls.maxStudents} STUDENTS`}</p>
          </div>
          <SignUpsProgress
            className={classes.progressBar}
            variant="determinate"
            color="primary"
            value={(cls.children.length / cls.maxStudents) * 100}
          />
          <div className={classes.progressOverlay}>
            <span style={{ marginLeft: `${(cls.minStudents / cls.maxStudents) * 100}%` }} />
          </div>
          {children || <div className={classes.bottomLine} />}
        </div>
        {hideImage || <Template2 />}
        <ScheduleModal
          showModal={showSchedule}
          onClose={() => this.setState({ showSchedule: false })}
          cls={cls}
        />
      </div>
    );
  }
}

InfoCardHeader.propTypes = {
  cls: PropTypes.object.isRequired,
  children: PropTypes.node,
  preview: PropTypes.bool,
  hideImage: PropTypes.bool,
  hideAccountType: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

InfoCardHeader.defaultProps = {
  children: null,
  preview: false,
  hideImage: false,
  hideAccountType: false
};

const styles = theme => ({
  infoCardHeader: {
    width: '100%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    '& > img': {
      height: '415px',
      maxWidth: '58%',
      maxHeight: '100%',
      borderRadius: '4px',
      objectFit: 'cover',
      backgroundPositon: 'center center'
    },
    '& > div': {
      width: '42%',
      height: '100%',
      boxSizing: 'border-box',
      padding: '24px',
      paddingBottom: 0
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
      flexDirection: 'column-reverse',
      '& > img': {
        width: '100%',
        maxWidth: '100%',
        height: '250px'
      },
      '& > div': {
        width: '100%'
      }
    },
    [theme.breakpoints.down('xs')]: {
      '& > div': {
        padding: '16px 8px'
      }
    }
  },
  slim: { marginBottom: 0 },
  parent: {
    '& > img': {
      height: '474px',
      maxWidth: '50%',
      maxHeight: '100%'
    },
    '& > div': {
      width: '50%',
      '& > button': {
        width: '100%',
        marginBottom: '24px',
        [theme.breakpoints.down('sm')]: {
          marginTop: '23px'
        },
        [theme.breakpoints.down('xs')]: {
          marginBottom: '4px'
        }
      }
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: 24,
      flexDirection: 'column-reverse',
      '& > img': {
        width: '100%',
        maxWidth: '100%',
        height: '250px'
      },
      '& > div': {
        width: '100%'
      }
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
      '& > div': {
        padding: '16px 8px'
      }
    }
  },
  programType: {
    backgroundColor: 'var(--secondary-color)',
    fontSize: '0.8rem',
    color: rgb(255, 255, 255),
    padding: '2px 8px',
    lineHeight: '23px',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  inliner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '8px',
    '& p': {
      marginRight: '20px',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '& > svg': {
        marginRight: '6px'
      }
    },
    '& p:last-child': {
      marginRight: 0
    }
  },
  col: {
    flexDirection: 'column',
    '& p': {
      fontSize: '20px',
      marginBottom: '4px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px'
      }
    }
  },
  description: {
    textAlign: 'left',
    width: '100%',
    height: '100px',
    overflow: 'hidden',
    fontSize: '14px',
    lineHeight: '20px',
    marginBottom: '10px'
  },
  progressLabel: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h6': {
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 500,
      margin: 0
    },
    '& p': {
      width: '108px',
      textAlign: 'left',
      fontSize: '10px',
      lineHeight: '16px',
      fontWeight: 500,
      margin: 0,
      letterSpacing: '1.5px'
    }
  },
  progressBar: {
    width: '100%',
    zIndex: 1
  },
  progressOverlay: {
    width: '100%',
    height: '10px',
    marginTop: '-8px',
    marginBottom: '23px',
    zIndex: 2,
    position: 'relative',
    '& > span': {
      width: '2px',
      height: '10px',
      borderRadius: '1px',
      backgroundColor: rgb(128, 128, 128, 0.5),
      display: 'block'
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 8
    }
  },
  bottomLine: {
    width: '100%',
    height: 0,
    marginTop: 40 + 22,
    borderBottom: `1px solid ${rgb(224, 224, 224)}`,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
});

export default withStyles(styles)(InfoCardHeader);
