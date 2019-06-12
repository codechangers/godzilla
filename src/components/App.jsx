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

const pathToComponent = {
  '/': HomePage,
  '/login': Login,
  '/signup': SignUp,
  '/parent': Parent,
  '/teacher': Teacher,
  '/trainingteacher': TrainingTeacher,
  '/organization': Organization
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.firebase = firebase();
    this.db = this.firebase
      .firestore()
      .collection('env')
      .doc('DEVELOPMENT');
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
          {Object.keys(pathToComponent).map((path, index) => (
            <Route
              exact={index === 0}
              key={path}
              path={path}
              render={props => {
                const Comp = pathToComponent[path];
                return (
                  <Comp {...props} user={this.state.user} firebase={this.firebase} db={this.db} />
                );
              }}
            />
          ))}
        </Router>
      </div>
    );
  }
}

export default App;
