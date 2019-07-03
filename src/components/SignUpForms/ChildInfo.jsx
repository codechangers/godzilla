import React from 'react';
import '../../assets/css/Signup.css';
import '../../assets/css/Admin.css';
// import Parent from '../Dashboards/Parent';
import autoBind from '../../autoBind';

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
    // const childUser = this.props.db.collection('children').add(this.state);
    // console.log('child user: ', childUser);
    if (user) {
      this.props.db
        .collection('children')
        .add(this.state)
        .then(child => {
          // this.props.db
          //   .collection('parents')
          //   .doc(user.uid)
          //   .update({
          //     children: [this.props.db.collection('children').doc(child.id)]
          //     // address: this.props.address
          //   });
          this.props.addChildRef(this.props.db.collection('children').doc(child.id));
          console.log('this: ', this.props.db.collection('children').doc(child.id));
          console.log('child id: ', child.id);
        });
      this.props.handleClose();
      // return <Parent firebase={this.props.firebase} user={user} />;
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
          Child's First Name:
          <input id="fName" type="text" value={this.state.fName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="address">
          Child's Last Name:
          <input id="lName" type="text" value={this.state.lName} onChange={this.handleChange} />
        </label>
        <br />
        <label htmlFor="email">
          Child's Birthdate:
          <input
            id="birthDate"
            type="text"
            value={this.state.birthDate}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="phone">
          Child's Current School:
          <input
            id="currentSchool"
            type="text"
            value={this.state.currentSchool}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Current Grade (Or entering grade if it's the summer):
          <input
            id="currentGrade"
            type="text"
            checked={this.state.currentGrade}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Shirt Size:
          <input
            id="shirtSize"
            type="text"
            checked={this.state.shirtSize}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="canText">
          Child's Gender:
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

export default ChildInfo;
