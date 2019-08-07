import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationIcon from '@material-ui/icons/LocationOn';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { getMMDDYYYY, getDateFromTimestamp } from '../../../helpers';
import '../../../assets/css/Parent-Dash.css';

const getDate = timestamp => {
  return getMMDDYYYY(getDateFromTimestamp(timestamp));
};

class ClassSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classOptions: []
    };
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
            id: classDoc.id
          };
          newClasses.push(classData);
        });
        this.setState({ classOptions: newClasses });
      });
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
                  <div>{cls.daysOfWeek}</div>
                  <div>Start and End time</div>
                </div>
                <div className="column">
                  <Button variant="contained" color="primary">Sign Up</Button>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ))}
      </div>
    );
  }
}

ClassSignUp.propTypes = {
  db: PropTypes.object.isRequired
};

export default ClassSignUp;
