import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  InputBase
} from '@material-ui/core';
import { AccountCircle, Smartphone, Home, LocationOn } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import autoBind from '../../autoBind';

const propTypes = {
  accounts: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const accountToNames = {
  parents: ['fName', 'lName', 'phone', 'address'],
  teachers: ['fName', 'lName', 'phone', 'location', 'address']
};

const nameToIcon = {
  fName: AccountCircle,
  lName: AccountCircle,
  phone: Smartphone,
  address: Home,
  location: LocationOn
};

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

const getSubHeader = text => (
  <ListSubheader component="div" id="nested-list-subheader">
    {text}
  </ListSubheader>
);

class ProfileInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountData: {}
    };
    autoBind(this);
  }

  componentDidMount() {
    this.fetchAccountData();
  }

  getEditField(field) {
    return this.state.accountData[field] ? (
      <InputBase
        value={this.state.accountData[field]}
        onChange={e => {
          const { accountData } = this.state;
          accountData[field] = e.target.value;
          this.setState({ accountData });
        }}
      />
    ) : null;
  }

  getFields() {
    const fields = this.props.accounts.teachers ? accountToNames.teachers : accountToNames.parents;
    return fields.map(field => {
      const Icon = nameToIcon[field];
      return (
        <ListItem key={field}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={this.getEditField(field)} />
        </ListItem>
      );
    });
  }

  fetchAccountData() {
    this.props.db
      .collection('parents')
      .doc(this.props.user.uid)
      .get()
      .then(doc => {
        let accountData = { ...doc.data(), id: doc.id, ref: doc.ref };
        if (this.props.accounts.teachers) {
          this.props.db
            .collection('teachers')
            .doc(this.props.user.uid)
            .get()
            .then(tDoc => {
              accountData = {
                ...accountData,
                teacherRef: tDoc.ref,
                address: tDoc.data().address,
                location: tDoc.data().location
              };
              this.setState({ accountData });
            });
        } else {
          this.setState({ accountData });
        }
      });
  }

  updateAccountData() {
    const { fName, lName, phone, address, location } = this.state.accountData;
    const isTeacher = this.props.accounts.teachers;
    const parentData = isTeacher ? { fName, lName, phone } : { fName, lName, phone, address };
    const teacherData = { address, location };
    this.props.db
      .collection('parents')
      .doc(this.props.user.uid)
      .update(parentData);
    if (isTeacher) {
      this.props.db
        .collection('teachers')
        .doc(this.props.user.uid)
        .update(teacherData);
    }
  }

  render() {
    return (
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
            {this.getFields()}
            <ListItem>
              <ListItemText primary="" />
              <ListItemSecondaryAction style={{ paddingBottom: '10px' }}>
                <Button onClick={this.fetchAccountData} style={{ marginRight: '20px' }}>
                  Revert Changes
                </Button>
                <Button onClick={this.updateAccountData} variant="contained" color="primary">
                  Save Changes
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

ProfileInterface.propTypes = propTypes;

export default ProfileInterface;
