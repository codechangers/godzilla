import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  type: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const MarkdownLink = ({ type, href, children }) => {
  const pref = l => l.pathname.split('/')[1];
  const page = t => href.replace(t, '').replace(/\//g, '.');
  const clean = p => (p[p.length - 1] === '.' ? p.slice(0, p.length - 1) : p);
  return (
    <Link
      to={location => ({
        pathname: `/${pref(location)}/${type}`,
        search: `?page=${clean(page('/' + type + '/'))}`
      })}
    >
      {children}
    </Link>
  );
};
MarkdownLink.propTypes = propTypes;

export default MarkdownLink;
