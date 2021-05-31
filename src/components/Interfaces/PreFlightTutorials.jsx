import React from 'react';
import { useHistory } from 'react-router-dom';
import MarkdownPages from '../Markdown/Pages';
import { preFlight } from '../../resources/tutorials';

const PreFlightTutorialsInterface = props => {
  const history = useHistory();
  return (
    <MarkdownPages
      pages={preFlight}
      homePage="1) Start 1"
      lastNext={() => history.push('/parent')}
      doNotLock
      noClass
      {...props}
    />
  );
};

export default PreFlightTutorialsInterface;
