import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { getLiveClassCheckOffsData } from '../../../hooks/items';
import { useLiveGames } from '../../../hooks/games';

const propTypes = {
  cls: PropTypes.object.isRequired
};

const pageSteps = {
  DEVELOPMENT: 10
};

const CheckOffList = ({ cls }) => {
  const checkOffs = getLiveClassCheckOffsData(cls.id);
  const gameRefs = useMemo(() => checkOffs.map(co => co.gameRef), [checkOffs]);
  const games = useLiveGames(gameRefs);
  const checkOffsWithGameData = useMemo(() => {
    if (checkOffs.length === games.length) {
      const gamesMap = {};
      games.map(g => {
        gamesMap[g.id] = g;
        return g;
      });
      return checkOffs.map(co => {
        co.game = gamesMap[co.gameRef.id];
        return co;
      });
    }
    return [];
  }, [checkOffs, games]);
  return checkOffsWithGameData.map(co => (
    // TODO: Add an Expand element with the remaining details...
    <Typography variant="body1" key={co.id}>
      {co.game.name.toUpperCase()} @ Step#{pageSteps[co.page]}
    </Typography>
  ));
};
CheckOffList.propTypes = propTypes;

export default CheckOffList;
