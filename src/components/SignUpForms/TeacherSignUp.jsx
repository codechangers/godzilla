import React from 'react';
import PropTypes from 'prop-types';

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

const ParentSignUp = ({ handleChange, state }) => (
  <div>
    <label htmlFor="firstname">
      First Name:
      <input id="firstName" type="text" value={state.fName} onChange={handleChange} />
    </label>
    <br />
    <label htmlFor="lastname">
      Last Name:
      <input id="lastName" type="text" value={state.lName} onChange={handleChange} />
    </label>
    <br />
    <label htmlFor="email">
      Email Address:
      <input id="Email" type="text" value={state.email} onChange={handleChange} />
    </label>
    <br />
    <label htmlFor="phone">
      Phone:
      <input id="phone" type="text" value={state.phone} onChange={handleChange} />
    </label>
    <br />
    <p>Gender:</p>
    <select id="gender" value={state.gender} onChange={handleChange}>
      <option value="" />
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option vale="other">Other</option>
    </select>
    <br />
    <label htmlFor="birthDate">
      Birth Date:
      <input id="birthDate" type="text" value={state.birthDate} onChange={handleChange} />
    </label>
    <br />
    <label htmlFor="aboutMe">
      About You:
      <textarea id="aboutMe" value={state.aboutMe} onChange={handleChange} />
    </label>
  </div>
);

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
