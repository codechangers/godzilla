import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../autoBind';

const propTypes = {
  org: PropTypes.object.isRequired,
  acceptRequest: PropTypes.func.isRequired
};

class OrganizationRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    };
    autoBind(this);
  }

  toggleInfo() {
    let { showInfo } = this.state;
    showInfo = !showInfo;
    this.setState({ showInfo });
  }

  render() {
    const { org } = this.props;
    return (
      <div className="org-request">
        <button type="button" className="select" onClick={this.toggleInfo}>
          <p>{`${org.name}`}</p>
        </button>
        <button
          type="button"
          className="accept"
          onClick={() => {
            this.props.acceptRequest(org);
          }}
        >
          Accept
        </button>
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
                <button type="button" className="decline" onClick={this.toggleInfo}>
                  Decline
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

OrganizationRequest.propTypes = propTypes;

export default OrganizationRequest;
