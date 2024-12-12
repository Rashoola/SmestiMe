import React, {useState} from 'react';
import '../style/LoginPage.css';
import './Header'
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To handle login errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Example login request - replace with actual API endpoint
      const response = await fetch('http://localhost:9000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();

      // Assuming `data` contains the admin object
      if (data.userType === 'PARTICIPANT') {
        navigate('/admin_dashboard', { state: { admin: data } });
      } else {
        throw new Error('Unauthorized access. Only admins can log in here.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Header title="СместиМе!"></Header>
    <div className="login-page">
      <div className="login-container">
        <h1>Пријава на систем</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="mail">Мејл адреса:</label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" id="mail" name="mail" placeholder="Унесите вашу мејл адресу" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Лозинка:</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Унесите вашу лозинку" />
          </div>
          <button type="submit" className="login-button">Пријава</button>
        </form>
        <p className="register-link">
          Немате налог? <Link to="/register">Региструјте се.</Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
