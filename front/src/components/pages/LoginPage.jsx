import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../reusables/Header';
import '../../style/General.css';
import '../../style/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/api/users/login', { // adjust URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        alert('Login failed.');
        return;
      }

      const data = await response.json();
      console.log('Logged in user:', data);

      localStorage.setItem('loggedUser', JSON.stringify(data));

      // Optionally, save user in local state or context
      // setUser(data.user);

      // Navigate to Admin Dashboard
      if(data.userType === 'ADMIN'){
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
      
    } catch (error) {
      console.error(error);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <>
    <Header title='FON Event Manager' buttons={[]}></Header>
    <div className='login-form-container'>
      <h1>Dobrodošli na stranicu za prijavu!</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Mejl adresa:</label>
        <input 
          type="text" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Unesite mejl adresu...'
        />

        <label htmlFor="password">Lozinka:</label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Unesite lozinku...'
        />

        <button type='submit'>Prijavi se</button>
      </form>
    </div>
    </>
  );
};

export default LoginPage;


