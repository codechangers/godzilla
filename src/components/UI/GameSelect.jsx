import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Button, makeStyles } from '@material-ui/core';
import { getLiveTutorialSelection } from '../../hooks/pages';
import { gameTypes } from '../../utils/globals';
import { auth, db } from '../../utils/firebase';

const propTypes = {
  whoAmI: PropTypes.object.isRequired,
  cls: PropTypes.object.isRequired
};

const selectableTypes = { ...gameTypes };
selectableTypes.default = 'Which game will you choose?';

const GameSelect = ({ whoAmI, cls }) => {
  const savedSelection = getLiveTutorialSelection(whoAmI.id, cls.id);
  const [selection, setSelection] = useState('default');
  const [error, setError] = useState('');
  const classes = useStyles();

  // Set saved value.
  useEffect(() => setSelection(savedSelection?.type || 'default'), [savedSelection]);

  const saveSelection = () => {
    if (selection !== 'default' && Object.keys(selectableTypes).includes(selection)) {
      setError('');
      const data = {
        type: selection,
        parentId: auth.currentUser.uid,
        childId: whoAmI.id,
        classId: cls.id
      };
      // TODO: Add a "Success" snackbar or something so they know it worked.

      if (savedSelection !== null) {
        // Update Selection.
        savedSelection.ref.set(data);
      } else {
        // Create Selection.
        db.collection('tutorialSelections')
          .doc()
          .set(data);
      }
    } else {
      setError('You need to choose a game to build!');
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
        saveSelection();
      }}
    >
      <TextField
        type="text"
        label="Game Selection"
        variant="outlined"
        value={selection}
        onChange={e => setSelection(e.target.value)}
        className={classes.select}
        error={error !== ''}
        helperText={error}
        select
      >
        {Object.entries(selectableTypes).map(([type, text]) => (
          <MenuItem value={type} key={type}>
            {text}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={selection === savedSelection?.type || selection === 'default'}
        style={{ marginTop: 11, width: 160 }}
      >
        {selection === savedSelection?.type ? 'Saved' : 'Save Choice'}
      </Button>
    </form>
  );
};
GameSelect.propTypes = propTypes;

const useStyles = makeStyles({
  form: {
    width: '100%',
    padding: 20,
    margin: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  select: {
    flexGrow: 1,
    flexShrink: 0,
    marginRight: 30
  }
});

export default GameSelect;
