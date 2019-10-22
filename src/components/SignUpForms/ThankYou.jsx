import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import * as Styled from '../Pages/PageStyles/StyledSignUp';

const ThankYou = ({ next }) => (
  <Styled.SignUpSuccess>
    <Styled.Title style={{ marginTop: 0 }}>Thank You!</Styled.Title>
    <p>
      Commodo in dolore in officia laborum et. Magna laboris aute aliqua eiusmod ullamco incididunt
      anim pariatur. Occaecat qui enim duis dolore cillum sint nostrud sint est eu veniam aute.
      Veniam do occaecat pariatur duis dolor qui veniam nostrud elit culpa nostrud officia irure
      tempor. Sint id amet excepteur non Lorem ut. Non amet aute voluptate exercitation dolore
      tempor officia culpa.
    </p>
    <Button fullWidth variant="contained" color="primary" onClick={next}>
      GO to login page
    </Button>
  </Styled.SignUpSuccess>
);

ThankYou.propTypes = {
  next: PropTypes.func.isRequired
};

export default ThankYou;
