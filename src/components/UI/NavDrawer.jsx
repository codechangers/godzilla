import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Folder from './Folder';
import { useUnlockedItems } from '../../hooks/items';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onNav: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  locked: PropTypes.bool,
  whiteList: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps = {
  locked: false,
  whiteList: []
};

const NavDrawer = ({ open, onNav, current, items, width, locked, whiteList }) => {
  const classes = useStyles(width);
  const unlockedItems = useUnlockedItems(items, locked, whiteList);

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
        {Object.entries(unlockedItems).map(([item, value]) =>
          typeof value === 'string' ? (
            <ListItem
              button
              divider
              key={item}
              selected={current === item}
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
NavDrawer.defaultProps = defaultProps;

const useStyles = drawerWidth =>
  makeStyles({
    drawer: {
      color: 'lightgrey',
      width: drawerWidth,
      backgroundColor: 'var(--background-color)'
    }
  })();

export default NavDrawer;
