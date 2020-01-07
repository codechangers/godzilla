import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import PromoForm from './interfaceHelpers/PromoForm';
import PromoCard from './interfaceHelpers/PromoCard';

const propTypes = {
  user: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

const PromoCodesInterface = ({ user, db }) => {
  const [teacher, setTeacher] = useState(null);
  const [promos, setPromos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [promoToEdit, setPromoToEdit] = useState({ isSet: false });

  const getPromos = useCallback(
    teacher => {
      const promos = [];
      teacher.promos.forEach(promoRef => {
        promoRef
          .get()
          .then(promoDoc => {
            promos.push({ ...promoDoc.data(), id: promoDoc.id, ref: promoDoc.ref });
            if (promos.length === teacher.promos.length) {
              setPromos(promos.reverse());
            }
          })
          .catch(err => console.log(err));
      });
    },
    [setPromos]
  );

  const createPromo = promoCode => {
    promoCode.active = true;
    promoCode.startUses = promoCode.uses;
    promoCode.teacher = teacher.ref;
    db.collection('promos')
      .add(promoCode)
      .then(promoRef => {
        teacher.ref.update({ promos: [...teacher.promos, promoRef] });
      })
      .catch(err => console.log(err));
  };

  const updatePromo = promoCode => {
    promoCode.startUses = Number(promoToEdit.startUses + (promoCode.uses - promoToEdit.uses)); // preserve # of promos used
    promoToEdit.ref.update({ ...promoToEdit, ...promoCode }).then(() => getPromos(teacher));
    setPromoToEdit({ isSet: false });
  };

  useEffect(() => {
    // Get Promos
    return db
      .collection('teachers')
      .doc(user.uid)
      .onSnapshot(doc => {
        const teacherData = { ...doc.data(), id: doc.id, ref: doc.ref };
        setTeacher(teacherData);
        if (teacherData.promos) {
          getPromos(teacherData);
        }
      });
  }, [db, user, setTeacher, getPromos]);

  const classes = useStyles();

  return (
    <div className="page-content horiz-center">
      <h2>Manage Your Promo Codes</h2>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.createButton}
        onClick={() => setShowForm(true)}
      >
        Add A New Promo Code
      </Button>
      {promos.map(p => (
        <PromoCard
          key={p.id}
          promoCode={p}
          onEdit={p => setPromoToEdit({ isSet: true, ...p })}
          onDelete={() => null}
        />
      ))}
      <PromoForm
        showForm={showForm || promoToEdit.isSet}
        editPromo={promoToEdit}
        closeForm={() => {
          setShowForm(false);
          setPromoToEdit({ isSet: false });
        }}
        onSubmit={promoToEdit.isSet ? updatePromo : createPromo}
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
