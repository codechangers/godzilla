import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Button, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import WhoAmIModal from './WhoAmIModal';

const propTypes = {
  whoAmI: PropTypes.object.isRequired,
  setWhoAmI: PropTypes.func.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object,
  listButton: PropTypes.bool
};

const defaultProps = {
  listButton: false,
  className: '',
  classes: {}
};

export const MainButton = ({ whoAmI, onClick, className }) => (
  <Tooltip title="Change Profile" placement="bottom">
    <Button
      variant="outlined"
      onClick={onClick}
      className={className}
      startIcon={<AccountCircle />}
    >
      {whoAmI.fName}
    </Button>
  </Tooltip>
);
MainButton.propTypes = {
  whoAmI: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};
MainButton.defaultProps = { className: '' };

export const ListButton = ({ whoAmI, onClick, classes }) => (
  <ListItem button onClick={onClick} classes={classes}>
    <ListItemIcon>
      <AccountCircle />
    </ListItemIcon>
    <ListItemText primary={whoAmI.fName} />
  </ListItem>
);
ListButton.propTypes = {
  whoAmI: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object
  // Classes ref: https://material-ui.com/api/list-item/#css
};
ListButton.defaultProps = { classes: {} };

const WhoAmIButton = ({ listButton, whoAmI, setWhoAmI, className, classes }) => {
  const [showProfile, setShowProfile] = useState(false);
  const WAIButton = listButton ? ListButton : MainButton;
  return (
    <>
      <WAIButton
        whoAmI={whoAmI}
        onClick={() => setShowProfile(true)}
        className={className}
        classes={classes}
      />
      <WhoAmIModal open={showProfile} onClose={() => setShowProfile(false)} setWhoAmI={setWhoAmI} />
    </>
  );
};
WhoAmIButton.propTypes = propTypes;
WhoAmIButton.defaultProps = defaultProps;

export default WhoAmIButton;
