import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Tab,
  Tabs,
  makeStyles,
  Checkbox
} from '@material-ui/core';
import Modal from '../UI/Modal';
import TabPanel from '../UI/TabPanel';
import { useLiveChildren } from '../../hooks/children';

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
    >
      <Typography variant="h4">Check Off Progress</Typography>
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
            <CheckOffItems items={['test', 'ing']} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1} className={classes.panel}>
            <Typography variant="h6">Tutorials</Typography>
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

const CheckOffItems = ({ items }) => {
  const [checked, setChecked] = useState([]);
  const classes = useStyles();

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
  };

  return (
    <List className={classes.list}>
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
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};

const useStyles = makeStyles({
  list: {
    width: '100%',
    maxWidth: 600,
    margin: '18px 0',
    padding: 0,
    borderBottom: '1px solid #f2f2f2'
  },
  item: {
    borderTop: '1px solid #f2f2f2'
  },
  panel: {
    width: '100%'
  }
});

export default CheckOffModal;
