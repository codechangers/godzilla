import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import CheckOffPages from './Pages';
import TabPanel from '../../UI/TabPanel';
import { useLiveChildren } from '../../../hooks/children';
import docs from '../../../resources/docs';
import tutorials from '../../../resources/tutorials';

const propTypes = {
  childRefs: PropTypes.arrayOf(PropTypes.object).isRequired
};

const CheckOffKids = ({ childRefs }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selected, select] = useState(null);
  const children = useLiveChildren(childRefs);
  const classes = useStyles();

  const updateChild = newData => {
    if (selected !== null) selected.ref.update(newData);
  };

  return (
    <>
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
          {children.length === 0 && (
            <ListItem>
              <ListItemText
                style={{ textAlign: 'center ' }}
                primary="Your students will show up here after they register!"
              />
            </ListItem>
          )}
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
        <CheckOffPages
          title="Tutorials"
          other="Documentation"
          pages={tutorials}
          onSwitch={() => setTabIndex(2)}
          whiteList={selected?.tutorials}
          onChange={tuts => updateChild({ tutorials: tuts })}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={2} className={classes.panel}>
        <CheckOffPages
          title="Documentation"
          other="Tutorials"
          pages={docs}
          onSwitch={() => setTabIndex(1)}
          whiteList={selected?.docs}
          onChange={dcs => updateChild({ docs: dcs })}
        />
      </TabPanel>
    </>
  );
};
CheckOffKids.propTypes = propTypes;

const useStyles = makeStyles({
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
  panel: {
    width: '100%'
  }
});

export default CheckOffKids;
