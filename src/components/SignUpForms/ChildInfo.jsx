import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';
import '../../assets/css/Signup.css';

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
      fNameError: '',
      lNameError: '',
      birthDateError: '',
      currentSchoolError: '',
      currentGradeError: '',
      shirtSizeError: '',
      genderError: '',
      formValid: false
    };
    autoBind(this);
  }

  createChild() {
    const {
      fName,
      lName,
      birthDate,
      currentSchool,
      currentGrade,
      shirtSize,
      gender,
      formValid
    } = this.state;

    if (fName === '') {
      this.setState({ fNameError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ fNameError: '' });
      this.setState({ formValid: true });
    }

    if (lName === '') {
      this.setState({ lNameError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ lNameError: '' });
      this.setState({ formValid: true });
    }

    if (birthDate === '') {
      this.setState({ birthDateError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ birthDateError: '' });
      this.setState({ formValid: true });
    }

    if (currentSchool === '') {
      this.setState({ currentSchoolError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ currentSchoolError: '' });
      this.setState({ formValid: true });
    }

    if (currentGrade === '') {
      this.setState({ currentGradeError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ currentGradeError: '' });
      this.setState({ formValid: true });
    }

    if (shirtSize === '') {
      this.setState({ shirtSizeError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ shirtSizeError: '' });
      this.setState({ formValid: true });
    }

    if (gender === '') {
      this.setState({ genderError: 'This field may not be empty' });
      this.setState({ formValid: false });
    } else {
      this.setState({ genderError: '' });
      this.setState({ formValid: true });
    }

    if (formValid === true) {
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
    return (
      <div className="request-info">
        <span className="errormessage">{this.state.fNameError}</span>
        <label htmlFor="lastname">
          Child&apos;s First Name:
          <input id="fName" type="text" value={this.state.fName} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{this.state.lNameError}</span>
        <label htmlFor="address">
          Child&apos;s Last Name:
          <input id="lName" type="text" value={this.state.lName} onChange={this.handleChange} />
        </label>
        <span className="errormessage">{this.state.birthDateError}</span>
        <label htmlFor="email">
          Child&apos;s Birthdate:
          <input
            id="birthDate"
            type="text"
            value={this.state.birthDate}
            onChange={this.handleChange}
          />
        </label>
        <span className="errormessage">{this.state.currentSchoolError}</span>
        <label htmlFor="phone">
          Child&apos;s Current School:
          <input
            id="currentSchool"
            type="text"
            value={this.state.currentSchool}
            onChange={this.handleChange}
          />
        </label>
        <span className="errormessage">{this.state.currentGradeError}</span>
        <label htmlFor="canText">
          Child&apos;s Current Grade (Or entering grade if it&apos;s the summer):
          <input
            id="currentGrade"
            type="text"
            checked={this.state.currentGrade}
            onChange={this.handleChange}
          />
        </label>
        <span className="errormessage">{this.state.shirtSizeError}</span>
        <label htmlFor="canText">
          Child&apos;s Shirt Size:
          <input
            id="shirtSize"
            type="text"
            checked={this.state.shirtSize}
            onChange={this.handleChange}
          />
        </label>
        <span className="errormessage">{this.state.genderError}</span>
        <label htmlFor="canText">
          Child&apos;s Gender:
          <input id="gender" type="text" checked={this.state.gender} onChange={this.handleChange} />
        </label>
        <div className="modalButtonContainer">
          <button className="modalButton" type="submit" onClick={this.createChild}>
            Finish Adding Child
          </button>
          <button className="modalButton" type="submit" onClick={this.props.handleClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

ChildInfo.propTypes = propTypes;

export default ChildInfo;
