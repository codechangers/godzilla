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
      address: '',
      whyTeachError: '',
      prevExpError: '',
      regionError: '',
      locationError: '',
      addressError: '',
      formValid: ''
    };
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
    const { whyTeach, prevExp, region, location, address, formValid } = this.state;

    if (whyTeach === '') {
      this.setState({ whyTeachError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ whyTeachError: '' });
      this.setState({ formValid: true });
    }

    if (prevExp === '') {
      this.setState({ prevExpError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ prevExpError: '' });
      this.setState({ formValid: true });
    }

    if (region === '') {
      this.setState({ regionError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ regionError: '' });
      this.setState({ formValid: true });
    }

    if (location === '') {
      this.setState({ locationError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ locationError: '' });
      this.setState({ formValid: true });
    }

    if (address === '') {
      this.setState({ addressError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ addressError: '' });
      this.setState({ formValid: true });
    }

    if (formValid === true) {
      this.props.db
        .collection('teachers')
        .doc(this.props.firebase.auth().currentUser.uid)
        .set(this.getTeacherData())
        .then(this.props.login);
    }
  }

  render() {
    return (
      <div className="signup-form">
        <label htmlFor="whyTeach" className="tall">
          Why do you want to teach STEM topics to kids?
          <textarea id="whyTeach" value={this.state.whyTeach} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{this.state.whyTeachError}</span>
        <label htmlFor="prevExp" className="tall">
          Do you have any previous teaching experience?
          <textarea id="prevExp" value={this.state.prevExp} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{this.state.prevExpError}</span>
        <label htmlFor="region">
          Where Will you Teach? (City, State)
          <input id="region" type="text" value={this.state.region} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{this.state.regionError}</span>
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
        <span className="errormessage">{this.state.locationError}</span>
        <label htmlFor="address">
          {locationToPrompt[this.state.location]}
          <input id="address" type="text" value={this.state.address} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{this.state.addressError}</span>
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
