import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab, Modal, Card } from '@material-ui/core';
import ClassPanel from '../../Classes/Panel';
import TabPanel from '../../../TabPanel';
import autoBind from '../../../autoBind';
import '../../../assets/css/Parent-Dash.css';

class ClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      children: [],
      selectedClass: null
    };
    autoBind(this);
  }

  componentDidMount() {
    this.fetchChildData();
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

  fetchChildData() {
    const childrenData = [];
    const { children } = this.props.accounts.parents.data();
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
                  this.setState({ children: childrenData });
                }
              }
            });
          });
        } else {
          childData.classesData = [];
          childrenData.push(childData);
          if (childrenData.length === children.length) {
            this.setState({ children: childrenData });
          }
        }
      });
    });
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

  render() {
    return (
      <div className="classes-container">
        <h2>View Classes</h2>
        <Tabs value={this.state.tabIndex} onChange={this.changeTab} indicatorColor="primary">
          {this.state.children.map(child => {
            return <Tab key={child.id} label={`${child.fName} ${child.lName}`} />;
          })}
        </Tabs>
        {this.state.children.map((child, i) => {
          return (
            <TabPanel key={child.id} value={this.state.tabIndex} index={i}>
              {child.classesData.map(cls => (
                <ClassPanel key={cls.id} cls={cls} getButton={this.getButton} />
              ))}
            </TabPanel>
          );
        })}
        <Modal
          open={this.state.selectedClass !== null}
          onClose={() =>
            this.setState({
              selectedClass: null
            })
          }
          disableAutoFocus
        >
          {this.state.selectedClass === null ? (
            <div />
          ) : (
            <Card className="delete-card">
              <h1>{`Are you sure you want to drop ${this.state.selectedClass.name}?`}</h1>
              <h4>This will remove your child from this class permanently.</h4>
              <div className="options">
                <Button
                  color="default"
                  variant="outlined"
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

ClassView.propTypes = {
  accounts: PropTypes.object.isRequired
};

export default ClassView;
