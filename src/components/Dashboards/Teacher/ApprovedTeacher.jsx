import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Modal,
  Button,
  Card,
  Snackbar,
  SnackbarContent,
  Switch,
  CircularProgress
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Banner from '../../UI/Banner';
import ClassInfoCard from '../../Classes/InfoCard';
import ClassEditor from '../../Classes/Editor';
import DeleteCard from '../../UI/DeleteCard';
import StripeConnect from '../../UI/StripeConnect';
import ContactInfo from '../../UI/ContactInfo';
import autoBind from '../../../autoBind';
import { API_URL } from '../../../globals';
import '../../../assets/css/Teacher.css';

const getName = user => `${user.data().fName} ${user.data().lName}`;

const getMessage = () => (
  <span id="client-snackbar" style={{ display: 'flex', alignItems: 'center' }}>
    <WarningIcon style={{ marginRight: '9px', width: '19px' }} />
    <p>Connect Stripe to use Educator Features</p>
  </span>
);

const getClassRefs = classes => classes.map(cls => cls.ref);

const controller = new AbortController();
let abort = () => null;

class ApprovedTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      selected: null,
      showCreate: false,
      stripeIsLinked: false,
      showOldClasses: false,
      contactClass: null,
      loadingClasses: false
    };
    autoBind(this);
  }

  componentDidMount() {
    this.fetchClasses();
    // eslint-disable-next-line
    fetch(`${API_URL}/teacher_account/${this.props.user.uid}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        this.setState({ stripeIsLinked: res.stripe_is_linked });
      });
    abort = controller.abort.bind(controller);
  }

  componentWillUnmount() {
    abort();
    abort = () => null;
  }

  getEmptyPrompt() {
    return this.state.classes.length <= 0 ? (
      <Card className="alert-card">
        <h3>
          Looks like you don&apos;t have any classes yet.
          <br />
          Add a new class to use the Educator Dashboard.
        </h3>
        {this.state.stripeIsLinked ? (
          <Button variant="contained" onClick={() => this.setState({ showCreate: true })}>
            Add a New Class
          </Button>
        ) : null}
      </Card>
    ) : null;
  }

  getCrudModal() {
    if (this.state.showCreate) {
      return (
        // TODO: Use new UI/Modal component
        <Modal
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          open={this.state.showCreate}
          onClose={() => this.setState({ showCreate: false })}
          disableAutoFocus
        >
          <ClassEditor
            submit={this.createClass}
            submitText="Submit"
            close={() => this.setState({ showCreate: false })}
          />
        </Modal>
      );
    }
    return (
      // TODO: Use new UI/Modal component
      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        open={this.state.selected !== null}
        onClose={() => this.setState({ selected: null })}
        disableAutoFocus
      >
        {this.state.selected.shouldEdit ? (
          <ClassEditor
            submit={classData => {
              this.updateClass(this.state.selected.cls.id, classData);
              this.setState({ selected: null });
            }}
            title="Edit Class Details"
            submitText="Submit"
            cls={this.state.selected.cls}
            close={() => this.setState({ selected: null })}
          />
        ) : (
          <DeleteCard
            prompt={`Are you sure you want to delete ${this.state.selected.cls.name}?`}
            warning="This will remove the class and all signed up students permanently"
            onCancel={() => this.setState({ selected: null })}
            onDelete={() => {
              this.deleteClass(this.state.selected.cls.id);
              this.setState({ selected: null });
            }}
          />
        )}
      </Modal>
    );
  }

  async fetchClasses(t) {
    this.setState({ loadingClasses: true });
    const teacherDoc = t || (await this.props.accounts.teachers.ref.get());
    const classRefs = teacherDoc.data().classes || [];
    const classes = [];
    classRefs.forEach(classRef => {
      classRef.get().then(classDoc => {
        const classData = { ...classDoc.data(), id: classDoc.id, ref: classDoc.ref };
        classes.push(classData);
        if (classes.length === classRefs.length) {
          classes.sort((a, b) => b.endDate.seconds - a.endDate.seconds);
          this.setState({ classes, loadingClasses: false });
        }
      });
    });
    if (classRefs.length <= 0) {
      this.setState({ loadingClasses: false });
    }
  }

  createClass(classData) {
    const { teachers } = this.props.accounts;
    this.props.db
      .collection('classes')
      .add({ ...classData, children: [], teacher: teachers.ref })
      .then(classObj => {
        const classes = getClassRefs(this.state.classes);
        classes.push(classObj);
        teachers.ref.update({ classes }).then(() => this.fetchClasses());
      });
    this.setState({ showCreate: false, loadingClasses: true });
  }

  updateClass(classId, classData) {
    this.setState({ loadingClasses: true });
    this.props.db
      .collection('classes')
      .doc(classId)
      .update(classData)
      .then(() => {
        this.fetchClasses();
      });
  }

  deleteClass(classId) {
    const { teachers } = this.props.accounts;
    const cls = this.state.classes.filter(c => c.id === classId)[0];
    if (cls) {
      this.setState({ loadingClasses: false });
      cls.children.forEach(childRef => {
        childRef.get().then(childDoc => {
          let childClasses = childDoc.data().classes || [];
          childClasses = childClasses.filter(c => c.id !== classId);
          childRef.update({ classes: childClasses });
        });
      });
      cls.ref.delete().then(() => {
        let classes = getClassRefs(this.state.classes);
        classes = classes.filter(c => c.id !== classId);
        teachers.ref.update({ classes }).then(() => this.fetchClasses());
      });
    }
  }

  render() {
    const { showOldClasses } = this.state;
    return (
      <div className="page-content horiz-center">
        <Banner
          name={
            this.props.accounts.parents ? getName(this.props.accounts.parents) : 'Hello Teacher'
          }
          stripeIsLinked={this.state.loadingClasses ? false : this.state.stripeIsLinked}
          buttonText="ADD A NEW CLASS"
          onClick={() => this.setState({ showCreate: true })}
        />
        <div
          style={{
            alignSelf: 'flex-end',
            marginTop: '-40px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem'
          }}
        >
          <p>Show Expired Classes</p>
          <Switch
            checked={showOldClasses}
            onChange={() => this.setState({ showOldClasses: !showOldClasses })}
            value="Show Expired Classes"
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>
        {this.getEmptyPrompt()}
        <div
          style={{
            width: '100%',
            height: this.state.loadingClasses ? '60px' : 0,
            display: 'flex',
            justifyContent: 'center',
            transition: 'all 300ms ease'
          }}
        >
          {this.state.loadingClasses && (
            <CircularProgress style={{ marginBottom: '10px' }} color="primary" />
          )}
        </div>
        {this.state.classes.map(cls =>
          cls.endDate.seconds * 1000 > Date.now() || showOldClasses ? (
            <ClassInfoCard
              cls={cls}
              key={cls.id}
              openUpdate={() => this.setState({ selected: { cls, shouldEdit: true } })}
              openDelete={() => this.setState({ selected: { cls, shouldEdit: false } })}
              openContacts={() => this.setState({ contactClass: cls })}
            />
          ) : null
        )}
        {this.state.selected !== null || this.state.showCreate ? this.getCrudModal() : null}
        <Snackbar
          className="stripe-wrapper"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={!this.state.stripeIsLinked}
          autoHideDuration={6000}
          onClose={() => {}}
        >
          <SnackbarContent
            className="stripe-warning"
            aria-describedby="client-snackbar"
            message={getMessage()}
            action={[<StripeConnect key="stripe_oauth" />]}
          />
        </Snackbar>
        <ContactInfo
          cls={this.state.contactClass}
          onClose={() => this.setState({ contactClass: null })}
        />
      </div>
    );
  }
}

ApprovedTeacher.propTypes = {
  accounts: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(ApprovedTeacher);
