import React, { useEffect, useState } from 'react'
import UberMap2 from './Map'
import axios from 'axios';
import DriverCard from './DriverCard'; // Assurez-vous que le chemin est correct
import driversData from '../drivers/drivers.json';

const PricingGrid = ({grid , startPoint , endPoint}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [driver, setDriver] = useState(null);
    const createReservation = async(details)=>{
        
        const data = {
              user: sessionStorage.getItem('token'),
              driver : driver.name,
              positionDriver: {
                "lat" :0,
                "long":0
             },
              positionClient: {
                "lat" :startPoint[0],
                "long":startPoint[1]
              },
              price:details.price,
              type:details.type 
        }
        const token = sessionStorage.getItem('token'); 

        try {
          const response = await axios.post('http://localhost:5001/res', data, {
            headers: {
              Authorization: `Bearer ${token}`, // Ajout du Bearer Token dans les en-têtes
              'Content-Type': 'application/json', 
            },
          });
      
          console.log('Réponse du serveur:', response.data);
          sessionStorage.setItem('id_reservation', response.data.id_reservation);
        } catch (error) {
          console.error('Erreur lors de l\'envoi des données:', error); 
        }
        
        setIsSelected(true)
    }

    useEffect(()=>{
        console.log(startPoint+" AND "+endPoint);
        setIsSelected(false)
    },[])
    useEffect(() => {
        const getRandomDriver = () => {
          const randomIndex = Math.floor(Math.random() * driversData.length);
          return driversData[randomIndex];
        };
    
        // Sélectionne un chauffeur une seule fois au montage du composant
        setDriver(getRandomDriver());
      }, []);
  return (
    <section class="bg-white dark:bg-gray-900">
{!isSelected  &&

    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">{grid[0].type}</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-5xl font-extrabold">${grid[0].price}</span>
                </div>
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Individual configuration</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>No setup, or hidden fees</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Team size: <span class="font-semibold">1 developer</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Premium support: <span class="font-semibold">6 months</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Free updates: <span class="font-semibold">6 months</span></span>
                    </li>
                </ul>
                <button class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 " onClick={()=> createReservation(grid[0])}>Choisir</button>
            </div>
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">{grid[1].type}</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-5xl font-extrabold">${grid[1].price}</span>
                </div>
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Individual configuration</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>No setup, or hidden fees</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Team size: <span class="font-semibold">10 developers</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Premium support: <span class="font-semibold">24 months</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Free updates: <span class="font-semibold">24 months</span></span>
                    </li>
                </ul>
                <button class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 " onClick={()=>createReservation(grid[1])}>Choisir</button>
            </div>
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">{grid[2].type}</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-5xl font-extrabold">${grid[2].price}</span>
                </div>
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Individual configuration</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>No setup, or hidden fees</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Team size: <span class="font-semibold">100+ developers</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Premium support: <span class="font-semibold">36 months</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Free updates: <span class="font-semibold">36 months</span></span>
                    </li>
                </ul>
                <button class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 " onClick={()=>createReservation(grid[2])}>Choisir</button>
  
            </div>
        </div>
    </div>
}
{
    isSelected &&
        <UberMap2 start = {startPoint} end={endPoint} driver = {driver}/>
}


    </section>
// <section class="bg-white dark:bg-gray-900">
//   <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
//       <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
//           <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
//           <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
//       </div>
//       <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
//           <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
//               <h3 class="mb-4 text-2xl font-semibold">{grid[0].type}</h3>
//               <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
//               <div class="flex justify-center items-baseline my-8">
//                   <span class="mr-2 text-5xl font-extrabold">${grid[0].price}</span>
//               </div>
//               <ul role="list" class="mb-8 space-y-4 text-left">
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Individual configuration</span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>No setup, or hidden fees</span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Team size: <span class="font-semibold">1 developer</span></span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Premium support: <span class="font-semibold">6 months</span></span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Free updates: <span class="font-semibold">6 months</span></span>
//                   </li>
//               </ul>
//               <button class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 " onClick={createReservation(grid[0])}>Choisir</button>
//           </div>
//           <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
//               <h3 class="mb-4 text-2xl font-semibold">{grid[1].type}</h3>
//               <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
//               <div class="flex justify-center items-baseline my-8">
//                   <span class="mr-2 text-5xl font-extrabold">${grid[1].price}</span>
//               </div>
//               <ul role="list" class="mb-8 space-y-4 text-left">
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Individual configuration</span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>No setup, or hidden fees</span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Team size: <span class="font-semibold">10 developers</span></span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Premium support: <span class="font-semibold">24 months</span></span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Free updates: <span class="font-semibold">24 months</span></span>
//                   </li>
//               </ul>
//               <button class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 " onClick={createReservation(grid[1])}>Choisir</button>
//           </div>
//           <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
//               <h3 class="mb-4 text-2xl font-semibold">{grid[2].type}</h3>
//               <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
//               <div class="flex justify-center items-baseline my-8">
//                   <span class="mr-2 text-5xl font-extrabold">${grid[2].price}</span>
//               </div>
//               <ul role="list" class="mb-8 space-y-4 text-left">
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Individual configuration</span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>No setup, or hidden fees</span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Team size: <span class="font-semibold">100+ developers</span></span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Premium support: <span class="font-semibold">36 months</span></span>
//                   </li>
//                   <li class="flex items-center space-x-3">
//                       <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                       <span>Free updates: <span class="font-semibold">36 months</span></span>
//                   </li>
//               </ul>
//               <button class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 " onClick={createReservation(grid[2])}>Choisir</button>

//           </div>
//       </div>
//   </div>
// </section>
  )
}

export default PricingGrid