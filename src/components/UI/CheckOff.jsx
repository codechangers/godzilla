import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { getLiveCheckOffData } from '../../hooks/items';

const propTypes = {
  page: PropTypes.string.isRequired
};

const CheckOff = ({ page }) => {
  const checkOff = getLiveCheckOffData(page);
  React.useEffect(() => console.log(checkOff), [checkOff]);
  return checkOff !== null ? (
    <div>Checking Off: {page}</div>
  ) : (
    <Button variant="contained" color="primary" onClick={() => {}}>
      Check Off
    </Button>
  );
};
CheckOff.propTypes = propTypes;

export default CheckOff;
