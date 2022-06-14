import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar
} from '@material-ui/core';
import UserIcon from '@material-ui/icons/PermIdentityOutlined';
import AddIcon from '@material-ui/icons/Add';
import ChildInfo from './ChildInfo';
import autoBind from '../../utils/autoBind';
import { db, auth } from '../../utils/firebase';
import { rgba } from '../../utils/helpers';

import * as Styled from './styles';

const propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired
};

class ParentSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childrenRefs: [],
      childrenData: [],
      currentStudent: null,
      showChildEditor: false
    };
    autoBind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    const newState = {};
    newState[id] = value;
    this.setState(newState);
  }

  editChild(childDoc) {
    this.setState({ currentStudent: childDoc, showChildEditor: true });
  }

  removeChild(childDoc) {
    const user = auth.currentUser;
    let { childrenRefs, childrenData } = this.state;
    childrenRefs = childrenRefs.filter(c => c.id !== childDoc.ref.id);
    childrenData = childrenData.filter(c => c.ref.id !== childDoc.ref.id);
    this.setState({ childrenRefs, childrenData });
    childDoc.ref.delete().then(() => {
      db.collection('parents')
        .doc(user.uid)
        .update({ children: childrenRefs });
    });
  }

  updateChildData(childDoc) {
    let { childrenData } = this.state;
    childrenData = childrenData.map(c => (c.ref.id === childDoc.ref.id ? childDoc : c));
    this.setState({ childrenData });
  }

  addChildRef(childRef) {
    const user = auth.currentUser;
    const { childrenRefs } = this.state;
    childrenRefs.push(childRef);
    this.setState({ childrenRefs });
    db.collection('parents')
      .doc(user.uid)
      .update({
        children: this.state.childrenRefs
      });

    childRef.get().then(newChildDoc => {
      const newChildData = { ...newChildDoc.data(), ref: newChildDoc.ref };
      const { childrenData } = this.state;
      childrenData.push(newChildData);
      this.setState({ childrenData });
    });
  }

  render() {
    return this.state.showChildEditor ? (
      <ChildInfo
        addChildRef={this.addChildRef}
        handleClose={() => this.setState({ showChildEditor: false, currentStudent: null })}
        prevData={this.state.currentStudent}
        updateChildData={this.updateChildData}
      />
    ) : (
      <Card>
        <CardHeader
          title="Family Account Signup"
          style={{
            marginLeft: 5,
            textTransform: 'capitalize',
            marginBottom: 18,
            textAlign: 'center'
          }}
        />
        <CardContent>
          <Styled.Subtitle>Registered Children</Styled.Subtitle>
          <List
            style={{
              border:
                this.state.childrenData.length > 0
                  ? `0.5px solid ${rgba(255, 255, 255, 0.2)}`
                  : 'none',
              padding: 0,
              marginTop: 8,
              marginBottom: 8
            }}
          >
            {this.state.childrenData.map(child => (
              <Styled.ListItem key={`${child.fName}${child.lName}`}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <UserIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${child.fName} ${child.lName}`} />
                  <ListItemSecondaryAction>
                    <Styled.ActionInner>
                      <Button style={{ marginRight: 8 }} onClick={() => this.editChild(child)}>
                        Edit
                      </Button>
                      <Styled.LinkButton error onClick={() => this.removeChild(child)}>
                        Delete
                      </Styled.LinkButton>
                    </Styled.ActionInner>
                  </ListItemSecondaryAction>
                </ListItem>
              </Styled.ListItem>
            ))}
          </List>

          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {this.state.childrenData.length <= 0 && (
              <h4 style={{}}>No children registered yet...</h4>
            )}
            <Button
              onClick={() => this.setState({ showChildEditor: true })}
              variant="contained"
              color="default"
              id="add-child"
              style={{ marginBottom: 30, alignSelf: 'center' }}
            >
              <AddIcon />
              Add Child
            </Button>
          </div>

          <Styled.NavigationButtons>
            <Button onClick={this.props.prev} variant="contained">
              Back
            </Button>
            <Button onClick={this.props.next} variant="contained" color="primary">
              Next
            </Button>
          </Styled.NavigationButtons>
        </CardContent>
      </Card>
    );
  }
}

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
