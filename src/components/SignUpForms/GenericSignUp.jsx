import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  toggleCanText: PropTypes.func.isRequired,
  state: PropTypes.shape({
    fName: PropTypes.string.isRequired,
    lName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    canText: PropTypes.bool.isRequired
  }).isRequired
};

const GenericSignUp = ({ handleChange, state, toggleCanText }) => (
  <div className="generic-signup-wrapper">
    <span className="errormessage">{state.errors.fName}</span>
    <label htmlFor="firstname">
      First Name:
      <input id="firstName" type="text" value={state.fName} onChange={handleChange} />
    </label>
    <span className="errormessage">{state.errors.lName}</span>
    <label htmlFor="lastname">
      Last Name:
      <input id="lastName" type="text" value={state.lName} onChange={handleChange} />
    </label>
    <span className="errormessage">{state.errors.email}</span>
    <label htmlFor="email">
      Email Address:
      <input id="Email" type="text" value={state.email} onChange={handleChange} />
    </label>
    <span className="errormessage">{state.errors.phone}</span>
    <label htmlFor="phone">
      Phone:
      <input id="phone" type="text" value={state.phone} onChange={handleChange} />
    </label>
    <label htmlFor="canText" className="collapse">
      Phone can Text:
      <input id="canText" type="checkbox" checked={state.canText} onChange={toggleCanText} />
    </label>
  </div>
);

GenericSignUp.propTypes = propTypes;

export default GenericSignUp;
