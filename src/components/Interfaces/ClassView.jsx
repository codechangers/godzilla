import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Tabs,
  Tab,
  Paper,
  Switch,
  Typography,
  CircularProgress,
  IconButton,
  withStyles
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import InfoCardHeader from '../Classes/InfoCardHeader';
import Modal from '../UI/Modal';
import TabPanel from '../UI/TabPanel';
import ChildInfo from '../SignUpForms/ChildInfo';
import autoBind from '../../utils/autoBind';
import DeleteModal from './interfaceHelpers/DeleteModal';
import { auth, db } from '../../utils/firebase';
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

  tabLeft() {
    let { tabIndex } = this.state;
    if (tabIndex >= 1) {
      tabIndex -= 1;
    }
    this.setState({ tabIndex });
  }

  tabRight() {
    let { tabIndex } = this.state;
    if (tabIndex <= this.state.children.length - 2) {
      tabIndex += 1;
    }
    this.setState({ tabIndex });
  }

  addChildRef(childRef) {
    const user = auth.currentUser;
    const { childrenRefs } = this.state;
    childrenRefs.push(childRef);
    this.setState({ childrenRefs });
    db.collection('parents')
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
            <div style={{ width: '124.58px' }} />
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
              <div style={{ width: '124.58px' }} />
            )}
          </div>
          {this.state.showEmpty && (
            <div className={classes.emptyWarning}>
              <Typography variant="h6">
                Looks like you don&apos;t have any kids registered yet.
              </Typography>
              <Button onClick={() => this.setState({ showKidCreator: true })}>Add them now!</Button>
            </div>
          )}
          {!this.state.showEmpty && (
            <div className={classes.tabsWrapper}>
              <div className={classes.tabButtons}>
                <IconButton size="small" onClick={this.tabLeft} style={{ marginRight: '2px' }}>
                  <ChevronLeft />
                </IconButton>
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
                <IconButton size="small" onClick={this.tabRight} style={{ marginLeft: '2px' }}>
                  <ChevronRight />
                </IconButton>
              </div>
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
          )}
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
                        <InfoCardHeader cls={cls}>{this.getButton(cls)}</InfoCardHeader>
                      </Paper>
                    ) : null
                  )}
                  {child.classesData.filter(a => a.endDate.seconds * 1000 > Date.now()).length >
                    0 ||
                  (this.state.showOldClasses && child.classesData.length > 0) ? null : (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <div className={classes.emptyWarning}>
                        <Typography variant="h6">
                          Looks like you haven&apos;t signed up for any classes yet.
                        </Typography>
                        <Button>
                          <Link to="/parent/search" style={{ color: 'inherit' }}>
                            Find one now!
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </TabPanel>
              );
            })
          )}
          <Modal
            open={this.state.showKidCreator}
            onClose={() => this.setState({ showKidCreator: false })}
            title="Add a Child"
            description="Add a new Child to your Parent account."
            noWrapper
          >
            <ChildInfo
              handleClose={() => this.setState({ showKidCreator: false })}
              addChildRef={this.addChildRef}
              title="Add a Child"
            />
          </Modal>
          <DeleteModal
            obj={{ isSet: this.state.selectedClass !== null }}
            onCancel={() => this.setState({ selectedClass: null })}
            onConfirm={this.removeClass}
            prompt={`Are you sure you want to drop ${this.state.selectedClass?.name || 'class'}?`}
            del="Drop"
          />
        </div>
      </Styled.PageContent>
    );
  }
}

ClassViewInterface.propTypes = {
  accounts: PropTypes.object.isRequired,
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
    marginBottom: '24px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& button': {
        width: '60%',
        marginTop: '12px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      '& h3': {
        fontSize: '2rem'
      },
      '& button': {
        width: '100%'
      }
    }
  },
  emptyWarning: {
    width: '50%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '& button': {
      marginTop: '12px',
      '& a': {
        textDecoration: 'none',
        color: '#000'
      }
    }
  },
  tabsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
    boxSizing: 'border-box'
  },
  tabButtons: {
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    '& button': {
      color: 'white',
      height: '30px !important'
    }
  },
  childTabBar: {
    maxWidth: 'calc(100% - 60px - 4px)'
  },
  expiredToggle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
    fontSize: '0.75rem',
    maxWidth: '100%',
    marginBottom: '3.5px',
    marginLeft: '5px'
  },
  tabPanel: {
    marginTop: '20px',
    '& div.MuiBox-root': {
      padding: '0'
    }
  },
  options: {
    '& button': {
      margin: '0 15px'
    }
  }
});

export default withStyles(styles)(ClassViewInterface);
