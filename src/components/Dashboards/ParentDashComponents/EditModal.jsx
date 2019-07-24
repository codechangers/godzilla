import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from '../../Spinner';
import autoBind from '../../../autoBind';
import '../../../assets/css/ParentDash.css';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal-box">
          <div className="modal-text">
            <TextField id="outlined-name" label="Name" />
          </div>
          <div className="parent-buttons" />
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Update
          </Button>
        </div>
      </div>
    );
  }
}

export default EditModal;
