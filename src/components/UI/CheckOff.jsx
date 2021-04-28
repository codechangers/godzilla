import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, TextField, makeStyles } from '@material-ui/core';
import { db, auth } from '../../utils/firebase';
import { getLiveCheckOffData } from '../../hooks/items';
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
  const checkOff = getLiveCheckOffData(page);
  const games = useUserGames();
  const childGames = useMemo(() => games.filter(g => g.child.id === whoAmI.id), [games]);
  const [gameId, setGameId] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (childGames.length === 1) setGameId(childGames[0].id);
  }, [childGames]);

  const validGID = useMemo(() => gameId !== '' && childGames.map(g => g.id).includes(gameId));

  const gameRef = useMemo(() => games.filter(g => g.id === gameId)[0]?.ref || null, [
    games,
    gameId
  ]);

  const createCheckOff = () => {
    if (validGID && gameRef !== null && cls !== null) {
      const data = {
        page,
        gameRef,
        parentId: auth.currentUser.uid,
        teacherId: cls.teacher.id
      };
      db.collection('checkOffs')
        .doc()
        .set(data);
    }
  };

  return checkOff !== null ? (
    <div>Checking Off: {page}</div>
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
      <Button variant="contained" color="primary" type="submit" disabled={!validGID}>
        Check Off
      </Button>
    </form>
  );
};
CheckOff.propTypes = propTypes;
CheckOff.defaultProps = defaultProps;

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
