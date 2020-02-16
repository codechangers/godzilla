import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  CircularProgress,
  Typography,
  makeStyles,
  Paper,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Styled from './styles';
import InfoCardHeader from '../Classes/InfoCardHeader';
import DSUlogo from '../../assets/images/dsu.png';

const propTypes = {
  location: PropTypes.object.isRequired
};

const tempFaq = [
  { q: 'Who Can Attend this Camp', a: 'Anyone of any age.' },
  { q: 'What are the camp hours', a: 'This is a 24/7 camp you code from 8:00 am to 2:30 pm.' },
  {
    q: 'When are opening and closing ceremonies',
    a: 'Opening is at 7:30am, and the closing is at 3:00pm.'
  },
  {
    q: 'What should I bring to camp',
    a:
      'Water, food, phone charger if the is something you whould like to have, a sweatshirt, and lipbalm or your mom will get mad.'
  }
];

const ClassInfoInterface = ({ location, db }) => {
  const [cls, setCls] = useState({});
  const [foundClass, setFoundClass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { pathname } = location;
    if (pathname) {
      db.collection('classes')
        .doc(pathname.replace('/parent/info/', ''))
        .get()
        .then(classDoc => {
          if (classDoc.exists) {
            setCls({ ...classDoc.data(), id: classDoc.id, ref: classDoc.ref });
            setFoundClass(true);
          }
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [location, db]);

  const classes = useStyles();

  return isLoading ? (
    <Styled.PageContent>
      <CircularProgress color="primary" />
    </Styled.PageContent>
  ) : (
    <Styled.PageContent>
      <Typography variant="h3" style={{ marginBottom: '36px', textAlign: 'center' }}>
        {foundClass ? cls.name : 'Class not found...'}
      </Typography>
      {foundClass && (
        <div className={classes.content}>
          <Paper className={classes.cardWrapper}>
            <div className={classes.right}>
              <img src={DSUlogo} alt="DSU_Logo" className={classes.logo} />
              <iframe
                title="maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3182.079959868037!2d-113.56743758422124!3d37.10321407988719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ca5b29bfd1899f%3A0x96dee69b51421265!2sDixie%20State%20University!5e0!3m2!1sen!2sus!4v1581868804818!5m2!1sen!2sus"
                frameBorder="0"
                allowFullScreen=""
                className={classes.maps}
              ></iframe>
            </div>
            <div className={classes.left}>
              <InfoCardHeader cls={cls} hideImage>
                <Button
                  disabled={cls.children.length >= cls.maxStudents}
                  variant="contained"
                  color="primary"
                >
                  Sign Up!
                </Button>
              </InfoCardHeader>
            </div>
          </Paper>
          <Paper className={classes.cardWrapper}>
            <div className={classes.right} style={{ boxSizing: 'border-box', padding: '12px' }}>
              <Typography variant="h4">About Camp</Typography>
              <Typography variant="body1" style={{ marginBottom: '15px' }}>
                Located about hour away from Zion’s National Park, Dixie State University is
                dedicated to fields such as Computer Science and Information Tech-nology. Throughout
                the year, we hold our after school programs and tutoring here. It is the per-fect
                place to attend a camp while enjoying the famous and sunny city, St. George, Utah.
              </Typography>
            </div>
            <div className={classes.left}>
              <iframe
                title="youtube"
                className={classes.youtube}
                src="https://www.youtube.com/embed/Rt89gPYeB1c"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Paper>
          <Paper className={classes.faqWrapper}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
              Important Information
            </Typography>
            {tempFaq.map(faq => (
              <ExpansionPanel key={faq.q} className={classes.faqPanel}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6">{faq.q}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography variant="body1">{faq.a}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
            <Button
              disabled={cls.children.length >= cls.maxStudents}
              variant="contained"
              color="primary"
              style={{ width: '50%', marginTop: '20px' }}
            >
              Sign Up!
            </Button>
          </Paper>
        </div>
      )}
    </Styled.PageContent>
  );
};

ClassInfoInterface.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardWrapper: {
    width: '100%',
    maxWidth: '1000px',
    minWidth: '300px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap-reverse'
  },
  faqWrapper: {
    width: '100%',
    maxWidth: '1000px',
    minWidth: '300px',
    marginBottom: '30px',
    boxSizing: 'border-box',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  left: {
    width: '60%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1
  },
  right: {
    width: '38%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingBottom: '20px',
    flexGrow: 1
  },
  logo: {
    maxWidth: '90%',
    maxHeight: '140px',
    marginBottom: '10px'
  },
  maps: {
    maxWidth: '75%',
    height: '250px',
    borderRadius: '3px',
    border: '2px solid rgba(120,120,120,0.3)'
  },
  youtube: {
    width: '90%',
    height: '350px',
    borderRadius: '3px',
    border: '2px solid rgba(120,120,120,0.3)',
    margin: '10px 0'
  },
  faqPanel: {
    width: '80%',
    backgroundColor: '#e0e0e0',
    [theme.breakpoints.down('sm')]: {
      width: '98%'
    }
  }
}));

export default withRouter(ClassInfoInterface);