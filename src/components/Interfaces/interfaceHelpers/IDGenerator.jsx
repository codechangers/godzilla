import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Button, TextField } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Modal from '../../UI/Modal';
import CSVDownload from '../../UI/CSVDownload';
import { API_URL } from '../../../utils/globals';

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

const defaultProps = {
  open: false,
  onClose: () => {}
};

const IDGenerator = ({ open, onClose }) => {
  const [numIds, setNumIds] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const setGenerated = ids => {
    setData(
      ids.map(id => ({
        first_name: 'CodeChangers',
        last_name: 'Camper',
        username: id,
        password: '12345678'
      }))
    );
  };

  const onSubmit = () => {
    if (!Number.isNaN(Number(numIds))) {
      if (Number(numIds) > 0 && Number(numIds) <= 200) {
        setError('');
        const ids = [];
        for (let i = 0; i < Number(numIds); i++) {
          fetch(`${API_URL}/get_uid`)
            .then(res => res.json())
            .then(res => {
              const learnID = res.uid;
              ids.push(learnID);
              if (ids.length >= Number(numIds)) {
                setGenerated(ids);
              }
            });
        }
      } else {
        setError('Enter a value between 1 and 200');
      }
    } else {
      setError('Please enter a valid number');
    }
  };

  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Id Generator Modal"
      description="Generate a CSV file full of new student IDs to give out to students who don't have their own."
    >
      <Typography variant="h3">Generate Student IDs</Typography>
      {error !== '' && (
        <Typography variant="h6" className={classes.error}>
          {error}
        </Typography>
      )}
      <div className={classes.gen}>
        <TextField
          value={numIds}
          onChange={e => setNumIds(e.target.value)}
          type="text"
          variant="outlined"
          label="Number of IDs"
          placeholder="000"
          className={classes.numInput}
          helperText="Max of 200"
          error={error !== ''}
          disabled={data.length > 0}
        />
        <Button
          onClick={onSubmit}
          color="primary"
          variant="outlined"
          style={{ marginBottom: 20 }}
          disabled={data.length > 0}
        >
          Generate
        </Button>
      </div>
      <div className={classes.download}>
        {data.length > 0 ? (
          <CSVDownload filename="generated-logins.csv" data={data}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setData([]);
                setNumIds('');
                onClose();
              }}
            >
              <DownloadIcon />
              Download Logins
            </Button>
          </CSVDownload>
        ) : (
          <Button variant="contained" color="primary" disabled>
            <DownloadIcon />
            Download Logins
          </Button>
        )}
      </div>
    </Modal>
  );
};

IDGenerator.propTypes = propTypes;
IDGenerator.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  gen: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20
  },
  numInput: {
    width: 150,
    marginRight: 20
  },
  error: {
    color: theme.palette.error.main,
    marginTop: 16
  },
  download: {
    marginTop: 20,
    '& button svg': {
      marginRight: 8
    }
  }
}));

export default IDGenerator;
