import React from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationIcon from '@material-ui/icons/LocationOn';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { getDate, getTime, getWeekDays } from '../../helpers';
import '../../assets/css/Parent-Dash.css';

const ClassPanel = ({ cls, getButton }) => {
  return (
    <div className="class-panel-container">
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
          <div className="column">{getButton(cls)}</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

ClassPanel.propTypes = {
  cls: PropTypes.object.isRequired,
  getButton: PropTypes.func.isRequired
};

export default ClassPanel;
