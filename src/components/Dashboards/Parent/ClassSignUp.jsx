import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        console.log(this.state.classOptions);
      });
  }

  render() {
    return (
      <div>
        <h3>Choose a Class</h3>
        {this.state.classOptions.map(cls => (
          <div key={cls.id}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{cls.name}</Typography>
                <Typography>{`$${cls.price}`}</Typography>
                <Typography>{`${cls.startAge}-${cls.endAge}`}</Typography>
                <Typography>{`${getDate(cls.startDate)}-${getDate(cls.endDate)}`}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>Details here</div>
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
