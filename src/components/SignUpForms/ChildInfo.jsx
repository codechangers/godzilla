import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/Signup.css';
import Parent from '../Dashboards/Parent';
import autoBind from '../../autoBind';

class ChildInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      child: [
        (cFName = PropTypes.func.isRequired),
        (cLName = PropTypes.func.isRequired),
        (cBirthDate = PropTypes.func.isRequired),
        (cCurrentSchool = PropTypes.func.isRequired),
        (cCurrentGrade = PropTypes.func.isRequired),
        (cShirtSize = PropTypes.func.isRequired),
        (cGender = PropTypes.func.isRequired)
      ]
    };
    autoBind(this);
  }

  updateParent() {
    const user = this.props.firebase.auth().currentUser;
    if (user) {
      this.props.db
        .collection('parents')
        .doc(user.uid)
        .update(this.state)
        .then(() => {
          return <Parent firebase={this.props.firebase} user={user} />;
        });
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
      <div>
        <label htmlFor="lastname">
          Child's First Name:
          <input
            id="cFName"
            type="text"
            value={this.state.child.cFName}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="address">
          Child's Last Name:
          <input
            id="cLName"
            type="text"
            value={this.state.child.cLName}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="email">
          Child's Birthdate:
          <input
            id="cBirthDate"
            type="text"
            value={this.state.child.cBirthDate}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="phone">
          Child's Current School:
          <input
            id="cCurrentSchool"
            type="text"
            value={this.state.child.cCurrentSchool}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Current Grade (Or entering grade if it's the summer):
          <input
            id="cCurrentGrade"
            type="text"
            checked={this.state.child.cCurrentGrade}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Shirt Size:
          <input
            id="cShirtSize"
            type="text"
            checked={this.state.child.cShirtSize}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Gender:
          <input
            id="cGender"
            type="text"
            checked={this.state.child.cGender}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button type="submit" onClick={this.updateParent}>
          Sign Up
        </button>
      </div>
    );
  }
}

export default ChildInfo;
