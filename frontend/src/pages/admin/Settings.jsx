import { useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Key, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setStatus('error');
      setErrorMessage('New passwords do not match');
      return;
    }

    setLoading(true);
    setStatus('idle');
    try {
      await api.auth.changePassword(formData.currentPassword, formData.newPassword);
      setStatus('success');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-secondary">Account Settings</h1>
        <p className="text-gray-600 mt-1">Manage your personal account and security</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 mx-auto md:mx-0">
              <Shield size={32} />
            </div>
            <h3 className="font-bold text-secondary text-lg mb-2">Account Security</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We recommend using a unique password that you don't use elsewhere to keep your account safe.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-serif font-bold text-secondary flex items-center gap-2">
                <Key className="text-primary" size={20} />
                Change Password
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={20} />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    required
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Enter current password"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      required
                      minLength="6"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Min. 6 characters"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Repeat new password"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-primary text-white rounded-xl hover:bg-red-600 shadow-lg shadow-primary/20 transition-all transform active:scale-95 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Updating Password...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
            <p className="text-[11px] text-blue-600 font-medium uppercase tracking-wider text-center">
              Logged in as: {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {status === 'success' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle2 size={32} className="animate-in fade-in zoom-in duration-500 delay-200" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-secondary mb-3">Password Updated!</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Your password has been changed successfully. Your account is now even more secure.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="w-full px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-all transform active:scale-95 font-bold uppercase text-xs tracking-widest shadow-lg shadow-secondary/20"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
