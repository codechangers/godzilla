import React from 'react';
import Spinner from '../Spinner';
import autoBind from '../../autoBind';
import firebase from '../../firebase';
import 'firebase/firestore';
import '../../assets/css/Admin.css';

let cancelSub = () => {};

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      teacherReqs: []
    };
    this.firebase = firebase();
    this.db = this.firebase
      .firestore()
      .collection('env')
      .doc('DEVELOPMENT');
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

export default AdminDashboard;
