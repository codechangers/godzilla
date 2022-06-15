import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Button, TextField } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Modal from '../../UI/Modal';
import CSVDownload from '../../UI/CSVDownload';
import { useLiveTicketStatus, useLearnIds } from '../../../hooks/learn';
import { db } from '../../../utils/firebase';

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

  const [ticket, setTicket] = useState(null);
  const completed = useLiveTicketStatus(ticket);

  const idsTicket = useMemo(() => (completed ? ticket : null), [completed, ticket]);
  const [ids] = useLearnIds(idsTicket);

  const data = useMemo(
    () =>
      ids.map(id => ({
        first_name: 'CodeChangers',
        last_name: 'Camper',
        username: id,
        password: '12345678'
      })),
    [ids]
  );

  const onSubmit = () => {
    const n = Number(numIds);
    if (!Number.isNaN(n)) {
      if (n > 0 && n <= 200) {
        setError('');
        const ticketRef = db.collection('learnIdTickets').doc();
        ticketRef
          .set({ count: n })
          .then(() => setTicket(ticketRef))
          .catch(err => {
            console.error(err);
            setError('Failed to request new ids. Try again later.');
          });
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
          disabled={data.length > 0 || ticket !== null}
        />
        <Button
          onClick={onSubmit}
          color="primary"
          variant="outlined"
          style={{ marginBottom: 20 }}
          disabled={data.length > 0 || ticket !== null}
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
                setTicket(null);
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
