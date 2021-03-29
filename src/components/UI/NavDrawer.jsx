import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, ListItem, ListItemText, Collapse, makeStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onNav: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

const NavDrawer = ({ open, onNav, current, items, width }) => {
  const classes = useStyles(width);
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawer
      }}
    >
      <List>
        {Object.entries(items).map(([item, value]) =>
          typeof value === 'string' ? (
            <ListItem
              button
              key={item}
              className={clsx({ [classes.selected]: current === item })}
              onClick={() => onNav(item)}
            >
              <ListItemText primary={item} />
            </ListItem>
          ) : (
            <Folder
              key={item}
              title={item}
              items={value}
              onClick={onNav}
              prefix={`${item}.`}
              current={current}
            />
          )
        )}
      </List>
    </Drawer>
  );
};

NavDrawer.propTypes = propTypes;

const Folder = ({ title, items, prefix, current, onClick }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
      <ListItem
        button
        onClick={() => setOpen(!open)}
        className={clsx({ [classes.selected]: !open && current.includes(prefix) })}
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
                key={item}
                onClick={() => onClick(prefix + item)}
                className={clsx({ [classes.selected]: current === prefix + item })}
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
              />
            )
          )}
        </List>
      </Collapse>
    </>
  );
};
Folder.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  prefix: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const useStyles = drawerWidth =>
  makeStyles({
    drawer: {
      width: drawerWidth,
      backgroundColor: 'var(--background-color)'
    },
    selected: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  })();

export default NavDrawer;
