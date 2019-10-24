import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Modal,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  CircularProgress,
  Fab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CheckIcon from '@material-ui/icons/Check';
import { CardElement, injectStripe } from 'react-stripe-elements';
import ClassPanel from '../Classes/Panel';
import InfoCardHeader from '../Classes/InfoCardHeader';
import Spinner from '../UI/Spinner';
import { API_URL } from '../../globals';
import autoBind from '../../autoBind';
import { getDate, getTime, getWeekDays } from '../../helpers';
import '../../assets/css/Parent-Dash.css';

import * as Styled from './styles/StyledClassSignUp';

const StyledTableCell = withStyles({
  head: {
    backgroundColor: 'rgba(224, 224, 224, 1)'
  }
})(TableCell);

class ClassSignUpInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classOptions: [],
      selectedClass: null,
      children: [],
      selectedChildren: [],
      spotlight: null,
      isLoading: true,
      isProcessing: false,
      paymentSucceeded: false
    };
    autoBind(this);
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    if (pathname.length > '/parent/signup/'.length) {
      this.props.db
        .collection('classes')
        .doc(pathname.replace('/parent/signup/', ''))
        .get()
        .then(classDoc => {
          const classData = { ...classDoc.data(), id: classDoc.id, ref: classDoc.ref };
          this.setState({ spotlight: classData, isLoading: false });
        });
    }
    this.props.db
      .collection('classes')
      .get()
      .then(classDocs => {
        const newClasses = [];
        classDocs.forEach(classDoc => {
          const classData = {
            ...classDoc.data(),
            id: classDoc.id,
            ref: classDoc.ref
          };
          newClasses.push(classData);
        });
        this.setState({ classOptions: newClasses, isLoading: false });
      });
    const childrenData = [];
    this.props.db
      .collection('parents')
      .doc(this.props.user.uid)
      .get()
      .then(parentDoc => {
        const children = parentDoc.data().children || [];
        children.forEach(child => {
          child.get().then(childDoc => {
            const childData = { ...childDoc.data(), id: childDoc.id, ref: childDoc.ref };
            childrenData.push(childData);
            if (childrenData.length === children.length) {
              this.setState({ children: childrenData });
            }
          });
        });
      });
  }

  getClasses() {
    if (this.state.spotlight !== null) {
      return (
        <div className="class-container page-content">
          <h1>{`Signup For ${this.state.spotlight.name}`}</h1>
          <Paper className="infocard-wrapper only">
            <InfoCardHeader cls={this.state.spotlight} db={this.props.db}>
              {this.getButton(this.state.spotlight)}
            </InfoCardHeader>
          </Paper>
        </div>
      );
    }
    return (
      <div className="classes-container page-content">
        <h2>Choose A Class</h2>
        {this.state.isLoading ? (
          <Spinner color="primary" />
        ) : (
          this.state.classOptions.map(cls => (
            <ClassPanel key={cls.id} cls={cls} getButton={this.getButton} />
          ))
        )}
      </div>
    );
  }

  getButton(cls, style) {
    return (
      <Button
        onClick={() => {
          this.setState({ selectedClass: cls });
        }}
        disabled={cls.children.length >= cls.maxStudents}
        style={style || {}}
        variant="contained"
        color="primary"
      >
        Sign Up!
      </Button>
    );
  }

  getTotal() {
    const { selectedChildren, selectedClass } = this.state;
    if (selectedClass !== null)
      return selectedClass.price * selectedChildren.filter(c => !this.checkDisabled(c)).length;
    return 0;
  }

  checkToggle(child) {
    return this.state.selectedChildren.includes(child) || this.checkDisabled(child);
  }

  toggleChild(childId) {
    const { selectedChildren } = this.state;
    const index = selectedChildren.indexOf(childId);
    if (index === -1) {
      selectedChildren.push(childId);
    } else {
      selectedChildren.splice(index, 1);
    }
    this.setState({ selectedChildren });
  }

  async handleSubmit() {
    const { selectedClass, selectedChildren } = this.state;
    const { token } = await this.props.stripe.createToken({ name: 'Name' });
    this.setState({ isProcessing: true });
    console.log(token);
    if (token) {
      // eslint-disable-next-line
      fetch(`${API_URL}/charge`, {
        method: 'POST',
        body: JSON.stringify({
          token: token.id,
          classID: selectedClass.id,
          teacherID: selectedClass.teacher.id,
          parentID: this.props.user.uid,
          numberOfChildren: selectedChildren.filter(c => !this.checkDisabled(c)).length
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            const children = selectedClass.children || [];
            selectedChildren.forEach(child => {
              const classes = child.classes || [];
              classes.push(selectedClass.ref);
              child.ref.update({ classes });
              children.push(child.ref);
            });
            selectedClass.ref.update({ children });
            this.setState({ paymentSucceeded: true });
          } else {
            console.log(res);
          }
        })
        .catch(err => console.log(err));
    }
  }

  checkDisabled(child) {
    if (this.state.selectedClass !== null) {
      const children = this.state.selectedClass.children || [];
      return children.some(c => c.id === child.id);
    }
    return false;
  }

  render() {
    const { selectedClass, isProcessing, paymentSucceeded, children } = this.state;

    return (
      <div>
        {this.getClasses()}
        <Modal
          className="modal-wrapper"
          open={selectedClass !== null}
          onClose={() => {
            this.setState({ selectedClass: null });
          }}
          disableAutoFocus
        >
          {isProcessing ? (
            <Paper
              className="modal-content"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h2>
                {paymentSucceeded
                  ? 'Successfully Processed Payment!'
                  : 'Processing Payment with Stripe...'}
              </h2>
              {paymentSucceeded ? (
                <h4 style={{ maxWidth: '400px', margin: 0, opacity: 0.7 }}>
                  You can find more information regarding this class in the &quot;My Classes&quot;
                  Section of your dashboard.
                </h4>
              ) : null}
              <div
                style={{
                  marginTop: '28px',
                  position: 'relative'
                }}
              >
                <Fab
                  color={paymentSucceeded ? 'primary' : 'default'}
                  onClick={() =>
                    this.setState({
                      selectedClass: null,
                      selectedChildren: [],
                      isProcessing: false,
                      paymentSucceeded: false
                    })
                  }
                >
                  {paymentSucceeded ? <CheckIcon /> : <div />}
                </Fab>
                {!paymentSucceeded && (
                  <CircularProgress
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 1
                    }}
                  />
                )}
              </div>
            </Paper>
          ) : (
            <Paper className="modal-content">
              {selectedClass && (
                <div>
                  <h2>
                    Register for&nbsp;
                    {selectedClass.name}
                  </h2>
                  <Styled.TableWrapper>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>AGE</StyledTableCell>
                          <StyledTableCell>START DATE</StyledTableCell>
                          <StyledTableCell>DAY</StyledTableCell>
                          <StyledTableCell>TIME</StyledTableCell>
                          <StyledTableCell align="right">COST</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {`${selectedClass.startAge} - ${selectedClass.endAge}`}
                          </TableCell>
                          <TableCell>{`${getDate(selectedClass.startDate)}`}</TableCell>
                          <TableCell>{getWeekDays(selectedClass.daysOfWeek)}</TableCell>
                          <TableCell>
                            {`${getTime(selectedClass.startTime)} - ${getTime(
                              selectedClass.endTime
                            )}`}
                          </TableCell>
                          <TableCell align="right">{`$${selectedClass.price}`}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Styled.TableWrapper>
                  <p style={{ marginBottom: 0, color: 'grey' }}>Select Children to Register</p>
                  <List>
                    {children.map(child => {
                      return (
                        <ListItem
                          key={child.id}
                          button
                          onClick={() => this.toggleChild(child)}
                          disabled={this.checkDisabled(child)}
                        >
                          <ListItemAvatar>
                            <AccountIcon />
                          </ListItemAvatar>
                          <ListItemText primary={`${child.fName} ${child.lName}`} />
                          <Checkbox edge="end" checked={this.checkToggle(child)} />
                          <p style={{ marginLeft: 10 }}>{`$${selectedClass.price}`}</p>
                        </ListItem>
                      );
                    })}
                  </List>
                  <p style={{ textAlign: 'right', margin: '10px 16px 20px 0' }}>
                    <strong style={{ marginRight: '15px' }}>Total:</strong>
                    {`$${this.getTotal()}`}
                  </p>
                  {this.getTotal() > 0 ? (
                    <Styled.CardInfo>
                      <CardElement />
                    </Styled.CardInfo>
                  ) : null}
                  <Styled.ActionButtons>
                    <Button
                      onClick={() => {
                        this.setState({ selectedClass: null });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={this.getTotal() <= 0}
                      onClick={this.handleSubmit}
                      variant="contained"
                      color="primary"
                    >
                      Sign Up!
                    </Button>
                  </Styled.ActionButtons>
                </div>
              )}
            </Paper>
          )}
        </Modal>
      </div>
    );
  }
}

ClassSignUpInterface.propTypes = {
  db: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  stripe: PropTypes.object.isRequired
};

export default withRouter(injectStripe(ClassSignUpInterface));
