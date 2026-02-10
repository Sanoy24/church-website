import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Public pages
import Home from './pages/Home';

// Admin pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import EventsManager from './pages/admin/EventsManager';
import SermonsManager from './pages/admin/SermonsManager';
import MinistriesManager from './pages/admin/MinistriesManager';
import DonationsManager from './pages/admin/DonationsManager';
import UsersManager from './pages/admin/UsersManager';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/admin/events" replace />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="sermons" element={<SermonsManager />} />
            <Route path="ministries" element={<MinistriesManager />} />
            <Route path="donations" element={<DonationsManager />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
