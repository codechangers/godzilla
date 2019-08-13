import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const Logout = ({ firebase }) => (
  <Button color="inherit" type="button" onClick={() => firebase.auth().signOut()}>
    LogOut
  </Button>
);

Logout.propTypes = { firebase: PropTypes.object.isRequired };

export default Logout;
