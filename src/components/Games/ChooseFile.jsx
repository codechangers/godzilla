import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { codeInfo } from '../../utils/gamesHelpers';
import { rgba } from '../../utils/helpers';

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string
};

const defaultProps = {
  error: false,
  helperText: ''
};

const ChooseFile = ({ value, onChange, onUpdate, error, helperText }) => {
  const [text, setText] = useState('');
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    const { name } = codeInfo(value);
    if (name) {
      setText(`${name}.zip`);
    }
  }, [value]);

  const onDrop = useCallback(
    acceptedFiles => {
      const [file] = acceptedFiles;
      if (
        file.type === 'application/zip' || // Mac, Linux, Chrome OS
        file.type === 'application/x-zip-compressed' // Windows
      ) {
        setFileError('');
        setText(file.name);
        if (value) {
          onUpdate(file);
        } else {
          onChange(file);
        }
      } else {
        setFileError('Invalid File Type!');
      }
    },
    [value, onChange, onUpdate]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const getValue = () => {
    let val = 'Code File';
    if (isDragActive) val = 'Drop File Here...';
    else if (text.length > 0) val = text;
    return val;
  };

  const classes = useStyles();
  return (
    <div className={classes.wrapper} {...getRootProps()}>
      <input {...getInputProps()} />
      <TextField
        label={text.length > 0 && 'Code File'}
        value={getValue()}
        variant="outlined"
        className={text ? classes.input : classes.inputLight}
        error={fileError.length > 0 || error}
        helperText={fileError || helperText}
      />
    </div>
  );
};

ChooseFile.propTypes = propTypes;
ChooseFile.defaultProps = defaultProps;

const useStyles = makeStyles({
  wrapper: {
    width: '80%'
  },
  input: {
    width: '100%',
    '& input': {
      color: rgba(255, 255, 255, 0.87)
    }
  },
  inputLight: {
    width: '100%',
    '& input': {
      color: rgba(255, 255, 255, 0.6)
    }
  }
});

export default ChooseFile;
