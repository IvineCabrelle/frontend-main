// src/components/Home.js 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from './Map'
import './Home.css';
import frontImg from '../assets/home_image.png'
import PricingGrid from './PricingGrid';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [startPoint, setStartPoint] = useState([45.519145,-73.661124]);
  const [endPoint, setEndPoint] = useState([0,0]); 
  const [gridPrice, setGridPrice] = useState([  
    { type: "Normal", price: 1 },
    { type: "Confort", price: 1 },
    { type: "Premium", price: 1 }])
  const [showGrid,setShow] = useState(false)
  const updatePrice = (options, type, newPrice) => {
    return options.map(option => 
      option.type === type ? { ...option, price: newPrice } : option
    );
  };

  const getGeolocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            reject("Permission denied by the user.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            reject("Position unavailable.");
                            break;
                        case error.TIMEOUT:
                            reject("Geolocation request timed out.");
                            break;
                        default:
                            reject("An unknown error occurred.");
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
};


  // const getCoordinates = async (address) => {
  //   const response = await fetch(`https://api.example.com/geocode?address=${encodeURIComponent(address)}`);
  //   const data = await response.json();
  //   return { latitude: data.latitude, longitude: data.longitude };
  // };

  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRad(coords2[0] - coords1[0]);
    const dLon = toRad(coords2[1] - coords1[1]);
    const lat1 = toRad(coords1[0]);
    const lat2 = toRad(coords2[0]);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
  };
  const formatNumber = (num) => {
    const integerPart = Math.floor(num);
    const formattedDecimal = (num - integerPart) > 0.50 ? '99' : '49';
    
    return parseFloat(`${integerPart}.${formattedDecimal}`).toFixed(1);
  };

  

  const calculatePrice = (distance) => {
    const pricePerKm = 5; // Exemple de prix par km
    return formatNumber((distance * pricePerKm)/10);
  };

  const geocodeAddress = async (address, retryCount = 0) => {
    const encodedAddress = encodeURIComponent(address);
    const delay = 1000 * (retryCount + 1);
  
    // Attendre le délai de réessai
    await new Promise(resolve => setTimeout(resolve, delay));
  
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`);
      if (!response.ok) {
        throw new Error(`Erreur de réponse: ${response.status}`);
      }
  
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lat), parseFloat(lon)];
      } else {
        alert("Adresse non trouvée.");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la requête fetch :", error);
      if (retryCount < 3) {
        console.log(`Réessai de la requête (${retryCount + 1}/3)...`);
        return geocodeAddress(address, retryCount + 1);
      } else {
        alert("Impossible de récupérer la géolocalisation après plusieurs essais. Veuillez vérifier votre connexion.");
        return null;
      }
    }
  };
  // Géocode les deux adresses et met à jour les points
  const updatePoints = async () => {
    const startCoords = await geocodeAddress(startAddress);
    if (startCoords) {
      setStartPoint(startCoords); // Met à jour le point de départ
  
      const endCoords = await geocodeAddress(endAddress);
      if (endCoords) {
        setEndPoint(endCoords); // Met à jour le point d'arrivée
  
        // Calcul des prix une fois que les deux coordonnées sont prêtes
        const distance = haversineDistance(startCoords, endCoords);
        const updatedPricing = [
          { type: "Normal", price: calculatePrice(distance) },
          { type: "Confort", price: calculatePrice(distance) * 2 },
          { type: "Premium", price: calculatePrice(distance) * 2 + 25.00 }
        ];
  
        setGridPrice(updatedPricing);
        setShow(true);
      }
    }
  };
  

useEffect(()=>{
//   const handleGetLocation = async () => {
//     try {
//         const pos = await getGeolocation();
//         setLocation(pos);
//     } catch (err) {
//         setError(err);
//     }
// };
//   handleGetLocation()
//   console.log(location); 
},[])


const handleReservation = () => {
  if (!sessionStorage.getItem('token')) {
    navigate('/login'); // Redirection vers la page de connexion
  return;
}
  if (!startAddress || !endAddress) {
    alert("Veuillez entrer les adresses de départ et d'arrivée.");
    return;
  }

        updatePoints();
  
        // Calcul des prix une fois que les deux coordonnées sont prêtes
        // const distance = haversineDistance(startPoint, endPoint);
        // const updatedPricing = [
        //   { type: "Normal",  price: calculatePrice(distance) },
        //   { type: "Confort", price: calculatePrice(distance) * 2 },
        //   { type: "Premium", price: calculatePrice(distance) *2 + 25.00 }
        // ];
  
        // setGridPrice(updatedPricing);
        // setShow(true);
};


  return (
    <div className="home-container">
<section class=" dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7 col-span-7">
          <h1 class='mb-10 text-2xl'>UBER</h1>
              <div class="mb-5 w-[350px]">
                <label for="departure" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">Depart</label>
                <form>
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="D'ou partez vous ?" 
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                required />
                </form>

              </div>
              <div class="mb-5">
              <label for="arrival" class="block mb-2 text-sm font-medium text-white-900 dark:text-white">Arrive</label>
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                placeholder='Où allez-vous ?'
                value={endAddress}
                onChange={(e) => setEndAddress(e.target.value)}
                required />
              </div>
              <button type="submit" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 " onClick={handleReservation}>Afficher les prix</button>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={frontImg} alt="mockup" />
        </div>                
    </div>
</section>
<section>
  {showGrid && 
    <PricingGrid grid={gridPrice} startPoint={startPoint} endPoint={endPoint} />}
</section>
    </div>
  );
};

export default Home;
