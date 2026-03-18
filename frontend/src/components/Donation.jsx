import { useState, useEffect } from 'react';
import { DollarSign, Copy, Check, Heart, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

const DUMMY_ACCOUNTS = [
  {
    bank_name: "Commercial Bank of Ethiopia",
    account_name: "St. George Church General Fund",
    account_number: "1000123456789",
    account_type: "Savings Account",
    color: "blue"
  },
  {
    bank_name: "Abyssinia Bank",
    account_name: "Church Building Project",
    account_number: "9876543210123",
    account_type: "Current Account",
    color: "purple"
  },
  {
    bank_name: "Dashen Bank",
    account_name: "Community Outreach Program",
    account_number: "4567890123456",
    account_type: "Savings Account",
    color: "orange"
  }
];

const Donation = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.donations.getAll();
      if (data && data.length > 0) {
        setAccounts(data);
      } else {
        setAccounts(DUMMY_ACCOUNTS);
      }
    } catch (err) {
      console.error("Failed to load donation accounts, using dummy data:", err);
      setAccounts(DUMMY_ACCOUNTS);
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


  const pastors = [
    {
      name: "Rev. Dr. Tesfaye",
      role: "Senior Pastor",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=2578&auto=format&fit=crop"
    },
    {
      name: "Pastor Martha",
      role: "Worship Leader",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
    },
    {
      name: "Pastor Elias",
      role: "Youth Outreach",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "Pastor Sarah",
      role: "Children's Ministry",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2622&auto=format&fit=crop"
    }
  ];

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

        {/* Our Staff - Centered Horizontal Scroll */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-secondary inline-block relative">
              Our Staff
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary"></div>
            </h3>
          </div>

          <div className="flex overflow-x-auto pb-8 gap-8 no-scrollbar snap-x justify-start md:justify-center">
            {pastors.map((pastor, index) => (
              <div 
                key={index} 
                className="flex-none w-[200px] group snap-center"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={pastor.image} 
                    alt={pastor.name} 
                    className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                </div>
                <div className="text-center">
                  <h4 className="font-serif font-bold text-lg text-secondary group-hover:text-primary transition-colors">{pastor.name}</h4>
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{pastor.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
};

export default Donation;
