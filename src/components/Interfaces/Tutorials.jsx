import React from 'react';
import MarkdownPages from '../Markdown/Pages';
import tutorials, { PICK_A_GAME } from '../../resources/tutorials';

const TutorialsInterface = props => (
  <MarkdownPages pages={tutorials} homePage={PICK_A_GAME} whiteList="tutorials" {...props} />
);

export default TutorialsInterface;
