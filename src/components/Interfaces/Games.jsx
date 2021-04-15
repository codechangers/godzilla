import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import * as Styled from './styles';

const propTypes = {
  useCustomAppBar: PropTypes.func.isRequired
};

const GamesInterface = ({ useCustomAppBar }) => {
  useEffect(() => {
    useCustomAppBar({
      title: 'Games',
      action: (
        <Button variant="outlined" onClick={() => {}} startIcon={<Add />}>
          New Game
        </Button>
      )
    });
  }, []);
  return (
    <Styled.PageContent>
      <Typography variant="h1">Games</Typography>
    </Styled.PageContent>
  );
};
GamesInterface.propTypes = propTypes;

export default GamesInterface;
