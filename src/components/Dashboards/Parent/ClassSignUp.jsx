import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  Modal,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationIcon from '@material-ui/icons/LocationOn';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { getMMDDYYYY, getHrMn, getDateFromTimestamp, getWeekDays } from '../../../helpers';
import autoBind from '../../../autoBind';
import '../../../assets/css/Parent-Dash.css';

const getDate = timestamp => getMMDDYYYY(getDateFromTimestamp(timestamp));
const getTime = timestamp => getHrMn(getDateFromTimestamp(timestamp));

class ClassSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classOptions: [],
      selectedClass: null,
      children: [],
      selectedChildren: []
    };
    autoBind(this);
  }

  componentDidMount() {
    this.props.db
      .collection('classes')
      .get()
      .then(classDocs => {
        const newClasses = [];
        classDocs.forEach(classDoc => {
          const classData = {
            ...classDoc.data(),
            id: classDoc.id,
            ref: classDoc.ref
          };
          newClasses.push(classData);
        });
        this.setState({ classOptions: newClasses });
      });
    const childrenData = [];
    const { children } = this.props.accounts.parents.data();
    children.forEach(child => {
      child.get().then(childDoc => {
        const childData = { ...childDoc.data(), id: childDoc.id, ref: childDoc.ref };
        childrenData.push(childData);
        if (childrenData.length === children.length) {
          this.setState({ children: childrenData });
        }
      });
    });
  }

  checkDisabled(child) {
    if (this.state.selectedClass !== null) {
      const children = this.state.selectedClass.children || [];
      return children.some(c => c.id === child.id);
    }
    return false;
  }

  checkToggle(child) {
    return this.state.selectedChildren.includes(child) || this.checkDisabled(child);
  }

  toggleChild(childId) {
    const { selectedChildren } = this.state;
    const index = selectedChildren.indexOf(childId);
    if (index === -1) {
      selectedChildren.push(childId);
    } else {
      selectedChildren.splice(index, 1);
    }
    this.setState({ selectedChildren });
  }

  handleSubmit() {
    const children = this.state.selectedClass.children || [];
    this.state.selectedChildren.forEach(child => {
      const classes = child.classes || [];
      classes.push(this.state.selectedClass.ref);
      child.ref.update({ classes });
      children.push(child.ref);
    });
    this.state.selectedClass.ref.update({ children });
    this.setState({ selectedClass: null, selectedChildren: [] })
  }

  render() {
    return (
      <div className="classes-container">
        <h2>Choose a Class</h2>
        {this.state.classOptions.map(cls => (
          <div key={cls.id} className="class-panel-container">
            <ExpansionPanel className="class-panel">
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="class-panel-summary"
              >
                <div className="column">
                  <h3 className="class-panel-name">{cls.name}</h3>
                  <div>{`${getDate(cls.startDate)} - ${getDate(cls.endDate)}`}</div>
                </div>
                <div className="column">
                  <div>
                    <strong>Price: </strong>
                    {`$${cls.price}`}
                  </div>
                  <div>
                    <strong>Ages: </strong>
                    {`${cls.startAge} - ${cls.endAge}`}
                  </div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="class-panel-details">
                <div className="column">
                  <LocationIcon />
                  <div>{cls.locationName}</div>
                  <div>{cls.locationAddress}</div>
                </div>
                <div className="column">
                  <CalendarIcon />
                  <div>{getWeekDays(cls.daysOfWeek)}</div>
                  <div>{`${getTime(cls.startTime)} - ${getTime(cls.endTime)}`}</div>
                </div>
                <div className="column">
                  <Button
                    onClick={() => this.setState({ selectedClass: cls })}
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ))}
        <Modal
          open={this.state.selectedClass !== null}
          onClose={() => {
            this.setState({ selectedClass: null });
          }}
          disableAutoFocus
        >
          <Paper>
            <h2>Select your children</h2>
            <List>
              {this.state.children.map(child => {
                return (
                  <ListItem
                    key={child.id}
                    button
                    onClick={() => this.toggleChild(child)}
                    disabled={this.checkDisabled(child)}
                  >
                    <ListItemAvatar>
                      <AccountIcon />
                    </ListItemAvatar>
                    <ListItemText primary={`${child.fName} ${child.lName}`} />
                    <Checkbox
                      edge="end"
                      checked={this.checkToggle(child)}
                    />
                  </ListItem>
                );
              })}
            </List>
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </Paper>
        </Modal>
      </div>
    );
  }
}

ClassSignUp.propTypes = {
  db: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

export default ClassSignUp;
