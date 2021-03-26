import React from 'react';
import PagesInterface from './interfaceHelpers/Pages';
import tutorials from '../../resources/tutorials';

const TutorialsInterface = () => <PagesInterface pages={tutorials} homePage="introduction" />;

export default TutorialsInterface;
