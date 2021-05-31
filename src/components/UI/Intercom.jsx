import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntercom } from 'react-use-intercom';

const propTypes = {
  show: PropTypes.bool
};

const defaultProps = {
  show: false
};

const Intercom = ({ show }) => {
  const { boot, shutdown } = useIntercom();

  useEffect(() => {
    if (show) boot();
    else shutdown();
  }, [show]);

  return <div style={{ display: 'none' }} />;
};
Intercom.propTypes = propTypes;
Intercom.defaultProps = defaultProps;

export default Intercom;
