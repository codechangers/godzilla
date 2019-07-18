import React from 'react';
import autoBind from '../../../autoBind';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.user = this.props.user;
    autoBind(this);
    console.log(this.user);
  }

  render() {
    return (
      <div>
        <h1>
          Testing hello
          {this.user.fName}
        </h1>
      </div>
    );
  }
}

export default Profile;
