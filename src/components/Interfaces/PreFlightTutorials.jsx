import React from 'react';
import MarkdownPages from '../Markdown/Pages';
import { preFlight } from '../../resources/tutorials';

const PreFlightTutorialsInterface = props => (
  <MarkdownPages pages={preFlight} homePage="1) Start 1" doNotLock noClass {...props} />
);

export default PreFlightTutorialsInterface;
