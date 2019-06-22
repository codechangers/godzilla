import React from 'react';
import PropTypes from 'prop-types';

class ChildInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cFName: PropTypes.func.isRequired,
      cLName: PropTypes.func.isRequired,
      cBirthDate: PropTypes.func.isRequired,
      cCurrentSchool: PropTypes.func.isRequired,
      cCurrentGrade: PropTypes.func.isRequired,
      cShirtSize: PropTypes.func.isRequired,
      cGender: PropTypes.func.isRequired
    };
  }

  handleChange() {
    console.log('sup');
  }

  render() {
    return (
      <div>
        <label htmlFor="lastname">
          Child's First Name:
          <input id="cFName" type="text" value={this.cFName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="address">
          Child's Last Name:
          <input id="cLName" type="text" value={this.cLName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="email">
          Child's Birthdate:
          <input id="cBirthDate" type="text" value={this.cBirthDate} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="phone">
          Child's Current School:
          <input
            id="cCurrentSchool"
            type="text"
            value={this.cCurrentSchool}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Current Grade (Or going into if in the summer):
          <input
            id="cCurrentGrade"
            type="text"
            checked={this.cCurrentGrade}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Shirt Size:
          <input
            id="cShirtSize"
            type="text"
            checked={this.cShirtSize}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Gender:
          <input id="cGender" type="text" checked={this.cGender} onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}

export default ChildInfo;
