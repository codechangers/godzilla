import React, { useMemo, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles
} from '@material-ui/core';
import { CheckCircle, Block } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { getFilteredLiveCheckOffsData } from '../../../hooks/pages';
import { useLiveGames } from '../../../hooks/games';

const propTypes = {
  cls: PropTypes.object.isRequired
};

const CheckOffList = ({ cls }) => {
  const checkOffs = getFilteredLiveCheckOffsData(a => a.where('classId', '==', cls.id), true);
  const gameRefs = useMemo(() => checkOffs.map(co => co.gameRef), [checkOffs]);
  const games = useLiveGames(gameRefs);
  const [selectedCO, setSelection] = useState('');

  const checkOffsWithGameData = useMemo(() => {
    const gamesMap = {};
    games.map(g => {
      gamesMap[g.id] = g;
      return g;
    });
    return checkOffs.map(co => {
      co.game = gamesMap[co.gameRef.id] || {};
      return co;
    });
  }, [checkOffs, games]);

  const bioLink = name => {
    const domain = name.concat('.blobbert.io');
    return (
      <a href={`http://${domain}`} target="blank" rel="noreferrer noopener">
        {domain}
      </a>
    );
  };

  const blankLink = forwardRef(({ children, href }, ref) => (
    <a href={href} ref={ref} target="blank" rel="noreferrer noopener">
      {children}
    </a>
  ));
  blankLink.propTypes = { children: PropTypes.node.isRequired, href: PropTypes.string.isRequired };

  const tutLink = page => (
    <Link to={`teacher/tutorials?page=${page}`} component={blankLink}>
      {pageToStep(page)}
    </Link>
  );

  const classes = useStyles();

  const [fbError, setFbError] = useState('');
  const [feedback, setFeedback] = useState('');
  const handleFeedback = e => setFeedback(e.target.value);

  const updateCheckOff = (checkOff, approved) => {
    if (feedback.length > 0) {
      checkOff.ref.update({ approved, feedback });
    } else setFbError('Feedback is required.');
  };

  const gamesToRender = checkOffsWithGameData
    .filter(a => a.game.name !== undefined)
    .filter(b => b.approved === undefined);

  const pageToStep = p => {
    const parts = p.split('.');
    return parts[parts.length - 1].replace('✓', '').trim();
  };

  return (
    <>
      <div className={classes.padTop} />
      {gamesToRender.length === 0 && (
        <>
          <Typography variant="h5">You&apos;re all caught up on checkoffs!</Typography>
          <Typography variant="body1" color="textSecondary">
            Check again once there are submissions.
          </Typography>
        </>
      )}
      {gamesToRender
        .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))
        .map(co => (
          <Accordion
            key={co.id}
            classes={{ root: classes.accTop }}
            expanded={co.id === selectedCO}
            onChange={(e, toOpen) => setSelection(toOpen ? co.id : '')}
          >
            <AccordionSummary>
              <Typography variant="body1">
                {co.game.name.toUpperCase()} @ {pageToStep(co.page)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.accDetails }}>
              <div className={classes.coInfo}>
                <Typography variant="body1">Game: {bioLink(co.game.name)}</Typography>
                <Typography variant="body1">Page: {tutLink(co.page)}</Typography>
              </div>
              <TextField
                variant="outlined"
                label="Feedback"
                placeholder="Good job!"
                margin="dense"
                className={classes.input}
                value={feedback}
                onChange={handleFeedback}
                helperText={fbError}
                error={fbError.length > 0}
              />
              <div className={classes.options}>
                <Button
                  onClick={() => updateCheckOff(co, false)}
                  variant="outlined"
                  color="secondary"
                  startIcon={<Block />}
                >
                  Decline
                </Button>
                <Button
                  onClick={() => updateCheckOff(co, true)}
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircle />}
                >
                  Approve
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      <div className={classes.padBottom} />
    </>
  );
};
CheckOffList.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  padTop: { marginTop: 40 },
  padBottom: { marginBottom: 10 },
  accTop: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.default,
    '&:before': {
      display: 'none'
    }
  },
  accDetails: {
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      color: theme.palette.text.hint
    }
  },
  coInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& p': {
      marginRight: 20
    }
  },
  input: { margin: '20px 0 10px 0' },
  options: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
    '& button': {
      padding: '6px 32px',
      margin: '10px 20px'
    }
  }
}));

export default CheckOffList;
