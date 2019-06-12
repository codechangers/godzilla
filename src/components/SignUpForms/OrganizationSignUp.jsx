import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    aboutMe: PropTypes.string.isRequired
  }).isRequired
};

const ParentSignUp = ({ handleChange, state }) => (
  <div>
    <label htmlFor="name">
      Organization Name:
      <input id="name" type="text" value={state.name} onChange={handleChange} />
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
    <label htmlFor="address">
      Address:
      <input id="address" type="text" value={state.address} onChange={handleChange} />
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
