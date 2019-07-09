import React from 'react';
import PropTypes from 'prop-types';
import ChildInfo from './ChildInfo';
import autoBind from '../../autoBind';
import '../../assets/css/Signup.css';
import '../../assets/css/Admin.css';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

class ParentSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      addressError: '',
      childrenRefs: [],
      childrenData: [],
      show: false
    };
    autoBind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[id] = value;
    this.setState(newState);
  }

  addChildRef(childRef) {
    const user = this.props.firebase.auth().currentUser;
    const { childrenRefs } = this.state;
    childrenRefs.push(childRef);
    this.setState({ childrenRefs });
    this.props.db
      .collection('parents')
      .doc(user.uid)
      .update({
        children: this.state.childrenRefs
      });

    childRef.get().then(newChildDoc => {
      const newChildData = newChildDoc.data();
      const { childrenData } = this.state;
      childrenData.push(newChildData);
      this.setState({ childrenData });
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  updateParent() {
    const user = this.props.firebase.auth().currentUser;
    if (this.state.address !== '') {
      if (user) {
        this.props.db
          .collection('parents')
          .doc(user.uid)
          .update({
            address: this.state.address
          })
          .then(this.props.login);
      }
    } else {
      this.setState({ addressError: 'This field may not be empty' });
    }
  }

  render() {
    return (
      <div className="signup-form">
        <h1>Parent Account Information:</h1>
        <span className="errormessage">{this.state.addressError}</span>
        <label htmlFor="firstname">
          Street Address:
          <input id="address" type="text" value={this.state.address} onChange={this.handleChange} />
        </label>
        <br />
        {this.state.childrenData.map(child => (
          <div className="child" key={`${child.fName}${child.lName}`}>
            <p className="errormessage">{`${child.fName} ${child.lName}`}</p>
          </div>
        ))}
        <br />

        {this.state.show ? (
          <div className="request-info-wrapper">
            <ChildInfo
              db={this.props.db}
              firebase={this.props.firebase}
              addChildRef={this.addChildRef}
              handleClose={this.handleClose}
            />
          </div>
        ) : null}

        <button type="submit" onClick={this.handleShow}>
          Add Child
        </button>

        <br />
        <button type="submit" onClick={this.updateParent}>
          Sign Up
        </button>
      </div>
    );
  }
}

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
