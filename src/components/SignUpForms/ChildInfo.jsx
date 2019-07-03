import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';
import '../../assets/css/Signup.css';
import '../../assets/css/Admin.css';

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
      gender: ''
    };
    autoBind(this);
  }

  createChild() {
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

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[id] = value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="request-info">
        <label htmlFor="lastname">
          Child&apos;s First Name:
          <input id="fName" type="text" value={this.state.fName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="address">
          Child&apos;s Last Name:
          <input id="lName" type="text" value={this.state.lName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="email">
          Child&apos;s Birthdate:
          <input
            id="birthDate"
            type="text"
            value={this.state.birthDate}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="phone">
          Child&apos;s Current School:
          <input
            id="currentSchool"
            type="text"
            value={this.state.currentSchool}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child&apos;s Current Grade (Or entering grade if it&apos;s the summer):
          <input
            id="currentGrade"
            type="text"
            checked={this.state.currentGrade}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child&apos;s Shirt Size:
          <input
            id="shirtSize"
            type="text"
            checked={this.state.shirtSize}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child&apos;s Gender:
          <input id="gender" type="text" checked={this.state.gender} onChange={this.handleChange} />
        </label>
        <br />
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
