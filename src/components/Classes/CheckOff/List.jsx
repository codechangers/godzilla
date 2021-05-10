import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
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

  const bioLink = name => {
    const domain = name.concat('.blobbert.io');
    return <a href={`http://${domain}`}>{domain}</a>;
  };

  return checkOffsWithGameData
    .filter(a => a.game.name !== undefined)
    .map(co => (
      <Accordion key={co.id}>
        <AccordionSummary>
          <Typography variant="body1">
            {co.game.name.toUpperCase()} @ Step#{pageSteps[co.page]}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Check out the game: {bioLink(co.game.name)}</Typography>
        </AccordionDetails>
      </Accordion>
    ));
};
CheckOffList.propTypes = propTypes;

export default CheckOffList;
