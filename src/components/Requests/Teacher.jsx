import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';
import Spinner from '../Spinner';

const propTypes = {
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

  // componentWillReceiveProps(props) {
  //   props.parent.then(parent => {
  //     this.setState({ parent });
  //     console.log('parent after prop change: ', parent);
  //   });
  // }

  componentDidMount() {
    console.log('teacher in compdidmount: ', this.props.teacher);
    this.props.db
      .collection('parents')
      .doc(this.props.teacher.id)
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
    return this.state.parent === null ? (
      <div className="teacher-request" />
    ) : (
      <div className="teacher-request">
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
                <p>Birth Date:</p>
                <span>{this.state.parent.birthDate}</span>
              </div>
              <div>
                <p>Gender:</p>
                <span>{this.state.parent.gender}</span>
              </div>
              <div>
                <p>Bio:</p>
                <span>{this.state.parent.aboutMe}</span>
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
