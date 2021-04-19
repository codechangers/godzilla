import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withRouter, Redirect } from 'react-router-dom';
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
    if (user.isSignedIn) return linkStripeAccount();
    return () => {};
  }, [user, location.search]);

  const linkStripeAccount = async () => {
    const search = {};
    // Get code from url params.
    const options = location.search.replace('?', '').split('&');
    options.forEach(option => {
      const [key, value] = option.split('=');
      if (key === 'code') search[key] = value;
    });
    if (search.code) {
      // Create stripeSeller document
      const sellerRef = db.collection('stripeSellers').doc(user.uid);
      await sellerRef.set({ authCode: search.code });
      return sellerRef.onSnapshot(sellerDoc => {
        const { stripeID, error } = sellerDoc.data();
        if (stripeID) completeTraining();
        else if (error) updateStatus({ error: 'Failed to link accounts! Try again later.' });
      });
    }
    return () => {};
  };

  const completeTraining = async () => {
    await db
      .collection('teachers')
      .doc(user.uid)
      .update({ isTraining: false });
    updateStatus({ success: true });
  };

  const { success, error } = status;
  return success ? (
    <Redirect to="/login" />
  ) : (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--background-color)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="h5">
        {error || 'Linking Stripe to your CodeChangers Account...'}
      </Typography>
    </div>
  );
};

StripeHandler.propTypes = propTypes;

export default withRouter(StripeHandler);
