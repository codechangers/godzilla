import React from 'react';
import PagesInterface from './interfaceHelpers/Pages';
import tutorials from '../../resources/tutorials';

const TutorialsInterface = props => (
  <PagesInterface
    pages={tutorials}
    homePage="1) Full Day Overview"
    whiteList="tutorials"
    {...props}
  />
);

export default TutorialsInterface;
