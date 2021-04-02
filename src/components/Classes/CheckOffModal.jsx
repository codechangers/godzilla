import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  makeStyles,
  Checkbox,
  Tooltip,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import { ArrowBack, SwapHoriz } from '@material-ui/icons';
import Modal from '../UI/Modal';
import TabPanel from '../UI/TabPanel';
import { useLiveChildren } from '../../hooks/children';
import docs from '../../resources/docs';
import tutorials from '../../resources/tutorials';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  childRefs: PropTypes.arrayOf(PropTypes.object).isRequired
};

const CheckOffModal = ({ open, onClose, childRefs }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selected, select] = useState(null);
  const children = useLiveChildren(childRefs);
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Check Off Modal"
      description="Check off the progress of participants as they make their way through the competition."
      className={classes.paper}
    >
      <div className={classes.header}>
        {selected !== null && (
          <div className={classes.grow}>
            <Tooltip title="Back" placement="bottom">
              <IconButton
                onClick={() => {
                  select(null);
                  setTabIndex(0);
                }}
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
          </div>
        )}
        <Typography variant="h4" className={classes.headerText}>
          {selected === null ? 'Check Off Progress' : `${selected.fName} ${selected.lName}`}
        </Typography>
        {selected !== null && (
          <div className={classes.grow}>
            <div style={{ width: 48 }} />
          </div>
        )}
      </div>
      <TabPanel value={tabIndex} index={0} className={classes.panel}>
        <List className={classes.list}>
          {children.map(child => (
            <ListItem
              button
              divider
              key={child.id}
              onClick={() => {
                select(child);
                setTabIndex(1);
              }}
            >
              <ListItemText primary={`${child.fName} ${child.lName}`} />
            </ListItem>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={tabIndex} index={1} className={classes.panel}>
        <CheckOffItems
          title="Tutorials"
          other="Documentation"
          items={Object.keys(tutorials)}
          onSwitch={() => setTabIndex(2)}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={2} className={classes.panel}>
        <CheckOffItems
          title="Documentation"
          other="Tutorials"
          items={Object.keys(docs)}
          onSwitch={() => setTabIndex(1)}
        />
      </TabPanel>
      <Button onClick={onClose} style={{ paddingLeft: 50, paddingRight: 50 }}>
        Close
      </Button>
    </Modal>
  );
};
CheckOffModal.propTypes = propTypes;

const CheckOffItems = ({ title, items, onSwitch, other }) => {
  const [checked, setChecked] = useState([]);
  const classes = useStyles();

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
  };

  const toggleAll = () => {
    if (checked.length === items.length) {
      setChecked([]);
    } else setChecked(items);
  };

  return (
    <List className={classes.list}>
      <ListItem component="div" divider>
        <ListItemIcon>
          <Tooltip title="Select All" placement="top">
            <Checkbox
              edge="start"
              checked={checked.length === items.length}
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
          <Button onClick={onSwitch} startIcon={<SwapHoriz />}>
            {other}
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      {items.map(item => (
        <ListItem button divider key={item} onClick={() => handleToggle(item)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(item) !== -1}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};
CheckOffItems.propTypes = {
  title: PropTypes.string.isRequired,
  other: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSwitch: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: 0
  },
  header: {
    margin: '20px 0 0 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  grow: {
    flexGrow: 1
  },
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
  },
  panel: {
    width: '100%'
  }
}));

export default CheckOffModal;
