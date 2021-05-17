import React from 'react';
import MarkdownPages from '../Markdown/Pages';
import tutorials from '../../resources/tutorials';

const TutorialsInterface = props => (
  <MarkdownPages pages={tutorials} homePage="1) Start 1" whiteList="tutorials" {...props} />
);

export default TutorialsInterface;
