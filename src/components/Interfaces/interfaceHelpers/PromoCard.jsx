import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Typography, makeStyles, IconButton, Tooltip } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Delete, Edit } from '@material-ui/icons';
import { getDateFromTimestamp, getMMDDYYYY, getHrMn } from '../../../utils/helpers';

const propTypes = {
  promoCode: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  expired: PropTypes.bool,
  width: PropTypes.string.isRequired
};

const defaultProps = {
  expired: false
};

const PromoCard = ({ promoCode, onEdit, onDelete, expired, width }) => {
  const { code, discountType, discountAmount, startUses, uses, limited } = promoCode;
  const classes = useStyles();
  return (
    <div className={classes.wrapper} style={expired ? { flexWrap: 'wrap' } : null}>
      <Card className={classes.card}>
        <div className={classes.cardRow}>
          <Typography variant="body1" style={{ fontWeight: 'bold', marginRight: 8 }}>
            {code}
          </Typography>
          <Typography variant="body2">Used: {startUses - uses} times</Typography>
        </div>
        <div className={classes.cardRow}>
          <Typography variant="body2">
            {discountType === '$' ? discountType + discountAmount : discountAmount + discountType}{' '}
            Off
          </Typography>
          <Typography variant="body2">{limited ? `${uses} uses left` : ''}</Typography>
        </div>
      </Card>
      {expired ? (
        <div className={`${classes.options} ${classes.optionsEx}`}>
          <div>
            <Typography variant="body2" className={classes.optionB}>
              Created:
            </Typography>
            <Typography variant="body2" className={classes.optionP}>
              {getMMDDYYYY(getDateFromTimestamp(promoCode.createdOn))} @{' '}
              {getHrMn(getDateFromTimestamp(promoCode.createdOn))}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" className={classes.optionB}>
              Deactivated:
            </Typography>
            <Typography variant="body2" className={classes.optionP}>
              {getMMDDYYYY(getDateFromTimestamp(promoCode.deletedOn))} @{' '}
              {getHrMn(getDateFromTimestamp(promoCode.deletedOn))}
            </Typography>
          </div>
        </div>
      ) : (
        <div className={classes.options}>
          {isWidthDown(width, 'md') ? (
            <>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => onEdit(promoCode)}
              >
                Edit Details
              </Button>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => onDelete(promoCode)}
              >
                Deactivate
              </Button>
            </>
          ) : (
            <>
              <Tooltip title="Edit" aria-label="edit" placement="left">
                <IconButton color="primary" onClick={() => onEdit(promoCode)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Deactivate" aria-label="deactivate" placement="left">
                <IconButton onClick={() => onDelete(promoCode)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </>
          )}
        </div>
      )}
    </div>
  );
};

PromoCard.propTypes = propTypes;
PromoCard.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    maxWidth: '550px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card: {
    width: 'calc(100% - 200px)',
    padding: '10px 30px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  cardRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 0',
    boxSizing: 'border-box',
    flexWrap: 'wrap'
  },
  options: {
    width: '180px',
    height: '120px',
    padding: '16px 0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      height: 'auto',
      padding: 0
    }
  },
  optionsEx: {
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 10px)',
      margin: 5,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      '& div': {
        width: '50%',
        paddingRight: 8,
        boxSizing: 'border-box'
      }
    }
  },
  optionP: {
    margin: 0,
    fontSize: '0.9rem',
    alignSelf: 'flex-end'
  },
  optionB: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  button: {
    width: '100%'
  }
}));

export default withWidth()(PromoCard);
