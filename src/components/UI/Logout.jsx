import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputIcon from '@material-ui/icons/Input';
import { auth } from '../../utils/firebase';

const Logout = ({ className }) => (
  <div className={className}>
    <Tooltip title="Logout">
      <Button color="inherit" type="button" onClick={() => auth.signOut()}>
        <InputIcon />
      </Button>
    </Tooltip>
  </div>
);

Logout.propTypes = { className: PropTypes.string };
Logout.defaultProps = { className: '' };

export default Logout;
