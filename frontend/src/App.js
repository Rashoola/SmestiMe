
import './App.css';
import './components/LoginPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminDashboard from './components/AdminDashboard';
import EventDetailsPage from './components/EventDetailsPage';
import SittingArrangementPage from './components/SittingArrangementPage';
import ParticipantDashboard from './components/ParticipantDashboard';
import MyEventsPage from './components/MyEventsPage';
import ChooseTablePage from './components/ChooseTablePage';
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
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/choose-table" element={<ChooseTablePage />} />
      </Routes>
    </Router>
  );
}

export default App;
