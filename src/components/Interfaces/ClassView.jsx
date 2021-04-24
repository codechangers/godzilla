import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import WhoAmIButton from './interfaceHelpers/WhoAmIButton';

const propTypes = {
  whoAmI: PropTypes.object.isRequired,
  setWhoAmI: PropTypes.func.isRequired,
  useCustomAppBar: PropTypes.func.isRequired
};

const ClassViewInterface = ({ whoAmI, setWhoAmI, useCustomAppBar }) => {
  useEffect(
    () =>
      useCustomAppBar({
        title: 'My Classes',
        content: <WhoAmIButton whoAmI={whoAmI} setWhoAmI={setWhoAmI} />
      }),
    [whoAmI]
  );
  return <div>Hello World</div>;
};
ClassViewInterface.propTypes = propTypes;

export default ClassViewInterface;
