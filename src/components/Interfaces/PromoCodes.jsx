import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import PromoForm from './interfaceHelpers/PromoForm';

const propTypes = {
  user: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

const PromoCodesInterface = ({ user, db }) => {
  const [teacher, setTeacher] = useState(null);
  const [promos, setPromos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Get Promos
    return db
      .collection('teachers')
      .doc(user.uid)
      .onSnapshot(doc => {
        const teacherData = { ...doc.data(), id: doc.id, ref: doc.ref };
        setTeacher(teacherData);
        const promos = [];
        if (teacherData.promos) {
          teacherData.promos.forEach(promoRef => {
            promoRef
              .get()
              .then(promoDoc => {
                promos.push({ ...promoDoc.data(), id: promoDoc.id, ref: promoDoc.ref });
                if (promos.length === teacherData.promos.length) {
                  setPromos(promos);
                }
              })
              .catch(err => console.log(err));
          });
        }
      });
  }, [db, user, setTeacher, setPromos]);

  const classes = useStyles();

  return (
    <div className="page-content horiz-center">
      <h2>Manage Your Promo Codes</h2>
      <Button variant="outlined" className={classes.createButton} onClick={() => setShowForm(true)}>
        Add A New Promo Code
      </Button>
      {promos.map(p => (
        <div key={p.id}>
          <h4>{p.code}</h4>
        </div>
      ))}
      <PromoForm
        showForm={showForm}
        closeForm={() => setShowForm(false)}
        onSubmit={promoCode => {
          console.log('Create', promoCode);
        }}
      />
    </div>
  );
};

PromoCodesInterface.propTypes = propTypes;

const useStyles = makeStyles({
  createButton: {
    width: '80%',
    maxWidth: '500px',
    marginTop: '40px'
  }
});

export default PromoCodesInterface;
