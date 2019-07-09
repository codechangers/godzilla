import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';

const propTypes = {
  teacher: PropTypes.object.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  declineRequest: PropTypes.func.isRequired
};

const isReadToBackgroundColor = {
  true: 'is-read',
  false: 'is-not-read'
};

class TeacherRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      parent: null,
      teacher: null,
      isRead: null
    };
    autoBind(this);
  }

  toggleInfo() {
    let { showInfo } = this.state;
    showInfo = !showInfo;
    this.setState({ showInfo });
    // change isRead to true
    this.props.db
      .collection('teachers')
      .doc(this.props.teacher.id)
      .update({
        isRead: true
      });

    this.props.db
      .collection('teachers')
      .doc(this.props.teacher.id)
      .get()
      .then(updatedTeacher => {
        this.setState({
          teacher: updatedTeacher,
          isRead: true
        });
      });
  }

  componentDidMount() {
    this.props.db
      .collection('parents')
      .doc(this.props.teacher.id)
      .get()
      .then(doc => {
        this.setState({
          parent: doc.data(),
          teacher: this.props.teacher,
          isRead: this.props.teacher.isRead
        });
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }

  render() {
    const { teacher } = this.props;
    return this.state.parent === null || this.state.teacher === null ? (
      <div className="teacher-request" />
    ) : (
      <div className={`teacher-request ${isReadToBackgroundColor[this.state.isRead]}`}>
        <button type="button" className="select" onClick={this.toggleInfo}>
          <p>{`${this.state.parent.fName} ${this.state.parent.lName}`}</p>
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
                <span>{`${this.state.parent.fName} ${this.state.parent.lName}`}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{this.state.parent.email}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{this.state.parent.phone}</span>
              </div>
              <div>
                <p>Date Applied:</p>
                <span>{this.state.parent.dateApplied}</span>
              </div>
              <div>
                <p>Why they want to Teach:</p>
                <span>{this.state.parent.whyTeach}</span>
              </div>
              <div>
                <p>Previous Experience:</p>
                <span>{this.state.parent.prevExp}</span>
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
