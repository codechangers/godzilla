import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, Typography, Button, Paper, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import WhoAmIButton from './interfaceHelpers/WhoAmIButton';
import InfoCardHeader from '../Classes/InfoCardHeader';
import { useLiveChild } from '../../hooks/children';
import { useLiveClasses } from '../../hooks/classes';
import { getExactDateTime } from '../../utils/helpers';
import * as Styled from './styles';

const propTypes = {
  whoAmI: PropTypes.object.isRequired,
  setWhoAmI: PropTypes.func.isRequired,
  useCustomAppBar: PropTypes.func.isRequired
};

const ClassViewInterface = ({ whoAmI, setWhoAmI, useCustomAppBar }) => {
  const childRef = useMemo(() => whoAmI.ref, [whoAmI]);
  const child = useLiveChild(childRef);
  const classRefs = useMemo(() => child?.classes || [], [child]);
  const childClasses = useLiveClasses(classRefs);
  const history = useHistory();
  const classes = useStyles();

  // Customize App Bar
  useEffect(
    () =>
      useCustomAppBar({
        title: `${whoAmI.fName}'s Contests`,
        wrap: true,
        content: <WhoAmIButton whoAmI={whoAmI} setWhoAmI={setWhoAmI} />,
        wrappedContent: (
          <List style={{ width: '100%', padding: 0 }}>
            <WhoAmIButton whoAmI={whoAmI} setWhoAmI={setWhoAmI} listButton />
          </List>
        )
      }),
    [whoAmI, child]
  );

  // TODO: Use timeouts to update without refresh.
  const isActive = cls => {
    const now = new Date(Date.now());
    const endsAt = getExactDateTime(cls.endDate, cls.endTime);
    const startsAt = getExactDateTime(cls.startDate, cls.startTime);
    const hasEnded = endsAt <= now;
    const hasStarted = startsAt <= now;
    return hasStarted && !hasEnded;
  };

  return (
    <Styled.PageContent className={classes.wrapper}>
      {childClasses.length === 0 && (
        <>
          <Typography variant="h4" className={classes.empty}>
            You aren&apos;t registered for any contests!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/parent/search')}
            className={classes.bigButton}
          >
            Register Now!
          </Button>
        </>
      )}
      {childClasses.map(cls => (
        <Paper key={cls.id} className={classes.paper}>
          <InfoCardHeader cls={cls}>
            <Button
              disabled={!isActive(cls)}
              variant="contained"
              color="primary"
              onClick={() => history.push('/parent/tutorials')}
            >
              Start
            </Button>
          </InfoCardHeader>
        </Paper>
      ))}
    </Styled.PageContent>
  );
};
ClassViewInterface.propTypes = propTypes;

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    maxWidth: 900,
    margin: '20px 0'
  },
  empty: {
    margin: '30px 0'
  },
  bigButton: {
    padding: '6px 40px'
  }
});

export default ClassViewInterface;
