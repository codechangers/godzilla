import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Typography, Button } from '@material-ui/core';

import * as Styled from '../Pages/PageStyles/StyledSignUp';

const AccountType = ({ setAccountType, next }) => (
  <Styled.AccountType>
    <Styled.AccountSelectionSection>
      <Styled.Title>Select the type of Account you need</Styled.Title>
      <Styled.AccountSelectionCards>
        <Card>
          <CardHeader title="Parent Account" />
          <CardContent>
            <Typography variant="body2" component="p" style={{ marginBottom: 20 }}>
              Register your children and get them learning STEM today!
            </Typography>
            <Button
              onClick={() => {
                setAccountType('parent');
                next();
              }}
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up as a Parent
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Educator Account" />
          <CardContent>
            <Typography variant="body2" component="p" style={{ marginBottom: 20 }}>
              Start teaching technology to our world&apos;s future today!
            </Typography>
            <Button
              onClick={() => {
                setAccountType('teacher');
                next();
              }}
              fullWidth
              color="primary"
              variant="contained"
            >
              Sign Up as a Teacher
            </Button>
          </CardContent>
        </Card>
      </Styled.AccountSelectionCards>
    </Styled.AccountSelectionSection>
    <Styled.LinkButtonWrapper>
      <Styled.LinkButton
        onClick={() => {
          setAccountType('organization');
          next();
        }}
      >
        Need an Organization Account? Register Here
      </Styled.LinkButton>
    </Styled.LinkButtonWrapper>
  </Styled.AccountType>
);

AccountType.propTypes = {
  setAccountType: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
};

export default AccountType;
