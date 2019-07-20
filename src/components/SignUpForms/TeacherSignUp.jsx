import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';
import { getUserData, validateFields } from '../../helpers';

const locationToPrompt = {
  '': 'Location Name:',
  school: 'What is the name of the school?',
  office: 'What is the name of the company?',
  house: 'What is the Address of the house?',
  other: 'Describe the Location:'
};

const idToDataMember = {
  address: 'address',
  whyTeach: 'whyTeach',
  prevExp: 'prevExp',
  region: 'region',
  location: 'location'
};

const allFields = ['whyTeach', 'prevExp', 'region', 'location', 'address'];

const propTypes = {
  db: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

class TeacherSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whyTeach: '',
      prevExp: '',
      region: '',
      location: '',
      address: '',
      whyTeachError: '',
      prevExpError: '',
      regionError: '',
      locationError: '',
      addressError: '',
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  getTeacherData() {
    const date = new Date();
    // Filter out any fields for local state that shouldn't be saved to the teacher document.
    return Object.keys(this.state)
      .filter(key => Object.keys(idToDataMember).includes(key))
      .reduce(
        (obj, key) => {
          const newObj = { ...obj };
          newObj[key] = this.state[key];
          return newObj;
        },
        {
          isVerrified: false,
          isDeclined: false,
          isTraining: true,
          dateApplied: date,
          isRead: false
        }
      );
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[idToDataMember[id]] = value;
    this.setState(newState);
  }

  handleSubmit() {
    if (this.validateFields(allFields) === true) {
      this.props.db
        .collection('teachers')
        .doc(this.props.firebase.auth().currentUser.uid)
        .set(this.getTeacherData())
        .then(this.props.login);
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="signup-form">
        <h1>Teacher Account Information:</h1>
        <span className="errormessage">{errors.whyTeach}</span>
        <label htmlFor="whyTeach" className="tall">
          Why do you want to teach STEM topics to kids?
          <textarea id="whyTeach" value={this.state.whyTeach} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{errors.prevExp}</span>
        <label htmlFor="prevExp" className="tall">
          Do you have any previous teaching experience?
          <textarea id="prevExp" value={this.state.prevExp} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{errors.region}</span>
        <label htmlFor="region">
          Where Will you Teach? (City, State)
          <input id="region" type="text" value={this.state.region} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{errors.location}</span>
        <div className="inline">
          <p>What type of Location will you teach at?</p>
          <select id="location" value={this.state.location} onChange={this.handleChange}>
            <option value="" />
            <option value="school">School</option>
            <option value="office">Company&apos;s Offices</option>
            <option value="house">House</option>
            <option value="other">Other</option>
          </select>
        </div>
        <span className="errormessage">{errors.address}</span>
        <label htmlFor="address">
          {locationToPrompt[this.state.location]}
          <input id="address" type="text" value={this.state.address} onChange={this.handleChange} />
        </label>
        <br />
        <button type="submit" onClick={this.handleSubmit}>
          Submit Teacher Application
        </button>
      </div>
    );
  }
}

TeacherSignUp.propTypes = propTypes;

export default TeacherSignUp;
