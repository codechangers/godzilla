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
  Tooltip,
  TextField
} from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SendIcon from '@material-ui/icons/Send';
import clsx from 'clsx';
import InfoCardHeader from '../Classes/InfoCardHeader';
import InfoModal from './interfaceHelpers/InfoModal';
import FAQModal from './interfaceHelpers/FAQModal';
import ClassSignUp from '../Classes/SignUp';
import { db } from '../../utils/firebase';
import * as Styled from './styles';

const propTypes = {
  width: PropTypes.string.isRequired,
  useCustomAppBar: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
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

const defaultClassInfo = {
  logo: '',
  maps: '',
  title: '',
  about: '',
  youtube: '',
  faqs: []
};

const ClassInfoInterface = ({ location, user, useCustomAppBar, width, accounts }) => {
  const [cls, setCls] = useState({});
  const [foundClass, setFoundClass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [editFAQ, setEditFAQ] = useState([null, -1]);
  const [classInfo, setClassInfo] = useState(defaultClassInfo);
  const [isOwner, setIsOwner] = useState(false);
  const [inputCode, setInputCode] = useState('');

  const updateClassInfo = newInfo => {
    setClassInfo({ ...classInfo, ...newInfo });
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname) {
      db.collection('classes')
        .doc(pathname.replace('/parent/signup/', ''))
        .get()
        .then(classDoc => {
          if (classDoc.exists) {
            setCls({ ...classDoc.data(), id: classDoc.id, ref: classDoc.ref });
            updateClassInfo(classDoc.data().info || defaultClassInfo);
            setFoundClass(true);
            if (classDoc.data().teacher.id === user.uid) {
              setIsOwner(true);
            }
          } else {
            setCls({ children: [] });
          }
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [location, db]);

  useEffect(() => {
    if (isOwner) {
      let action = isEditing ? (
        <Button
          variant="contained"
          onClick={() => setIsEditing(false)}
          startIcon={<VisibilityIcon />}
        >
          View Preview
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIsEditing(true)}
          startIcon={<EditIcon />}
        >
          Edit Info
        </Button>
      );
      if (isWidthDown('xs', width)) {
        // Use Icon buttons with Tooltips on mobile.
        action = isEditing ? (
          <Tooltip title="View Preview" placement="bottom">
            <IconButton onClick={() => setIsEditing(false)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Edit Info" placement="bottom">
            <IconButton color="primary" onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        );
      }
      useCustomAppBar({ title: isEditing ? 'Editing Info' : 'Code Contest', action });
    }
  }, [isOwner, isEditing, width]);

  const getClassInfo = () => {
    setIsLoading(true);
    cls.ref
      .get()
      .then(classDoc => {
        setCls({ ...classDoc.data(), id: classDoc.id, ref: classDoc.ref });
        updateClassInfo(classDoc.data().info || defaultClassInfo);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const saveClassInfo = () => {
    cls.ref.update({ info: classInfo }).then(getClassInfo);
  };

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
      {isEditing && (
        <div className={classes.editButtons}>
          <Button onClick={getClassInfo}>Revert Changes</Button>
          <Button color="secondary" variant="outlined" onClick={saveClassInfo}>
            Save Changes
          </Button>
        </div>
      )}
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
                    />
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
              <InfoCardHeader cls={cls} db={db} hideImage hideAccountType>
                <SignUpButton
                  cls={cls}
                  onClick={() => setShowSignup(true)}
                  inputCode={inputCode}
                  setInputCode={setInputCode}
                />
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
                    value={classInfo.about}
                    onChange={e => updateClassInfo({ about: e.target.value })}
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
                    />
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
                <ExpansionPanel
                  key={faq.q}
                  className={clsx(classes.faqPanel, classes.faqPanelOutline)}
                >
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
                  variant="outlined"
                  className={classes.faqPanel}
                  style={{ borderRadius: 0, marginTop: 1 }}
                  onClick={() => setEditFAQ([{ q: '', a: '', new: true }, -1])}
                >
                  <AddIcon />
                  Add a FAQ
                </Button>
              ) : (
                <SignUpButton
                  cls={cls}
                  className={classes.bottomButton}
                  onClick={() => setShowSignup(true)}
                  inputCode={inputCode}
                  setInputCode={setInputCode}
                />
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
        accounts={accounts}
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

const SignUpButton = ({ cls, onClick, className, inputCode, setInputCode }) => {
  const [tempCode, setTempCode] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();
  return cls.isPrivate && inputCode !== cls.privacyCode ? (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (tempCode === cls.privacyCode) {
          setInputCode(tempCode);
          setError('');
        } else {
          setError('Invalid Code!');
        }
      }}
      className={classes.registrationCode}
      style={error.length > 0 ? { marginBottom: 0 } : {}}
    >
      <TextField
        label="Registration Code"
        error={error.length > 0}
        helperText={error}
        onChange={e => setTempCode(e.target.value)}
        className={classes.registrationCodeInput}
      />
      <Tooltip title="Use Code" placement="top">
        <IconButton
          style={
            error.length > 0 ? { marginLeft: '10px' } : { marginLeft: '10px', marginTop: '12px' }
          }
          aria-label="Use Code"
          size="small"
          color="primary"
          type="submit"
        >
          <SendIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </form>
  ) : (
    <Button
      variant="contained"
      color="primary"
      disabled={cls.children.length >= cls.maxStudents}
      className={className}
      onClick={onClick}
    >
      Sign Up!
    </Button>
  );
};
SignUpButton.propTypes = {
  cls: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  inputCode: PropTypes.string.isRequired,
  setInputCode: PropTypes.func.isRequired
};
SignUpButton.defaultProps = {
  onClick: () => {},
  className: ''
};

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
    background: 'var(--background-color)',
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
    color: 'white',
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
    color: 'white',
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
    color: 'inherit'
  },
  aboutInput: {
    width: '100%',
    color: 'inherit',
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
    color: 'white',
    width: '90%',
    height: '350px',
    margin: '10px 0',
    [theme.breakpoints.down('xs')]: {
      height: '200px'
    }
  },
  faqPanel: {
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '98%'
    }
  },
  faqPanelOutline: {
    boxSizing: 'border-box',
    border: '1px solid rgba(255, 255, 255, 0.23)',
    boxShadow: 'none'
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
  },
  editButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '5px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      '& button': {
        marginLeft: 0,
        marginBottom: '6px',
        width: '80%'
      }
    },
    '& button': {
      marginLeft: '8px'
    }
  },
  registrationCode: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px',
    marginTop: '20px'
  },
  registrationCodeInput: {
    width: '50%',
    maxWidth: '250px'
  }
}));

export default withWidth()(withRouter(ClassInfoInterface));
