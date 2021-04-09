import React from 'react';
import MarkdownPages from '../Markdown/Pages';
import docs from '../../resources/docs';

const DocumentationInterface = props => (
  <MarkdownPages pages={docs} homePage="welcome" whiteList="docs" {...props} />
);

export default DocumentationInterface;
