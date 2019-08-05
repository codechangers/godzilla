import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  Divider,
  Button,
  ListItemText,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Tooltip
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import NewIcon from '@material-ui/icons/Lens';
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
      isRead: null,
      open: false
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

  getModalData() {
    const { org } = this.props;
    return (
      <Table className="modal-table">
        <TableBody>
          <TableRow>
            <TableCell className="table-header">Name</TableCell>
            <TableCell>{org.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Email</TableCell>
            <TableCell>{org.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Address</TableCell>
            <TableCell>{org.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-header">Bio</TableCell>
            <TableCell>{org.aboutMe}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  getStatus() {
    return this.props.org.isDeclined === true ? (
      <div className="declined">
        <Button
          variant="contained"
          size="large"
          color="secondary"
          disabled
          className="applicant-status"
        >
          <CloseIcon />
          Declined
        </Button>
      </div>
    ) : (
      <div className="accepted">
        <Button variant="contained" size="large" disabled className="applicant-status">
          <DoneIcon />
          Accepted
        </Button>
      </div>
    );
  }

  getOptionButtons() {
    const { org } = this.props;
    return this.props.org.isDeclined === false && this.props.org.isVerrified === false ? (
      <div className="options">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => {
            this.props.acceptRequest(org);
          }}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => {
            this.props.declineRequest(org);
          }}
        >
          Decline
        </Button>
      </div>
    ) : (
      this.getStatus()
    );
  }

  handleOpen() {
    let { open } = this.state;
    open = true;
    this.setState({ open });

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

  handleClose() {
    let { open } = this.state;
    open = false;
    this.setState({ open });
  }

  render() {
    const { org } = this.props;
    return this.state.isRead === null ? (
      <div className="org-request" />
    ) : (
      <div>
        <ListItem
          button
          onClick={this.handleOpen}
          className={`org-request ${isReadToBackgroundColor[this.state.isRead]}`}
        >
          <NewIcon fontSize="small" className="read-indicator" />
          <ListItemText className="org-request-name" primary={org.name} />
          {this.getOptionButtons()}
        </ListItem>
        <Divider />
        <Modal
          className="admin-modal-wrapper"
          open={this.state.open}
          onClose={this.handleClose}
          disableAutoFocus
        >
          <Paper className="admin-modal">
            <Tooltip title="Close" placement="left">
              <IconButton
                aria-label="close"
                onClick={this.handleClose}
                className="admin-modal-close"
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            {this.getModalData()}
            {this.getOptionButtons()}
          </Paper>
        </Modal>
      </div>
    );
  }
}

OrganizationRequest.propTypes = propTypes;

export default OrganizationRequest;
