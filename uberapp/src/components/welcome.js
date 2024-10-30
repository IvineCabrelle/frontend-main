import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './welcome.css'; 
import { useLanguage } from './LanguageContext';

const Welcome = ({ location }) => {
  const { state } = location || {};
  const name = state?.name || "Utilisateur";
  const lastName = state?.lastName || "";
  const { language } = useLanguage(); //  le contexte
  const [passengers, setPassengers] = useState(1);
  const [destination, setDestination] = useState(null);
  const [price, setPrice] = useState(0);
  const [bookings, setBookings] = useState([]);

  const handlePassengerChange = (e) => {
    setPassengers(e.target.value);
    setPrice(e.target.value * 10); // Exemple de calcul de prix
  };

  const handleConfirm = () => {
    if (destination) {
      const newBooking = { passengers, destination, price };
      setBookings([...bookings, newBooking]);
      alert(`${language === 'fr' ? 'Réservé pour' : 'Booked for'} ${passengers} ${language === 'fr' ? 'passager(s)' : 'passenger(s)'} vers (${destination.lat}, ${destination.lng}). ${language === 'fr' ? 'Prix:' : 'Price:'} ${price}€`);
      setDestination(null);
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY' //  clé API
  });

  const onMapClick = (event) => {
    setDestination({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <img src="./bonhommejpg" alt="Profile" className="profile-image" />
        <h1>{language === 'fr' ? 'Bienvenue' : 'Welcome'}, {name} {lastName}!</h1>
        <p>{language === 'fr' ? 'Nous sommes ravis de vous voir ici. Votre aventure commence maintenant.' : 'We are happy to see you here. Your adventure begins now.'}</p>
        <button className="explore-button">{language === 'fr' ? 'Explorer l\'application' : 'Explore the app'}</button>
      </div>

      <div className="reservation-container">
        <h2>{language === 'fr' ? 'Réservez votre course' : 'Book your ride'}</h2>
        <div className="passenger-selection">
          <label>{language === 'fr' ? 'Nombre de passagers:' : 'Number of passengers:'}</label>
          <select value={passengers} onChange={handlePassengerChange}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '400px', height: '400px' }}
            center={{ lat: 48.8566, lng: 2.3522 }} // Paris
            zoom={10}
            onClick={onMapClick}
          >
            {destination && <Marker position={destination} />}
          </GoogleMap>
        )}

        <div className="price-display">
          <h3>{language === 'fr' ? 'Prix:' : 'Price:'} {price}€</h3>
          <button onClick={handleConfirm}>{language === 'fr' ? 'Confirmer la réservation' : 'Confirm booking'}</button>
        </div>
      </div>

      <div className="history-container">
        <h2>{language === 'fr' ? 'Historique des réservations' : 'Booking History'}</h2>
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              {booking.passengers} {language === 'fr' ? 'passager(s)' : 'passenger(s)'} vers ({booking.destination.lat}, {booking.destination.lng}) - {language === 'fr' ? 'Prix:' : 'Price:'} {booking.price}€
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Welcome;
