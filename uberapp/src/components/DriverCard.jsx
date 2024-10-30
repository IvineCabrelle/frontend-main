import React from 'react';

const DriverCard = ({ driver }) => {
  if (!driver) return null; // Attendre le chargement du chauffeur

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Chauffeur: {driver.name}</h2>
      
      <div className="text-gray-600">
        <p className="font-medium">🚗 Marque de la voiture: <span className="font-semibold">{driver.carBrand}</span></p>
        <p className="font-medium">🏆 Nombre de courses: <span className="font-semibold">{driver.ridesCompleted}</span></p>
        <p className="font-medium">⭐ Score moyen: <span className="font-semibold">{driver.averageScore}</span></p>
      </div>
    </div>
  );
};

export default DriverCard;
