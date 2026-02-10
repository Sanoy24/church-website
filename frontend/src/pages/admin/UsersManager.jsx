import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { UserPlus, Trash2, X, Mail, Shield, User as UserIcon, Key, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';

const UsersManager = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'editor'
  });
  const [resettingUser, setResettingUser] = useState(null);
  const [resetPassword, setResetPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await api.auth.getAllUsers();
      setUsers(data);
    } catch (error) {
      alert('Failed to load users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.auth.signup(formData.email, formData.password, formData.role);
      loadUsers();
      resetForm();
    } catch (error) {
      alert('Failed to create user: ' + error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resettingUser) return;
    
    try {
      setIsResetting(true);
      await api.auth.resetUserPassword(resettingUser.id, resetPassword);
      alert(`Password for ${resettingUser.email} has been reset successfully.`);
      setResettingUser(null);
      setResetPassword('');
    } catch (error) {
      alert('Failed to reset password: ' + error.message);
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteClick = (user) => {
    if (user.id === currentUser.id) {
      alert("You cannot delete your own account.");
      return;
    }
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;
    
    try {
      await api.auth.deleteUser(deletingUser.id);
      loadUsers();
      setDeletingUser(null);
    } catch (error) {
      alert('Failed to delete user: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      role: 'editor'
    });
    setShowForm(false);
  };

  if (loading) return <div className="p-8">Loading users...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-secondary">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage admin and editor accounts</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors font-bold uppercase tracking-wider"
        >
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <UserIcon size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-secondary">{user.email}</p>
                      {user.id === currentUser.id && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">
                          You
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    <Shield size={12} />
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setResettingUser(user)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors bg-white hover:bg-blue-50 rounded-lg"
                      title="Reset Password"
                    >
                      <Key size={18} />
                    </button>
                    {user.id !== currentUser.id && (
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white hover:bg-red-50 rounded-lg"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-serif font-bold text-secondary flex items-center gap-2">
                <UserPlus className="text-primary" />
                Add New User
              </h2>
              <button onClick={resetForm} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="staff@church.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Shield size={16} />
                  Initial Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Min. 6 characters"
                  minLength="6"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Access Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="editor">Editor (Can manage content)</option>
                  <option value="admin">Admin (Can manage everything including users)</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-bold uppercase text-xs tracking-widest text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-primary text-white rounded-xl hover:bg-red-600 shadow-lg shadow-primary/20 transition-all transform active:scale-95 font-bold uppercase text-xs tracking-widest"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Reset Password Modal */}
      {resettingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-serif font-bold text-secondary flex items-center gap-2">
                <Key className="text-primary" />
                Reset Password
              </h2>
              <button 
                onClick={() => { setResettingUser(null); setResetPassword(''); }} 
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-white transition-colors"
                disabled={isResetting}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleResetPassword} className="p-8 space-y-6">
              <div>
                <p className="text-gray-600 mb-4 text-sm">
                  Resetting password for: <span className="font-bold text-secondary">{resettingUser.email}</span>
                </p>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Shield size={16} />
                  New Password
                </label>
                <input
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Min. 6 characters"
                  minLength="6"
                  required
                  disabled={isResetting}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setResettingUser(null); setResetPassword(''); }}
                  className="flex-1 px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-bold uppercase text-xs tracking-widest text-gray-600"
                  disabled={isResetting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-primary text-white rounded-xl hover:bg-red-600 shadow-lg shadow-primary/20 transition-all transform active:scale-95 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                  disabled={isResetting}
                >
                  {isResetting && <Loader2 size={16} className="animate-spin" />}
                  {isResetting ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        itemName={deletingUser?.email}
        message={`Are you sure you want to delete staff account ${deletingUser?.email}? This will permanently remove their access to the dashboard.`}
      />
    </div>
  );
};

export default UsersManager;
