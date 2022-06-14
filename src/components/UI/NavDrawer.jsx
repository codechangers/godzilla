import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Folder from './Folder';
import { filterPages, rgb } from '../../utils/helpers';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onNav: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  locked: PropTypes.bool,
  whiteList: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps = {
  locked: false,
  whiteList: []
};

const NavDrawer = ({ open, onNav, current, pages, width, locked, whiteList }) => {
  const classes = useStyles(width);
  const unlockedPages = useMemo(() => (locked ? filterPages(whiteList, pages) : pages), [
    pages,
    locked,
    whiteList
  ]);

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
        {Object.entries(unlockedPages).map(([item, value]) =>
          typeof value === 'string' ? (
            <ListItem
              button
              divider
              key={item}
              selected={current === item}
              onClick={() => onNav(item)}
              style={{ textOverflow: 'elipsis' }}
            >
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
      color: rgb(211, 211, 211),
      width: drawerWidth,
      backgroundColor: 'var(--background-color)',
      paddingTop: '4px'
    }
  })();

export default NavDrawer;
