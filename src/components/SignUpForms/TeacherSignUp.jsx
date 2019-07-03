import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';

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
      address: ''
    };
    autoBind(this);
  }

  getTeacherData() {
    // Filter out any fields for local state that shouldn't be saved to the teacher document.
    return Object.keys(this.state)
      .filter(key => Object.keys(idToDataMember).includes(key))
      .reduce(
        (obj, key) => {
          const newObj = { ...obj };
          newObj[key] = this.state[key];
          return newObj;
        },
        { isVerrified: false, isTraining: true }
      );
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[idToDataMember[id]] = value;
    this.setState(newState);
  }

  handleSubmit() {
    this.props.db
      .collection('teachers')
      .doc(this.props.firebase.auth().currentUser.uid)
      .set(this.getTeacherData())
      .then(this.props.login);
  }

  render() {
    return (
      <div className="signup-form">
        <label htmlFor="whyTeach" className="tall">
          Why do you want to teach STEM topics to kids?
          <textarea id="whyTeach" value={this.state.whyTeach} onChange={this.handleChange} />
        </label>
        <label htmlFor="prevExp" className="tall">
          Do you have any previous teaching experience?
          <textarea id="prevExp" value={this.state.prevExp} onChange={this.handleChange} />
        </label>
        <label htmlFor="region">
          Where Will you Teach? (City, State)
          <input id="region" type="text" value={this.state.region} onChange={this.handleChange} />
        </label>
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
