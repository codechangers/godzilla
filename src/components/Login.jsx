import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import autoBind from '../autoBind';
import { getUserData, validateFields } from '../helpers';
import '../assets/css/Login.css';

const errorCodeToMessage = {
  'auth/wrong-password': 'Incorrect Password',
  'auth/user-not-found': 'No Account found with this Email'
};

const accountTypeToRoute = {
  '': '/login',
  parents: '/parent',
  organizations: '/organization',
  teachers: '/teacher',
  admins: '/admin'
};

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      shouldRedirect: '',
      errors: {}
    };
    this.firebase = props.firebase;
    this.db = props.db;
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  componentDidMount() {
    this.checkAccounts();
  }

  componentWillReceiveProps() {
    this.checkAccounts();
  }

  checkAccounts() {
    const { accounts } = this.props;
    const order = ['admins', 'teachers', 'organizations', 'parents'];
    let shouldRedirect = '';
    for (let i = 0; i < order.length; i++) {
      const key = order[i];
      if (accounts[key]) {
        shouldRedirect = accountTypeToRoute[key];
        break;
      }
    }
    this.setState({ shouldRedirect });
  }

  handleChange(e) {
    if (e.target.id === 'Email') {
      this.setState({
        email: e.target.value
      });
    } else if (e.target.id === 'Password') {
      this.setState({
        password: e.target.value
      });
    }
  }

  handleSubmit() {
    const { email, password, errors } = this.state;

    if (this.validateFields(['email', 'password']) === true) {
      this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          errors.email = err.code === 'auth/user-not-found' ? errorCodeToMessage[err.code] : '';
          errors.password = err.code === 'auth/wrong-password' ? errorCodeToMessage[err.code] : '';
          this.setState({ errors });
        });
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { errors } = this.state;
    return this.state.shouldRedirect.length > 0 ? (
      <Redirect to={this.state.shouldRedirect} />
    ) : (
      <div className="login-wrapper">
        <Card className="login-form">
          <CardHeader title="Login to Godzilla" />
          <CardContent className="column">
            <TextField
              error={errors.email}
              id="Email"
              type="text"
              label="Email Address"
              variant="outlined"
              helperText={errors.email}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              error={errors.password}
              id="Password"
              type="password"
              label="Password"
              variant="outlined"
              helperText={errors.password}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Login.propTypes = propTypes;

export default Login;
