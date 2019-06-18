import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';

const propTypes = {
  teacher: PropTypes.object.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  declineRequest: PropTypes.func.isRequired
};

class TeacherRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    };
    autoBind(this);
  }

  toggleInfo() {
    let { showInfo } = this.state;
    showInfo = !showInfo;
    this.setState({ showInfo });
  }

  render() {
    const { teacher } = this.props;
    return (
      <div className="teacher-request">
        <button type="button" className="select" onClick={this.toggleInfo}>
          <p>{`${teacher.fName} ${teacher.lName}`}</p>
        </button>
        <div className="options">
          <button
            type="button"
            className="accept"
            onClick={() => {
              this.props.acceptRequest(teacher);
            }}
          >
            Accept
          </button>
          <button
            type="button"
            className="decline"
            onClick={() => {
              this.props.declineRequest(teacher);
            }}
          >
            Decline
          </button>
        </div>
        {this.state.showInfo ? (
          <div className="request-info-wrapper">
            <div className="request-info">
              <button type="button" onClick={this.toggleInfo}>
                Close
              </button>
              <div>
                <p>Name:</p>
                <span>{`${teacher.fName} ${teacher.lName}`}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{teacher.email}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{teacher.phone}</span>
              </div>
              <div>
                <p>Birth Date:</p>
                <span>{teacher.birthDate}</span>
              </div>
              <div>
                <p>Gender:</p>
                <span>{teacher.gender}</span>
              </div>
              <div>
                <p>Bio:</p>
                <span>{teacher.aboutMe}</span>
              </div>
              <div className="options">
                <button
                  type="button"
                  className="accept"
                  onClick={() => {
                    this.props.acceptRequest(teacher);
                  }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="decline"
                  onClick={() => {
                    this.props.declineRequest(teacher);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

TeacherRequest.propTypes = propTypes;

export default TeacherRequest;
