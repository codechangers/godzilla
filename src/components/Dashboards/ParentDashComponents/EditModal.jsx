import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from '../../Spinner';
import autoBind from '../../../autoBind';
import '../../../assets/css/Parent-Dash.css';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textFieldValue: '',
      firstName: '',
      lastName: '',
      errorMessage: '',
      formValid: false,
      emailValidation: ''
    };
    this.db = this.props.db;
    autoBind(this);
  }

  handleChange(e) {
    const newUpdate = {};
    newUpdate[e.target.name] = e.target.value;
    this.setState({ ...newUpdate });
  }

  validateAttribute(id, collection, attr) {
    const data = {};
    let errorMessage = '';
    if (attr !== 'name') {
      if (this.state.textFieldValue === '') {
        errorMessage = 'This field may not be left blank';

        // else if (attr === 'email') {
        //   // first check for matching emails in organizations
        //   this.setState({ errorMessage: 'loading' });
        //   this.db
        //     .collection('parents')
        //     .where('email', '==', this.state.textFieldValue)
        //     .get()
        //     .then(querySnapshot => {
        //       console.log('in here', querySnapshot.docs.length);
        //       if (querySnapshot.docs.length === 0) {
        //         // if none, check for matching emails in teachers
        //         this.db
        //           .collection('teachers')
        //           .where('email', '==', this.state.textFieldValue)
        //           .get()
        //           .then(querySnapshot => {
        //             if (querySnapshot.docs.length === 0) {
        //               // if none in teachers, check in parents
        //               this.db
        //                 .collection('organizations')
        //                 .where('email', '==', this.state.textFieldValue)
        //                 .get()
        //                 .then(querySnapshot => {
        //                   if (querySnapshot.docs.length === 0) {
        //                     // if no matching emails then update email.
        //                     data[attr] = this.state.textFieldValue;
        //                     this.setState({ formValid: true, errorMessage: '' });
        //                     this.updateAttribute(id, collection, data);
        //                   } else {
        //                     errorMessage =
        //                       'This email is already in use, please enter another email address';
        //                     this.setState({ errorMessage });
        //                   }
        //                 });
        //             } else {
        //               errorMessage =
        //                 'This email is already in use, please enter another email address';
        //               this.setState({ errorMessage });
        //             }
        //           });
        //       } else {
        //         errorMessage = 'This email is already in use, please enter another email address';
        //         this.setState({ errorMessage });
        //       }
        //     });
      } else {
        data[attr] = this.state.textFieldValue;
        this.state.formValid = true;
        this.updateAttribute(id, collection, data);
      }
    } else if (this.state.firstName === '' || this.state.lastName === '') {
      errorMessage = 'Neither field may be left blank';
      this.setState({ errorMessage });
    } else {
      data.fName = this.state.firstName;
      data.lName = this.state.lastName;
      this.state.formValid = true;
      this.updateAttribute(id, collection, data);
    }
  }

  updateAttribute(id, collection, data) {
    if (this.state.formValid === true) {
      this.db
        .collection(collection)
        .doc(id)
        .update(data)
        .then(() => {
          this.props.cancel();
        })
        .catch(err => {
          this.setState({ errorMessage: err });
        });
    }
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal-box">
          <div className="modal-text">
            {this.props.data.heading.includes('Name') === true ? (
              <div>
                <p>{this.props.data.heading}</p>
                <TextField
                  id="outlined-name"
                  label="First Name"
                  name="firstName"
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-name"
                  label="Last Name"
                  name="lastName"
                  onChange={this.handleChange}
                />
              </div>
            ) : (
              <TextField
                id="outlined-name"
                label={this.props.data.heading}
                name="textFieldValue"
                onChange={this.handleChange}
              />
            )}
          </div>
          {this.state.errorMessage === 'loading' ? (
            <Spinner color="primary" />
          ) : (
            <span className="error-message">{this.state.errorMessage}</span>
          )}
          <div className="parent-buttons">
            <Button variant="contained" color="secondary" onClick={this.props.cancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.validateAttribute(
                  this.props.data.id,
                  this.props.data.collection,
                  this.props.data.attribute
                )
              }
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditModal;
