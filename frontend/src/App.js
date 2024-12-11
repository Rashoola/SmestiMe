
import './App.css';
import './components/LoginPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Add the registration page route */}
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
