
import './App.css';
import './components/LoginPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminDashboard from './components/AdminDashboard';
import EventDetailsPage from './components/EventDetailsPage';
import SittingArrangementPage from './components/SittingArrangementPage';
import ParticipantDashboard from './components/ParticipantDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Add the registration page route */}
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/admin_dashboard" element={<AdminDashboard/>} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/arrangement" element={<SittingArrangementPage />} />
        <Route path="/participant_dashboard" element={<ParticipantDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
