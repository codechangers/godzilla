import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from '../../Spinner';
import autoBind from '../../../autoBind';
import '../../../assets/css/Parent-Dash.css';

const propTypes = {
  db: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textFieldValue: '',
      errorMessage: ''
    };
    this.db = this.props.db;
    autoBind(this);
  }

  handleChange(e) {
    const newUpdate = {};
    newUpdate[e.target.name] = e.target.value;
    this.setState({ ...newUpdate });
  }

  validateAttribute(id, collection, attr) {
    const data = {};
    let errorMessage = '';
    if (this.state.textFieldValue === '') {
      errorMessage = 'This field may not be left blank';
      this.setState({ errorMessage });
    } else {
      data[attr] = this.state.textFieldValue;
      this.updateAttribute(id, collection, data);
    }
  }

  updateAttribute(id, collection, data) {
    this.db
      .collection(collection)
      .doc(id)
      .update(data)
      .then(() => {
        this.props.cancel();
      })
      .catch(err => {
        this.setState({ errorMessage: err });
      });
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal-box">
          <div className="modal-text">
            <TextField
              id="outlined-name"
              label={this.props.data.heading}
              name="textFieldValue"
              onChange={this.handleChange}
            />
          </div>
          {this.state.errorMessage === 'loading' ? (
            <Spinner color="primary" />
          ) : (
            <span className="error-message">{this.state.errorMessage}</span>
          )}
          <div className="parent-buttons">
            <Button variant="contained" color="secondary" onClick={this.props.cancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.validateAttribute(
                  this.props.data.id,
                  this.props.data.collection,
                  this.props.data.attribute
                )
              }
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

EditModal.propTypes = propTypes;

export default EditModal;
