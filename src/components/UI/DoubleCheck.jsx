import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, makeStyles } from '@material-ui/core';
import Modal from './Modal';
import codeImgs from '../../resources/codeImgs';

const propTypes = {
  page: PropTypes.string.isRequired
};

const toImg = page => {
  const parts = page.split('.');
  const a = parts[parts.length - 1].replace(/\s+/g, '').replace('✓', '');
  return codeImgs[a];
};

const DoubleCheck = ({ page }) => {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(null);
  const [title, setTitle] = useState('');
  const [gameSrc, roomSrc] = useMemo(() => toImg(page), [page]);
  const classes = useStyles();

  const open = (src, t) => {
    setCurrent(src);
    setShow(true);
    setTitle(t);
  };

  return (
    <div className={classes.wrapper}>
      <Typography variant="h6">Double Check Your Code!</Typography>
      <Typography variant="body1">
        Here is what our code looked like after completing this step:{' '}
        <button onClick={() => open(gameSrc, 'game.js')}>game.js</button> -{' '}
        <button onClick={() => open(roomSrc, 'room.js')}>room.js</button>
      </Typography>
      <Modal open={show} onClose={() => setShow(false)} className={classes.modal}>
        <Typography variant="h2">{title}</Typography>
        <img src={current} alt="Code Example" />
        <Button variant="outlined" onClick={() => setShow(false)} className={classes.closeBtn}>
          Close
        </Button>
      </Modal>
    </div>
  );
};
DoubleCheck.propTypes = propTypes;

const useStyles = makeStyles({
  wrapper: {
    '& button': {
      color: 'inherit',
      fontSize: 'inherit',
      cursor: 'pointer',
      textDecoration: 'underline',
      background: 'none',
      border: 'none',
      padding: 'none',
      margin: 'none',
      outline: 'none'
    }
  },
  modal: {
    backgroundColor: '#1D2333',
    padding: '5px 0',
    '& img': {
      width: '100%'
    },
    '& h2': {
      margin: '12px 0 20px 0'
    }
  },
  closeBtn: {
    marginBottom: 20,
    padding: '5px 24px'
  }
});
export default DoubleCheck;
