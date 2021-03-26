import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onNav: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
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
        {items.map(item => (
          <ListItem
            button
            key={item}
            className={current === item ? classes.selected : ''}
            onClick={() => onNav(item)}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

NavDrawer.propTypes = propTypes;

const useStyles = drawerWidth =>
  makeStyles({
    drawer: {
      width: drawerWidth
    },
    selected: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  })();

export default NavDrawer;
