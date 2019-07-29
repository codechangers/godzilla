import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import autoBind from '../../autoBind';
import { getUserData, validateFields, getErrorStatus } from '../../helpers';
import '../../assets/css/Signup.css';

const allFields = [
  'fName',
  'lName',
  'birthDate',
  'currentSchool',
  'currentGrade',
  'shirtSize',
  'gender'
];

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  addChildRef: PropTypes.func.isRequired
};

class ChildInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      birthDate: '',
      currentSchool: '',
      currentGrade: '',
      shirtSize: '',
      gender: '',
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  createChild() {
    if (this.validateFields(allFields) === true) {
      const user = this.props.firebase.auth().currentUser;
      if (user) {
        this.props.db
          .collection('children')
          .add(this.state)
          .then(child => {
            this.props.addChildRef(this.props.db.collection('children').doc(child.id));
          });
        this.props.handleClose();
      }
    }
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[id] = value;
    this.setState(newState);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="request-info">
        <TextField
          error={getErrorStatus(errors.fName)}
          id="fName"
          type="text"
          label="Child's First Name"
          variant="outlined"
          helperText={errors.fName}
          value={this.state.fName}
          onChange={this.handleChange}
        />
        <TextField
          error={getErrorStatus(errors.lName)}
          id="lName"
          type="text"
          label="Child's Last Name"
          variant="outlined"
          helperText={errors.lName}
          value={this.state.lName}
          onChange={this.handleChange}
        />
        <TextField
          error={getErrorStatus(errors.birthDate)}
          id="birthDate"
          type="text"
          label="Child's Birthdate"
          variant="outlined"
          helperText={errors.birthDate}
          value={this.state.birthDate}
          onChange={this.handleChange}
        />
        <TextField
          error={getErrorStatus(errors.currentSchool)}
          id="currentSchool"
          type="text"
          label="Child's Current School"
          variant="outlined"
          helperText={errors.currentSchool}
          value={this.state.currentSchool}
          onChange={this.handleChange}
        />
        <TextField
          error={getErrorStatus(errors.currentGrade)}
          id="currentGrade"
          type="text"
          label="Child's Current Grade"
          variant="outlined"
          helperText={errors.currentGrade}
          value={this.state.currentGrade}
          onChange={this.handleChange}
        />
        <TextField
          error={getErrorStatus(errors.shirtSize)}
          id="shirtSize"
          type="text"
          label="Child's Shirt Size"
          variant="outlined"
          helperText={errors.shirtSize}
          value={this.state.shirtSize}
          onChange={this.handleChange}
        />
        <TextField
          error={getErrorStatus(errors.gender)}
          id="gender"
          type="text"
          label="Child's Gender"
          variant="outlined"
          helperText={errors.gender}
          value={this.state.gender}
          onChange={this.handleChange}
        />
        <div className="modalButtonContainer">
          <Button
            onClick={this.createChild}
            variant="contained"
            color="primary"
            className="modalButton"
          >
            Add Child
          </Button>
          <Button
            onClick={this.props.handleClose}
            variant="contained"
            color="secondary"
            className="modalButton"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

ChildInfo.propTypes = propTypes;

export default ChildInfo;
