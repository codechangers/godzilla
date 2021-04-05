import React from 'react';
import PagesInterface from './interfaceHelpers/Pages';
import tutorials from '../../resources/tutorials';

const TutorialsInterface = props => (
  <PagesInterface pages={tutorials} homePage="start" whiteList="tutorials" {...props} />
);

export default TutorialsInterface;
