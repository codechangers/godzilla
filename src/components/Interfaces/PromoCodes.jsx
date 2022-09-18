import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import PromoForm from './interfaceHelpers/PromoForm';
import PromoCard from './interfaceHelpers/PromoCard';
import DeleteModal from './interfaceHelpers/DeleteModal';
import { useLivePromoCodes } from '../../hooks/promos';
import { useLiveTeacherData } from '../../hooks/teachers';
import { db } from '../../utils/firebase';
import * as Styled from './styles';

const propTypes = {
  user: PropTypes.object.isRequired
};

const PromoCodesInterface = ({ user }) => {
  const promos = useLivePromoCodes(teacher?.promos || []);
  const [showForm, setShowForm] = useState(false);
  const [promoToEdit, setPromoToEdit] = useState({ isSet: false });
  const [promoToDelete, setPromoToDelete] = useState({ isSet: false });
  const [showOldPromos, setShowOldPromos] = useState(false);
  const teacher = useLiveTeacherData(user?.uid);

  const createPromo = async promoCode => {
    promoCode.active = true;
    promoCode.startUses = promoCode.uses;
    promoCode.teacher = teacher.ref;
    promoCode.createdOn = { seconds: Date.now() / 1000 };
    const promoRef = await addDoc(collection('promos', db), promoCode);
    await updateDoc(doc(teacher), {
      promos: teacher.promos ? [...teacher.promos, promoRef] : [promoRef]
    });
  };

  const updatePromo = promoCode => {
    promoCode.startUses = Number(promoToEdit.startUses + (promoCode.uses - promoToEdit.uses)); // preserve # of promos used
    const updatedPromo = { ...promoToEdit, ...promoCode };
    delete updatedPromo.id;
    delete updatedPromo.ref; // prevent these fields from being saved to the doc
    promoToEdit.ref.update(updatedPromo);
    setPromoToEdit({ isSet: false });
  };

  const deletePromo = () => {
    promoToDelete.ref.update({
      ...promoToDelete,
      active: false,
      deletedOn: { seconds: Date.now() / 1000 }
    });
    setPromoToDelete({ isSet: false });
  };

  const classes = useStyles();

  return (
    <Styled.PageContent
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 30
      }}
    >
      <Typography variant="h3">Promo Codes</Typography>
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
      {promos.filter(p => (showOldPromos ? !p.active : p.active)).length === 0 && (
        <Typography variant="h5" style={{ marginTop: 40 }}>
          {showOldPromos
            ? "You haven't deactivated any promo codes."
            : "You haven't created any promo codes."}
        </Typography>
      )}
      {promos
        .filter(p => (showOldPromos ? !p.active : p.active))
        .map(p => (
          <PromoCard
            key={p.id}
            promoCode={p}
            onEdit={pr => setPromoToEdit({ isSet: true, ...pr })}
            onDelete={pr => setPromoToDelete({ isSet: true, ...pr })}
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
    </Styled.PageContent>
  );
};

PromoCodesInterface.propTypes = propTypes;

const useStyles = makeStyles({
  createButton: {
    width: '100%',
    maxWidth: '550px',
    marginTop: '40px'
  }
});

export default PromoCodesInterface;
