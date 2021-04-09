import React from 'react';
import MarkdownFiles from '../Markdown/Files';
import tutorials from '../../resources/tutorials';

const TutorialsInterface = props => (
  <MarkdownFiles
    pages={tutorials}
    homePage="1) Full Day Overview"
    whiteList="tutorials"
    {...props}
  />
);

export default TutorialsInterface;
