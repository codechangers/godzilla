import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Checkbox,
  Tooltip,
  IconButton,
  ListItemSecondaryAction,
  makeStyles
} from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { SwapHoriz } from '@material-ui/icons';
import Folder from '../../UI/Folder';
import { flattenPages } from '../../../utils/helpers';

const propTypes = {
  title: PropTypes.string.isRequired,
  other: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  onSwitch: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  whiteList: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps = {
  whiteList: []
};

const CheckOffPages = ({ title, pages, onSwitch, other, width, onChange, whiteList }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const setWhiteList = newChecked => {
    setChecked(newChecked);
    onChange(newChecked);
  };

  useEffect(() => {
    setChecked(whiteList);
  }, [whiteList]);

  const flatPages = useMemo(() => flattenPages(pages), [pages]);

  const toggleAll = () => {
    if (checked.length === flatPages.length) {
      setWhiteList([]);
    } else setWhiteList(flatPages);
  };

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);
    setWhiteList(newChecked);
  };

  return (
    <List className={classes.list}>
      <ListItem component="div" divider>
        <ListItemIcon>
          <Tooltip title="Select All" placement="top">
            <Checkbox
              edge="start"
              checked={checked.length === flatPages.length}
              onChange={toggleAll}
              tabIndex={-1}
            />
          </Tooltip>
        </ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{ variant: 'h6' }}
          classes={{ root: classes.subHeaderRoot, primary: classes.subHeader }}
        />
        <ListItemSecondaryAction>
          {isWidthUp('sm', width) ? (
            <Button onClick={onSwitch} startIcon={<SwapHoriz />}>
              {other}
            </Button>
          ) : (
            <Tooltip title={other} placement="top">
              <IconButton onClick={onSwitch}>
                <SwapHoriz />
              </IconButton>
            </Tooltip>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      {Object.entries(pages).map(([item, value]) =>
        typeof value === 'string' ? (
          <ListItem button divider key={item} onClick={() => handleToggle(item)}>
            <ListItemIcon>
              <Checkbox edge="start" checked={checked.includes(item)} tabIndex={-1} disableRipple />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ) : (
          <Folder
            key={item}
            title={item}
            pages={value}
            onClick={handleToggle}
            prefix={`${item}.`}
            checked={subItem => checked.includes(subItem)}
            useChecks
          />
        )
      )}
    </List>
  );
};
CheckOffPages.propTypes = propTypes;
CheckOffPages.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 18,
    padding: 0
  },
  subHeaderRoot: {
    marginBottom: 0
  },
  subHeader: {
    color: theme.palette.text.primary
  }
}));

export default withWidth()(CheckOffPages);
