import React from 'react';
import PagesInterface from './interfaceHelpers/Pages';
import docs from '../../resources/docs';

const DocumentationInterface = () => <PagesInterface pages={docs} homePage="welcome" />;

export default DocumentationInterface;
