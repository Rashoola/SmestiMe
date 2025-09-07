import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import VenuesPage from './components/pages/VenuesPage';
import EventsPage from './components/pages/EventsPage';
import AdminDashboard from './components/pages/AdminDashboard';


function App() {
   return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );

}

export default App;
