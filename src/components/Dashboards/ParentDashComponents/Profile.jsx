import React from 'react';
import autoBind from '../../../autoBind';
import Spinner from '../../Spinner';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingUser: true,
      currentUser: {}
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
    newState.currentUser = this.db
      .collection('parents')
      .doc(this.user.uid)
      .get()
      .then(function(doc) {
        console.log('user: ', doc.data());
        return doc.data();
      });
    this.setState({ ...newState });
    this.setState({ isLoadingUser: false });
  }

  render() {
    return this.state.currentUser !== {} ? (
      <div>
        <h1>
          Testing hello
          {console.log('state user: ', this.state.currentUser)}
        </h1>
      </div>
    ) : (
      <Spinner color="primary" />
    );
  }
}

export default Profile;
