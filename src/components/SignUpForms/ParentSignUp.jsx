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

  // const propTypes = {
  //   handleChange: PropTypes.func.isRequired,
  //   toggleCanText: PropTypes.func.isRequired,
  //   state: PropTypes.shape({
  //     fName: PropTypes.string.isRequired,
  //     lName: PropTypes.string.isRequired,
  //     address: PropTypes.string.isRequired,
  //     email: PropTypes.string.isRequired,
  //     phone: PropTypes.string.isRequired,
  //     canText: PropTypes.bool.isRequired
  //   }).isRequired
  // };
  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[id] = value;
    this.setState(newState);
  }

  addChildRef(childRef) {
    const user = this.props.firebase.auth().currentUser;
    console.log('childRef: ', childRef);
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
      console.log('child data array: ', this.state.childrenData);
      console.log('new child data: ', newChildData);
    });

    // console.log('childrenRef array: ', this.state.childrenRefs);

    // this.props.db
    //   .collection()
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
          // children: this.state.childrenRefs
          address: this.state.address
        });
      
      this.setState({redirect: true});
    }
  }

  // const ParentSignUp = (props, { handleChange, state, toggleCanText }) => (
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
                /* handleChange={handleChange}
                state={this.state}
                toggleCanText={toggleCanText} */
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
  // );
}

// ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
