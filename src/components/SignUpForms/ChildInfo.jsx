import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/Signup.css';
import Parent from '../Dashboards/Parent';
import autoBind from '../../autoBind';

class ChildInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: PropTypes.func.isRequired,
      lName: PropTypes.func.isRequired,
      birthDate: PropTypes.func.isRequired,
      currentSchool: PropTypes.func.isRequired,
      currentGrade: PropTypes.func.isRequired,
      shirtSize: PropTypes.func.isRequired,
      gender: PropTypes.func.isRequired
    };
    autoBind(this);
  }

  updateParent() {
    const user = this.props.firebase.auth().currentUser;
    // const childUser = this.props.db.collection('children').add(this.state);
    // console.log('child user: ', childUser);
    if (user) {
      this.props.db
        .collection('children')
        .add(this.state)
        .then(child => {
          this.props.db
            .collection('parents')
            .doc(user.uid)
            .update({
              children: [this.props.db.collection('children').doc(child.id)],
              address: this.props.address
            })
            .then(() => {
              return <Parent firebase={this.props.firebase} user={user} />;
            });
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
          <input id="fName" type="text" value={this.state.cFName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="address">
          Child's Last Name:
          <input id="lName" type="text" value={this.state.cLName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="email">
          Child's Birthdate:
          <input
            id="birthDate"
            type="text"
            value={this.state.cBirthDate}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="phone">
          Child's Current School:
          <input
            id="currentSchool"
            type="text"
            value={this.state.cCurrentSchool}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Current Grade (Or entering grade if it's the summer):
          <input
            id="currentGrade"
            type="text"
            checked={this.state.cCurrentGrade}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Shirt Size:
          <input
            id="shirtSize"
            type="text"
            checked={this.state.cShirtSize}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Gender:
          <input
            id="gender"
            type="text"
            checked={this.state.cGender}
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
