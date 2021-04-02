import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Button,
  Typography,
  Tab,
  Tabs,
  makeStyles,
  Checkbox,
  Tooltip
} from '@material-ui/core';
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
      <Typography variant="h4" className={classes.header}>
        Check Off Progress
      </Typography>
      {selected === null ? (
        <List className={classes.list}>
          {children.map(child => (
            <ListItem
              button
              key={child.id}
              className={classes.item}
              onClick={() => select(child.fName)}
            >
              <ListItemText primary={`${child.fName} ${child.lName}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <>
          <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} indicatorColor="primary">
            <Tab label="Docs" />
            <Tab label="Tutorials" />
          </Tabs>
          <TabPanel value={tabIndex} index={0} className={classes.panel}>
            <CheckOffItems title="Documentation" items={Object.keys(docs)} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1} className={classes.panel}>
            <CheckOffItems title="Tutorials" items={Object.keys(tutorials)} />
          </TabPanel>
        </>
      )}
      <Button onClick={onClose} style={{ paddingLeft: 50, paddingRight: 50 }}>
        Close
      </Button>
    </Modal>
  );
};
CheckOffModal.propTypes = propTypes;

const CheckOffItems = ({ title, items }) => {
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
      <ListSubheader classes={{ root: classes.listHeader }} disableGutters disableSticky>
        <ListItem component="div">
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
        </ListItem>
      </ListSubheader>
      {items.map(item => (
        <ListItem button key={item} className={classes.item} onClick={() => handleToggle(item)}>
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
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: 0
  },
  header: {
    margin: '20px 0'
  },
  list: {
    width: '100%',
    maxWidth: 600,
    margin: '18px 0',
    padding: 0,
    borderBottom: '1px solid #f2f2f2'
  },
  listHeader: {
    backgroundColor: theme.palette.background.paper
  },
  subHeaderRoot: {
    marginBottom: 0
  },
  subHeader: {
    color: theme.palette.text.primary
  },
  item: {
    borderTop: '1px solid #f2f2f2'
  },
  panel: {
    width: '100%'
  }
}));

export default CheckOffModal;
