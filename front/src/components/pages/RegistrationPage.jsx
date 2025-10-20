import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../reusables/Header';
import '../../style/General.css';
import '../../style/RegistrationPage.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateInput = () => {
    // Check if all fields are filled
    if (!name.trim() || !surname.trim() || !email.trim() || !password.trim()) {
      alert('Сва поља морају бити попуњена.');
      return false;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Унесите исправну мејл адресу.');
      return false;
    }

    // Check password length
    if (password.length < 8) {
      alert('Лозинка мора имати најмање 8 карактера.');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateInput()) return; // stop if validation fails

    try {
      const response = await fetch('http://localhost:9000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, password })
      });

      if (!response.ok) {
        alert('Неуспешна регистрација на систем.');
        return;
      }

      alert('Успешна регистрација на систем.');
      navigate('/');
      
    } catch (error) {
      console.error(error);
      alert('Неуспешна регистрација на систем. Грешка приликом повезивања.');
    }
  };

  return (
    <>
      <div className='main'
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
      <div className='registration-form-container'>
        <strong style={{
          margin: 30,
          fontSize: 40,
          color: 'white'
        }}>
          Регистрација на систем ФОН Догађаји
          </strong>
        <form onSubmit={handleRegister}>
          <label htmlFor="name">Име</label>
          <input 
            type="text" 
            name="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder='Унесите име...'
          />

          <label htmlFor="surname">Презиме</label>
          <input 
            type="text" 
            name="surname" 
            value={surname} 
            onChange={(e) => setSurname(e.target.value)} 
            placeholder='Унесите презиме...'
          />

          <label htmlFor="email">Мејл адреса</label>
          <input 
            type="text" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Унесите мејл адресу...'
          />

          <label htmlFor="password">Лозинка</label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Унесите лозинку...'
          />

          <button type='submit'>Региструј се</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default RegistrationPage;
