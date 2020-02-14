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
  TableCell,
  TextField,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import { CardElement, injectStripe } from 'react-stripe-elements';
import ClassPanel from '../Classes/Panel';
import InfoCardHeader from '../Classes/InfoCardHeader';
import Spinner from '../UI/Spinner';
import { API_URL } from '../../globals';
import autoBind from '../../autoBind';
import { getDate, getTime, getWeekDays, calcSessions } from '../../helpers';

import * as Styled from './styles';

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
      paymentSucceeded: false,
      paymentFailed: false,
      paymentError: '',
      invalidPayment: '',
      promoCode: '',
      promoError: '',
      promoDoc: null
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
        <div>
          <Typography variant="h3">Class Search</Typography>
          <Paper>
            <InfoCardHeader cls={this.state.spotlight} db={this.props.db}>
              {this.getButton(this.state.spotlight)}
            </InfoCardHeader>
          </Paper>
        </div>
      );
    }
    return (
      <div>
        <Typography variant="h3">Choose A Class</Typography>
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
    const { selectedChildren, selectedClass, promoDoc } = this.state;
    let total = 0;
    if (selectedClass !== null) {
      const registrations = selectedChildren.filter(c => !this.checkDisabled(c)).length;
      if (promoDoc !== null) {
        const { discountType, discountAmount, uses, limited } = promoDoc;
        if (discountType === '$') {
          total =
            registrations > uses && limited
              ? (selectedClass.price - discountAmount >= 0
                  ? selectedClass.price - discountAmount
                  : 0 * uses) +
                selectedClass.price * (registrations - uses)
              : (selectedClass.price - discountAmount) * registrations;
        } else {
          total =
            registrations > uses && limited
              ? selectedClass.price * (0.01 * discountAmount) * uses +
                selectedClass.price * registrations -
                uses
              : selectedClass.price * (0.01 * discountAmount) * registrations;
        }
      } else {
        total = selectedClass.price * registrations;
      }
    }
    if (total < 0) {
      total = 0;
    }
    return total;
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
    const { selectedClass, selectedChildren, promoDoc } = this.state;
    let token;
    let errorMessage = 'Invalid Payment Information!';
    if (this.getTotal() > 0) {
      const stripePayment = await this.props.stripe.createToken({ name: 'Name' });
      token = stripePayment.token;
      if (stripePayment.error) {
        errorMessage = stripePayment.error.message;
      }
    }
    if ((this.getTotal() > 0 && token) || this.getTotal() === 0) {
      this.setState({ isProcessing: true, invalidPayment: '', paymentError: '' });
      // eslint-disable-next-line
      fetch(`${API_URL}/charge`, {
        method: 'POST',
        body: JSON.stringify({
          token: token ? token.id : '1234',
          classID: selectedClass.id,
          teacherID: selectedClass.teacher.id,
          parentID: this.props.user.uid,
          promoId: promoDoc !== null ? promoDoc.id : '1234',
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
          } else if (res.error) {
            console.log(res.error);
            if (res.error.code === 'card_declined') {
              this.setState({ isProcessing: false, invalidPayment: 'Your Card was Declined.' });
            } else {
              this.setState({ paymentFailed: true, paymentError: res.error.message });
            }
          } else {
            console.log(res);
            this.setState({ paymentFailed: true });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ paymentFailed: true });
        });
    } else {
      this.setState({ isProcessing: false, invalidPayment: errorMessage });
    }
  }

  setPromo(e) {
    this.setState({ promoCode: e.target.value });
  }

  applyPromo() {
    this.props.db
      .collection('promos')
      .where('code', '==', this.state.promoCode)
      .get()
      .then(qSnap => {
        qSnap.forEach(doc => {
          if (
            doc.exists &&
            doc.data().teacher.id === this.state.selectedClass.teacher.id &&
            doc.data().active &&
            !doc.data().deletedOn
          ) {
            this.setState({
              promoDoc: { ...doc.data(), id: doc.id, ref: doc.ref },
              promoCode: '',
              promoError: ''
            });
          } else {
            this.setState({ promoError: 'Invalid Promo Code' });
          }
        });
        if (qSnap.empty) {
          this.setState({ promoError: 'Invalid Promo Code' });
        }
      });
  }

  getPromoUses() {
    const { promoDoc, selectedChildren } = this.state;
    const registrations = selectedChildren.filter(c => !this.checkDisabled(c)).length;
    if (promoDoc !== null) {
      if (promoDoc.limited && registrations > promoDoc.uses) {
        return `${promoDoc.code} applied to ${promoDoc.uses} registration${
          promoDoc.uses === 1 ? '' : 's'
        } (redeemed max amount times)`;
      } else {
        return `${promoDoc.code} applied to ${registrations} registration${
          registrations === 1 ? '' : 's'
        }`;
      }
    }
    return '';
  }

  checkDisabled(child) {
    if (this.state.selectedClass !== null) {
      const children = this.state.selectedClass.children || [];
      return children.some(c => c.id === child.id);
    }
    return false;
  }

  render() {
    const { classes } = this.props;
    const { selectedClass, isProcessing, paymentSucceeded, paymentFailed, children } = this.state;
    return (
      <Styled.PageContent>
        <div>
          {this.getClasses()}
          <Modal
            className={classes.modalWrapper}
            open={selectedClass !== null}
            onClose={() => {
              this.setState({ selectedClass: null });
            }}
            disableAutoFocus
          >
            {isProcessing ? (
              <Paper
                className={classes.modalContent}
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
                    : paymentFailed
                    ? 'Payment process failed!'
                    : 'Processing Payment with Stripe...'}
                </h2>
                {paymentSucceeded ? (
                  <h4 style={{ maxWidth: '400px', margin: 0, opacity: 0.7 }}>
                    You can find more information regarding this class in the &quot;My Classes&quot;
                    Section of your dashboard.
                  </h4>
                ) : paymentFailed ? (
                  <h4 style={{ maxWidth: '400px', margin: 0, opacity: 0.7 }}>
                    {this.state.paymentError.length > 0
                      ? this.state.paymentError
                      : 'An error occured while attempting to process your payment. Please try again at a later time.'}
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
                    {paymentSucceeded ? <CheckIcon /> : paymentFailed ? <CloseIcon /> : <div />}
                  </Fab>
                  {!paymentSucceeded && !paymentFailed && (
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
              <Paper className={classes.modalContent}>
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
                            <StyledTableCell>
                              {selectedClass.daysOfWeek.length > 1 ? 'DAYS' : 'DAY'}
                            </StyledTableCell>
                            <StyledTableCell>TIME</StyledTableCell>
                            <StyledTableCell>SESSIONS</StyledTableCell>
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
                            <TableCell>{getTime(selectedClass.startTime)}</TableCell>
                            <TableCell>{calcSessions(selectedClass)}</TableCell>
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
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxSizing: 'border-box',
                        padding: '10px 20px 20px 20px'
                      }}
                    >
                      {this.state.promoDoc !== null ? (
                        <p
                          style={{
                            fontSize: '1rem',
                            margin: '15px 0 0 0',
                            lineHeight: '20px'
                          }}
                        >
                          <strong>{this.state.promoDoc.code}</strong>
                          {' - '}
                          {this.state.promoDoc.discountType === '$'
                            ? `$${this.state.promoDoc.discountAmount}`
                            : `${this.state.promoDoc.discountAmount}%`}{' '}
                          off each student!
                          <Tooltip title="Remove Discount" placement="top">
                            <IconButton
                              style={{ margin: '0 0 3px 10px' }}
                              aria-label="Remove Discount"
                              size="small"
                              onClick={() => this.setState({ promoDoc: null })}
                            >
                              <ClearIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                          <br />
                          <span
                            style={{
                              fontSize: '0.8rem',
                              color: 'rgba(0,0,0,0.7)',
                              lineHeight: '12px'
                            }}
                          >
                            {this.getPromoUses()}
                          </span>
                        </p>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '14px'
                          }}
                        >
                          <TextField
                            label="Promo Code"
                            onChange={this.setPromo}
                            value={this.state.promoCode}
                            helperText={this.state.promoError}
                            error={this.state.promoError.length > 0}
                          />
                          <Tooltip title="Apply Discount" placement="top">
                            <IconButton
                              style={{ margin: '12px 0 0 10px' }}
                              aria-label="Apply Discount"
                              size="small"
                              color="primary"
                              onClick={this.applyPromo}
                            >
                              <SendIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      )}
                      <p style={{ fontSize: '1rem', margin: '16px 0', lineHeight: '20px' }}>
                        <strong style={{ marginRight: '15px' }}>Total:</strong>
                        {`$${this.getTotal()}`}
                      </p>
                    </div>
                    {this.getTotal() > 0 && (
                      <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
                        {this.state.invalidPayment}
                      </p>
                    )}
                    {this.getTotal() > 0 ? (
                      <Styled.CardInfo
                        style={this.state.invalidPayment ? { border: '1px solid red' } : null}
                      >
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
                        disabled={
                          this.state.selectedChildren.filter(c => !this.checkDisabled(c)).length <=
                          0
                        }
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
      </Styled.PageContent>
    );
  }
}

ClassSignUpInterface.propTypes = {
  db: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  stripe: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  modalContent: {
    padding: 40,
    minWidth: 400,
    maxHeight: '100%',
    overflow: 'scroll',
    outline: 'none'
  }
});

const StyledClassSignUpInterface = withStyles(styles)(ClassSignUpInterface);

export default withRouter(injectStripe(StyledClassSignUpInterface));
