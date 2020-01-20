import React from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, TextField, Card, CardHeader, CardContent } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import autoBind from '../../autoBind';
import { getUserData, validateFields, getErrorStatus, getDateFromTimestamp } from '../../helpers';
import * as Styled from './styles';
import { API_URL } from '../../globals';

const allFields = [
  'fName',
  'lName',
  'birthDate',
  'currentSchool',
  'currentGrade',
  'shirtSize',
  'gender'
];

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  addChildRef: PropTypes.func.isRequired,
  updateChildData: PropTypes.func,
  prevData: PropTypes.object
};

const defaultProps = {
  updateChildData: () => {},
  prevData: undefined
};

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

class ChildInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      birthDate: new Date(),
      currentSchool: '',
      currentGrade: '',
      shirtSize: '',
      gender: '',
      errors: {}
    };
    this.getUserData = getUserData;
    this.validateFields = validateFields;
    autoBind(this);
  }

  componentDidMount() {
    const { prevData } = this.props;
    if (prevData) {
      const newState = {
        ...prevData,
        birthDate: getDateFromTimestamp(prevData.birthDate),
        errors: {}
      };
      delete newState.ref;
      this.setState(newState);
    }
  }

  updateChild() {
    const childDoc = this.props.prevData;
    if (this.validateFields(allFields) === true) {
      childDoc.ref.update(this.getUserData(allFields));
      this.props.updateChildData({
        ...this.getUserData(allFields),
        birthDate: { seconds: this.state.birthDate.getTime() / 1000 },
        ref: childDoc.ref
      });
      this.props.handleClose();
    }
  }

  createChild() {
    if (this.validateFields(allFields) === true) {
      const user = this.props.firebase.auth().currentUser;
      if (user) {
        // eslint-disable-next-line
        fetch(`${API_URL}/get_uid`)
          .then(res => res.json())
          .then(res => {
            const learnID = res.uid;
            this.props.db
              .collection('children')
              .add({
                learnID,
                parent: this.props.db.collection('parents').doc(user.uid),
                ...this.getUserData(allFields)
              })
              .then(child => {
                this.props.addChildRef(this.props.db.collection('children').doc(child.id));
              });
          });
        this.props.handleClose();
      }
    }
  }

  handleChange(e) {
    const { id, name, value } = e.target;
    const newState = {};
    newState[id || name] = value;
    this.setState(newState);
  }

  render() {
    const { errors } = this.state;
    return (
      <Card>
        <CardHeader
          title="Parent Application"
          style={{
            marginLeft: 5,
            textTransform: 'capitalize',
            marginBottom: 18,
            textAlign: 'center'
          }}
        />
        <CardContent>
          <Styled.Subtitle>Child Information</Styled.Subtitle>
          <Styled.FormFieldsRow firstRow>
            <TextField
              error={getErrorStatus(errors.fName)}
              id="fName"
              type="text"
              label="Child's First Name"
              variant="outlined"
              className="input"
              helperText={errors.fName}
              value={this.state.fName}
              onChange={this.handleChange}
            />
            <TextField
              error={getErrorStatus(errors.lName)}
              id="lName"
              type="text"
              label="Child's Last Name"
              variant="outlined"
              className="input"
              helperText={errors.lName}
              value={this.state.lName}
              onChange={this.handleChange}
            />
          </Styled.FormFieldsRow>
          <Styled.FormFieldsRow>
            <TextField
              error={getErrorStatus(errors.gender)}
              id="gender"
              name="gender"
              select
              className="input"
              label="Child's Gender"
              variant="outlined"
              value={this.state.gender}
              onChange={this.handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <KeyboardDatePicker
              clearable
              className="birthdate-picker input"
              value={this.state.birthDate}
              placeholder="01/01/2001"
              onChange={date => this.setState({ birthDate: date })}
              minDate={new Date(y - 100, m, d)}
              label="Child's Birthdate"
              format="MM/dd/yyyy"
            />
          </Styled.FormFieldsRow>
          <Styled.FormFieldsRow firstRow>
            <TextField
              error={getErrorStatus(errors.currentSchool)}
              id="currentSchool"
              type="text"
              className="input"
              label="Child's Current School"
              variant="outlined"
              helperText={errors.currentSchool}
              value={this.state.currentSchool}
              onChange={this.handleChange}
            />
          </Styled.FormFieldsRow>
          <Styled.FormFieldsRow>
            <TextField
              error={getErrorStatus(errors.currentGrade)}
              id="currentGrade"
              name="currentGrade"
              select
              className="input"
              label="Child's Current Grade"
              variant="outlined"
              helperText={errors.currentGrade}
              value={this.state.currentGrade}
              onChange={this.handleChange}
            >
              <MenuItem value="ps">Pre-School</MenuItem>
              <MenuItem value="pk">Kindergarten</MenuItem>
              <MenuItem value="1st">1st Grade</MenuItem>
              <MenuItem value="2nd">2nd Grade</MenuItem>
              <MenuItem value="3rd">3rd Grade</MenuItem>
              <MenuItem value="4th">4th Grade</MenuItem>
              <MenuItem value="5th">5th Grade</MenuItem>
              <MenuItem value="6th">6th Grade</MenuItem>
              <MenuItem value="7th">7th Grade</MenuItem>
              <MenuItem value="8th">8th Grade</MenuItem>
              <MenuItem value="9th">9th Grade</MenuItem>
              <MenuItem value="10th">10th Grade</MenuItem>
              <MenuItem value="11th">11th Grade</MenuItem>
              <MenuItem value="12th">12th Grade</MenuItem>
            </TextField>
            <TextField
              error={getErrorStatus(errors.shirtSize)}
              id="shirtSize"
              name="shirtSize"
              select
              className="input"
              label="Child's Shirt Size"
              variant="outlined"
              helperText={errors.shirtSize}
              value={this.state.shirtSize}
              onChange={this.handleChange}
            >
              <MenuItem value="ysm">Youth Small</MenuItem>
              <MenuItem value="ymd">Youth Medium</MenuItem>
              <MenuItem value="ylr">Youth Large</MenuItem>
              <MenuItem value="yxl">Youth XL</MenuItem>
              <MenuItem value="axs">Adult XS</MenuItem>
              <MenuItem value="asm">Adult Small</MenuItem>
              <MenuItem value="amd">Adult Medium</MenuItem>
              <MenuItem value="alr">Adult Large</MenuItem>
              <MenuItem value="axl">Adult XL</MenuItem>
              <MenuItem value="axxl">Adult XXL</MenuItem>
              <MenuItem value="axxxl">Adult XXXL</MenuItem>
            </TextField>
          </Styled.FormFieldsRow>
          <Styled.NavigationButtons style={{ boxSizing: 'border-box', padding: 5 }}>
            <Button onClick={this.props.handleClose} variant="contained">
              Cancel
            </Button>
            <Button
              onClick={this.props.prevData ? this.updateChild : this.createChild}
              variant="contained"
              color="primary"
            >
              {this.props.prevData ? 'Update Child' : 'Add Child'}
            </Button>
          </Styled.NavigationButtons>
        </CardContent>
      </Card>
    );
  }
}

ChildInfo.propTypes = propTypes;
ChildInfo.defaultProps = defaultProps;

export default ChildInfo;
