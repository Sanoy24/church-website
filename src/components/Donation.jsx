import { useState, useEffect } from 'react';
import { DollarSign, Copy, Check, Heart, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

const Donation = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.donations.getAll();
      setAccounts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) {
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

  if (error) {
    return (
      <section id="donation" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">Failed to load donation accounts: {error}</p>
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

        <div className="mt-16 bg-secondary rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
             <Heart size={300} fill="white" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Other Ways to Give?</h3>
              <p className="text-gray-300">
                If you prefer to give in person or via mobile payment platforms like Telebirr or M-Pesa, please visit our hospitality desk during service or contact our finance office.
              </p>
            </div>
            <button className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-primary transition-all shadow-xl flex items-center gap-3">
              Contact Finance <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
