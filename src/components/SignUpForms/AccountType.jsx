import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Typography, Button } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import * as Styled from '../Pages/PageStyles/StyledSignUp';

const getHeaderStyle = width =>
  isWidthDown('md', width)
    ? isWidthDown('sm', width)
      ? { fontSize: 22 }
      : { fontSize: 45 }
    : { fontSize: 60, marginBottom: 32 };

const AccountType = ({ setAccountType, next, width }) => (
  <Styled.AccountType>
    <Styled.AccountSelectionSection>
      <Typography variant="h2" style={getHeaderStyle(width)}>
        Select the type of Account you need
      </Typography>
      <Styled.AccountSelectionCards>
        <Card style={{ width: '40%', minWidth: '300px' }}>
          <CardHeader title="Parent Account" className="small-icon" />
          <CardContent>
            <Typography
              variant="body2"
              component="p"
              style={{ fontSize: '18px', marginBottom: 20 }}
            >
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
        <Card style={{ width: '40%', minWidth: '300px' }}>
          <CardHeader title="Educator Account" />
          <CardContent>
            <Typography
              variant="body2"
              component="p"
              style={{ fontSize: '18px', marginBottom: 20 }}
            >
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
  next: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(AccountType);
