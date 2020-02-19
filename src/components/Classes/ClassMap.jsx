import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';

const propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  zoom: PropTypes.number
};

const defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11
};

const ClassMap = ({ center, zoom }) => {
  const classes = useStyles();
  return (
    <div className={classes.mapWrapper}>
      <GoogleMapReact center={center} zoom={zoom} />
    </div>
  );
};

ClassMap.propTypes = propTypes;
ClassMap.defaultProps = defaultProps;

const useStyles = makeStyles({
  mapWrapper: {
    width: '100%',
    height: '100%'
  }
});

export default ClassMap;
