import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import VenuesPage from './components/pages/VenuesPage';
import VenueDisplayPage from './components/pages/VenueDisplayPage';
import EventsPage from './components/pages/EventsPage';
import EventDisplayPage from './components/pages/EventDisplayPage';
import AdminDashboard from './components/pages/AdminDashboard';
import Dashboard from './components/pages/Dashboard';
import ParticipantEventsPage from './components/pages/ParticipantEventsPage';


function App() {
   return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/venue/create" element={<VenueDisplayPage mode='create'/>} />
        <Route path="/venue/:id" element={<VenueDisplayPage mode='edit'/>} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventDisplayPage mode='edit'/>} />
        <Route path="/event/create" element={<EventDisplayPage mode='create'/>} />
        <Route path="/participant/:id/events" element={<ParticipantEventsPage />} />
      </Routes>
    </Router>
  );

}

export default App;
