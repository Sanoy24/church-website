import { useState } from 'react';
import { CreditCard, Copy, Check, Heart, ExternalLink } from 'lucide-react';

const Donation = () => {
  const [copiedAccount, setCopiedAccount] = useState(null);

  const bankAccounts = [
    {
      bankName: "Commercial Bank of Ethiopia",
      accountName: "Zegen Church Main",
      accountNumber: "1000123456789",
      type: "Local Transfer",
      color: "bg-blue-600"
    },
    {
      bankName: "Abyssinia Bank",
      accountName: "Zegen Church Outreach",
      accountNumber: "9876543210",
      type: "Local Transfer",
      color: "bg-red-700"
    },
    {
      bankName: "International Wire",
      accountName: "Zegen Church Global",
      accountNumber: "SWIFT: ZEGENETXXXX",
      type: "International",
      color: "bg-secondary"
    }
  ];

  const copyToClipboard = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bankAccounts.map((account, index) => (
            <div 
              key={index}
              className="group relative bg-light rounded-2xl p-8 border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              {/* Decorative background element */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${account.color} opacity-5 -mr-16 -mt-16 rounded-full transition-transform duration-500 group-hover:scale-150`}></div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 ${account.color} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <CreditCard size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-secondary mb-1">{account.bankName}</h3>
                <p className="text-xs text-primary font-bold uppercase tracking-widest mb-4">{account.type}</p>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-gray-400 block mb-1">Account Name</span>
                    <p className="text-gray-800 font-medium">{account.accountName}</p>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                    <span className="text-xs text-gray-400 block mb-1">Account Number</span>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-lg font-mono font-bold text-secondary break-all">
                        {account.accountNumber}
                      </p>
                      <button 
                        onClick={() => copyToClipboard(account.accountNumber)}
                        className={`p-2 rounded-lg transition-all ${
                          copiedAccount === account.accountNumber 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-500 hover:bg-primary hover:text-white'
                        }`}
                        title="Copy Account Number"
                      >
                        {copiedAccount === account.accountNumber ? <Check size={18} /> : <Copy size={18} />}
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
