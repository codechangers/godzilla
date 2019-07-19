import React from 'react';
import autoBind from '../../../autoBind';
import Spinner from '../../Spinner';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingUser: true,
      currentUser: null
    };
    this.user = this.props.user;
    this.firebase = this.props.firebase;
    this.db = this.firebase
      .firestore()
      .collection('env')
      .doc('DEVELOPMENT');
    autoBind(this);
  }

  componentDidMount() {
    const newState = {};
    this.db
      .collection('parents')
      .doc(this.user.uid)
      .get()
      .then(doc => {
        console.log('user: ', doc.data());
        newState.isLoadingUser = false;
        newState.currentUser = doc.data();
        this.setState({ ...newState });
      });

    // newState.currentUser.then(value => {
    //   this.setState({ ...newState });
    // });
  }

  render() {
    return this.state.isLoadingUser === false ? (
      <div>
        <p>
          first name:
          {this.state.currentUser.fName}
        </p>
        <br />
        <p>
          last name:
          {this.state.currentUser.lName}
        </p>
        <br />
        <p>
          email:
          {this.state.currentUser.email}
        </p>
        <br />
        <p>
          phone:
          {this.state.currentUser.phone}
        </p>
        {console.log('state user: ', this.state.currentUser.fName)}
      </div>
    ) : (
      <Spinner color="primary" />
    );
  }
}

export default Profile;
