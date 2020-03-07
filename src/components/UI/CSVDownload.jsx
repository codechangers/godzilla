import React from 'react';
import PropTypes from 'prop-types';

const getHref = data => {
  let result = '';
  data.forEach((item, i) => {
    if (i > 0) result += '\n';
    const keys = Object.keys(item);
    if (i === 0) {
      result += keys.join(',');
      result += '\n';
    }
    keys.forEach((k, j) => {
      if (j > 0) result += ',';
      result += item[k];
    });
  });
  return encodeURI(`data:text/csv;charset=utf-8,${result}`);
};

const CSVDownload = ({ filename, data, children, disabled }) =>
  disabled ? (
    children
  ) : (
    <a href={getHref(data)} download={filename} style={{ textDecoration: 'none' }}>
      {children}
    </a>
  );

CSVDownload.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

CSVDownload.defaultProps = {
  children: [],
  disabled: false
};

export default CSVDownload;
