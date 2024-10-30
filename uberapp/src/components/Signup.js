import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    setMaxDate(formattedDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Calculer l'âge à partir de la date de naissance
    const birthDateObject = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObject.getFullYear();
    const monthDiff = today.getMonth() - birthDateObject.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObject.getDate())) {
      age--;
    }

    // Envoi des données à l'API dans l'ordre spécifié
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          pwd: password,
          firstname: firstName,
          lastname: lastName,
          age: age,
          sex: gender,
          cell: phone,
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        alert('Erreur lors de la création de l\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Créer un compte</h2>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Mot de Passe</label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm_password" className="form-label">Confirmer le Mot de Passe</label>
          <input
            type="password"
            id="confirm_password"
            className="form-input"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="floating_first_name" className="form-label">Prénom</label>
          <input
            type="text"
            id="floating_first_name"
            className="form-input"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="floating_last_name" className="form-label">Nom de famille</label>
          <input
            type="text"
            id="floating_last_name"
            className="form-input"
            placeholder="Nom de famille"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="floating_phone" className="form-label">Numéro de téléphone (123-456-7890)</label>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            id="floating_phone"
            className="form-input"
            placeholder="123-456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birth_date" className="form-label">Date de naissance</label>
          <input
            type="date"
            id="birth_date"
            className="form-input"
            max={maxDate}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender" className="form-label">Sexe</label>
          <select
            id="gender"
            className="form-input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>Sélectionnez votre sexe</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Soumettre</button>
        <Link to="/" className="login-link">Accueil</Link>
      </form>
    </div>
  );
};

export default Signup;
