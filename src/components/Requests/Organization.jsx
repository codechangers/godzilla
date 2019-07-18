import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';

const propTypes = {
  db: PropTypes.object.isRequired,
  org: PropTypes.object.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  declineRequest: PropTypes.func.isRequired
};

const isReadToBackgroundColor = {
  true: 'is-read',
  false: 'is-not-read'
};

class OrganizationRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      isRead: null
    };
    autoBind(this);
  }

  componentDidMount() {
    this.props.db
      .collection('organizations')
      .doc(this.props.org.id)
      .get()
      .then(thisOrg => {
        this.setState({
          isRead: thisOrg.data().isRead
        });
      });
  }

  getOptionButtons() {
    const { org } = this.props;
    return this.props.org.isDeclined === false && this.props.org.isVerrified === false ? (
      <div className="options">
        <button
          type="button"
          className="accept"
          onClick={() => {
            this.props.acceptRequest(org);
          }}
        >
          Accept
        </button>
        <button
          type="button"
          className="decline"
          onClick={() => {
            this.props.declineRequest(org);
          }}
        >
          Decline
        </button>
      </div>
    ) : this.props.org.isDeclined === true ? (
      <div className="declined">
        <p>Declined</p>
      </div>
    ) : (
      <div className="accepted">
        <p>Accepted</p>
      </div>
    );
  }

  toggleInfo() {
    let { showInfo } = this.state;
    showInfo = !showInfo;
    this.setState({ showInfo });

    this.props.db
      .collection('organizations')
      .doc(this.props.org.id)
      .update({
        isRead: true
      });

    this.setState({
      isRead: true
    });
  }

  render() {
    const { org } = this.props;
    return this.state.isRead === null ? (
      <div className="org-request" />
    ) : (
      <div className={`org-request ${isReadToBackgroundColor[this.state.isRead]}`}>
        <button type="button" className="select" onClick={this.toggleInfo}>
          <p>{`${org.name}`}</p>
        </button>
        {this.getOptionButtons()}
        {this.state.showInfo ? (
          <div className="request-info-wrapper">
            <div className="request-info">
              <button type="button" onClick={this.toggleInfo}>
                Close
              </button>
              <div>
                <p>Name:</p>
                <span>{org.name}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{org.email}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{org.address}</span>
              </div>
              <div>
                <p>Bio:</p>
                <span>{org.aboutMe}</span>
              </div>
              {this.getOptionButtons()}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

OrganizationRequest.propTypes = propTypes;

export default OrganizationRequest;
