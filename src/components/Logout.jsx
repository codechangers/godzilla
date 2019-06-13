import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({ firebase }) => (
  <button type="button" onClick={() => firebase.auth().signOut()}>
    LogOut
  </button>
);

Logout.propTypes = { firebase: PropTypes.object.isRequired };

export default Logout;
