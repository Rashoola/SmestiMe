import React, {useState} from 'react';
import '../style/LoginPage.css';
import Header from './Header';
import {Link, useNavigate} from 'react-router-dom';

const LoginPage = () => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To handle login errors
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Example login request - replace with actual API endpoint
      const response = await fetch('http://localhost:9000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed.');
      }
      navigate('/login')
     
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Header title="СместиМе!"></Header>
    <div className="login-page">
      <div className="login-container">
        <h1>Регистрација</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Име:</label>
            <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Унесите ваше име" />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Презиме:</label>
            <input onChange={(e) => setSurname(e.target.value)} type="text" id="surname" name="surname" placeholder="Унесите ваше презиме" />
          </div>
          <div className="form-group">
            <label htmlFor="mail">Мејл адреса:</label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" id="mail" name="mail" placeholder="Унесите вашу мејл адресу" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Лозинка:</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Унесите вашу лозинку" />
          </div>
          <button type="submit" className="login-button">Регистрација</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;