import React from 'react';
import autoBind from '../autoBind';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      email: '',
      password: '',
      confirmPassword: '',
      accountType: ''
    };
    autoBind(this);
  }

  handleChange(e) {
    if (e.target.id === 'firstName') {
      this.setState({
        fName: e.target.value
      });
    } else if (e.target.id === 'lastName') {
      this.setState({
        lName: e.target.value
      });
    } else if (e.target.id === 'Email') {
      this.setState({
        email: e.target.value
      });
    } else if (e.target.id === 'accountType') {
      this.setState({
        acountType: e.target.value
      });
    } else if (e.target.id === 'password') {
      this.setState({
        password: e.target.value
      });
    } else if (e.target.id === 'confirmPassword') {
      this.setState({
        confirmPassword: e.target.value
      });
    }
  }

  render() {
    return (
      <form>
        <label>
          First Name:
          <input id="firstName" type="text" value={this.state.fName} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input id="lastName" type="text" value={this.state.lName} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Email Address:
          <input id="Email" type="text" value={this.state.email} onChange={this.handleChange} />
        </label>
        <br />
        <select id="accountType">
          Account Type:
          <option value="Parent">Parent</option>
          <option value="Teacher">Teacher</option>
          <option value="Organization">Organization</option>
        </select>
        <br />
        <label>
          Password:
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            id="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SignUp;
