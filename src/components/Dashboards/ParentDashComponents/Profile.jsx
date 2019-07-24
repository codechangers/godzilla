import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import SmartPhoneIcon from '@material-ui/icons/Smartphone';
import AccountChildIcon from '@material-ui/icons/AccountBox';
import Spinner from '../../Spinner';
import autoBind from '../../../autoBind';
import '../../../assets/css/ParentDash.css';
import EditModal from './EditModal';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingUser: true,
      currentUser: null,
      childrenArray: undefined,
      showEditAttribute: false,
      editableData: null
    };
    this.user = this.props.user;
    this.firebase = this.props.firebase;
    this.db = this.firebase
      .firestore()
      .collection('env')
      .doc('DEVELOPMENT');
    autoBind(this);
  }

  useStyles() {
    makeStyles(theme => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
      },
      nested: {
        paddingLeft: theme.spacing(4)
      }
    }));
  }

  componentDidMount() {
    const newState = {
      childrenArray: []
    };
    this.db
      .collection('parents')
      .doc(this.user.uid)
      .get()
      .then(doc => {
        newState.currentUser = doc.data();
        if (doc.data().children !== undefined) {
          doc.data().children.map(childRef => {
            childRef.get().then(child => {
              var newChild = {};
              console.log('child id: ', child.id);
              newChild.id = child.id;
              console.log('child data: ', child.data());
              newChild.data = child.data();
              console.log('new child obj: ', newChild);
              newState.childrenArray.push({...newChild});
              newState.isLoadingUser = false;
              this.setState({ ...newState });
            });
          });
        } else {
          newState.isLoadingUser = false;
          this.setState({ ...newState });
        }
      });
  }

  editAttribute(data) {
    var newState = {};
    newState.showEditAttribute = !this.state.showEditAttribute;
    newState.editableData = data;
    this.setState({ ...newState });
  }

  render() {
    return this.state.isLoadingUser === false ? (
      <>
        <div className="profile">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={this.useStyles.root}
          >
            <ListItem button onClick={() => this.editAttribute({value: this.state.currentUser.fName + ' ' + this.state.currentUser.lName, attribute: 'name', id: this.user.uid})}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                primary={`${this.state.currentUser.fName} ${this.state.currentUser.lName}`}
              />
            </ListItem>
            <ListItem button onClick={() => this.editAttribute({value: this.state.currentUser.email, attribute: 'email', id: this.user.uid})}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={this.state.currentUser.email} />
            </ListItem>
            <ListItem button onClick={() => this.editAttribute({value: this.state.currentUser.phone, attribute: 'phone', id: this.user.uid})}>
              <ListItemIcon>
                <SmartPhoneIcon />
              </ListItemIcon>
              <ListItemText primary={this.state.currentUser.phone} />
            </ListItem>
            {this.state.childrenArray.length > 0 ? (
              <>
                <ListItem>
                  <ListItemIcon>
                    <AccountChildIcon />
                  </ListItemIcon>
                  <ListItemText primary="Children" />
                </ListItem>
                {this.state.childrenArray.map(child => (
                  <ListItem button className="child-list-item" onClick={() => this.editAttribute({value: child.data.fName + ' ' + child.data.lName, attribute: 'childName', id: child.id})}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={`${child.data.fName} ${child.data.lName}`} />
                  </ListItem>
                ))}
              </>
            ) : (
              <></>
            )}
          </List>
        </div>
        {this.state.showEditAttribute === true ? <EditModal data={this.state.editableData}/> : <></>}
      </>
    ) : (
      <Spinner color="primary" />
    );
  }
}

export default Profile;
