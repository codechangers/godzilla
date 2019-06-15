import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  org: PropTypes.object.isRequired,
  acceptRequest: PropTypes.func.isRequired
};

class OrganizationRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { org } = this.props;
    return (
      <div className="org-request">
        <p>{`${org.name}`}</p>
        <button
          type="button"
          onClick={() => {
            this.props.acceptRequest(org);
          }}
        >
          Accept
        </button>
      </div>
    );
  }
}

OrganizationRequest.propTypes = propTypes;

export default OrganizationRequest;
