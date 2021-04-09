import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, CircularProgress } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MarkdownLink from './Link';
import CodeBlock from '../UI/CodeBlock';
import { resolveImg } from '../../resources/images';

const propTypes = {
  pages: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  useLoading: PropTypes.array.isRequired
};

const remarkPlugins = [gfm];

const MarkdownRenderer = ({ pages, page, useLoading }) => {
  const classes = useStyles();
  const [content, setContent] = useState('# Hello World');
  const [loading, setLoading] = useLoading;

  // Fetch page content.
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

  const fromInclude = value =>
    value
      .replace('{% include ', '')
      .replace('.md %}', '')
      .replace(/\//g, '.');

  /* eslint-disable */
  const mdRenderers = {
    heading: ({ level, children }) => <Typography variant={`h${level}`}>{children}</Typography>,
    text: ({ value }) => {
      if (value.startsWith('{% include') && value.endsWith('%}'))
        return (
          <MarkdownRenderer
            page={fromInclude(value)}
            pages={pages}
            useLoading={[false, () => {}]}
          />
        );
      return value;
    },
    code: ({ value, language }) => <CodeBlock code={value} lang={language} />,
    paragraph: ({ children }) => <div className={classes.p}>{children}</div>,
    image: ({ src, alt }) => {
      if (src.startsWith('/images/')) return <img src={resolveImg(src)} alt={alt} />;
      return <img src={src} alt={alt} />;
    },
    link: ({ href, target, children }) => {
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
    }
  };
  /* eslint-enable */

  return loading ? (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  ) : (
    <ReactMarkdown
      allowDangerousHtml
      linkTarget="_blank"
      plugins={remarkPlugins}
      renderers={mdRenderers}
    >
      {content}
    </ReactMarkdown>
  );
};
MarkdownRenderer.propTypes = propTypes;

const useStyles = makeStyles({
  loading: { width: '100%', display: 'flex', justifyContent: 'center' },
  p: {
    fontSize: '1.2rem',
    margin: '16px 0'
  }
});

export default MarkdownRenderer;
