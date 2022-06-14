import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Tooltip, Typography, makeStyles } from '@material-ui/core';
import { AspectRatio } from '@material-ui/icons';
import clsx from 'clsx';
import Modal from './Modal';
import codeImgs from '../../resources/codeImgs';

const propTypes = {
  page: PropTypes.string.isRequired
};

const toImg = page => {
  const none = [null, null];
  if (page && page.includes('✓')) {
    const parts = page.split('.');
    const a = parts[parts.length - 1].replace(/\s+/g, '').replace('✓', '');
    if (Object.keys(codeImgs).includes(a)) return codeImgs[a];
    return none;
  }
  return none;
};

const DoubleCheck = ({ page }) => {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(null);
  const [title, setTitle] = useState('');
  const [zoom, setZoom] = useState(false);
  const [gameSrc, roomSrc] = useMemo(() => toImg(page), [page]);
  const classes = useStyles();

  const open = (src, t) => {
    setCurrent(src);
    setShow(true);
    setTitle(t);
  };

  return (
    <div>
      <Typography variant="h6">Double Check Your Code!</Typography>
      <Typography variant="body1">
        Here is what our code looked like after completing this step:{' '}
        <Button variant="contained" color="primary" onClick={() => open(gameSrc, 'game.js')}>
          game.js
        </Button>{' '}
        -{' '}
        <Button variant="contained" color="primary" onClick={() => open(roomSrc, 'room.js')}>
          room.js
        </Button>
      </Typography>
      <Modal
        open={show}
        onClose={() => setShow(false)}
        className={clsx([classes.modal, { [classes.zoom]: zoom }])}
      >
        <div className={classes.row}>
          <div style={{ display: 'block', width: 48 }} className={classes.iconWrap} />
          <Typography variant="h2" style={{ color: '#fff' }}>
            {title}
          </Typography>
          <Tooltip title={zoom ? 'Shrink' : 'Expand'} className={classes.iconWrap}>
            <IconButton color="primary" onClick={() => setZoom(!zoom)}>
              <AspectRatio className={clsx([classes.icon, { [classes.spin]: zoom }])} />
            </IconButton>
          </Tooltip>
        </div>
        <img src={current} alt="Code Example" />
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setShow(false)}
          className={classes.closeBtn}
        >
          Close
        </Button>
      </Modal>
    </div>
  );
};
DoubleCheck.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  modal: {
    backgroundColor: 'rgb(29, 35, 51)',
    transition: 'all 200ms ease',
    padding: '5px 0',
    '& img': {
      width: '100%'
    },
    '& h2': {
      margin: '12px 0 20px 0'
    }
  },
  zoom: { maxWidth: '100%', minWidth: '100%' },
  icon: { transition: 'all 300ms ease' },
  spin: { transform: 'rotateX(180deg)' },
  iconWrap: {
    [theme.breakpoints.down('sm')]: { display: 'none' }
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '0 10px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  closeBtn: {
    marginBottom: 20,
    padding: '5px 24px'
  }
}));

export default DoubleCheck;
