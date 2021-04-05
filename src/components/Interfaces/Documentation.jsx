import React from 'react';
import PagesInterface from './interfaceHelpers/Pages';
import docs from '../../resources/docs';

const DocumentationInterface = props => (
  <PagesInterface pages={docs} homePage="welcome" whiteList="docs" {...props} />
);

export default DocumentationInterface;
