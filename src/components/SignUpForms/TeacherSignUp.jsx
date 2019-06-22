import React from 'react';
import PropTypes from 'prop-types';

const locationToPrompt = {
  '': 'Location Name:',
  school: 'What is the name of the school?',
  office: 'What is the name of the company?',
  house: 'What is the Address of the house?',
  other: 'Describe the Location:'
};

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  state: PropTypes.shape({
    fName: PropTypes.string.isRequired,
    lName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    aboutMe: PropTypes.string.isRequired
  }).isRequired
};

const TeacherSignUp = ({ handleChange, state }) => (
  <div className="signup-form">
    <label htmlFor="whyTeach" className="tall">
      Why do you want to teach STEM topics to kids?
      <textarea id="whyTeach" value={state.whyTeach} onChange={handleChange} />
    </label>
    <label htmlFor="prevExp" className="tall">
      Do you have any previous teaching experience?
      <textarea id="prevExp" value={state.prevExp} onChange={handleChange} />
    </label>
    <label htmlFor="region">
      Where Will you Teach? (City, State)
      <input id="region" type="text" value={state.region} onChange={handleChange} />
    </label>
    <div className="inline">
      <p>What type of Location will you teach at?</p>
      <select id="location" value={state.location} onChange={handleChange}>
        <option value="" />
        <option value="school">School</option>
        <option value="office">Company&apos;s Offices</option>
        <option value="house">House</option>
        <option value="other">Other</option>
      </select>
    </div>
    <label htmlFor="address">
      {locationToPrompt[state.location]}
      <input id="address" type="text" value={state.address} onChange={handleChange} />
    </label>
  </div>
);

TeacherSignUp.propTypes = propTypes;

export default TeacherSignUp;
