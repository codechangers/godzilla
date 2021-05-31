import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';
import NextIcon from '@material-ui/icons/NavigateNext';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import { flattenPages, filterPages } from '../../utils/helpers';

const propTypes = {
  onNav: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired,
  locked: PropTypes.bool,
  whiteList: PropTypes.arrayOf(PropTypes.string),
  lastNext: PropTypes.func,
  firstPrev: PropTypes.func
};

const defaultProps = {
  locked: false,
  whiteList: [],
  lastNext: null,
  firstPrev: null
};

const NavButtons = ({ current, pages, locked, whiteList, onNav, lastNext, firstPrev }) => {
  const flatUnlocks = useMemo(() => flattenPages(locked ? filterPages(whiteList, pages) : pages), [
    pages,
    locked,
    whiteList
  ]);
  const classes = useStyles();

  const nextPage = useMemo(() => {
    const i = flatUnlocks.indexOf(current);
    return i < flatUnlocks.length - 1 ? flatUnlocks[i + 1] : '';
  }, [current, flatUnlocks]);

  const prevPage = useMemo(() => {
    const i = flatUnlocks.indexOf(current);
    return i > 0 ? flatUnlocks[i - 1] : '';
  }, [current, flatUnlocks]);

  return (
    <div className={classes.wrapper}>
      <Button
        variant="outlined"
        onClick={() => (prevPage === '' && firstPrev !== null ? firstPrev() : onNav(prevPage))}
        disabled={prevPage === '' && firstPrev === null}
        startIcon={<PrevIcon />}
      >
        Prev
      </Button>
      <Button
        variant="outlined"
        onClick={() => (nextPage === '' && lastNext !== null ? lastNext() : onNav(nextPage))}
        disabled={nextPage === '' && lastNext === null}
        endIcon={<NextIcon />}
      >
        Next
      </Button>
    </div>
  );
};
NavButtons.propTypes = propTypes;
NavButtons.defaultProps = defaultProps;

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: 16
  }
});

export default NavButtons;
