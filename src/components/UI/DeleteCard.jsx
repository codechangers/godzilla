import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from '@material-ui/core';

const DeleteCard = ({ prompt, warning, onCancel, onDelete, forwardedRef }) => (
  <Card className="delete-card" ref={forwardedRef}>
    <h1>{prompt}</h1>
    <h4>{warning}</h4>
    <div className="options">
      <Button color="default" variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <Button color="secondary" variant="contained" onClick={onDelete}>
        Delete
      </Button>
    </div>
  </Card>
);

DeleteCard.propTypes = {
  prompt: PropTypes.string.isRequired,
  warning: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  forwardedRef: PropTypes.func.isRequired
};

DeleteCard.defaultProps = {
  warning: ''
};

export default React.forwardRef((props, ref) => <DeleteCard {...props} forwardedRef={ref} />);
