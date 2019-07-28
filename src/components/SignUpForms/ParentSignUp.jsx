import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UserIcon from '@material-ui/icons/PermIdentityOutlined';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
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
      <div className="signup-wrapper">
        <Card className="signup-form">
          <CardHeader title="Parent Account Information" />
          <CardContent className="column">
            <TextField
              error={this.state.addressError}
              id="address"
              type="text"
              label="Address"
              variant="outlined"
              helperText={this.state.addressError}
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
      </div>
    );
  }
}

ParentSignUp.propTypes = propTypes;

export default ParentSignUp;
