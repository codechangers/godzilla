import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, CircularProgress } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MarkdownLink from './Link';
import CheckOff from '../UI/CheckOff';
import GameSelect from '../UI/GameSelect';
import CodeBlock from '../UI/CodeBlock';
import DoubleCheck from '../UI/DoubleCheck';
import { resolveImg } from '../../resources/images';

const propTypes = {
  pages: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  useLoading: PropTypes.array.isRequired,
  whoAmI: PropTypes.object,
  cls: PropTypes.object
};

const defaultProps = {
  whoAmI: null,
  cls: null
};

const remarkPlugins = [gfm];

const MarkdownRenderer = ({ cls, whoAmI, pages, page, useLoading }) => {
  const classes = useStyles();
  const [content, setContent] = useState('# Hello World');
  const [loading, setLoading] = useLoading;

  /**
   * Fetch the current page content.
   */
  useEffect(() => {
    setContent('');
    setLoading(true);
    window.scrollTo(0, 0);
    const controller = new AbortController();
    let doc = pages;
    page.split('.').forEach(stop => {
      doc = doc[stop];
    });
    fetch(doc, { signal: controller.signal })
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        if (!(err instanceof DOMException)) console.error(err);
      });
    return () => controller.abort();
  }, [page]);

  /**
   * Get the page name from an include statement.
   */
  const fromInclude = value =>
    value
      .replace('{% include ', '')
      .replace('.md %}', '')
      .replace(/\//g, '.');

  /**
   * Render custom headings using material-ui Typography.
   */
  const heading = ({ level, children }) => (
    <Typography variant={`h${level}`}>{children}</Typography>
  );
  heading.propTypes = { level: PropTypes.number.isRequired, children: PropTypes.node.isRequired };

  /**
   * Render custom text that allows for the use of Jekyll like file includes.
   */
  const text = ({ value }) => {
    // Check for includes...
    if (value.startsWith('{% include') && value.endsWith('%}')) {
      return (
        <MarkdownRenderer page={fromInclude(value)} pages={pages} useLoading={[false, () => {}]} />
      );
    }
    // Return defaults to the text value.
    let textReturn = value;
    // Allow other tags to be checked.
    function checkTag(tag, parentElem, teacherElem) {
      if (value.trim() === tag) textReturn = whoAmI !== null ? parentElem : teacherElem;
    }
    // Check for checkoff tags...
    checkTag(
      '{% checkoff %}',
      <CheckOff page={page} whoAmI={whoAmI} cls={cls} />,
      <Typography variant="h6" color="secondary">
        Contestants will check off their game here.
      </Typography>
    );
    // Check for selectgame tags...
    checkTag(
      '{% selectgame %}',
      <GameSelect whoAmI={whoAmI} cls={cls} />,
      <Typography variant="h6" color="secondary">
        Contestants will select their game here.
      </Typography>
    );
    // Check for doublecheck tags...
    const doubleCheck = <DoubleCheck page={page} />;
    checkTag('{% doublecheck %}', doubleCheck, doubleCheck);
    return textReturn;
  };
  text.propTypes = { value: PropTypes.node.isRequired };

  /**
   * Render custom code blocks for multiline code.
   */
  const code = ({ value, language }) => <CodeBlock code={value} lang={language} />;
  code.propTypes = { value: PropTypes.node.isRequired, language: PropTypes.string.isRequired };

  /**
   * Render custom paragraphs as divs.
   * This is because includes cannot be a child of a paragraph tag.
   */
  const paragraph = ({ children }) => <div className={classes.p}>{children}</div>;
  paragraph.propTypes = { children: PropTypes.node.isRequired };

  /**
   * Render custom images that allow for local files to be accessed.
   */
  const image = ({ src, alt }) =>
    src.startsWith('/images/') ? (
      <img src={resolveImg(src)} alt={alt} />
    ) : (
      <img src={src} alt={alt} />
    );
  image.propTypes = { src: PropTypes.node.isRequired, alt: PropTypes.string.isRequired };

  /**
   * Render custom links that allow for routing via react-router.
   */
  const link = ({ href, target, children }) => {
    if (href.startsWith('/docs/'))
      return (
        <MarkdownLink type="docs" href={href}>
          {children}
        </MarkdownLink>
      );
    if (href.startsWith('/tutorials/'))
      return (
        <MarkdownLink type="tutorials" href={href}>
          {children}
        </MarkdownLink>
      );
    return (
      <a href={href} target={target} rel="noopener norefferer">
        {children}
      </a>
    );
  };

  return loading ? (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  ) : (
    <ReactMarkdown
      allowDangerousHtml
      linkTarget="_blank"
      plugins={remarkPlugins}
      renderers={{ heading, text, code, paragraph, image, link }}
    >
      {content}
    </ReactMarkdown>
  );
};
MarkdownRenderer.propTypes = propTypes;
MarkdownRenderer.defaultProps = defaultProps;

const useStyles = makeStyles({
  loading: { width: '100%', display: 'flex', justifyContent: 'center' },
  p: {
    fontSize: '1.2rem',
    margin: '16px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

export default MarkdownRenderer;
