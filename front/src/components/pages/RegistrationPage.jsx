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

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/api/users/register', { // adjust URL
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
    <Header title='регистрација на систем' buttons={[]}></Header>
    <div className='registration-form-container'>
      <h1>Регистрација</h1>
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
    </>
  );
};

export default RegistrationPage;