import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Modal,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox
} from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cls: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const ClassSignUp = ({ open, onClose, cls, db, user }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [children, setChildren] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);

  useEffect(() => {
    return db
      .collection('parents')
      .doc(user.uid)
      .onSnapshot(parentDoc => {
        const childrenData = [];
        const childrenRefs = parentDoc.data().children || [];
        childrenRefs.forEach(child => {
          child.get().then(childDoc => {
            const childData = { ...childDoc.data(), id: childDoc.id, ref: childDoc.ref };
            childrenData.push(childData);
            if (childrenData.length === childrenRefs.length) {
              setChildren(childrenData);
            }
          });
        });
      });
  }, [db, user]);

  const toggleChild = childId => {
    const selectedCopy = [...selectedChildren];
    const index = selectedCopy.indexOf(childId);
    if (index === -1) {
      selectedCopy.push(childId);
    } else {
      selectedCopy.splice(index, 1);
    }
    setSelectedChildren();
  };
  const checkDisabled = childId => {};
  const checkToggle = childId => selectedChildren.includes(childId) || checkDisabled(childId);

  const classes = useStyles();
  return (
    <Modal className={classes.modalWrapper} open={open} onClose={onClose} disableAutoFocus>
      {isProcessing ? (
        <Paper className={classes.modalContent}></Paper>
      ) : (
        <Paper className={classes.modalContent}>
          <Typography variant="h5">Register for: {cls.name}</Typography>
          {/* Table Goes Here */}
          <Typography variant="body1">Select Children to Register</Typography>
          <List>
            {children.map(child => (
              <ListItem
                key={child.id}
                button
                onClick={() => toggleChild(child.id)}
                disabled={checkDisabled(child.id)}
              >
                <ListItemAvatar>
                  <AccountIcon />
                </ListItemAvatar>
                <ListItemText primary={`${child.fName} ${child.lName}`} />
                <Checkbox edge="end" checked={checkToggle(child.id)} />
                <Typography
                  variant="body1"
                  style={{ marginLeft: 10 }}
                >{`$${cls.price}`}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Modal>
  );
};

ClassSignUp.propTypes = propTypes;

const useStyles = makeStyles({
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  modalContent: {
    padding: '40px',
    minWidth: '300px',
    maxHeight: '100%',
    overflow: 'scroll',
    outline: 'none'
  }
});

export default ClassSignUp;
