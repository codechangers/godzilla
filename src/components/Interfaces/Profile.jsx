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
  Collapse,
  Snackbar,
  SnackbarContent,
  IconButton,
  TextField,
  MenuItem,
  Typography,
  withStyles
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
  Wc,
  Fingerprint,
  Close
} from '@material-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { dataMemberToValidation, API_URL } from '../../globals';
import { getDateFromTimestamp } from '../../helpers';
import autoBind from '../../autoBind';
import * as Styled from './styles';

const propTypes = {
  accounts: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const accountToNames = {
  parents: ['fName', 'lName', 'phone', 'address'],
  teachers: ['fName', 'lName', 'phone', 'location', 'address'],
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

const accountDropDowns = {
  location: {
    school: 'School',
    office: 'Office',
    house: 'House',
    other: 'Other'
  }
};

const childDropDowns = {
  gender: {
    male: 'Male',
    female: 'Female',
    other: 'Other'
  },
  currentGrade: {
    ps: 'Pre-School',
    pk: 'Kindergarten',
    '1st': '1st Grade',
    '2nd': '2nd Grade',
    '3rd': '3rd Grade',
    '4th': '4th Grade',
    '5th': '5th Grade',
    '6th': '6th Grade',
    '7th': '7th Grade',
    '8th': '8th Grade',
    '9th': '9th Grade',
    '10th': '10th Grade',
    '11th': '11th Grade',
    '12th': '12th Grade'
  },
  shirtSize: {
    ysm: 'Youth Small',
    ymd: 'Youth Medium',
    ylr: 'Youth Large',
    yxl: 'Youth XL',
    axs: 'Adult XS',
    asm: 'Adult Small',
    amd: 'Adult Medium',
    alr: 'Adult Large',
    axl: 'Adult XL',
    axxl: 'Adult XXL',
    axxxl: 'Adult XXXL'
  }
};

const getSubHeader = text => (
  <ListSubheader
    component="div"
    style={{ backgroundColor: '#fff', borderRadius: '4px 4px 0 0' }}
    id="nested-list-subheader"
  >
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
      passwordReset: '',
      errors: {}
    };
    autoBind(this);
  }

  componentDidMount() {
    this.fetchAccountData();
  }

  getEditField(field) {
    if (Object.keys(accountDropDowns).includes(field)) {
      return this.state.accountData[field] !== undefined ? (
        <TextField
          select
          className="input"
          value={this.state.accountData[field]}
          onChange={e => {
            const { accountData } = this.state;
            accountData[field] = e.target.value;
            this.setState({ accountData });
          }}
        >
          {Object.keys(accountDropDowns[field]).map(f => (
            <MenuItem key={f} value={f}>
              {accountDropDowns[field][f]}
            </MenuItem>
          ))}
        </TextField>
      ) : null;
    }
    return this.state.accountData[field] !== undefined ? (
      <InputBase
        className={this.props.classes.fullWidth}
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
    if (Object.keys(childDropDowns).includes(field)) {
      return child !== undefined ? (
        <TextField
          select
          className="input"
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
        >
          {Object.keys(childDropDowns[field]).map(f => (
            <MenuItem key={f} value={f}>
              {childDropDowns[field][f]}
            </MenuItem>
          ))}
        </TextField>
      ) : null;
    }
    return child !== undefined ? (
      <InputBase
        className={this.props.classes.fullWidth}
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
        <ListItem key={`${field}${childId}`} className={this.props.classes.childListItem}>
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

  getStudentID(child) {
    // eslint-disable-next-line
    fetch(`${API_URL}/get_uid`)
      .then(res => res.json())
      .then(res => {
        const learnID = res.uid;
        child.ref.update({ learnID }).then(() => {
          this.fetchChildrenData();
        });
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
        if (!child.parent) {
          childFields.parent = this.props.db.collection('parents').doc(this.props.user.uid);
        }
        child.ref.update(childFields);
      }
    }
  }

  changePassword() {
    this.props.firebase
      .auth()
      .sendPasswordResetEmail(this.props.user.email)
      .then(() => {
        console.log('Email Sent...');
        this.setState({
          passwordReset: `Password Reset email has been sent to ${this.props.user.email}!`
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ passwordReset: 'Failed to send password reset email...' });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Styled.PageContent className={classes.wrapper}>
        <Typography variant="h3">Edit Your Profile</Typography>
        <Paper className={classes.paperListItem}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={getSubHeader(
              this.props.accounts.teachers ? 'Teacher Account' : 'Parent Account'
            )}
            className={classes.root}
          >
            {this.getFields()}
            <ListItem style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Button
                onClick={this.changePassword}
                className={classes.actionBtn}
                style={{ flexGrow: 1 }}
              >
                Change Password
              </Button>
              <div className={this.props.classes.saveWrapper}>
                <Button onClick={this.fetchAccountData} className={classes.actionBtn}>
                  Revert Changes
                </Button>
                <Button
                  onClick={this.updateAccountData}
                  className={classes.actionBtn}
                  variant="contained"
                  color="primary"
                >
                  Save Changes
                </Button>
              </div>
            </ListItem>
          </List>
        </Paper>
        {this.state.children.length > 0 ? (
          <div className={classes.paperListItem} style={{ marginTop: 0 }}>
            {this.state.children.map(child => (
              <Paper style={{ marginTop: '30px' }} key={child.id}>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={getSubHeader("Child's Information")}
                  className={classes.root}
                >
                  <ListItem
                    button
                    className={classes.childListItem}
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
                    <ListItem className={classes.childListItem}>
                      <ListItemIcon>
                        <Fingerprint />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          child.learnID
                            ? `Student ID: ${child.learnID}`
                            : 'Get your Personal Student ID!'
                        }
                      />

                      {child.learnID ? (
                        <CopyToClipboard text={child.learnID}>
                          <Button>Copy ID</Button>
                        </CopyToClipboard>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => this.getStudentID(child)}
                        >
                          Get your ID
                        </Button>
                      )}
                    </ListItem>
                    {this.getChildFields(child.id)}
                    <ListItem>
                      <ListItemText primary="" />
                      <div className={this.props.classes.saveWrapper}>
                        <Button onClick={this.fetchAccountData}>Revert Changes</Button>
                        <Button
                          onClick={() => this.updateChildData(child.id)}
                          variant="contained"
                          color="primary"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </ListItem>
                  </Collapse>
                </List>
              </Paper>
            ))}
          </div>
        ) : null}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={this.state.passwordReset !== ''}
          autoHideDuration={4000}
          onClose={() => this.setState({ passwordReset: '' })}
        >
          <SnackbarContent
            style={{
              color: '#fff',
              backgroundColor: this.state.passwordReset.includes('Failed') ? '#B7300F' : '#0EA90B'
            }}
            aria-describedby="client-snackbar"
            message={this.state.passwordReset}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={() => this.setState({ passwordReset: '' })}
              >
                <Close />
              </IconButton>
            ]}
          />
        </Snackbar>
      </Styled.PageContent>
    );
  }
}

ProfileInterface.propTypes = propTypes;

const styles = theme => ({
  wrapper: {
    paddingBottom: '20px !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paperListItem: {
    width: '60%',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  childListItem: {
    paddingLeft: '30px'
  },
  listRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  actionBtn: {
    marginBottom: 10
  },
  fullWidth: {
    width: '100%'
  },
  saveWrapper: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    '& button': {
      marginRight: '5px',
      marginLeft: '5px'
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-around'
    }
  }
});

export default withStyles(styles)(ProfileInterface);
