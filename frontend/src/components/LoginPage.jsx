import React from 'react';
import '../style/LoginPage.css';
import './Header'
import Header from './Header';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
    <Header title="СместиМе!"></Header>
    <div className="login-page">
      <div className="login-container">
        <h1>Пријава на систем</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Корисничко име:</label>
            <input type="text" id="username" name="username" placeholder="Унесите ваше корисничко име" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Лозинка:</label>
            <input type="password" id="password" name="password" placeholder="Унесите вашу лозинку" />
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
