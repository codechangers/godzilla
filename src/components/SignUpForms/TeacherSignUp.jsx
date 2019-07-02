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
    whyTeach: PropTypes.string.isRequired,
    prevExp: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
  }).isRequired,
  db: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const createTeacher = (state, db, firebase, callback) => {
  const { whyTeach, prevExp, region, location, address } = state;
  const { uid } = firebase.auth().currentUser;
  db.collection('teachers')
    .doc(uid)
    .set({
      whyTeach,
      prevExp,
      region,
      location,
      address
    })
    .then(callback);
};

const TeacherSignUp = ({ handleChange, state, db, firebase, login }) => (
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
    <br />
    <button type="submit" onClick={() => createTeacher(state, db, firebase, login)}>
      Become a Teacher
    </button>
  </div>
);

TeacherSignUp.propTypes = propTypes;

export default TeacherSignUp;
