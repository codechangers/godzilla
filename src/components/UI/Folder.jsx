import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import FolderIcon from '@material-ui/icons/Folder';

const propTypes = {
  title: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  prefix: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  current: PropTypes.string,
  useChecks: PropTypes.bool,
  checked: PropTypes.func
};

const defaultProps = {
  current: '',
  useChecks: false,
  checked: () => {}
};

const Folder = ({ title, pages, prefix, current, onClick, useChecks, checked }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem
        button
        divider
        onClick={() => setOpen(!open)}
        selected={!open && current.includes(prefix)}
        style={{ textOverflow: 'elipsis' }}
      >
        {useChecks && (
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
        )}
        <ListItemText primary={title} style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.entries(pages).map(([item, value]) =>
            typeof value === 'string' ? (
              <ListItem
                button
                divider
                key={item}
                selected={current === prefix + item}
                onClick={() => onClick(prefix + item)}
              >
                {useChecks && (
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked(prefix + item)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={item}
                  style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                />
              </ListItem>
            ) : (
              <Folder
                key={item}
                title={item}
                pages={value}
                onClick={onClick}
                prefix={`${prefix}${item}.`}
              />
            )
          )}
        </List>
      </Collapse>
    </>
  );
};
Folder.propTypes = propTypes;
Folder.defaultProps = defaultProps;

export default Folder;
