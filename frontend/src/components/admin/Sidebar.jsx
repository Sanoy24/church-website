import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Mic, 
  Users, 
  DollarSign, 
  LogOut,
  Church
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/events', icon: Calendar, label: 'Events' },
    { to: '/admin/sermons', icon: Mic, label: 'Sermons' },
    { to: '/admin/ministries', icon: Users, label: 'Ministries' },
    { to: '/admin/donations', icon: DollarSign, label: 'Donations' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ to: '/admin/users', icon: Users, label: 'Users' });
  }

  return (
    <div className="w-64 bg-secondary text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Church size={32} className="text-primary" />
          <div>
            <h1 className="font-serif font-bold text-xl">Church Admin</h1>
            <p className="text-white/60 text-xs">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
