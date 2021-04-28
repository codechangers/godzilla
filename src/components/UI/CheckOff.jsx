import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, TextField, makeStyles } from '@material-ui/core';
import { db, auth } from '../../utils/firebase';
import { getLiveCheckOffData } from '../../hooks/items';
import { useUserGames } from '../../hooks/games';

const propTypes = {
  page: PropTypes.string.isRequired
};

const CheckOff = ({ page }) => {
  const checkOff = getLiveCheckOffData(page);
  const games = useUserGames();
  const [gameId, setGameId] = useState('');
  const classes = useStyles();

  const createCheckOff = () => {
    const data = {
      page,
      parent: auth.currentUser.uid
    };
    db.collection('checkOffs')
      .doc()
      .set(data);
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
        {games.map(g => (
          <MenuItem value={g.id} key={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" type="submit">
        Check Off
      </Button>
    </form>
  );
};
CheckOff.propTypes = propTypes;

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
