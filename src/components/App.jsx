import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import HomePage from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminDashboard from './Dashboards/Admin/index';
import ParentDashboard from './Dashboards/Parent';
import TeacherDashboard from './Dashboards/Teacher/index';
import OrganizationDashboard from './Dashboards/Organization/index';
import StripeHandler from './Handlers/Stripe';
import { API_URL } from '../globals';
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
  '/admin': AdminDashboard,
  '/stripe': StripeHandler
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { isSignedIn: false },
      accounts: {},
      apiKey: null
    };
    this.firebase = firebase();
    this.db = this.firebase
      .firestore()
      .collection('env')
      .doc('PRODUCTION');
  }

  componentDidMount() {
    authSubscription = this.firebase.auth().onAuthStateChanged(u => {
      const user = u !== null ? { isSignedIn: true, ...u } : { isSignedIn: false };
      this.updateAccounts(user);
      this.setState({ user });
    });
    // eslint-disable-next-line
    fetch(`${API_URL}/stripe_key`, { method: 'GET' })
      .then(res => res.json())
      .then(res => this.setState({ apiKey: res.stripe_key }));
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
            if (doc.exists) {
              accounts[collection] = doc;
            } else {
              delete accounts[collection];
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                      apiKey={this.state.apiKey}
                    />
                  );
                }}
              />
            ))}
          </Router>
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
