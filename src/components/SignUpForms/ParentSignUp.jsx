import React from 'react';
import PropTypes from 'prop-types';
import ChildInfo from './ChildInfo';

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

const ParentSignUp = ({ handleChange, state, toggleCanText }) => (
  <div>
    <label htmlFor="firstname">
      Street Address:
      <input id="address" type="text" value={state.address} onChange={handleChange} />
    </label>
    <ChildInfo />
    <br />
  </div>
);

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
