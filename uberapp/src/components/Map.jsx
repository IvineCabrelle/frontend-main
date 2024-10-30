// src/UberMap.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import carImage from '../assets/car.png';  // Local car image
import startImage from '../assets/start.png';
import endImage from '../assets/end.png';
import DriverCard from './DriverCard';
import axios from 'axios';

// Car icon with the local image
const carIcon = new L.Icon({
  iconUrl: carImage,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Start point icon
const startIcon = new L.Icon({
  iconUrl: startImage,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// End point icon
const endIcon = new L.Icon({
  iconUrl: endImage,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const UberMap2 = ({start,end , driver}) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [carPosition, setCarPosition] = useState(null);
  const [index, setIndex] = useState(0);
  const [isArrived, setIsArrived] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const generateNearbyCoordinates = ({ lat: centerLat, lng: centerLng }, count = 10, radius = 1000) => 
    Array.from({ length: count }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.sqrt(Math.random()) * radius;
  
      const deltaLat = distance * Math.cos(angle) / 111320;
      const deltaLng = distance * Math.sin(angle) / (111320 * Math.cos(centerLat * (Math.PI / 180)));
  
      return [centerLat + deltaLat, centerLng + deltaLng];
    });


  // Initialize start and end points
  const centerPoint = { lat: start[0], lng: start[1]}; // where the client is
  // console.log(generateNearbyCoordinates(centerPoint,10)[0]);
  
  const [startPoint, setStartPoint] = useState(generateNearbyCoordinates(centerPoint,10)[0]); // where the uber comes from
  // const [startPoint, setStartPoint] = useState([end[0], end[1]]);
  
  const [endPoint, setEndPoint] = useState([start[0], start[1]]);

  // Fetch route between start and end points from OSRM
  const getRoute = (start, end) => {
    const startCoord = `${start[1]},${start[0]}`;
    const endCoord = `${end[1]},${end[0]}`;
    fetch(`https://router.project-osrm.org/route/v1/driving/${startCoord};${endCoord}?overview=full&geometries=geojson`)
      .then(response => response.json())
      .then(data => {
        const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRouteCoordinates(coordinates);
        setCarPosition(coordinates[0]);
        setIndex(0);
      });
  };
  const createCourse = async () => {
    const data = {
      id_reservation: sessionStorage.getItem('id_reservation'),
      id_chauffeur: sessionStorage.getItem('id_reservation'),
      id_client: sessionStorage.getItem('token'),
      statut: "En route",
    };
    
    const token = sessionStorage.getItem('token');
  
    try {
      const response = await axios.post('http://localhost:5002/course', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Réponse du serveur:', response.data);
      setCloseModal(false);
      
      // Réinitialisez les états nécessaires pour redémarrer l'animation
      setIndex(0);
      setCarPosition(null); // Réinitialisez la position de la voiture
      setRouteCoordinates([]); // Réinitialisez les coordonnées de la route
  
      // Mettez à jour les points de départ et d'arrivée
      setStartPoint([start[0], start[1]]);
      setEndPoint([end[0], end[1]]);
  
      // Récupérez à nouveau le trajet
      getRoute([start[0], start[1]], [end[0], end[1]]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };
  

  useEffect(() => {
    getRoute(startPoint, endPoint);
  }, []);

  useEffect(() => {
    if (routeCoordinates.length > 0) {
      const estimatedTime = routeCoordinates.length * 1000; // 1 sec par point
      setTimeRemaining(estimatedTime);
    }
  }, [routeCoordinates]);
  // Animate the car along the route
  useEffect(() => {
    if (routeCoordinates.length > 0 && index < routeCoordinates.length - 1) {
      const interval = setInterval(() => {
        setIndex(prevIndex => prevIndex + 1);
        setCarPosition(routeCoordinates[index + 1]);
        setTimeRemaining(prevTime => prevTime - 1000);
      }, 1000); // Move car every second

      return () => clearInterval(interval);
    } else if (index === routeCoordinates.length - 1) {
      setIsArrived(true);
      alert("Arrived") // Car is at the destination
    }
  }, [index, routeCoordinates]);

  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left empty div for additional information */}
      <div className="p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Informations</h2>
        <DriverCard driver={driver}/>
        {isArrived &&
        <p>Duree de votre trajet {Math.ceil(timeRemaining / 60000)} min.</p>
        }
        {!isArrived &&
          <p>Temps restant avant la venue du chauffeur {Math.ceil(timeRemaining / 60000)} min.</p>
        }
        
        
        {(isArrived && closeModal) &&
                    <div class="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 p-6">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hey permettez nous de demarrer la course</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Confirmez si vous etes dans le vehicule , avec la ceinture attachee.</p>
                    <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={createCourse}>
                        
                    <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                 }


      </div>

      {/* Map on the right */}
      <div className="relative">
        <MapContainer center={startPoint} zoom={13} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Route polyline */}
          {routeCoordinates.length > 0 && (
            <Polyline positions={routeCoordinates} color="blue" />
          )}

          {/* Start marker */}
          {startPoint && <Marker position={startPoint} icon={startIcon} />}

          {/* End marker */}
          {endPoint && <Marker position={endPoint} icon={endIcon} />}

          {/* Car animation */}
          {carPosition && <Marker position={carPosition} icon={carIcon} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default UberMap2;
