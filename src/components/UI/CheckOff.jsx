import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, TextField, Typography, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { db, auth } from '../../utils/firebase';
import { GREEN } from '../../utils/globals';
import { getLiveCheckOffsData } from '../../hooks/items';
import { useUserGames } from '../../hooks/games';

const propTypes = {
  whoAmI: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  cls: PropTypes.object
};

const defaultProps = {
  cls: null
};

const CheckOff = ({ whoAmI, page, cls }) => {
  const checkOffs = getLiveCheckOffsData(page);
  const games = useUserGames();
  const childGames = useMemo(() => games.filter(g => g.child.id === whoAmI.id), [games]);
  const [submitted, setSubmitted] = useState(false);
  const [gameId, setGameId] = useState('');
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
    if (validGID && gameRef !== null && cls !== null) {
      setSubmitted(true);
      const data = {
        page,
        gameRef,
        parentId: auth.currentUser.uid,
        teacherId: cls.teacher.id,
        classId: cls.id
      };
      db.collection('checkOffs')
        .doc()
        .set(data);
    }
  };

  const myGamesCheckOffs = useMemo(
    () => checkOffs.filter(co => games.filter(g => co.gameRef.id === g.id).length > 0),
    [checkOffs, games]
  );

  return myGamesCheckOffs.length > 0 ? (
    myGamesCheckOffs.map(checkOff => <CheckOffState key={checkOff.id} checkOff={checkOff} />)
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
        select
      >
        {childGames.length === 0 && <MenuItem value="">You Don&apos;t Have Any Games...</MenuItem>}
        {childGames.map(g => (
          <MenuItem value={g.id} key={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" type="submit" disabled={!validGID || submitted}>
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

const useStyles = makeStyles({
  form: {
    width: '100%',
    padding: 20,
    margin: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  select: {
    flexGrow: 1,
    flexShrink: 0,
    marginRight: 30
  }
});

export default CheckOff;
