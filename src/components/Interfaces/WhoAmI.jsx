import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, makeStyles, CircularProgress } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Modal from '../UI/Modal';
import Paper from '../UI/Paper';
import ChildInfo from '../SignUpForms/ChildInfo';
import { useParentsChildren } from '../../hooks/children';
import { useAccountRef } from '../../hooks/accounts';

const propTypes = {
  setWhoAmI: PropTypes.func.isRequired,
  parentIsModal: PropTypes.bool
};

const defaultProps = {
  parentIsModal: false
};

const WhoAmInterface = React.forwardRef(({ setWhoAmI, parentIsModal }, ref) => {
  const [children, loading] = useParentsChildren();
  const parentRef = useAccountRef('parents');
  const [showCreate, setShowCreate] = useState(false);
  const classes = useStyles();

  const addChildRef = childRef => {
    const childRefs = children.map(c => c.ref);
    childRefs.push(childRef);
    parentRef.update({ children: childRefs });
  };

  const createForm = () => (
    <ChildInfo
      handleClose={() => setShowCreate(false)}
      addChildRef={addChildRef}
      title="Add a Profile"
    />
  );

  const content = (
    <div className={classes.wrapper}>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Select your Profile
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={classes.profiles}>
            {children.length === 0 && <Typography variant="h5">No Profiles...</Typography>}
            {children.map(child => (
              <Button
                variant="outlined"
                key={child.id}
                onClick={() => setWhoAmI(child)}
                className={classes.button}
              >
                {child.fName}
              </Button>
            ))}
          </div>
          <Button color="secondary" onClick={() => setShowCreate(true)} startIcon={<Add />}>
            New Profile
          </Button>
        </>
      )}
      {!parentIsModal && (
        <Modal
          open={showCreate}
          onClose={() => setShowCreate(false)}
          title="Add a Profile"
          description="Add a new Profile to your account."
          noWrapper
        >
          {createForm()}
        </Modal>
      )}
    </div>
  );

  if (parentIsModal && showCreate) return <div className={classes.wrapper}>{createForm()}</div>;
  if (parentIsModal) return <Paper ref={ref}>{content}</Paper>;
  return content;
});
WhoAmInterface.propTypes = propTypes;
WhoAmInterface.defaultProps = defaultProps;

const useStyles = makeStyles({
  wrapper: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profiles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  button: {
    margin: 10
  }
});

export default WhoAmInterface;
