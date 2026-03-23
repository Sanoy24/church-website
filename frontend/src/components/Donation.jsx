import { useState, useEffect } from 'react';
import { DollarSign, Copy, Check, Heart, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

const Donation = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [accountsError, setAccountsError] = useState(null);
  const [staffError, setStaffError] = useState(null);

  useEffect(() => {
    loadAccounts();
    loadStaffMembers();
  }, []);

  const loadAccounts = async () => {
    setLoadingAccounts(true);
    setAccountsError(null);
    try {
      const data = await api.donations.getAll();
      setAccounts(data);
    } catch (err) {
      setAccountsError(err.message);
    } finally {
      setLoadingAccounts(false);
    }
  };

  const loadStaffMembers = async () => {
    setLoadingStaff(true);
    setStaffError(null);
    try {
      const data = await api.staff.getAll();
      setStaffMembers(data);
    } catch (err) {
      setStaffError(err.message);
    } finally {
      setLoadingStaff(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loadingAccounts) {
    return (
      <section id="donation" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading donation accounts...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (accountsError) {
    return (
      <section id="donation" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">Failed to load donation accounts: {accountsError}</p>
            <button 
              onClick={loadAccounts}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="donate" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heart className="mx-auto text-primary mb-4" size={48} fill="currentColor" />
          <span className="text-primary font-bold uppercase tracking-wider text-sm">Support Our Mission</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mt-2">Tithes & Offerings</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Your generosity helps us continue our work in the community and spread the message of hope and love. Every contribution makes a difference.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accounts.map((account, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`h-2 bg-${account.color}-500`}></div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full bg-${account.color}-100 flex items-center justify-center`}>
                    <DollarSign className={`text-${account.color}-600`} size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-secondary">{account.bank_name}</h3>
                    <p className="text-gray-500 text-sm">{account.account_type || 'Account'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Account Name</p>
                    <p className="text-gray-700 font-medium">{account.account_name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Account Number</p>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-gray-700 font-mono font-bold tracking-wider">{account.account_number}</p>
                      <button
                        onClick={() => copyToClipboard(account.account_number, index)}
                        className="text-gray-400 hover:text-primary transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === index ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Our Staff */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-secondary inline-block relative">
              Our Staff
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary"></div>
            </h3>
          </div>

          {loadingStaff ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : staffError ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Failed to load staff: {staffError}</p>
              <button
                onClick={loadStaffMembers}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : staffMembers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Staff profiles will appear here once they are added.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto pb-6 no-scrollbar">
                <div className="flex min-w-max gap-6 px-1 snap-x snap-mandatory">
                  {staffMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex-none w-[220px] sm:w-[240px] group snap-start"
                    >
                      <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden mb-4 shadow-md group-hover:shadow-2xl transition-all duration-500">
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-80 group-hover:opacity-65 transition-opacity"></div>
                      </div>
                      <div className="text-center max-w-[220px] sm:max-w-[240px] mx-auto">
                        <h4 className="font-serif font-bold text-lg text-secondary group-hover:text-primary transition-colors">
                          {member.name}
                        </h4>
                        <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                          {member.role}
                        </p>
                        {member.bio && (
                          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                            {member.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {staffMembers.length > 3 && (
                <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                  Scroll sideways to see more of the team
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>

  );
};

export default Donation;
