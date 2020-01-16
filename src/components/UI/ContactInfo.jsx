import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  makeStyles
} from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownload';

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

  const getStudents = () => {
    const newStudents = [];
    cls.children.forEach(childRef => {
      childRef.get().then(childDoc => {
        const { id, ref } = childDoc;
        newStudents.push({ ...childDoc.data(), id, ref });
        if (newStudents.length === cls.children.length) {
          setStudents(newStudents);
          getParents(newStudents);
        }
      });
    });
  };

  const getParents = ns => {
    const newParents = {};
    const useableStudents = ns || students;
    const studentsWithParent = useableStudents.filter(a => a.parent !== undefined);
    studentsWithParent.forEach(s => {
      s.parent.get().then(parentDoc => {
        const { id, ref } = parentDoc;
        newParents[id] = { ...parentDoc.data(), id, ref };
        if (Object.keys(newParents).length === studentsWithParent.length) {
          setParents(newParents);
        }
      });
    });
  };

  useEffect(() => {
    if (cls !== null) {
      getStudents();
    }
  }, [cls]);

  const classes = useStyles();
  return (
    <Modal className={classes.modal} open={cls !== null} onClose={onClose} disableAutoFocus>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h2">Contact Info</Typography>
          <Button variant="contained" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            <DownloadIcon style={{ marginRight: '8px' }} />
            Download Info
          </Button>
        </div>
        <Table>
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
      </Paper>
    </Modal>
  );
};

ContactInfo.propTypes = propTypes;
ContactInfo.defaultProps = defaultProps;

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    width: '50%',
    minWidth: '350px',
    padding: '20px'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default ContactInfo;