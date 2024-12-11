import React from 'react';
import '../style/LoginPage.css';
import './Header'
import Header from './Header';

const LoginPage = () => {
  return (
    <>
    <Header title="СместиМе!"></Header>
    <div className="login-page">
      <div className="login-container">
        <h1>Регистрација</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Име:</label>
            <input type="text" id="name" name="name" placeholder="Унесите ваше име" />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Презиме:</label>
            <input type="text" id="surname" name="surname" placeholder="Унесите ваше презиме" />
          </div>
          <div className="form-group">
            <label htmlFor="mail">Мејл адреса:</label>
            <input type="text" id="mail" name="mail" placeholder="Унесите вашу мејл адресу" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Лозинка:</label>
            <input type="password" id="password" name="password" placeholder="Унесите вашу лозинку" />
          </div>
          <button type="submit" className="login-button">Регистрација</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;