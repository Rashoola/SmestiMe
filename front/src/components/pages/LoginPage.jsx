import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../reusables/Header';
import '../../style/General.css';
import '../../style/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateInput = () => {
    if (!email.trim() || !password.trim()) {
      alert('Сва поља морају бити попуњена.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInput()) return; // stop if fields are empty

    try {
      const response = await fetch('http://localhost:9000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        alert('Неуспешна пријава. Проверите податке.');
        return;
      }

      const data = await response.json();
      console.log('Logged in user:', data);

      localStorage.setItem('loggedUser', JSON.stringify(data));
      alert('Успешна пријава на систем.');

      if (data.userType === 'ADMIN') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error(error);
      alert('Неуспешна пријава. Грешка приликом повезивања.');
    }
  };

  return (
    <>
      <Header title='пријава корисника на систем' buttons={[]}></Header>
      <div className='login-form-container'>
        <h1>Пријава</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">И-мејл адреса</label>
          <input 
            type="text" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Унесите и-мејл адресу...'
          />

          <label htmlFor="password">Лозинка</label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Унесите лозинку...'
          />

          <button type='submit'>Пријава</button>
          <Link to='/registration'>Немате налог? Региструјте се.</Link>
        </form>
      </div>
    </>
  );
};

export default LoginPage;



