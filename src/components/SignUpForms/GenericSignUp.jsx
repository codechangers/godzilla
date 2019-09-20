import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox, TextField } from '@material-ui/core';
import { getErrorStatus } from '../../helpers';

import * as Styled from '../Pages/PageStyles/StyledSignUp';

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  toggleCanText: PropTypes.func.isRequired,
  state: PropTypes.shape({
    fName: PropTypes.string.isRequired,
    lName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    canText: PropTypes.bool.isRequired
  }).isRequired
};

const GenericSignUp = ({ handleChange, state, toggleCanText }) => (
  <Styled.FormFieldsContainer>
    <Styled.FormFeildsRow firstRow>
      <TextField
        error={getErrorStatus(state.errors.fName)}
        id="firstName"
        type="text"
        label="First Name"
        variant="outlined"
        helperText={state.errors.fName}
        value={state.fName}
        onChange={handleChange}
      />
      <TextField
        error={getErrorStatus(state.errors.lName)}
        id="lastName"
        type="text"
        label="Last Name"
        variant="outlined"
        helperText={state.errors.lName}
        value={state.lName}
        onChange={handleChange}
      />
    </Styled.FormFeildsRow>
    <Styled.FormFeildsRow>
      <TextField
        error={getErrorStatus(state.errors.phone)}
        id="phone"
        type="text"
        label="Phone"
        variant="outlined"
        helperText={state.errors.phone}
        value={state.phone}
        onChange={handleChange}
      />
      <TextField
        error={getErrorStatus(state.errors.email)}
        id="Email"
        type="text"
        label="Email Address"
        variant="outlined"
        helperText={state.errors.email}
        value={state.email}
        onChange={handleChange}
      />
    </Styled.FormFeildsRow>
    <Styled.CheckboxRow>
      <FormControlLabel
        control={
          <Checkbox id="canText" checked={state.canText} onChange={toggleCanText} color="primary" />
        }
        label="Phone can Text"
      />
    </Styled.CheckboxRow>
  </Styled.FormFieldsContainer>
);

GenericSignUp.propTypes = propTypes;

export default GenericSignUp;
