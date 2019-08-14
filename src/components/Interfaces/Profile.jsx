import React from 'react';
import PropTypes from 'prop-types';
import Logout from '../UI/Logout';

const ProfileInterface = ({ firebase }) => (
  <div className="page-content">
    <h1 style={{ margin: 0 }}>Profile Interface</h1>
    <Logout firebase={firebase} />
  </div>
);

ProfileInterface.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default ProfileInterface;
