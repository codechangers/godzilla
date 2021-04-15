import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const propTypes = {
  icons: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const OptionMenu = ({ icons, actions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <Tooltip title="Menu" placement="right">
        <IconButton
          aria-label="menu"
          aria-controls="server-menu"
          aria-haspopup="true"
          size="small"
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="server-menu"
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl !== null}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            width: '130px'
          }
        }}
      >
        {Object.keys(icons).map(option => {
          const OptionIcon = icons[option];
          return (
            <MenuItem
              key={option}
              onClick={() => {
                setAnchorEl(null);
                actions[option]();
              }}
            >
              <OptionIcon fontSize="small" style={{ marginRight: 10 }} />
              <Typography
                variant="inherit"
                style={{
                  textTransform: 'capitalize',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                {option}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

OptionMenu.propTypes = propTypes;

export default OptionMenu;
