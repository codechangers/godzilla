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
  <div>
    <label htmlFor="firstname">
      First Name:
      <input id="firstName" type="text" value={state.fName} onChange={handleChange} />
    </label>
    <span className="errormessage">{state.fNameError}</span>
    <br />
    <label htmlFor="lastname">
      Last Name:
      <input id="lastName" type="text" value={state.lName} onChange={handleChange} />
    </label>
    <span className="errormessage">{state.lNameError}</span>
    <br />
    <label htmlFor="email">
      Email Address:
      <input id="Email" type="text" value={state.email} onChange={handleChange} />
    </label>
    <span className="errormessage">{state.emailError}</span>
    <br />
    <label htmlFor="phone">
      Phone:
      <input id="phone" type="text" value={state.phone} onChange={handleChange} />
    </label>
    <span className="errormessage">{state.phoneError}</span>
    <br />
    <label htmlFor="canText" className="collapse">
      Phone can Text:
      <input id="canText" type="checkbox" checked={state.canText} onChange={toggleCanText} />
    </label>
  </div>
);

GenericSignUp.propTypes = propTypes;

export default GenericSignUp;
