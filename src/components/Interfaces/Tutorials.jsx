import React from 'react';
import MarkdownPages from '../Markdown/Pages';
import tutorials, { preFlight, PICK_A_GAME } from '../../resources/tutorials';

const TutorialsInterface = props => (
  <MarkdownPages
    pages={tutorials}
    includes={preFlight}
    homePage={PICK_A_GAME}
    whiteList="tutorials"
    {...props}
  />
);

export default TutorialsInterface;
