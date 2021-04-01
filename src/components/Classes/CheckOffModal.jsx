import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Button, Typography, makeStyles } from '@material-ui/core';
import Modal from '../UI/Modal';
import { useLiveChildren } from '../../hooks/children';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  childRefs: PropTypes.arrayOf(PropTypes.object).isRequired
};

const CheckOffModal = ({ open, onClose, childRefs }) => {
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
      <List className={classes.list}>
        {children.map(child => (
          <ListItem
            button
            key={child.id}
            className={classes.item}
            onClick={() => console.log(child.fName)}
          >
            <ListItemText primary={`${child.fName} ${child.lName}`} />
          </ListItem>
        ))}
      </List>
      <Button onClick={onClose} style={{ paddingLeft: 50, paddingRight: 50 }}>
        Close
      </Button>
    </Modal>
  );
};
CheckOffModal.propTypes = propTypes;

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
  }
});

export default CheckOffModal;
