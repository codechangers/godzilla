import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
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

  const tutLink = page => <Link to={`teacher/tutorials?page=${page}`}>{page}</Link>;

  const classes = useStyles();

  return (
    <>
      <div className={classes.padTop} />
      {checkOffsWithGameData
        .filter(a => a.game.name !== undefined)
        .map(co => (
          <Accordion key={co.id} classes={{ root: classes.accTop }}>
            <AccordionSummary>
              <Typography variant="body1">
                {co.game.name.toUpperCase()} @ Step#{pageSteps[co.page]}
              </Typography>
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.accDetails }}>
              <div className={classes.coInfo}>
                <Typography variant="body1">Game: {bioLink(co.game.name)}</Typography>
                <Typography variant="body1">Page: {tutLink(co.page)}</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};
CheckOffList.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  padTop: { marginTop: 40 },
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
  }
}));

export default CheckOffList;
