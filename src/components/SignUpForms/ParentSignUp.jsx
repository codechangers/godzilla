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
import autoBind from '../../autoBind';

import * as Styled from './styles';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
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
    const user = this.props.firebase.auth().currentUser;
    let { childrenRefs, childrenData } = this.state;
    childrenRefs = childrenRefs.filter(c => c.id !== childDoc.ref.id);
    childrenData = childrenData.filter(c => c.ref.id !== childDoc.ref.id);
    this.setState({ childrenRefs, childrenData });
    childDoc.ref.delete().then(() => {
      this.props.db
        .collection('parents')
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
      const newChildData = { ...newChildDoc.data(), ref: newChildDoc.ref };
      const { childrenData } = this.state;
      childrenData.push(newChildData);
      this.setState({ childrenData });
    });
  }

  render() {
    return this.state.showChildEditor ? (
      <ChildInfo
        db={this.props.db}
        firebase={this.props.firebase}
        addChildRef={this.addChildRef}
        handleClose={() => this.setState({ showChildEditor: false, currentStudent: null })}
        prevData={this.state.currentStudent}
        updateChildData={this.updateChildData}
      />
    ) : (
      <Card>
        <CardHeader
          title="Parent Application"
          style={{
            marginLeft: 5,
            textTransform: 'capitalize',
            marginBottom: 18,
            textAlign: 'center'
          }}
        />
        <CardContent>
          <Styled.Subtitle>Registered Children</Styled.Subtitle>
          <List>
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
