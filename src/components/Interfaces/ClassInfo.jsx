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
  ExpansionPanelDetails,
  InputBase,
  IconButton,
  Tooltip
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoCardHeader from '../Classes/InfoCardHeader';
import InfoModal from './interfaceHelpers/InfoModal';
import FAQModal from './interfaceHelpers/FAQModal';
import ClassSignUp from '../Classes/SignUp';
import * as Styled from './styles';

const propTypes = {
  location: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const Fill = ({ className, prompt, isEditing, onClick }) => {
  const classes = useStyles();
  return (
    isEditing && (
      <div className={`${className} ${classes.fill}`}>
        <Button onClick={onClick}>
          <AddIcon />
          {prompt}
        </Button>
      </div>
    )
  );
};

Fill.propTypes = {
  className: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const EditButton = ({ isEditing, title, onClick }) =>
  isEditing && (
    <Tooltip title={title} aria-label={title} placement="top" arrow>
      <IconButton
        edge="end"
        size="small"
        style={{
          margin: '2px 0 0 -32px',
          backgroundColor: 'rgba(190, 190, 190, 0.7)'
        }}
        onClick={onClick}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

EditButton.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const modalPropSets = {
  logo: {
    prompt: 'Add a Logo',
    label: 'Logo URL',
    placeholder: 'https://codechangers.com/logo.png',
    key: 'logo'
  },
  maps: {
    prompt: 'Add a Map',
    label: 'Maps URL',
    placeholder: 'https://www.google.com/maps/embed',
    acceptUrl: 'https://www.google.com/maps/embed',
    key: 'maps'
  },
  youtube: {
    prompt: 'Add a Video',
    label: 'Youtube URL',
    placeholder: 'https://www.youtube.com/embed/_hOGCXpfyeQ',
    acceptUrl: 'https://www.youtube.com/embed',
    key: 'youtube'
  }
};

const ClassInfoInterface = ({ location, db, user }) => {
  const [cls, setCls] = useState({});
  const [foundClass, setFoundClass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isEditing] = useState(true);
  const [modalProps, setModalProps] = useState({});
  const [editFAQ, setEditFAQ] = useState([null, -1]);
  const [classInfo, setClassInfo] = useState({
    logo: '',
    maps: '',
    title: '',
    about: '',
    youtube: '',
    faqs: []
  });

  const updateClassInfo = newInfo => {
    setClassInfo({ ...classInfo, ...newInfo });
  };

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
    <Styled.PageContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" style={{ marginBottom: '20px' }}>
        Finding Class...
      </Typography>
      <CircularProgress color="primary" />
    </Styled.PageContent>
  ) : (
    <Styled.PageContent>
      <Typography variant="h3" className={classes.mainHeader}>
        {foundClass ? 'Class Info' : 'Class not found.'}
      </Typography>
      {foundClass && (
        <Paper className={classes.content}>
          <div className={classes.cardWrapper}>
            {(classInfo.logo || classInfo.maps || isEditing) && (
              <div className={classes.right}>
                {(classInfo.logo && (
                  <div className={classes.editWrapper}>
                    <img src={classInfo.logo} alt="Class_Logo" className={classes.logo} />
                    <EditButton
                      isEditing={isEditing}
                      title="Change Logo"
                      onClick={() => {
                        setModalProps(modalPropSets.logo);
                        setShowInfo(true);
                      }}
                    />
                  </div>
                )) || (
                  <Fill
                    className={classes.logoFill}
                    prompt="Add a Logo"
                    isEditing={isEditing}
                    onClick={() => {
                      setModalProps(modalPropSets.logo);
                      setShowInfo(true);
                    }}
                  />
                )}
                {(classInfo.maps && (
                  <div className={classes.editWrapper}>
                    <iframe
                      title="maps"
                      src={classInfo.maps}
                      frameBorder="0"
                      allowFullScreen=""
                      className={classes.maps}
                    ></iframe>
                    <EditButton
                      isEditing={isEditing}
                      title="Update Map"
                      onClick={() => {
                        setModalProps(modalPropSets.maps);
                        setShowInfo(true);
                      }}
                    />
                  </div>
                )) || (
                  <Fill
                    className={classes.mapsFill}
                    prompt="Add a Map"
                    isEditing={isEditing}
                    onClick={() => {
                      setModalProps(modalPropSets.maps);
                      setShowInfo(true);
                    }}
                  />
                )}
              </div>
            )}
            <div className={classes.left}>
              <InfoCardHeader cls={cls} hideImage hideAccountType>
                <Button
                  disabled={cls.children.length >= cls.maxStudents}
                  variant="contained"
                  color="primary"
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up!
                </Button>
              </InfoCardHeader>
            </div>
          </div>
          {(classInfo.title || classInfo.about || classInfo.youtube || isEditing) && (
            <div
              className={classes.cardWrapper}
              style={{ borderTop: '2px solid rgba(150,150,150,0.3)' }}
            >
              {(isEditing && (
                <div className={classes.right} style={{ boxSizing: 'border-box', padding: '12px' }}>
                  <InputBase
                    className={classes.titleInput}
                    value={classInfo.title}
                    onChange={e => updateClassInfo({ title: e.target.value })}
                    inputProps={{ style: { textAlign: 'center' } }}
                    placeholder="Add a Title"
                  />
                  <InputBase
                    className={classes.aboutInput}
                    value={classInfo.aboute}
                    onChange={e => updateClassInfo({ aboute: e.target.value })}
                    placeholder="Add an About"
                    multiline
                  />
                </div>
              )) ||
                ((classInfo.title || classInfo.about) && (
                  <div
                    className={classes.right}
                    style={{ boxSizing: 'border-box', padding: '12px' }}
                  >
                    <Typography variant="h4">{classInfo.title}</Typography>
                    <Typography variant="body1" style={{ marginBottom: '15px' }}>
                      {classInfo.about}
                    </Typography>
                  </div>
                ))}
              {(classInfo.youtube && (
                <div className={classes.left}>
                  <div className={classes.editWrapper} style={{ margin: '10px 0' }}>
                    <iframe
                      title="youtube"
                      className={classes.youtube}
                      src={classInfo.youtube}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <EditButton
                      isEditing={isEditing}
                      title="Update Video"
                      onClick={() => {
                        setModalProps(modalPropSets.youtube);
                        setShowInfo(true);
                      }}
                    />
                  </div>
                </div>
              )) ||
                (isEditing && (
                  <div className={classes.left}>
                    <Fill
                      className={classes.youtubeFill}
                      prompt="Add a Video"
                      isEditing={isEditing}
                      onClick={() => {
                        setModalProps(modalPropSets.youtube);
                        setShowInfo(true);
                      }}
                    />
                  </div>
                ))}
            </div>
          )}
          {(classInfo.faqs.length > 0 || isEditing) && (
            <div
              className={classes.faqWrapper}
              style={{ borderTop: '2px solid rgba(150,150,150,0.3)' }}
            >
              <Typography variant="h4" className={classes.faqHeader}>
                Important Information
              </Typography>
              {classInfo.faqs.map((faq, i) => (
                <ExpansionPanel key={faq.q} className={classes.faqPanel}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.summary}
                  >
                    <Typography variant="h6" className={classes.question}>
                      {faq.q}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <Typography variant="body1" className={classes.answer}>
                      {faq.a}
                    </Typography>
                    {isEditing && (
                      <div className={classes.faqButtons}>
                        <Tooltip title="Edit FAQ" aria-label="Edit FAQ" placement="left" arrow>
                          <IconButton
                            style={{ marginBottom: '5px' }}
                            edge="end"
                            size="small"
                            onClick={() => setEditFAQ([faq, i])}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete FAQ" aria-label="Delete FAQ" placement="left" arrow>
                          <IconButton
                            edge="end"
                            size="small"
                            onClick={() => {
                              const newFaqs = [...classInfo.faqs];
                              newFaqs.splice(i, 1);
                              updateClassInfo({ faqs: newFaqs });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
              {isEditing ? (
                <Button
                  variant="contained"
                  className={classes.faqPanel}
                  style={{ borderRadius: 0, marginTop: 1 }}
                  onClick={() => setEditFAQ([{ q: '', a: '', new: true }, -1])}
                >
                  <AddIcon />
                  Add a FAQ
                </Button>
              ) : (
                <Button
                  disabled={cls.children.length >= cls.maxStudents}
                  variant="contained"
                  color="primary"
                  className={classes.bottomButton}
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up!
                </Button>
              )}
            </div>
          )}
        </Paper>
      )}
      {/* ======= Modals ======= */}
      <ClassSignUp
        open={showSignup}
        onClose={() => setShowSignup(false)}
        cls={cls}
        db={db}
        user={user}
      />
      <InfoModal
        open={showInfo}
        onClose={() => {
          setShowInfo(false);
          setModalProps({});
        }}
        onSubmit={url => {
          const newState = {};
          newState[modalProps.key] = url;
          updateClassInfo(newState);
        }}
        prompt={modalProps.prompt}
        label={modalProps.label}
        placeholder={modalProps.placeholder}
        acceptUrl={modalProps.acceptUrl}
        initialValue={classInfo[modalProps.key]}
      />
      <FAQModal
        open={editFAQ[0] !== null}
        onClose={() => setEditFAQ([null, -1])}
        onSubmit={(f, i, isNew) => {
          const newFaqs = [...classInfo.faqs];
          if (isNew) {
            newFaqs.push(f);
          } else {
            newFaqs[i] = f;
          }
          updateClassInfo({ faqs: newFaqs });
        }}
        faq={editFAQ[0] || undefined}
        index={editFAQ[1]}
      />
    </Styled.PageContent>
  );
};

ClassInfoInterface.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  mainHeader: {
    marginBottom: '36px',
    textAlign: 'center'
  },
  content: {
    width: '100%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '30px'
  },
  cardWrapper: {
    width: 'calc(100% - 4px)',
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
  fill: {
    background: '#ddd',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%'
  },
  logo: {
    maxWidth: '90%',
    maxHeight: '140px',
    marginBottom: '10px'
  },
  logoFill: {
    width: '90%',
    height: '140px',
    marginBottom: '10px'
  },
  maps: {
    width: '75%',
    height: '250px',
    borderRadius: '3px',
    border: '2px solid rgba(120,120,120,0.3)',
    backgroundColor: 'rgba(120,120,120,0.3)',
    [theme.breakpoints.down('md')]: {
      width: '90%'
    }
  },
  mapsFill: {
    width: '75%',
    height: '250px',
    [theme.breakpoints.down('md')]: {
      width: '90%'
    }
  },
  titleInput: {
    width: '100%',
    fontSize: '34px',
    fontWeight: 'normal',
    lineHeight: '40px',
    letterSpacing: '0.25px',
    color: 'rgba(0,0,0,0.87)'
  },
  aboutInput: {
    width: '100%',
    color: 'rgba(0,0,0,0.87)',
    fontSize: '18px',
    fontWeight: 400,
    letterSpacing: '0.5px',
    lineHeight: '28px',
    marginBottom: '15px'
  },
  youtube: {
    width: '90%',
    height: '350px',
    borderRadius: '3px',
    border: '2px solid rgba(120,120,120,0.3)',
    backgroundColor: 'rgba(120,120,120,0.3)',
    [theme.breakpoints.down('xs')]: {
      height: '200px'
    }
  },
  youtubeFill: {
    width: '90%',
    height: '350px',
    margin: '10px 0',
    [theme.breakpoints.down('xs')]: {
      height: '200px'
    }
  },
  faqPanel: {
    width: '80%',
    backgroundColor: '#f0f0f0',
    [theme.breakpoints.down('sm')]: {
      width: '98%'
    }
  },
  faqHeader: {
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem'
    }
  },
  summary: {
    [theme.breakpoints.down('sm')]: {
      padding: '0 12px'
    }
  },
  details: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: '0 12px 12px 12px'
    }
  },
  question: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '20px'
    }
  },
  answer: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
      lineHeight: '15px'
    }
  },
  bottomButton: {
    width: 'calc(60% - 48px)',
    marginTop: '20px',
    [theme.breakpoints.down('xs')]: {
      width: '98%'
    }
  },
  faqButtons: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default withRouter(ClassInfoInterface);
