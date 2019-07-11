import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';
import OrganizationRequest from '../Requests/Organization';
import Spinner from '../Spinner';

let cancelOrganizationSub = () => {};

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

class AdminOrganizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgReqs: [],
      isLoadingOrgs: true
    };
    this.firebase = this.props.firebase;
    this.db = this.props.db;
    autoBind(this);
  }

  componentDidMount() {
    cancelOrganizationSub = this.getRequestsFromCollection();
  }

  componentWillUnmount() {
    cancelOrganizationSub();
  }

  getRequestsFromCollection() {
    return this.db.collection('organizations').onSnapshot(users => {
      const requests = users.docs.map(u => ({ id: u.id, ...u.data() }));
      requests.sort(function(a, b) {
        return new Date(b.dateApplied.seconds) - new Date(a.dateApplied.seconds);
      });
      const newState = {};
      newState.orgReqs = requests;
      // .filter(t => !t.isVerrified)
      // .filter(t => !t.isDeclined);
      newState.isLoadingOrgs = false;
      this.setState({ ...newState });
    });
  }

  render() {
    return this.state.isLoadingOrgs ? (
      <Spinner color="primary" />
    ) : (
      this.state.orgReqs.map(org => (
        <OrganizationRequest
          db={this.db}
          org={org}
          acceptRequest={o => this.acceptRequest(o, 'organizations')}
          declineRequest={o => this.declineRequest(o, 'organizations')}
          key={org.id}
        />
      ))
    );
  }

  acceptRequest(user, collection) {
    this.db
      .collection(collection)
      .doc(user.id)
      .update({ isVerrified: true });
  }

  declineRequest(user, collection) {
    this.db
      .collection(collection)
      .doc(user.id)
      .update({ isDeclined: true });
  }
}

AdminOrganizationPage.propTypes = propTypes;

export default AdminOrganizationPage;
