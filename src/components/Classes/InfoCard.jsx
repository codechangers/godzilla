import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Paper, IconButton, Button, Tooltip, makeStyles } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import LinkIcon from '@material-ui/icons/Link';
import ContactsIcon from '@material-ui/icons/Contacts';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import InfoCardHeader from './InfoCardHeader';
import StudentInfo from './StudentInfo';
import CSVDownload from '../UI/CSVDownload';
import { useChildren } from '../../hooks/children';
import { URL } from '../../utils/globals';

const propTypes = {
  cls: PropTypes.object.isRequired,
  openUpdate: PropTypes.func.isRequired,
  openDelete: PropTypes.func.isRequired,
  openContacts: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

const ClassInfoCard = ({ cls, openUpdate, openDelete, openContacts, width }) => {
  const [students] = useChildren(cls.children);
  const studentLogins = useMemo(
    () =>
      students.map(s => ({
        first_name: s.fName,
        last_name: s.lName,
        username: s.learnID || `user${Math.floor(Math.random() * 2000)}`,
        password: '12345678'
      })),
    [students]
  );

  const classes = useStyles();
  const small = isWidthUp(width, 'sm');

  return (
    <Paper className={classes.wrapper}>
      <InfoCardHeader cls={cls} />
      <div className={classes.options}>
        <CopyToClipboard text={`${URL}/search/${cls.id}`}>
          <Option
            icon={<LinkIcon />}
            text="Student Sign Up Link"
            label="signup-link"
            small={small}
          />
        </CopyToClipboard>
        <CSVDownload filename={`${cls.name}-students.csv`} data={studentLogins}>
          <Option
            icon={<DownloadIcon />}
            text="Download Logins"
            label="download-logins"
            small={small}
          />
        </CSVDownload>
        <Option
          onClick={openContacts}
          icon={<ContactsIcon />}
          text="Contact Info"
          label="contact-info"
          small={small}
        />
        <Option
          onClick={openUpdate}
          icon={<EditIcon />}
          text="Edit Class"
          label="edit-class"
          small={small}
        />
        <Option
          onClick={openDelete}
          icon={<DeleteIcon />}
          text="Delete Class"
          label="delete-class"
          small={small}
        />
      </div>
      <div className={classes.studWrapper}>
        <div className={classes.students}>
          <StudentInfo showLabels />
          {students.map(student => (
            <StudentInfo student={student} key={student.id} />
          ))}
        </div>
      </div>
    </Paper>
  );
};
ClassInfoCard.propTypes = propTypes;

const Option = ({ onClick, icon, text, label, small }) =>
  small ? (
    <Tooltip title={text} aria-label={label} placement="top">
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  ) : (
    <Button onClick={onClick} aria-label={label} variant="contained">
      {icon}
      {text}
    </Button>
  );
Option.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  text: PropTypes.node,
  label: PropTypes.string,
  small: PropTypes.bool
};
Option.defaultProps = {
  onClick: () => null,
  icon: null,
  text: 'OPTION',
  label: 'option',
  small: false
};

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    marginBottom: 40,
    paddingBottom: 36
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    boxSizing: 'border-box',
    padding: '0 24px',
    marginBottom: '40px',
    '& button': {
      marginRight: 16,
      fontSize: 12,
      [theme.breakpoints.up('md')]: {
        color: 'rgba(0, 0, 0, 0.6)'
      },
      '& svg': {
        marginRight: 8,
        [theme.breakpoints.down('sm')]: {
          marginRight: 0
        }
      }
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      justifyContent: 'space-around',
      '& button': {
        marginRight: 0
      }
    }
  },
  studWrapper: {
    width: '100%',
    overflowX: 'scroll'
  },
  students: {
    padding: '0 24px',
    minWidth: 936
  }
}));

export default withWidth()(ClassInfoCard);
