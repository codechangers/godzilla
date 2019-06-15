import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import autoBind from '../../autoBind';
import '../../assets/css/Admin.css';

let cancelSub = () => {};

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      teacherReqs: []
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  componentDidMount() {
    cancelSub = this.getTeacherRequests();
  }

  componentWillUnmount() {
    cancelSub();
  }

  getTeacherRequests() {
    return this.db.collection('teachers').onSnapshot(teachers => {
      const teacherReqs = teachers.docs.map(t => ({ id: t.id, ...t.data() }));
      this.setState({ teacherReqs: teacherReqs.filter(t => !t.isVerrified), isLoading: false });
    });
  }

  acceptTeacher(teacher) {
    this.db
      .collection('teachers')
      .doc(teacher.id)
      .update({ isVerrified: true });
  }

  render() {
    return (
      <div className="admin-dashboard">
        <h1>Hello Admin</h1>
        <h4>Teacher Requests:</h4>
        {this.state.isLoading ? (
          <Spinner color="primary" />
        ) : (
          this.state.teacherReqs.map(teacher => (
            <div className="teacher-request" key={teacher.id}>
              <p>{`${teacher.fName} ${teacher.lName}`}</p>
              <button
                type="button"
                onClick={() => {
                  this.acceptTeacher(teacher);
                }}
              >
                Accept
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
}

AdminDashboard.propTypes = propTypes;

export default AdminDashboard;
