import React, { useState } from 'react';
import '../style/LoginPage.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To handle registration errors
  const [validationError, setValidationError] = useState(null); // To handle validation errors
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!name.trim()) {
      return 'Име је обавезно.';
    }
    if (!surname.trim()) {
      return 'Презиме је обавезно.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Молимо унесите исправну мејл адресу.';
    }
    if (password.length < 6) {
      return 'Лозинка мора имати најмање 6 карактера.';
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    const validationMessage = validateInputs();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    try {
      const response = await fetch('http://localhost:9000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (!response.ok) {
        alert("Регистрација није успела.");
        return;
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header title="СместиМе!" />
      <div className="login-page">
        <div className="login-container">
          <h1>Регистрација</h1>
          <form onSubmit={handleRegister}>
            {validationError && <p style={{color: 'red'}} className="error">{validationError}</p>}
            {error && <p className="error">{error}</p>}
            <div className="form-group">
              <label htmlFor="name">Име:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                placeholder="Унесите ваше име"
                value={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Презиме:</label>
              <input
                onChange={(e) => setSurname(e.target.value)}
                type="text"
                id="surname"
                name="surname"
                placeholder="Унесите ваше презиме"
                value={surname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mail">Мејл адреса:</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="mail"
                name="mail"
                placeholder="Унесите вашу мејл адресу"
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Лозинка:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Унесите вашу лозинку"
                value={password}
              />
            </div>
            <button type="submit" className="login-button">
              Регистрација
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
