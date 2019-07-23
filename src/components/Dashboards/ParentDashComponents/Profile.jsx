import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import SmartPhoneIcon from '@material-ui/icons/Smartphone';
import AccountChildIcon from '@material-ui/icons/AccountBox';
import Spinner from '../../Spinner';
import autoBind from '../../../autoBind';
import '../../../assets/css/ParentDash.css';
import { string } from 'postcss-selector-parser';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingUser: true,
      currentUser: null,
      childrenArray: undefined
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
              console.log('child: ', child.data());
              newState.childrenArray.push(child.data());
              console.log('new state obj: ', newState);
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

  render() {
    return this.state.isLoadingUser === false ? (
      <>
        <div className="profile">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={this.useStyles.root}
          >
            <ListItem button>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                primary={`${this.state.currentUser.fName} ${this.state.currentUser.lName}`}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={this.state.currentUser.email} />
            </ListItem>
            <ListItem button>
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
                {console.log('state children array: ', this.state.childrenArray)}
                {this.state.childrenArray.map(child => (
                  <ListItem button className={this.useStyles.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={`${child.fName} ${child.lName}`} />
                  </ListItem>
                ))}
              </>
            ) : (
              <></>
            )}
          </List>
        </div>
      </>
    ) : (
      <Spinner color="primary" />
    );
  }
}

export default Profile;
