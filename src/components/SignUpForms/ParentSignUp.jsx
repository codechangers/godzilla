import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography
} from '@material-ui/core';
import UserIcon from '@material-ui/icons/PermIdentityOutlined';
import AddIcon from '@material-ui/icons/Add';
import ChildInfo from './ChildInfo';
import autoBind from '../../autoBind';
import { getErrorStatus } from '../../helpers';
import '../../assets/css/Signup.css';
import '../../assets/css/Admin.css';

import * as Styled from '../Pages/PageStyles/StyledSignUp';

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
      errors: {},
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
      this.setState({ errors: { address: 'This field may not be empty' } });
    }
  }

  render() {
    return (
      <Styled.SignupFormWrapper>
        <Card>
          <CardHeader title="Parent Account Information" />
          <CardContent>
            <TextField
              error={getErrorStatus(this.state.errors.address)}
              id="address"
              type="text"
              label="Address"
              variant="outlined"
              helperText={this.state.errors.address}
              value={this.state.address}
              onChange={this.handleChange}
            />

            <Typography variant="h5">Registered Children</Typography>
            <List>
              {this.state.childrenData.map(child => (
                <div className="child" key={`${child.fName}${child.lName}`}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <UserIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${child.fName} ${child.lName}`} />
                  </ListItem>
                </div>
              ))}
            </List>

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

            <Button onClick={this.handleShow} variant="contained" color="default" id="add-child">
              <AddIcon />
              Add Child
            </Button>

            <Button onClick={this.updateParent} variant="contained" color="primary">
              Sign Up
            </Button>
          </CardContent>
        </Card>
      </Styled.SignupFormWrapper>
    );
  }
}

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
