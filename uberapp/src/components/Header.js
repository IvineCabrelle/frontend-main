import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; 
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [status , setStatus] = useState(false);

  const handleHomeClick = () => {
    navigate('/'); // Redirige vers la page d'accueil
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };


  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const url = `http://localhost:5000/user/id`
        const response = await axios.get(url,{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
        });
        console.log(response.data.status);
        
        if (response.data.status) {
          setData(response.data.data)
          setStatus(true)
          
        } else {
              setStatus(false)
        }  
      } catch (error) {
            setStatus(false)
  
      }
    }
      fetchData()

  },[])
  return (
    <header className="header">
      <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        UberApp
      </div>
      <div className="nav-links">
        {status &&
        
        <button className="nav-button">
        {`${data.firstname}  ${data.lastname}`}
      </button>
        }
        {!status &&
        <>
                    <button className="nav-button" onClick={handleLoginClick}>
                      Se connecter
                    </button>
                    <button className="nav-button" onClick={handleSignupClick}>
                      S'inscrire
                    </button>
        </>
        }

      </div>
    </header>
  );
};

export default Header;
