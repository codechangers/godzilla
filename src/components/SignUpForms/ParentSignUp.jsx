import '../../assets/css/Signup.css';
import '../../assets/css/Admin.css';
import React from 'react';
import ChildInfo from './ChildInfo';
import { Redirect } from 'react-router-dom'
import autoBind from '../../autoBind';

class ParentSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      childrenRefs: [],
      childrenData: [],
      show: false,
      redirect: false
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
    this.setState({ childrenRefs: [...this.state.childrenRefs, childRef] });
    this.props.db
      .collection('parents')
      .doc(user.uid)
      .update({
        children: this.state.childrenRefs
      });

    childRef.get().then(newChildDoc => {
      const newChildData = newChildDoc.data();
      this.setState({ childrenData: [...this.state.childrenData, newChildData] });
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
    if (user) {
      this.props.db
        .collection('parents')
        .doc(user.uid)
        .update({
          address: this.state.address
        });
      
      this.setState({redirect: true});
    }
  }

  render() {
    return this.state.redirect === true ? (
      <Redirect to='/parent' user={this.props.firebase.auth().currentUser} firebase={this.props.firebase} />
    ) : (
      <div className="signup-form">
        <h1>Parent Account Information:</h1>
        <label htmlFor="firstname">
          Street Address:
          <input id="address" type="text" value={this.state.address} onChange={this.handleChange} />
        </label>
        <br />
        {this.state.childrenData.map(child => (
          <div className="child" key={child.id}>
            <p>{child.fName} {child.lName}</p>
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


export default ParentSignUp;
