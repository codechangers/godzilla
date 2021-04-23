import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { db } from '../../utils/firebase';

const propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const StripeHandler = ({ user, location }) => {
  const [status, setStatus] = useState({ success: false, loading: false, error: '' });
  const updateStatus = newStatus => setStatus({ ...status, ...newStatus });

  // Run Link on url params update.
  useEffect(() => {
    if (user.isSignedIn) linkStripeAccount();
  }, [user, location.search]);

  const linkStripeAccount = async () => {
    const search = {};
    // Get code from url params.
    const options = location.search.replace('?', '').split('&');
    options.forEach(option => {
      const allowedKeys = ['code', 'error'];
      const [key, value] = option.split('=');
      if (allowedKeys.includes(key)) search[key] = value;
    });
    if (search.error && search.error === 'access_denied') {
      updateStatus({ error: 'Failed to connect to your stripe account. Please Try again.' });
    } else if (search.code) {
      // Create stripeSeller document
      updateStatus({ loading: true });
      const sellerRef = db.collection('stripeSellers').doc(user.uid);
      await sellerRef.set({ authCode: search.code });
      return sellerRef.onSnapshot(sellerDoc => {
        const { stripeID, error } = sellerDoc.data();
        if (stripeID) completeTraining();
        else if (error)
          updateStatus({ error: 'Failed to link accounts! Try again later.', loading: false });
      });
    }
    return () => {};
  };

  const completeTraining = async () => {
    await db
      .collection('teachers')
      .doc(user.uid)
      .update({ isTraining: false });
    updateStatus({ success: true, loading: false });
  };

  const { success, loading, error } = status;
  return success ? (
    <Redirect to="/login" />
  ) : (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--background-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: 30
      }}
    >
      <Typography variant="h5">
        {error || 'Linking Stripe to your CodeChangers Account...'}
      </Typography>
      {loading && <CircularProgress color="secondary" style={{ marginTop: 30 }} />}
      {error && (
        <Link to="/teacher" style={{ textDecoration: 'none', color: 'inherit', marginTop: 30 }}>
          <Button variant="outlined" color="secondary" startIcon={<ArrowBack />}>
            Back to Dashboard
          </Button>
        </Link>
      )}
    </div>
  );
};

StripeHandler.propTypes = propTypes;

export default withRouter(StripeHandler);
