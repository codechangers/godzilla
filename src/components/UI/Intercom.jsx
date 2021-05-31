import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntercom } from 'react-use-intercom';
import { auth } from '../../utils/firebase';

const propTypes = {
  show: PropTypes.bool,
  whoAmI: PropTypes.object
};

const defaultProps = {
  show: false,
  whoAmI: null
};

const Intercom = ({ show, whoAmI }) => {
  const [currentName, setCurrent] = useState('');
  const { boot, shutdown } = useIntercom();

  // Get name from data.
  const name = useMemo(() => {
    let n = '';
    const displayName = auth.currentUser?.displayName;
    if (whoAmI) n = `${whoAmI.fName} ${whoAmI.lName}`;
    else if (displayName) n = displayName;
    return n;
  }, [auth.currentUser, whoAmI]);

  // Set name if applicable.
  const bootWithName = () => {
    if (name !== '') boot({ name });
    else boot();
  };

  // Set button visibility.
  const setVisible = visible => {
    const interWrap =
      document.querySelector('.intercom-lightweight-app') ||
      document.querySelector('#intercom-container');
    if (interWrap) interWrap.style.display = visible ? 'block' : 'none';
  };

  // Handle intercom API calls.
  useEffect(() => {
    if (show && currentName !== name) {
      // Reset conversation when name changes.
      shutdown();
      bootWithName();
      setCurrent(name);
    } else if (show) setVisible(true);
    else setVisible(false);
    return shutdown;
  }, [show, name]);

  return <div style={{ display: 'none' }} />;
};
Intercom.propTypes = propTypes;
Intercom.defaultProps = defaultProps;

export default Intercom;
