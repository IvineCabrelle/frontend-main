// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Link
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="welcome-title">Bienvenue dans notre application !</h1>
        <p className="welcome-subtitle">Votre voyage commence ici</p>
        <div className="button-container">
          <Link to="/login">
            <button className="home-button">Se connecter</button>
          </Link>
          <Link to="/signup">
            <button className="home-button">S'inscrire</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
