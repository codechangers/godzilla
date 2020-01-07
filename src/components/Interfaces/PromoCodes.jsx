import React, { useState, useEffect } from 'react';

const PromoCodesInterface = ({ user, db }) => {
  const [teacher, setTeacher] = useState(null);
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    db.collection('teachers')
      .doc(user.uid)
      .get()
      .then(doc => {
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

  return (
    <div className="page-content horiz-center">
      <h2>Manage Your Promo Codes</h2>
      {promos.map(p => (
        <div key={p.id}>
          <h4>{p.code}</h4>
        </div>
      ))}
    </div>
  );
};

export default PromoCodesInterface;
