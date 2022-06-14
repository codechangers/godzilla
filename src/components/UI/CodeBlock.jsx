import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button, Typography, Tooltip, IconButton } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import { rgba } from '../../utils/helpers';

const propTypes = {
  width: PropTypes.string.isRequired,
  code: PropTypes.node.isRequired,
  lang: PropTypes.string
};

const defaultProps = { lang: 'javascript' };

const COMMANDS = {
  // fileName works on the first line only.
  fileName: '// File: ',
  startCopy: '// Copy\n',
  endCopy: '// End Copy\n',
  startRemove: '/*{*/',
  endRemove: '/*}*/',
  // Use replace to abbreviate back to back endRemove and startAdd.
  replace: '/*}[*/',
  startAdd: '/*[*/',
  endAdd: '/*]*/'
};

SyntaxHighlighter.registerLanguage('javascript', js);

/**
 * TODO: Refactor animation logic.
 * It should parse out all marking comments first and then chain together a list of animations to run.
 * It currently recursively searches for comments one by one, which leads to cryptic behavior.
 */
const CodeBlock = ({ code, lang, width }) => {
  const classes = useStyles();
  const [cleanCode, setCleanCode] = useState('');
  const [copyCode, setCopyCode] = useState('');
  const defaultTitle = 'Code Block';
  const [title, setTitle] = useState(defaultTitle);
  const speed = 100;

  useEffect(() => {
    let currentCode = code;
    const cmds = COMMANDS;
    // Handle fileName comment.
    const firstLine = currentCode.split('\n')[0];
    const hasFileName = firstLine.startsWith(cmds.fileName);
    const fileName = firstLine.replace(cmds.fileName, '');
    if (hasFileName) {
      setTitle(fileName);
      currentCode = removeFirstLine(currentCode);
    } else setTitle(defaultTitle);
    // Handle copy comment.
    const startCopy = currentCode.indexOf(cmds.startCopy);
    const endCopy = currentCode.indexOf(cmds.endCopy);
    if (startCopy !== -1 && endCopy !== -1) {
      const toCopy = currentCode.substr(startCopy, endCopy).replace(cmds.startCopy, '');
      setCopyCode(toCopy);
      currentCode = currentCode.replace(cmds.startCopy + toCopy + cmds.endCopy, '');
    } else setCopyCode(currentCode);
    // Handle replace, remove, add comments.
    const parsed = parseAnims(currentCode);
    if (parsed.length > 0 && parsed[0].insertIndex !== -1) animateCode(parsed, Date.now() - speed);
    else setCleanCode(currentCode);
  }, [code]);

  const parseAnims = currentCode => {
    // eslint-disable-next-line
    let before, next, cd, after, oldCode, newCode, extras;
    const cmds = COMMANDS;
    let insertIndex = -1;
    let cmdCase = -1; // 0: Replace; 1: Remove; 2: Add;
    let cleanExtras = false;
    const addIndex = currentCode.indexOf(cmds.startAdd);
    const remIndex = currentCode.indexOf(cmds.startRemove);
    const addFirst = addIndex !== -1 && remIndex !== -1 && addIndex < remIndex;
    if (
      !addFirst &&
      remIndex !== -1 &&
      currentCode.indexOf(cmds.replace) !== -1 &&
      currentCode.indexOf(cmds.endAdd) !== -1
    ) {
      // Replace Case
      const all = currentCode.split(cmds.startRemove);
      extras = all.slice(2);
      [before, next] = all;
      [cd, after] = next.split(cmds.endAdd);
      [oldCode, newCode] = cd.split(cmds.replace);
      currentCode = before + after;
      insertIndex = before.length;
      cmdCase = 0;
    } else if (!addFirst && remIndex !== -1 && currentCode.indexOf(cmds.endRemove) !== -1) {
      // Remove Case
      const all = currentCode.split(cmds.startRemove);
      extras = all.slice(2);
      [before, next] = all;
      [oldCode, after] = next.split(cmds.endRemove);
      insertIndex = currentCode.indexOf(cmds.startRemove);
      currentCode = before + after;
      cmdCase = 1;
    } else if (addIndex !== -1 && currentCode.indexOf(cmds.endAdd) !== -1) {
      // Add Case
      const all = currentCode.split(cmds.startAdd);
      extras = all.slice(2);
      [before, next] = all;
      [newCode, after] = next.split(cmds.endAdd);
      insertIndex = currentCode.indexOf(cmds.startAdd);
      currentCode = before + after;
      cmdCase = 2;
    }
    if (extras && extras.length === 0) {
      extras = [after];
      cleanExtras = true;
      currentCode = before;
    }
    const extraCmds = [cmds.startRemove, cmds.startRemove, cmds.startAdd];
    const doubleCheckCmds = [cmds.startAdd, cmds.startAdd, cmds.startRemove];
    const parsedExtras = [];
    extras = extras || [];
    extras.forEach(e => {
      const moreExtras = (cleanExtras ? e : extraCmds[cmdCase] + e).split(doubleCheckCmds[cmdCase]);
      moreExtras.forEach((me, i) => {
        parsedExtras.push(...parseAnims(i !== 0 ? doubleCheckCmds[cmdCase] + me : me));
      });
    });
    return [{ currentCode, insertIndex, oldCode, newCode }, ...parsedExtras];
  };

  const animateCode = (
    animations,
    lastUpdate = null,
    animIndex = 0,
    oldIndex = -1,
    newIndex = -1,
    moreBefore = '',
    moreAfter = ''
  ) => {
    const anim = animations[animIndex];
    const { currentCode, insertIndex, oldCode, newCode } = anim;
    let nextFrame = false;
    const now = Date.now();
    lastUpdate = lastUpdate || now;
    const dt = now - lastUpdate;
    if (dt >= speed) {
      const before = moreBefore + currentCode.substr(0, insertIndex);
      const after = currentCode.substr(insertIndex, currentCode.length) + moreAfter;
      if (oldCode !== undefined) {
        // Delete a single character from the oldCode.
        nextFrame = true;
        const oi = oldIndex === -1 ? oldCode.length : oldIndex;
        setCleanCode(before + oldCode.slice(0, oi) + after);
        if (oi - 1 < 0) anim.oldCode = undefined;
        else oldIndex = oi - 1;
      } else if (newCode !== undefined) {
        // Add a single character from the newCode.
        nextFrame = true;
        const ni = newIndex === -1 ? 0 : newIndex;
        setCleanCode(before + newCode.slice(0, ni) + after);
        if (ni + 1 > newCode.length) {
          anim.aNewCode = anim.newCode;
          anim.newCode = undefined;
        } else newIndex = ni + 1;
      }
    }
    animations[animIndex] = anim;
    const continueAnim = (ai = animIndex) => {
      const moreBef =
        ai > 0
          ? animations
              .slice(0, ai)
              .map(
                a =>
                  a.currentCode.slice(0, a.insertIndex) +
                  (a.aNewCode || '') +
                  a.currentCode.slice(a.insertIndex)
              )
              .join('')
          : '';
      const moreAf =
        ai < animations.length
          ? animations
              .slice(ai + 1, animIndex.length)
              .map(
                a =>
                  a.currentCode.slice(0, a.insertIndex) +
                  (a.oldCode || '') +
                  a.currentCode.slice(a.insertIndex)
              )
              .join('')
          : '';
      requestAnimationFrame(() =>
        animateCode(
          animations,
          nextFrame ? Date.now() : lastUpdate,
          ai,
          ai === animIndex ? oldIndex : -1,
          ai === animIndex ? newIndex : -1,
          moreBef,
          moreAf
        )
      );
    };
    if (nextFrame || dt < speed) continueAnim();
    else if (animIndex + 1 < animations.length) continueAnim(animIndex + 1);
  };

  const removeFirstLine = c =>
    c
      .split('\n')
      .slice(1, c.length - 1)
      .join('\n');

  const highlight = c => (
    <SyntaxHighlighter
      language={lang || 'javascript'}
      style={atomDark}
      customStyle={{
        borderRadius: '0',
        margin: 0,
        padding: '0 12px',
        tabSize: '2'
      }}
    >
      {c}
    </SyntaxHighlighter>
  );

  return (
    <div className={classes.codeBlock}>
      <div className={classes.codeBlockHeader}>
        <Typography
          variant="body1"
          style={{
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {title !== defaultTitle && <FolderIcon style={{ marginRight: 12 }} />}
          <span
            style={{
              float: 'right',
              direction: 'rtl',
              marginRight: 12,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {title}
          </span>
        </Typography>
        {isWidthDown('xs', width) ? (
          <Tooltip title="Copy Code" placement="top">
            <CopyToClipboard text={copyCode}>
              <IconButton color="secondary">
                <CopyIcon />
              </IconButton>
            </CopyToClipboard>
          </Tooltip>
        ) : (
          <CopyToClipboard text={copyCode}>
            <Button color="secondary" startIcon={<CopyIcon />}>
              Copy Code
            </Button>
          </CopyToClipboard>
        )}
      </div>
      <div className={classes.codeBlockText}>{highlight(cleanCode)}</div>
    </div>
  );
};
CodeBlock.propTypes = propTypes;
CodeBlock.defaultProps = defaultProps;

const useStyles = makeStyles({
  codeBlock: {
    padding: '12px 0',
    '& code': { fontSize: '100%' }
  },
  codeBlockHeader: {
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '0.3em 0.3em 0 0',
    backgroundColor: 'rgb(29, 31, 33)',
    marginTop: 12,
    padding: '6px 18px',
    borderBottom: `solid ${rgba(255, 255, 255, 0.1)} 2px`
  },
  codeBlockText: {
    maxWidth: '100%',
    boxSizing: 'border-box',
    padding: '12px 0',
    backgroundColor: 'rgb(29, 31, 33)',
    borderRadius: '0 0 0.3em 0.3em'
  }
});

export default withWidth()(CodeBlock);
