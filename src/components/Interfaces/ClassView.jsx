import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Paper, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import WhoAmIButton from './interfaceHelpers/WhoAmIButton';
import InfoCardHeader from '../Classes/InfoCardHeader';
import { useLiveChild } from '../../hooks/children';
import { useLiveClasses } from '../../hooks/classes';
import * as Styled from './styles';

const propTypes = {
  whoAmI: PropTypes.object.isRequired,
  setWhoAmI: PropTypes.func.isRequired,
  useCustomAppBar: PropTypes.func.isRequired
};

const ClassViewInterface = ({ whoAmI, setWhoAmI, useCustomAppBar }) => {
  const childRef = useMemo(() => whoAmI.ref, [whoAmI]);
  const child = useLiveChild(childRef);
  const classRefs = useMemo(() => child?.classes, [child]);
  const childClasses = useLiveClasses(classRefs);
  const history = useHistory();
  const classes = useStyles();

  // Customize App Bar
  useEffect(
    () =>
      useCustomAppBar({
        title: `${whoAmI.fName}'s Contests`,
        content: <WhoAmIButton whoAmI={whoAmI} setWhoAmI={setWhoAmI} />
      }),
    [whoAmI, child]
  );

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
