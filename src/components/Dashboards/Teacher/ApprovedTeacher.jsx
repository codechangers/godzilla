import React from 'react';
import SideBar from '../../SideBar';

class ApprovedTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SideBar />
        <h1>Hello Teachers</h1>
      </div>
    );
  }
}

export default ApprovedTeacher;
