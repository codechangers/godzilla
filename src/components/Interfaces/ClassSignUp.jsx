import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Modal,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox
} from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { CardElement, injectStripe } from 'react-stripe-elements';
import ClassPanel from '../Classes/Panel';
import { InfoCardHeader } from '../Classes/InfoCard';
import Spinner from '../UI/Spinner';
import { API_URL } from '../../globals';
import autoBind from '../../autoBind';
import '../../assets/css/Parent-Dash.css';

class ClassSignUpInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classOptions: [],
      selectedClass: null,
      children: [],
      selectedChildren: [],
      spotlight: null,
      isLoading: true
    };
    autoBind(this);
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    if (pathname.length > '/parent/signup/'.length) {
      this.props.db
        .collection('classes')
        .doc(pathname.replace('/parent/signup/', ''))
        .get()
        .then(classDoc => {
          const classData = { ...classDoc.data(), id: classDoc.id, ref: classDoc.ref };
          this.setState({ spotlight: classData, isLoading: false });
        });
    }
    this.props.db
      .collection('classes')
      .get()
      .then(classDocs => {
        const newClasses = [];
        classDocs.forEach(classDoc => {
          const classData = {
            ...classDoc.data(),
            id: classDoc.id,
            ref: classDoc.ref
          };
          newClasses.push(classData);
        });
        this.setState({ classOptions: newClasses, isLoading: false });
      });
    const childrenData = [];
    this.props.db
      .collection('parents')
      .doc(this.props.user.uid)
      .get()
      .then(parentDoc => {
        const children = parentDoc.data().children || [];
        children.forEach(child => {
          child.get().then(childDoc => {
            const childData = { ...childDoc.data(), id: childDoc.id, ref: childDoc.ref };
            childrenData.push(childData);
            if (childrenData.length === children.length) {
              this.setState({ children: childrenData });
            }
          });
        });
      });
  }

  getClasses() {
    if (this.state.spotlight !== null) {
      return (
        <div className="class-container page-content">
          <h1>{`Signup for ${this.state.spotlight.name}`}</h1>
          <Paper className="infocard-wrapper">
            <InfoCardHeader cls={this.state.spotlight} />
            <Button
              style={{ width: '20%', marginRight: '30px' }}
              onClick={() => this.setState({ spotlight: null, selectedClass: null })}
            >
              More options
            </Button>
            {this.getButton(this.state.spotlight, { width: '20%' })}
          </Paper>
        </div>
      );
    }
    return (
      <div className="classes-container page-content">
        <h2>Choose a Class</h2>
        {this.state.isLoading ? (
          <Spinner color="primary" />
        ) : (
          this.state.classOptions.map(cls => (
            <ClassPanel key={cls.id} cls={cls} getButton={this.getButton} />
          ))
        )}
      </div>
    );
  }

  getButton(cls, style) {
    return (
      <Button
        onClick={() => {
          this.setState({ selectedClass: cls });
        }}
        style={style || {}}
        variant="contained"
        color="primary"
      >
        Sign Up
      </Button>
    );
  }

  getTotal() {
    const { selectedChildren, selectedClass } = this.state;
    if (selectedClass !== null)
      return selectedClass.price * selectedChildren.filter(c => !this.checkDisabled(c)).length;
    return 0;
  }

  checkToggle(child) {
    return this.state.selectedChildren.includes(child) || this.checkDisabled(child);
  }

  toggleChild(childId) {
    const { selectedChildren } = this.state;
    const index = selectedChildren.indexOf(childId);
    if (index === -1) {
      selectedChildren.push(childId);
    } else {
      selectedChildren.splice(index, 1);
    }
    this.setState({ selectedChildren });
  }

  async handleSubmit() {
    const { selectedClass, selectedChildren } = this.state;
    const { token } = await this.props.stripe.createToken({ name: 'Name' });
    console.log(token);
    if (token) {
      // eslint-disable-next-line
      fetch(`${API_URL}/charge`, {
        method: 'POST',
        body: JSON.stringify({
          token: token.id,
          classID: selectedClass.id,
          teacherID: selectedClass.teacher.id,
          parentID: this.props.user.uid,
          numberOfChildren: selectedChildren.filter(c => !this.checkDisabled(c)).length
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            const children = selectedClass.children || [];
            selectedChildren.forEach(child => {
              const classes = child.classes || [];
              classes.push(selectedClass.ref);
              child.ref.update({ classes });
              children.push(child.ref);
            });
            selectedClass.ref.update({ children });
            this.setState({ selectedClass: null, selectedChildren: [] });
          } else {
            console.log(res);
          }
        })
        .catch(err => console.log(err));
    }
  }

  checkDisabled(child) {
    if (this.state.selectedClass !== null) {
      const children = this.state.selectedClass.children || [];
      return children.some(c => c.id === child.id);
    }
    return false;
  }

  render() {
    return (
      <div>
        {this.getClasses()}
        <Modal
          className="modal-wrapper"
          open={this.state.selectedClass !== null}
          onClose={() => {
            this.setState({ selectedClass: null });
          }}
          disableAutoFocus
        >
          <Paper className="modal-content">
            <h2>Select Children to Register</h2>
            <List>
              {this.state.children.map(child => {
                return (
                  <ListItem
                    key={child.id}
                    button
                    onClick={() => this.toggleChild(child)}
                    disabled={this.checkDisabled(child)}
                  >
                    <ListItemAvatar>
                      <AccountIcon />
                    </ListItemAvatar>
                    <ListItemText primary={`${child.fName} ${child.lName}`} />
                    <Checkbox edge="end" checked={this.checkToggle(child)} />
                  </ListItem>
                );
              })}
            </List>
            <p style={{ paddingLeft: '32px', margin: '10px 0 20px 0' }}>
              <strong style={{ marginRight: '15px' }}>Total:</strong>
              {`$${this.getTotal()}`}
            </p>
            {this.getTotal() > 0 ? (
              <div className="card-wrapper">
                <CardElement />
              </div>
            ) : null}
            <div className="modal-buttons">
              <Button onClick={this.handleSubmit} variant="contained" color="primary">
                Submit
              </Button>
              <Button
                onClick={() => {
                  this.setState({ selectedClass: null });
                }}
                variant="contained"
                color="default"
              >
                Cancel
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    );
  }
}

ClassSignUpInterface.propTypes = {
  db: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  stripe: PropTypes.object.isRequired
};

export default withRouter(injectStripe(ClassSignUpInterface));
