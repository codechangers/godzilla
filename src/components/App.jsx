import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Parent from './Dashboards/Parent';
import TrainingTeacher from './Dashboards/TeacherInTraining';
import Teacher from './Dashboards/TeacherOutOfTraining';
import Organization from './Dashboards/Organization';
import '../assets/css/App.css';
import firebase from '../firebase';
import 'firebase/auth';
import 'firebase/firestore';

let authSubscription = () => {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.firebase = firebase();
  }

  componentDidMount() {
    console.log(`>>>>>>>${this.firebase}`);
    authSubscription = this.firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      });
    });
  }

  componentWillUnmount() {
    authSubscription();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={HomePage} />

          {/* <Route path="/login" component={Login} user={this.state.user} firebase={this.firebase} /> */}
          <Route
            path="/login"
            render={props => <Login {...props} user={this.state.user} firebase={this.firebase} />}
          />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/parent" component={Parent} />
          <Route path="/trainingteacher" component={TrainingTeacher} />
          <Route path="/teacher" component={Teacher} />
          <Route path="/organization" component={Organization} />
        </Router>
      </div>
    );
  }
}

export default App;
