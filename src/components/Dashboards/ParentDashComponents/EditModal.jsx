import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

  updateAttribute(id, collection, attr) {
    // quick validations

    const data = {};
    let formValid = false;
    let errorMessage = '';
    const loadingEmails = true;
    if (attr !== 'name') {
      if (this.state.textFieldValue === '') {
        errorMessage = 'This field may not be left blank';
      } else if (attr === 'email') {
        this.db
          .collection('organizations')
          .where('email', '==', this.state.textFieldValue)
          .get()
          .then(querySnapshot => {
            console.log('in here', querySnapshot.docs.length);
            if (querySnapshot.docs.length === 0) {
              data[attr] = this.state.textFieldValue;
              formValid = true;
            } else {
              errorMessage = 'This email is already in use, please enter another email address';
            }
          });
        // const teacherEmail = this.db
        //   .collection('teachers')
        //   .where('email', '==', this.state.textFieldValue)
        //   .get();
        // const parentEmail = this.db
        //   .collection('parents')
        //   .where('email', '==', this.state.textFieldValue)
        //   .get();

        // console.log('orgEmail: ', orgEmail);
        // console.log('teacherEmail: ', teacherEmail);
        // console.log('parentEmail: ', parentEmail);

        // if (orgEmail !== undefined || teacherEmail !== undefined || parentEmail !== undefined) {
        //   errorMessage = 'This email is already in use, please enter a different email address';
        // } else {
        //   data[attr] = this.state.textFieldValue;
        //   formValid = true;
        // }
      } else {
        data[attr] = this.state.textFieldValue;
        formValid = true;
      }
    } else if (this.state.firstName === '' || this.state.lastName === '') {
      errorMessage = 'Neither field may be left blank';
    } else {
      data.fName = this.state.firstName;
      data.lName = this.state.lastName;
      formValid = true;
    }
    // this gets called before emails are checked, need to work with those promises to wait to execute this.
    if (formValid === true) {
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
    } else {
      this.setState({ errorMessage });
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
          <span className="error-message">{this.state.errorMessage}</span>
          <div className="parent-buttons">
            <Button variant="contained" color="secondary" onClick={this.props.cancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.updateAttribute(
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
