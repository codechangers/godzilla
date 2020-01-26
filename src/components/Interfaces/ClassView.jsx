import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Tabs,
  Tab,
  Modal,
  Card,
  Paper,
  Switch,
  Typography,
  CircularProgress,
  withStyles
} from '@material-ui/core';
import InfoCardHeader from '../Classes/InfoCardHeader';
import TabPanel from '../UI/TabPanel';
import ChildInfo from '../SignUpForms/ChildInfo';
import autoBind from '../../autoBind';
import * as Styled from './styles';

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
      showKidCreator: false,
      showOldClasses: false
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
    const { showOldClasses } = this.state;
    const { classes } = this.props;
    return (
      <Styled.PageContent
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div className={classes.classesContainer}>
          <div className={classes.titleRow}>
            <div />
            <Typography variant="h3">View Your Classes</Typography>
            {!this.state.showEmpty ? (
              <Button
                color="primary"
                variant="contained"
                style={{ padding: '6px 26px' }}
                onClick={() => this.setState({ showKidCreator: true })}
              >
                Add a Kid
              </Button>
            ) : (
              <div />
            )}
          </div>
          {this.state.showEmpty && (
            <div className={classes.emptyWarning}>
              <Typography variant="h5">
                Looks like you don&apos;t have any kids registered yet.
              </Typography>
              <Button onClick={() => this.setState({ showKidCreator: true })}>Add them now!</Button>
            </div>
          )}
          <div className={classes.tabsWrapper}>
            <Tabs
              className={classes.childTabBar}
              value={this.state.tabIndex}
              onChange={this.changeTab}
              indicatorColor="primary"
            >
              {this.state.children.map(child => {
                return <Tab key={child.id} label={`${child.fName} ${child.lName}`} />;
              })}
            </Tabs>
            <div className={classes.expiredToggle}>
              <p>Show Expired Classes</p>
              <Switch
                checked={showOldClasses}
                onChange={() => this.setState({ showOldClasses: !showOldClasses })}
                value="Show Expired Classes"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
          </div>
          {this.state.isLoading ? (
            <CircularProgress />
          ) : (
            this.state.children.map((child, i) => {
              return (
                <TabPanel
                  className={classes.tabPanel}
                  key={child.id}
                  value={this.state.tabIndex}
                  index={i}
                >
                  {child.classesData.map(cls =>
                    cls.endDate.seconds * 1000 > Date.now() || showOldClasses ? (
                      <Paper key={cls.id}>
                        <InfoCardHeader cls={cls} db={this.props.db}>
                          {this.getButton(cls)}
                        </InfoCardHeader>
                      </Paper>
                    ) : null
                  )}
                  {child.classesData.filter(a => a.endDate.seconds * 1000 > Date.now()).length >
                    0 ||
                  (this.state.showOldClasses && child.classesData.length > 0) ? null : (
                    <div className="empty-warning">
                      <h3>Looks like you haven&apos;t signed up for any classes yet.</h3>
                      <Button>
                        <Link className="action" to="/parent/search">
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
            className={classes.modal}
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
              <Card className={classes.deleteCard}>
                <Typography
                  variant="h5"
                  style={{ marginBottom: '12px' }}
                >{`Are you sure you want to drop ${this.state.selectedClass.name}?`}</Typography>
                <Typography variant="body2" style={{ marginBottom: '20px' }}>
                  This will remove your child from this class permanently.
                </Typography>
                <div className={classes.options}>
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
      </Styled.PageContent>
    );
  }
}

ClassViewInterface.propTypes = {
  accounts: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  classesContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    }
  },
  titleRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '24px'
  },
  emptyWarning: {},
  tabsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
    boxSizing: 'border-box'
  },
  childTabBar: {
    maxWidth: '100%'
  },
  expiredToggle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
    fontSize: '0.75rem',
    maxWidth: '100%',
    marginBottom: '3px',
    marginLeft: '5px'
  },
  tabPanel: {
    marginTop: '20px',
    '& .MuiBox-root-323': {
      padding: 0
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteCard: {
    width: '50%',
    minWidth: '350px',
    outline: 'none',
    boxSizing: 'border-box',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  options: {
    '& button': {
      margin: '0 15px'
    }
  }
});

export default withStyles(styles)(ClassViewInterface);
