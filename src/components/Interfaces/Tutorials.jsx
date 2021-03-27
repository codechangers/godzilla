import React from 'react';
import PagesInterface from './interfaceHelpers/Pages';
import tutorials from '../../resources/tutorials';

const TutorialsInterface = props => (
  <PagesInterface pages={tutorials} homePage="introduction" {...props} />
);

export default TutorialsInterface;
