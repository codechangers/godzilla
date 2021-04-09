import React from 'react';
import MarkdownFiles from '../Markdown/Files';
import docs from '../../resources/docs';

const DocumentationInterface = props => (
  <MarkdownFiles pages={docs} homePage="welcome" whiteList="docs" {...props} />
);

export default DocumentationInterface;
