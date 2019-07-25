import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';
import { getUserData, validateFields } from '../../helpers';

const idToDataMember = {
  name: 'name',
  address: 'address',
  aboutMe: 'aboutMe'
};

const allFields = ['name', 'address', 'aboutMe'];

const propTypes = {
  db: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

class ParentSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      aboutMe: '',
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  getOrgData() {
    // Filter out any fields for local state that shouldn't be saved to the organization document.
    return Object.keys(this.state)
      .filter(key => Object.keys(idToDataMember).includes(key))
      .reduce(
        (obj, key) => {
          const newObj = { ...obj };
          newObj[key] = this.state[key];
          return newObj;
        },
        { isVerrified: false }
      );
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[idToDataMember[id]] = value;
    this.setState(newState);
  }

  handleSubmit() {
    if (this.validateFields(allFields)) {
      this.props.db
        .collection('organizations')
        .doc(this.props.firebase.auth().currentUser.uid)
        .set(this.getOrgData())
        .then(this.props.login);
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="signup-form">
        <h1>Oranization Account Information:</h1>
        <span className="errormessage">{errors.name}</span>
        <label htmlFor="name">
          Organization Name:
          <input id="name" type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{errors.address}</span>
        <label htmlFor="address">
          Address:
          <input id="address" type="text" value={this.state.address} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{errors.aboutMe}</span>
        <label htmlFor="aboutMe">
          Describe your Organization:
          <textarea id="aboutMe" value={this.state.aboutMe} onChange={this.handleChange} />
        </label>
        <button type="submit" onClick={this.handleSubmit} style={{ marginTop: '20px' }}>
          Submit Organization Application
        </button>
      </div>
    );
  }
}

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
