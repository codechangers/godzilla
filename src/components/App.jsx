import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import AdminDashboard from './Dashboards/Admin';
import ParentDashboard from './Dashboards/Parent';
import TeacherDashboard from './Dashboards/Teacher/index';
import OrganizationDashboard from './Dashboards/Organization';
import PendingOrganizationDashboard from './Dashboards/PendingOrganization';
import '../assets/css/App.css';
import firebase from '../firebase';
import 'firebase/auth';
import 'firebase/firestore';

let authSubscription = () => {};

const pathToComponent = {
  '/': HomePage,
  '/login': Login,
  '/signup': SignUp,
  '/parent': ParentDashboard,
  '/teacher': TeacherDashboard,
  '/organization': OrganizationDashboard,
  '/pendingorganization': PendingOrganizationDashboard,
  '/admin': AdminDashboard
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { isSignedIn: false },
      accounts: {}
    };
    this.firebase = firebase();
    this.db = this.firebase
      .firestore()
      .collection('env')
      .doc('DEVELOPMENT');
  }

  componentDidMount() {
    authSubscription = this.firebase.auth().onAuthStateChanged(u => {
      const user = u !== null ? { isSignedIn: true, ...u } : { isSignedIn: false };
      this.updateAccounts(user);
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    authSubscription();
  }

  updateAccounts(user) {
    if (user.isSignedIn) {
      ['teachers', 'organizations', 'parents', 'admins'].forEach(collection => {
        this.db
          .collection(collection)
          .doc(user.uid)
          .get()
          .then(doc => {
            const { accounts } = this.state;
            let c = collection;
            if (doc.exists) {
              if (collection === 'organizations' && !doc.data().isVerrified) {
                c = 'pendingorganization';
              }
              accounts[c] = doc;
            } else {
              delete accounts[c];
            }
            this.setState({ accounts });
          });
      });
    } else {
      this.setState({ accounts: {} });
    }
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
                  <Comp
                    {...props}
                    user={this.state.user}
                    accounts={this.state.accounts}
                    updateAccounts={user => this.updateAccounts(user)}
                    firebase={this.firebase}
                    db={this.db}
                  />
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
