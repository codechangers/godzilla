import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { AccessTime, LocationOn } from '@material-ui/icons';
import { getDateString, getTime, calcSessions } from '../../helpers';
import { programTypeToText } from '../../globals';
import { Template2 } from '../Images';

const SignUpsProgress = withStyles({
  root: {
    height: 6,
    backgroundColor: '#E0F4FD',
    borderRadius: 8
  },
  bar: {
    backgroundColor: '#00AFEF'
  }
})(LinearProgress);

class InfoCardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: null
    };
  }

  componentDidMount() {
    if (this.props.db !== null) {
      this.props.db
        .collection('parents')
        .doc(this.props.cls.teacher.id)
        .get()
        .then(teacherDoc => {
          this.setState({ teacher: teacherDoc.data() });
        });
    }
  }

  render() {
    const { cls, children, hideImage } = this.props;
    const { teacher } = this.state;
    return (
      <div className={`infocard-header${children !== null ? ' parent' : ''}`}>
        <div style={{ width: hideImage ? '100%' : 'auto' }}>
          <h5>{cls.name}</h5>
          {children === null || hideImage ? null : (
            <div className="inliner col">
              <p>
                {cls.programType ? (
                  <span
                    style={{
                      backgroundColor: '#8dc63f',
                      fontSize: '0.8rem',
                      color: '#fff',
                      padding: '2px 8px',
                      marginTop: '-10px',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {programTypeToText[cls.programType]}
                  </span>
                ) : null}
              </p>
              <p>{cls.locationName}</p>
              <p>
                <LocationOn fontSize="inherit" />
                {cls.locationAddress}
              </p>
            </div>
          )}
          <div className="inliner">
            <p>{`Start Date: ${getDateString(cls.startDate)}`}</p>
            <p>{`End Date: ${getDateString(cls.endDate)}`}</p>
          </div>
          <div className="inliner">
            <p>{`${calcSessions(cls)} Sessions`}</p>
            <p>
              <AccessTime fontSize="inherit" />
              {getTime(cls.startTime)}
            </p>
            <p>{`$${cls.price} per Student`}</p>
          </div>
          {children !== null && !hideImage ? (
            <div className="inliner">
              <p>{`Instructor: ${teacher !== null ? `${teacher.fName} ${teacher.lName}` : ''}`}</p>
              <p>{`Phone: ${teacher !== null ? teacher.phone : ''}`}</p>
              <p>{`Email: ${teacher !== null ? teacher.email : ''}`}</p>
            </div>
          ) : (
            <div className="inliner col">
              <p>{cls.locationName}</p>
              <p>
                <LocationOn fontSize="inherit" />
                {cls.locationAddress}
              </p>
            </div>
          )}
          <div className="description">{cls.description}</div>
          <div className="progress-label">
            <h6>Students Sign-up</h6>
            <p>{`${cls.children.length}/${cls.maxStudents} STUDENTS`}</p>
          </div>
          <SignUpsProgress
            className="progress-bar"
            variant="determinate"
            color="primary"
            value={(cls.children.length / cls.maxStudents) * 100}
          />
          <div className="progress-overlay">
            <span style={{ marginLeft: `${(cls.minStudents / cls.maxStudents) * 100}%` }} />
          </div>
          {children || <div className="bottom-line" />}
        </div>
        {hideImage || <Template2 />}
      </div>
    );
  }
}

InfoCardHeader.propTypes = {
  cls: PropTypes.object.isRequired,
  children: PropTypes.node,
  db: PropTypes.object,
  hideImage: PropTypes.bool
};

InfoCardHeader.defaultProps = {
  children: null,
  db: null,
  hideImage: false
};

export default InfoCardHeader;
