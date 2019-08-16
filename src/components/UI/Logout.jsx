import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputIcon from '@material-ui/icons/Input';

const Logout = ({ firebase, className }) => (
  <div className={className}>
    <Tooltip title="Logout">
      <Button color="inherit" type="button" onClick={() => firebase.auth().signOut()}>
        <InputIcon />
      </Button>
    </Tooltip>
  </div>
);

Logout.propTypes = { firebase: PropTypes.object.isRequired, className: PropTypes.string };
Logout.defaultProps = { className: '' };

export default Logout;
