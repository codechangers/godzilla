import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import CSVDownload from './CSVDownload';
import Modal from './Modal';

const propTypes = {
  cls: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

const defaultProps = {
  cls: null
};

const ContactInfo = ({ cls, onClose }) => {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getParents = ns => {
    setParents({});
    const useableStudents = ns || students;
    const studentsWithParent = useableStudents.filter(a => a.parent !== undefined);
    let foundParents = 0;
    studentsWithParent.forEach(s => {
      s.parent.get().then(parentDoc => {
        const newParents = parents;
        const { id, ref } = parentDoc;
        newParents[id] = { ...parentDoc.data(), id, ref };
        foundParents += 1;
        if (foundParents === studentsWithParent.length) {
          setParents(newParents);
          setStudents(ns);
          setIsLoading(false);
        }
      });
    });
    if (studentsWithParent.length <= 0) {
      setIsLoading(false);
    }
  };

  const getStudents = () => {
    const newStudents = [];
    cls.children.forEach(childRef => {
      childRef.get().then(childDoc => {
        const { id, ref } = childDoc;
        newStudents.push({ ...childDoc.data(), id, ref });
        if (newStudents.length === cls.children.length) {
          getParents(newStudents);
        }
      });
    });
    if (cls.children.length <= 0) {
      setIsLoading(false);
    }
  };

  const getContactInfo = () =>
    students.map(s => {
      const parent =
        s.parent && Object.keys(parents).includes(s.parent.id) ? parents[s.parent.id] : undefined;
      return parent
        ? {
            student_name: `${s.fName} ${s.lName}`,
            parent_name: `${parent.fName} ${parent.lName}`,
            email: parent.email,
            phone: parent.phone
          }
        : {
            student_name: `${s.fName} ${s.lName}`,
            parent_name: '',
            email: '',
            phone: ''
          };
    });

  useEffect(() => {
    if (cls !== null) {
      setIsLoading(true);
      getStudents();
    }
    // eslint-disable-next-line
  }, [cls]);

  const classes = useStyles();
  return (
    <Modal
      open={cls !== null}
      onClose={onClose}
      className={classes.modal}
      title="Contact Info"
      description="Display or Download contact info for all students in this class."
    >
      <div className={classes.header}>
        <Typography variant="h5" style={{ marginRight: 24 }}>
          Contact Info
        </Typography>
        <CSVDownload
          filename={`${cls !== null ? cls.name : 'blank'}-contacts.csv`}
          data={getContactInfo()}
          disabled={isLoading || students.length === 0}
        >
          <Button
            variant="contained"
            disabled={isLoading || students.length === 0}
            style={{ color: isLoading ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.6)' }}
          >
            <DownloadIcon style={{ marginRight: '8px' }} />
            Download Info
          </Button>
        </CSVDownload>
      </div>
      {isLoading ? (
        <div className={classes.progressWrapper}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Parent Name</TableCell>
                <TableCell>Parent Email</TableCell>
                <TableCell>Parent Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(s => {
                const parent =
                  s.parent && Object.keys(parents).includes(s.parent.id)
                    ? parents[s.parent.id]
                    : undefined;
                return parent ? (
                  <TableRow key={s.id}>
                    <TableCell>
                      {s.fName} {s.lName}
                    </TableCell>
                    <TableCell>
                      {parent.fName} {parent.lName}
                    </TableCell>
                    <TableCell>{parent.email}</TableCell>
                    <TableCell>{parent.phone}</TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={s.id}>
                    <TableCell>
                      {s.fName} {s.lName}
                    </TableCell>
                    <TableCell>Parent Unavailable</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
      <Button onClick={onClose} style={{ paddingLeft: 50, paddingRight: 50 }}>
        Close
      </Button>
    </Modal>
  );
};

ContactInfo.propTypes = propTypes;
ContactInfo.defaultProps = defaultProps;

const useStyles = makeStyles({
  modal: {
    maxWidth: '1000px'
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: '10px',
    marginBottom: '5px'
  },
  progressWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
  },
  tableWrapper: {
    width: '100%',
    overflow: 'scroll'
  },
  table: {
    minWidth: 500,
    marginBottom: '20px'
  }
});

export default ContactInfo;
