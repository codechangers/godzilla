import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper, Typography, makeStyles } from '@material-ui/core';

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
        <Typography variant="h2">Contact Info</Typography>
        {students.map(s => {
          const parent =
            s.parent && Object.keys(parents).includes(s.parent.id)
              ? parents[s.parent.id]
              : undefined;
          return parent ? (
            <p key={s.id}>
              {s.fName} - {parent.fName}
            </p>
          ) : (
            <p key={s.id}>{s.fName}</p>
          );
        })}
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
  }
});

export default ContactInfo;
