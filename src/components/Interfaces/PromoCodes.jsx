import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import PromoForm from './interfaceHelpers/PromoForm';
import PromoCard from './interfaceHelpers/PromoCard';
import DeleteModal from './interfaceHelpers/DeleteModal';

const propTypes = {
  user: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

const PromoCodesInterface = ({ user, db }) => {
  const [teacher, setTeacher] = useState(null);
  const [promos, setPromos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [promoToEdit, setPromoToEdit] = useState({ isSet: false });
  const [promoToDelete, setPromoToDelete] = useState({ isSet: false });
  const [showOldPromos, setShowOldPromos] = useState(false);

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
    promoCode.createdOn = { seconds: Date.now() / 1000 };
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

  const deletePromo = () => {
    promoToDelete.ref
      .update({
        ...promoToDelete,
        active: false,
        deletedOn: { seconds: Date.now() / 1000 }
      })
      .then(() => getPromos(teacher));
    setPromoToDelete({ isSet: false });
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
    <div className="page-content horiz-center" style={{ paddingBottom: 30 }}>
      <h2>Manage Your Promo Codes</h2>
      {!showOldPromos ? (
        <Button
          variant="outlined"
          color="secondary"
          className={classes.createButton}
          onClick={() => setShowForm(true)}
        >
          Add A New Promo Code
        </Button>
      ) : (
        <Button
          variant="outlined"
          className={classes.createButton}
          onClick={() => setShowOldPromos(false)}
        >
          Show Current Promo Codes
        </Button>
      )}
      {promos
        .filter(p => (showOldPromos ? !p.active : p.active))
        .map(p => (
          <PromoCard
            key={p.id}
            promoCode={p}
            onEdit={p => setPromoToEdit({ isSet: true, ...p })}
            onDelete={p => setPromoToDelete({ isSet: true, ...p })}
            expired={!p.active}
          />
        ))}
      {!showOldPromos && (
        <Button
          variant="outlined"
          style={{ marginTop: 40, marginBottom: 18 }}
          onClick={() => setShowOldPromos(true)}
        >
          Show Deactivated Promo Codes
        </Button>
      )}
      <PromoForm
        showForm={showForm || promoToEdit.isSet}
        editPromo={promoToEdit}
        closeForm={() => {
          setShowForm(false);
          setPromoToEdit({ isSet: false });
        }}
        onSubmit={promoToEdit.isSet ? updatePromo : createPromo}
      />
      <DeleteModal
        obj={promoToDelete}
        onCancel={() => setPromoToDelete({ isSet: false })}
        onConfirm={deletePromo}
        prompt="Are you sure you want to deactivate this promo code?"
        del="Deactivate"
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
