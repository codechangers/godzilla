import React from 'react';
import PropTypes from 'prop-types';
import { Paper, IconButton, Button, Tooltip, withStyles } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import ContactsIcon from '@material-ui/icons/Contacts';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { URL } from '../../globals';
import InfoCardHeader from './InfoCardHeader';
import CSVDownload from '../UI/CSVDownload';
import autoBind from '../../autoBind';
import StudentInfo from './StudentInfo';

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

class ClassInfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
    autoBind(this);
  }

  componentDidMount() {
    const { children } = this.props.cls;
    const students = [];
    children.forEach(childRef => {
      childRef.get().then(childDoc => {
        const student = { ...childDoc.data(), id: childDoc.id };
        students.push(student);
        if (students.length === children.length) {
          this.setState({ students });
        }
      });
    });
  }

  getStudentData() {
    return this.state.students.map(s => ({
      first_name: s.fName,
      last_name: s.lName,
      username: s.learnID || `user${Math.floor(Math.random() * 2000)}`,
      password: '12345678'
    }));
  }

  render() {
    const { classes, cls, openUpdate, openDelete, openContacts, width } = this.props;
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
          <CSVDownload filename={`${cls.name}-students.csv`} data={this.getStudentData()}>
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
            {this.state.students.map(student => (
              <StudentInfo student={student} key={student.id} />
            ))}
          </div>
        </div>
      </Paper>
    );
  }
}

ClassInfoCard.propTypes = {
  cls: PropTypes.object.isRequired,
  openUpdate: PropTypes.func.isRequired,
  openDelete: PropTypes.func.isRequired,
  openContacts: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

const styles = theme => ({
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
      color: 'rgba(0, 0, 0, 0.6)',
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
});

export default withWidth()(withStyles(styles)(ClassInfoCard));
