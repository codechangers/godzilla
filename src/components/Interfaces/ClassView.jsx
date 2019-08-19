import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Tabs, Tab, Modal, Card } from '@material-ui/core';
import ClassPanel from '../Classes/Panel';
import TabPanel from '../../TabPanel';
import ChildInfo from '../SignUpForms/ChildInfo';
import autoBind from '../../autoBind';
import '../../assets/css/Parent-Dash.css';
import Spinner from '../UI/Spinner';

let parentListener = () => {};

class ClassViewInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      children: [],
      childrenRefs: [],
      selectedClass: null,
      isLoading: true,
      showEmpty: false,
      showKidCreator: false
    };
    autoBind(this);
  }

  componentDidMount() {
    parentListener = this.props.accounts.parents.ref.onSnapshot(parentDoc => {
      const childrenRefs = parentDoc.data().children || [];
      this.fetchChildData(childrenRefs);
      this.setState({ childrenRefs });
    });
  }

  componentWillUnmount() {
    parentListener();
    parentListener = () => {};
  }

  getButton(cls) {
    return (
      <Button
        onClick={() => this.setState({ selectedClass: cls })}
        variant="contained"
        color="secondary"
      >
        Drop Class
      </Button>
    );
  }

  fetchChildData(childrenRefs) {
    const childrenData = [];
    const children = childrenRefs || this.state.childrenRefs;
    if (children.length > 0) {
      children.forEach(child => {
        child.get().then(childDoc => {
          const childData = { ...childDoc.data(), id: childDoc.id, ref: childDoc.ref };
          const childClasses = [];
          if (childData.classes && childData.classes.length > 0) {
            childData.classes.forEach(cls => {
              cls.get().then(classDoc => {
                const classData = { ...classDoc.data(), id: classDoc.id, ref: classDoc.ref };
                childClasses.push(classData);
                if (childClasses.length === childData.classes.length) {
                  childData.classesData = childClasses;
                  childrenData.push(childData);
                  if (childrenData.length === children.length) {
                    this.setState({ children: childrenData, isLoading: false, showEmpty: false });
                  }
                }
              });
            });
          } else {
            childData.classesData = [];
            childrenData.push(childData);
            if (childrenData.length === children.length) {
              this.setState({ children: childrenData, isLoading: false, showEmpty: false });
            }
          }
        });
      });
    } else {
      this.setState({ isLoading: false, showEmpty: true });
    }
  }

  removeClass() {
    const child = this.state.children[this.state.tabIndex];
    let { children } = this.state.selectedClass;
    const { classesData } = child;
    children = children.filter(c => c.id !== child.id);
    const classes = classesData.map(c => c.ref).filter(c => c.id !== this.state.selectedClass.id);
    this.state.selectedClass.ref.update({ children });
    child.ref.update({ classes }).then(this.fetchChildData);
    this.setState({ selectedClass: null });
  }

  changeTab(_, value) {
    this.setState({ tabIndex: value });
  }

  addChildRef(childRef) {
    const user = this.props.firebase.auth().currentUser;
    const { childrenRefs } = this.state;
    childrenRefs.push(childRef);
    this.setState({ childrenRefs });
    this.props.db
      .collection('parents')
      .doc(user.uid)
      .update({
        children: childrenRefs
      });
    this.fetchChildData(childrenRefs);
  }

  render() {
    return (
      <div className="classes-container">
        <h2>View your Classes</h2>
        {this.state.showEmpty ? (
          <div className="empty-warning">
            <h3>Looks like you don&apos;t have any kids registered yet.</h3>
            <Button onClick={() => this.setState({ showKidCreator: true })}>Add them now!</Button>
          </div>
        ) : (
          <Button
            color="primary"
            variant="contained"
            style={{ alignSelf: 'flex-end', marginTop: '-40px' }}
            onClick={() => this.setState({ showKidCreator: true })}
          >
            Add a Kid
          </Button>
        )}
        <Tabs
          className="view-classes-tabs"
          value={this.state.tabIndex}
          onChange={this.changeTab}
          indicatorColor="primary"
        >
          {this.state.children.map(child => {
            return <Tab key={child.id} label={`${child.fName} ${child.lName}`} />;
          })}
        </Tabs>
        {this.state.isLoading ? (
          <Spinner color="primary" />
        ) : (
          this.state.children.map((child, i) => {
            return (
              <TabPanel key={child.id} value={this.state.tabIndex} index={i}>
                {child.classesData.map(cls => (
                  <ClassPanel key={cls.id} cls={cls} getButton={this.getButton} />
                ))}
                {child.classesData.length > 0 ? null : (
                  <div className="empty-warning">
                    <h3>Looks like you haven&apos;t signed up for any classes yet.</h3>
                    <Button>
                      <Link className="action" to="/parent/signup">
                        Find one now!
                      </Link>
                    </Button>
                  </div>
                )}
              </TabPanel>
            );
          })
        )}
        <Modal
          className="modal-wrapper"
          open={this.state.selectedClass !== null || this.state.showKidCreator}
          onClose={() => this.setState({ selectedClass: null, showKidCreator: false })}
          disableAutoFocus
        >
          {this.state.selectedClass === null ? (
            <ChildInfo
              firebase={this.props.firebase}
              db={this.props.db}
              handleClose={() => this.setState({ showKidCreator: false })}
              addChildRef={this.addChildRef}
            />
          ) : (
            <Card className="delete-card modal-content">
              <h1>{`Are you sure you want to drop ${this.state.selectedClass.name}?`}</h1>
              <h4>This will remove your child from this class permanently.</h4>
              <div className="options">
                <Button
                  color="default"
                  variant="contained"
                  onClick={() => this.setState({ selectedClass: null })}
                >
                  Cancel
                </Button>
                <Button color="secondary" variant="contained" onClick={this.removeClass}>
                  Delete
                </Button>
              </div>
            </Card>
          )}
        </Modal>
      </div>
    );
  }
}

ClassViewInterface.propTypes = {
  accounts: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

export default ClassViewInterface;
