import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Typography,
  Tooltip,
  IconButton,
  Button,
  Paper,
  makeStyles
} from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { History, Update } from '@material-ui/icons';
import { useHistory, Link } from 'react-router-dom';
import WhoAmIButton from './interfaceHelpers/WhoAmIButton';
import InfoCardHeader from '../Classes/InfoCardHeader';
import { useLiveChild } from '../../hooks/children';
import { useLiveClasses } from '../../hooks/classes';
import { getExactDateTime } from '../../utils/helpers';
import * as Styled from './styles';

const propTypes = {
  width: PropTypes.string.isRequired,
  whoAmI: PropTypes.object.isRequired,
  setWhoAmI: PropTypes.func.isRequired,
  useCustomAppBar: PropTypes.func.isRequired
};

const ClassViewInterface = ({ width, whoAmI, setWhoAmI, useCustomAppBar }) => {
  const childRef = useMemo(() => whoAmI.ref, [whoAmI]);
  const child = useLiveChild(childRef);
  const classRefs = useMemo(() => child?.classes || [], [child]);
  const childClasses = useLiveClasses(classRefs);
  const [showHistory, setShowHistory] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  // Customize App Bar
  useEffect(() => {
    const actionData = showHistory
      ? {
          title: 'Hide Old Classes',
          onClick: () => setShowHistory(false),
          icon: <Update />,
          color: 'secondary',
          margin: 34.5
        }
      : {
          title: 'Show Old Classes',
          onClick: () => setShowHistory(true),
          icon: <History />,
          color: 'inherit',
          margin: 25
        };
    let action = (
      <Button
        onClick={actionData.onClick}
        startIcon={actionData.icon}
        color={actionData.color}
        style={{ marginLeft: actionData.margin }}
      >
        {actionData.title}
      </Button>
    );
    if (isWidthDown('xs', width)) {
      action = (
        <Tooltip title={actionData.title}>
          <IconButton onClick={actionData.onClick} color={actionData.color}>
            {actionData.icon}
          </IconButton>
        </Tooltip>
      );
    }
    useCustomAppBar({
      title: `${whoAmI.fName}'s Events`,
      wrap: true,
      content: <WhoAmIButton whoAmI={whoAmI} setWhoAmI={setWhoAmI} />,
      wrappedContent: (
        <List style={{ width: '100%', padding: 0 }}>
          <WhoAmIButton whoAmI={whoAmI} setWhoAmI={setWhoAmI} listButton />
        </List>
      ),
      action
    });
  }, [whoAmI, child, showHistory, width]);

  const filteredClasses = useMemo(
    () =>
      showHistory
        ? childClasses
        : childClasses.filter(c => getExactDateTime(c.endDate, c.endTime) > new Date(Date.now())),
    [showHistory, childClasses]
  );

  return (
    <Styled.PageContent className={classes.wrapper}>
      {filteredClasses.length === 0 && (
        <>
          <Typography variant="h4" className={classes.empty}>
            You aren&apos;t registered for any events!
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
      {filteredClasses
        .sort((a, b) => a.startDate - b.startDate)
        .map(cls => (
          <Paper key={cls.id} className={classes.paper}>
            <InfoCardHeader cls={cls}>
              <Link
                style={{ display: 'block', marginBottom: 15 }}
                to={{ pathname: `/parent/signup/${cls.id}`, state: { signupID: cls.id } }}
              >
                <Button style={{ width: '100%' }} variant="contained">
                  More Info
                </Button>
              </Link>
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

export default withWidth()(ClassViewInterface);
