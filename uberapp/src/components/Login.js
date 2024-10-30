import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const url = "http://localhost:5000/auth/login";
    const body = {
        email : email,
        pwd: password
    }
    try {
        const response = await axios.post(url, body);
        if (response.data.status) {
            console.log(response.data.token);
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('name', response.data.name);
            console.log(response.data.token);
            
            navigate('/');
            // go back to connection
        } else {
              alert("erreur des donnees")
        }        
    } catch (error) {
      alert(error)
    }

}

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Se connecter</h2>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">Adresse Electronique</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="name@yourbank.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label"> Mot de Passe</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button" onClick={handleSubmit}>Soumettre</button>

        <p className="footer-text">
          Pas de compte? 
          <Link to="/signup" className="login-link">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
