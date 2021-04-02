import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  prefix: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  shouldDisable: PropTypes.func.isRequired
};

const Folder = ({ title, items, prefix, current, onClick, shouldDisable }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem
        button
        divider
        onClick={() => setOpen(!open)}
        selected={!open && current.includes(prefix)}
      >
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.entries(items).map(([item, value]) =>
            typeof value === 'string' ? (
              <ListItem
                button
                divider
                key={item}
                disabled={shouldDisable(item)}
                selected={current === prefix + item}
                onClick={() => onClick(prefix + item)}
              >
                <ListItemText primary={item} />
              </ListItem>
            ) : (
              <Folder
                key={item}
                title={item}
                items={value}
                onClick={onClick}
                prefix={`${prefix}${item}.`}
                shouldDisable={shouldDisable}
              />
            )
          )}
        </List>
      </Collapse>
    </>
  );
};
Folder.propTypes = propTypes;

export default Folder;
