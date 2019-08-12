import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SideBar from '../../SideBar';
import CurriculumInterface from '../../Interfaces/Curriculum';
import PaymentInterface from '../../Interfaces/Payment';
import ProfileInterface from '../../Interfaces/Profile';
import SettingsInterface from '../../Interfaces/Settings';

const routeToInterface = {
  '/teacher': null,
  '/teacher/curriculum': CurriculumInterface,
  '/teacher/payments': PaymentInterface,
  '/teacher/profile': ProfileInterface,
  '/teacher/settings': SettingsInterface
};

class ApprovedTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInterface() {
    const Interface = routeToInterface[this.props.location.pathname];
    return Interface === null ? null : <Interface />;
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <SideBar />
        {this.getInterface() || (
          <div className="page-content">
            <h1>Dashboard Interface</h1>
          </div>
        )}
      </div>
    );
  }
}

ApprovedTeacher.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(ApprovedTeacher);
