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
  InputBase,
  Collapse
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  AccountCircle,
  Smartphone,
  Home,
  LocationOn,
  StarBorder,
  ExpandLess,
  ExpandMore,
  Cake,
  School,
  FormatSize,
  Wc
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { dataMemberToValidation } from '../../globals';
import { getDateFromTimestamp } from '../../helpers';
import autoBind from '../../autoBind';
import '../../assets/css/Parent-Dash.css';

const propTypes = {
  accounts: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const accountToNames = {
  parents: ['fName', 'lName', 'phone', 'address'],
  teachers: ['fName', 'lName', 'phone'],
  child: ['fName', 'lName', 'birthDate', 'currentSchool', 'currentGrade', 'shirtSize', 'gender']
};

const nameToIcon = {
  fName: AccountCircle,
  lName: AccountCircle,
  phone: Smartphone,
  address: Home,
  location: LocationOn,
  birthDate: Cake,
  currentSchool: School,
  currentGrade: StarBorder,
  shirtSize: FormatSize,
  gender: Wc
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
      accountData: {},
      children: [],
      openChildren: [],
      errors: {}
    };
    autoBind(this);
  }

  componentDidMount() {
    this.fetchAccountData();
  }

  getEditField(field) {
    return this.state.accountData[field] !== undefined ? (
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

  getChildEditField(field, childId) {
    const child = this.state.children.filter(c => c.id === childId)[0];
    return child !== undefined ? (
      <InputBase
        className="full-width"
        value={child[field]}
        onChange={e => {
          const { children } = this.state;
          const childIndex = children.indexOf(child);
          if (childIndex !== -1) {
            child[field] = e.target.value;
            children[childIndex] = child;
            this.setState({ children });
          }
        }}
      />
    ) : null;
  }

  getChildDateField(field, childId) {
    const child = this.state.children.filter(c => c.id === childId)[0];
    return child !== undefined ? (
      <KeyboardDatePicker
        value={getDateFromTimestamp(child[field])}
        format="MM/dd/yyyy"
        onChange={date => {
          const { children } = this.state;
          const childIndex = children.indexOf(child);
          if (childIndex !== -1) {
            child[field] = { seconds: date.getTime() / 1000 };
            children[childIndex] = child;
            this.setState({ children });
          }
        }}
      />
    ) : null;
  }

  getFields() {
    const fields = this.props.accounts.teachers ? accountToNames.teachers : accountToNames.parents;
    return fields.map(field => {
      const Icon = nameToIcon[field];
      const error = this.state.errors[field];
      return (
        <ListItem key={field}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={this.getEditField(field)} />
          <p style={{ fontSize: '14px', color: 'red', margin: 0 }}>{error}</p>
        </ListItem>
      );
    });
  }

  getChildFields(childId) {
    const fields = accountToNames.child;
    return fields.map(field => {
      const Icon = nameToIcon[field];
      const error = this.state.errors[field];
      return (
        <ListItem key={`${field}${childId}`}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText
            primary={
              field !== 'birthDate'
                ? this.getChildEditField(field, childId)
                : this.getChildDateField(field, childId)
            }
          />
          <p style={{ fontSize: '14px', color: 'red', margin: 0 }}>{error}</p>
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
        this.fetchChildrenData();
      });
  }

  fetchChildrenData() {
    const childrenRefs = this.state.accountData.children || [];
    const children = [];
    childrenRefs.forEach(childRef => {
      childRef.get().then(childDoc => {
        const childData = { ...childDoc.data(), id: childDoc.id, ref: childDoc.ref };
        children.push(childData);
        if (children.length === childrenRefs.length) {
          this.setState({ children });
        }
      });
    });
  }

  validateFields(fields) {
    const { errors } = this.state;
    let formValid = true;
    Object.keys(fields).forEach(field => {
      if (fields[field] === '') {
        errors[field] = 'This field may not be empty';
        formValid = false;
      } else {
        const valid = dataMemberToValidation[field](fields);
        errors[field] = valid;
        if (valid !== '') formValid = false;
      }
    });
    this.setState({ errors });
    return formValid;
  }

  updateAccountData() {
    const { fName, lName, phone, address, location } = this.state.accountData;
    const isTeacher = this.props.accounts.teachers;
    const parentData = isTeacher ? { fName, lName, phone } : { fName, lName, phone, address };
    const teacherData = { address, location };
    if (this.validateFields(parentData)) {
      this.state.accountData.ref.update(parentData);
      if (isTeacher) {
        this.state.accountData.teacherRef.update(teacherData);
      }
    }
  }

  updateChildData(childID) {
    const child = this.state.children.filter(c => c.id === childID)[0];
    if (child) {
      const { fName, lName, birthDate, currentSchool, currentGrade, shirtSize, gender } = child;
      const childFields = {
        fName,
        lName,
        birthDate: getDateFromTimestamp(birthDate),
        currentSchool,
        currentGrade,
        shirtSize,
        gender
      };
      if (this.validateFields(childFields)) {
        child.ref.update(childFields);
      }
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
        {this.state.children.length > 0 ? (
          <div className="paper-list-item" style={{ marginTop: 0 }}>
            {this.state.children.map(child => (
              <Paper style={{ marginTop: '30px' }} key={child.id}>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={getSubHeader("Child's Information")}
                  className={useStyles.root}
                >
                  <ListItem
                    button
                    className="child-list-item"
                    onClick={() => {
                      let { openChildren } = this.state;
                      if (openChildren.includes(child.id)) {
                        openChildren = openChildren.filter(e => e !== child.id);
                      } else {
                        openChildren.push(child.id);
                      }
                      this.setState({ openChildren });
                    }}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={`${child.fName} ${child.lName}`} />
                    {this.state.openChildren.includes(child.id) ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    in={this.state.openChildren.includes(child.id)}
                    timeout="auto"
                    unmountOnExit
                  >
                    {this.getChildFields(child.id)}
                    <ListItem>
                      <ListItemText primary="" />
                      <ListItemSecondaryAction style={{ paddingBottom: '10px' }}>
                        <Button onClick={this.fetchAccountData} style={{ marginRight: '20px' }}>
                          Revert Changes
                        </Button>
                        <Button
                          onClick={() => this.updateChildData(child.id)}
                          variant="contained"
                          color="primary"
                        >
                          Save Changes
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Collapse>
                </List>
              </Paper>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

ProfileInterface.propTypes = propTypes;

export default ProfileInterface;
