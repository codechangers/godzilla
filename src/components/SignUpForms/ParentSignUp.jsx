import React from 'react';
import PropTypes from 'prop-types';
import ChildInfo from './ChildInfo';
import '../../assets/css/Signup.css';

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
// blablablablablablablablablablablalbalbla
function handleChange(e) {
  const { id, value } = e.target;
  const newState = {};
  newState[id] = value;
  this.setState(newState);
}

const ParentSignUp = (props, { handleChange, state, toggleCanText }) => (
  <div className="signup-form">
    <h1>Parent Account Information:</h1>
    <label htmlFor="firstname">
      Street Address:
      <input id="address" type="text" value={props.state.address} onChange={this.handleChange} />
    </label>
    <br />
    <ChildInfo
      handleChange={handleChange}
      state={state}
      toggleCanText={toggleCanText}
      db={props.db}
      firebase={props.firebase}
      address={this.address}
    />
    <br />
  </div>
);

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
