import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Public pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';

// Admin pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import EventsManager from './pages/admin/EventsManager';
import SermonsManager from './pages/admin/SermonsManager';
import MinistriesManager from './pages/admin/MinistriesManager';
import GalleryManager from './pages/admin/GalleryManager';
import DonationsManager from './pages/admin/DonationsManager';
import StaffManager from './pages/admin/StaffManager';
import UsersManager from './pages/admin/UsersManager';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/gallery" element={<Gallery />} />
          
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
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="donations" element={<DonationsManager />} />
            <Route path="staff" element={<StaffManager />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
