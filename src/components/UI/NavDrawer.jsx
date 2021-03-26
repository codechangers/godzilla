import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onNav: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired
};

const NavDrawer = ({ open, onNav, items, width }) => {
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
          <ListItem button key={item} onClick={() => onNav(item)}>
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
    }
  })();

export default NavDrawer;
