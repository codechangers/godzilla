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
      showInfo2: false,
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

  switchInfo() {
    let { showInfo2 } = this.state;
    showInfo2 = !showInfo2;
    this.setState({ showInfo2 });
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

  getOptionButtons() {
    const { teacher } = this.props;
    return this.props.teacher.isDeclined === false && this.props.teacher.isVerrified === false ? (
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
    ) : this.props.teacher.isDeclined === true ? (
      <div className="declined">
        <p>Declined</p>
      </div>
    ) : (
      <div className="accepted">
        <p>Accepted</p>
      </div>
    );
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
        {this.getOptionButtons()}
        {this.state.showInfo && this.state.showInfo2 === false ? (
          <div className="request-info-wrapper">
            <div className="request-info">
              <div className="next-back-close-buttons">
                <button type="button" onClick={this.toggleInfo} className="left-side-button">
                  Close
                </button>
                <button type="button" onClick={this.switchInfo} className="right-side-button">
                  Next
                </button>
              </div>
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
                <span>
                  {new Date(this.props.teacher.dateApplied.seconds * 1000).toDateString()}
                </span>
              </div>
              <div>
                <p>Type of Teaching Location:</p>
                <span>{this.props.teacher.location}</span>
              </div>
              <div>
                <p>Desired Region:</p>
                <span>{this.props.teacher.region}</span>
              </div>
              {this.getOptionButtons()}
            </div>
          </div>
        ) : this.state.showInfo && this.state.showInfo2 ? (
          <div className="request-info-wrapper">
            <div className="request-info">
              <div className="next-back-close-buttons">
                <button type="button" onClick={this.switchInfo} className="left-side-button">
                  Back
                </button>
                <button type="button" onClick={this.toggleInfo} className="right-side-button">
                  Close
                </button>
              </div>
              <div>
                <p>Why they want to Teach:</p>
                <span>{this.props.teacher.whyTeach}</span>
              </div>
              <div>
                <p>Previous Experience:</p>
                <span>{this.props.teacher.prevExp}</span>
              </div>
              {this.getOptionButtons()}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

TeacherRequest.propTypes = propTypes;

export default TeacherRequest;
