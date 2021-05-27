import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, TextField, Typography, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { db, auth, Timestamp } from '../../utils/firebase';
import { GREEN } from '../../utils/globals';
import { getFilteredLiveCheckOffsData } from '../../hooks/pages';
import { useUserGames } from '../../hooks/games';

const propTypes = {
  page: PropTypes.string.isRequired,
  whoAmI: PropTypes.object,
  cls: PropTypes.object
};

const defaultProps = {
  whoAmI: null,
  cls: null
};

const CheckOff = ({ whoAmI, page, cls }) => {
  const checkOffs = getFilteredLiveCheckOffsData(a =>
    a
      .where('childId', '==', whoAmI.id)
      .where('classId', '==', cls.id)
      .where('page', '==', page)
  );
  const games = useUserGames();
  const childGames = useMemo(() => games.filter(g => g.child.id === whoAmI?.id), [games]);
  const [submitted, setSubmitted] = useState(false);
  const [gameId, setGameId] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (childGames.length === 1) setGameId(childGames[0].id);
  }, [childGames]);

  const validGID = useMemo(() => gameId !== '' && childGames.map(g => g.id).includes(gameId), [
    childGames,
    gameId
  ]);

  const gameRef = useMemo(() => games.filter(g => g.id === gameId)[0]?.ref || null, [
    games,
    gameId
  ]);

  const createCheckOff = () => {
    if (validGID && gameRef !== null && cls !== null && whoAmI !== null) {
      setSubmitted(true);
      const data = {
        page,
        gameRef,
        childId: whoAmI.id,
        parentId: auth.currentUser.uid,
        teacherId: cls.teacher.id,
        classId: cls.id,
        createdAt: Timestamp.fromDate(new Date())
      };
      db.collection('checkOffs')
        .doc()
        .set(data);
    } else {
      setError('Invalid game selected!');
    }
  };

  return checkOffs.length > 0 ? (
    checkOffs.map(checkOff => <CheckOffState key={checkOff.id} checkOff={checkOff} />)
  ) : (
    <form
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
        createCheckOff();
      }}
    >
      <TextField
        type="text"
        label="Game"
        variant="outlined"
        value={gameId}
        onChange={e => setGameId(e.target.value)}
        className={classes.select}
        error={error !== ''}
        helperText={error}
        select
      >
        {childGames.length === 0 && <MenuItem value="">You Don&apos;t Have Any Games...</MenuItem>}
        {childGames.map(g => (
          <MenuItem value={g.id} key={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!validGID || submitted}
        style={{ marginTop: 11 }}
      >
        Check Off
      </Button>
    </form>
  );
};
CheckOff.propTypes = propTypes;
CheckOff.defaultProps = defaultProps;

const Approval = ({ approved, feedback, onResubmit }) => (
  <div>
    <Typography variant="h5" style={{ color: approved ? GREEN : red['500'] }}>
      {approved ? 'Your game has been approved!' : 'Your game has been denied!'}
    </Typography>
    <Typography variant="body1">
      <strong>Feedback:</strong> {feedback}
    </Typography>
    {!approved && (
      <Button
        color="secondary"
        variant="outlined"
        style={{ marginTop: 10, padding: '5px 28px' }}
        onClick={onResubmit}
      >
        ReSubmit
      </Button>
    )}
  </div>
);
Approval.propTypes = {
  approved: PropTypes.bool.isRequired,
  feedback: PropTypes.string.isRequired,
  onResubmit: PropTypes.func.isRequired
};

const CheckOffState = ({ checkOff: { approved, page, feedback, ref } }) => {
  // Waiting State.
  if (approved === undefined) return <div>Checking Off: {page}</div>;
  // Approved/Denied State.
  return <Approval approved={approved} feedback={feedback} onResubmit={() => ref.delete()} />;
};
CheckOffState.propTypes = { checkOff: PropTypes.object.isRequired };

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    padding: 20,
    margin: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      '& button': {
        width: '100%'
      }
    }
  },
  select: {
    flexGrow: 1,
    flexShrink: 0,
    marginRight: 30,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: 0
    }
  }
}));

export default CheckOff;
