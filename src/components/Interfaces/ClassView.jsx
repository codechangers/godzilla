import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Paper, makeStyles } from '@material-ui/core';
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

  // Customize App Bar
  useEffect(
    () =>
      useCustomAppBar({
        title: `${child.fName}'s Classes`,
        content: <WhoAmIButton whoAmI={child} setWhoAmI={setWhoAmI} />
      }),
    [child]
  );

  const classes = useStyles();
  return (
    <Styled.PageContent className={classes.wrapper}>
      {childClasses.map(cls => (
        <Paper key={cls.id} className={classes.paper}>
          <InfoCardHeader cls={cls} />
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
  }
});

export default ClassViewInterface;
