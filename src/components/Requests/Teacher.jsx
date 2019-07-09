import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';

const propTypes = {
  parent: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  declineRequest: PropTypes.func.isRequired
};

class TeacherRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      parent: null
    };
    autoBind(this);
  }

  toggleInfo() {
    let { showInfo } = this.state;
    showInfo = !showInfo;
    this.setState({ showInfo });
  }

  componentDidMount(teacher) {
    this.db
      .collection('parents')
      .doc(teacher.id)
      .get()
      .then(doc => {
        this.setState({ parent: doc.data() });
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }

  render() {
    const { teacher } = this.props;
    const { parent } = this.state;
    return (
      <div className="teacher-request">
        <button type="button" className="select" onClick={this.toggleInfo}>
          <p>{`${parent.fName} ${parent.lName}`}</p>
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
                <span>{`${parent.fName} ${parent.lName}`}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{parent.email}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{parent.phone}</span>
              </div>
              <div>
                <p>Birth Date:</p>
                <span>{parent.birthDate}</span>
              </div>
              <div>
                <p>Gender:</p>
                <span>{parent.gender}</span>
              </div>
              <div>
                <p>Bio:</p>
                <span>{parent.aboutMe}</span>
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
