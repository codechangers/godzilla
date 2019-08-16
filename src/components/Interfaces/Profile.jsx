import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper
} from '@material-ui/core';
import {
  StarBorder,
  AccountCircle,
  Home,
  Smartphone,
  School,
  Wc,
  FormatSize,
  Cake,
  Person,
  ExpandLess,
  ExpandMore
} from '@material-ui/icons';
import EditModal from '../UI/EditModal';
import Spinner from '../UI/Spinner';
import { getDate } from '../../helpers';
import autoBind from '../../autoBind';
import '../../assets/css/Parent-Dash.css';

const propTypes = {
  user: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

let parentListener = () => null;
let childListeners = [];

const useStyles = () => {
  makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    paper: {
      padding: theme.spacing(3, 2)
    }
  }));
};

const getSubHeader = header => (
  <ListSubheader component="div" id="nested-list-subheader">
    {header}
  </ListSubheader>
);

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingUser: true,
      currentUser: null,
      childrenArray: undefined,
      showChildData: [],
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

  componentDidMount() {
    parentListener = this.db
      .collection('parents')
      .doc(this.user.uid)
      .onSnapshot(doc => {
        const newState = {
          childrenArray: [],
          showChildData: []
        };
        newState.currentUser = doc.data();
        if (doc.data().children !== undefined) {
          doc.data().children.forEach(childRef => {
            const listener = childRef.onSnapshot(child => {
              const childExists = newState.childrenArray.findIndex(existingChild => {
                return existingChild.id === child.id;
              });
              if (childExists === -1) {
                const newChild = {};
                newChild.id = child.id;
                newChild.data = child.data();
                const showData = {};
                showData.id = child.id;
                showData.open = false;
                newState.childrenArray.push({ ...newChild });
                newState.showChildData.push({ ...showData });
              } else {
                newState.childrenArray[childExists].data = child.data();
              }
              newState.isLoadingUser = false;
              this.setState({ ...newState });
            });
            childListeners.push(listener);
          });
        } else {
          newState.isLoadingUser = false;
          this.setState({ ...newState });
        }
      });
  }

  componentWillUnmount() {
    parentListener();
    parentListener = () => null;
    childListeners.forEach(listener => listener());
    childListeners = [];
  }

  getChildArrayObj(id) {
    const index = this.state.showChildData.map(x => x.id).indexOf(id);
    const status = this.state.showChildData[index].open;
    return status;
  }

  showChildList(id) {
    const { showChildData } = this.state;
    const index = showChildData.map(x => x.id).indexOf(id);
    const status = showChildData[index].open;
    showChildData[index].open = !status;
    this.setState({ showChildData });
  }

  showModal(data) {
    const newState = {};
    newState.showEditAttribute = !this.state.showEditAttribute;
    if (data !== null) {
      newState.editableData = data;
    }
    this.setState({ ...newState });
  }

  render() {
    return this.state.isLoadingUser === false ? (
      <div className="page-content horiz-center" style={{ paddingBottom: '20px' }}>
        <h2>Edit your Profile</h2>
        <Paper className="paper-list-item">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={getSubHeader(
              this.props.accounts.teachers ? 'Teacher Account' : 'Parent Account'
            )}
            className={useStyles.root}
          >
            <ListItem
              button
              onClick={() =>
                this.showModal({
                  firebase: this.firebase,
                  heading: 'First Name',
                  attribute: 'fName',
                  id: this.user.uid,
                  collection: 'parents'
                })
              }
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={this.state.currentUser.fName} />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                this.showModal({
                  firebase: this.firebase,
                  heading: 'Last Name',
                  attribute: 'lName',
                  id: this.user.uid,
                  collection: 'parents'
                })
              }
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={this.state.currentUser.lName} />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                this.showModal({
                  firebase: this.firebase,
                  heading: 'Phone',
                  attribute: 'phone',
                  id: this.user.uid,
                  collection: 'parents'
                })
              }
            >
              <ListItemIcon>
                <Smartphone />
              </ListItemIcon>
              <ListItemText primary={this.state.currentUser.phone} />
            </ListItem>
            {this.props.accounts.teachers ? null : (
              <ListItem
                button
                onClick={() =>
                  this.showModal({
                    firebase: this.firebase,
                    heading: 'Address',
                    attribute: 'address',
                    id: this.user.uid,
                    collection: 'parents'
                  })
                }
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={this.state.currentUser.address} />
              </ListItem>
            )}
          </List>
        </Paper>
        {this.state.childrenArray.length > 0 ? (
          <>
            {this.state.childrenArray.map(child => (
              <Paper className="paper-list-item" key={child.id}>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={getSubHeader("Child's Information")}
                  className={useStyles.root}
                >
                  <ListItem
                    button
                    className="child-list-item"
                    onClick={() => this.showChildList(child.id)}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={`${child.data.fName} ${child.data.lName}`} />
                    {this.getChildArrayObj(child.id) ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    in={this.state.showChildData.find(obj => obj.id === child.id).open}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        className="sub-child-list-item"
                        onClick={() =>
                          this.showModal({
                            firebase: this.firebase,
                            heading: "Child's First Name",
                            attribute: 'fName',
                            id: child.id,
                            collection: 'children'
                          })
                        }
                      >
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText primary={child.data.fName} />
                      </ListItem>
                      <ListItem
                        button
                        className="sub-child-list-item"
                        onClick={() =>
                          this.showModal({
                            firebase: this.firebase,
                            heading: "Child's Last Name",
                            attribute: 'lName',
                            id: child.id,
                            collection: 'children'
                          })
                        }
                      >
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText primary={child.data.lName} />
                      </ListItem>
                      <ListItem
                        button
                        className="sub-child-list-item"
                        onClick={() =>
                          this.showModal({
                            firebase: this.firebase,
                            heading: "Child's Birth Date",
                            attribute: 'birthDate',
                            date: child.data.birthDate,
                            id: child.id,
                            collection: 'children'
                          })
                        }
                      >
                        <ListItemIcon>
                          <Cake />
                        </ListItemIcon>
                        <ListItemText primary={getDate(child.data.birthDate)} />
                      </ListItem>
                      <ListItem
                        button
                        className="sub-child-list-item"
                        onClick={() =>
                          this.showModal({
                            firebase: this.firebase,
                            heading: "Child's Current School",
                            attribute: 'currentSchool',
                            id: child.id,
                            collection: 'children'
                          })
                        }
                      >
                        <ListItemIcon>
                          <School />
                        </ListItemIcon>
                        <ListItemText primary={child.data.currentSchool} />
                      </ListItem>
                      <ListItem
                        button
                        className="sub-child-list-item"
                        onClick={() =>
                          this.showModal({
                            firebase: this.firebase,
                            heading: "Child's Current Grade",
                            attribute: 'currentGrade',
                            id: child.id,
                            collection: 'children'
                          })
                        }
                      >
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={child.data.currentGrade} />
                      </ListItem>
                      <ListItem
                        button
                        className="sub-child-list-item"
                        onClick={() =>
                          this.showModal({
                            firebase: this.firebase,
                            heading: "Child's Shirt Size",
                            attribute: 'shirtSize',
                            id: child.id,
                            collection: 'children'
                          })
                        }
                      >
                        <ListItemIcon>
                          <FormatSize />
                        </ListItemIcon>
                        <ListItemText primary={child.data.shirtSize} />
                      </ListItem>
                      <ListItem
                        button
                        className="sub-child-list-item"
                        onClick={() =>
                          this.showModal({
                            firebase: this.firebase,
                            heading: "Child's Gender",
                            attribute: 'gender',
                            id: child.id,
                            collection: 'children'
                          })
                        }
                      >
                        <ListItemIcon>
                          <Wc />
                        </ListItemIcon>
                        <ListItemText primary={child.data.gender} />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              </Paper>
            ))}
          </>
        ) : (
          <></>
        )}
        {this.state.showEditAttribute === true ? (
          <EditModal data={this.state.editableData} cancel={this.showModal} db={this.db} />
        ) : (
          <></>
        )}
      </div>
    ) : (
      <div className="page-content horiz-center">
        <h2>Edit your Profile</h2>
        <Spinner color="primary" />
      </div>
    );
  }
}

Profile.propTypes = propTypes;

export default Profile;
