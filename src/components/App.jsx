import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { IntercomProvider } from 'react-use-intercom';
import Login from './Pages/Login';
import Teachers from './Pages/Teachers';
import SignUp from './Pages/SignUp';
import Search from './Pages/Search';
import AdminDashboard from './Dashboards/Admin';
import ParentDashboard from './Dashboards/Parent';
import TeacherDashboard from './Dashboards/Teacher/index';
import OrganizationDashboard from './Dashboards/Organization/index';
import StripeHandler from './Handlers/Stripe';
import { db, auth } from '../utils/firebase';
import 'firebase/auth';
import 'firebase/firestore';
import theme from './theme';

let authSubscription = () => {};

const pathToComponent = {
  '/': Login,
  '/login': Login,
  '/teachers': Teachers,
  '/signup': SignUp,
  '/search': Search,
  '/parent': ParentDashboard,
  '/teacher': TeacherDashboard,
  '/organization': OrganizationDashboard,
  '/admin': AdminDashboard,
  '/stripe': StripeHandler
};

const intercomAppId = process.env.REACT_APP_INTERCOM_ID;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { isSignedIn: false },
      accounts: {}
    };
  }

  componentDidMount() {
    authSubscription = auth.onAuthStateChanged(u => {
      const user = u !== null ? { isSignedIn: true, ...u } : { isSignedIn: false };
      this.updateAccounts(user);
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    authSubscription();
  }

  updateAccounts(u) {
    const user = u || this.state.user;
    if (user.isSignedIn) {
      let total = 0;
      ['teachers', 'organizations', 'parents', 'admins'].forEach(collection => {
        db.collection(collection)
          .doc(user.uid)
          .get()
          .then(doc => {
            const { accounts } = this.state;
            if (doc.exists) {
              accounts[collection] = doc;
            } else {
              delete accounts[collection];
            }
            total += 1;
            this.setState({ accounts });
            if (total >= 4) {
              if (
                Object.keys(accounts).length === 0 &&
                user.providerData &&
                user.providerData[0].providerId === 'google.com'
              ) {
                user.newOAuth = true;
                this.setState({ user });
              }
            }
          });
      });
    }
    this.setState({ accounts: {} });
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <IntercomProvider appId={intercomAppId}>
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
                        OAuthed={() =>
                          this.setState({ user: { ...this.state.user, OAuthed: true } })
                        }
                      />
                    );
                  }}
                />
              ))}
            </Router>
          </IntercomProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
