import { useState, useEffect } from 'react';
import { Users, X } from 'lucide-react';
import { api } from '../services/api';

const Ministries = () => {
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMinistry, setSelectedMinistry] = useState(null);

  useEffect(() => {
    loadMinistries();
  }, []);

  const loadMinistries = async () => {
    try {
      const data = await api.ministries.getAll();
      setMinistries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Disable body scroll when modal is open
    useEffect(() => {
    if (selectedMinistry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedMinistry]);

  if (loading) {
    return (
      <section id="ministries" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading ministries...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="ministries" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">Failed to load ministries: {error}</p>
            <button 
              onClick={loadMinistries}
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
    <section id="ministries" className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">Our Ministries</span>
          <h2 className="text-4xl font-serif font-bold text-secondary mt-2">Ways to Get Involved</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ministries.map((ministry, index) => (
            <div 
            key={index} 
            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 relative"
            onClick={() => setSelectedMinistry(ministry)}
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={ministry.image_url} 
                alt={ministry.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-secondary mb-3">{ministry.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {ministry.description}
                </p>
                <button 
                  onClick={() => setSelectedMinistry(ministry)}
                  className="inline-flex items-center text-primary font-bold uppercase text-sm tracking-wide gap-2 group-hover:gap-3 transition-all hover:text-red-600"
                >
                  Read More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
        {selectedMinistry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedMinistry(null)}
          ></div>
          
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <button 
              onClick={() => setSelectedMinistry(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X size={24} className="text-secondary" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-full min-h-[300px]">
                <img 
                  src={selectedMinistry.image_url} 
                  alt={selectedMinistry.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Ministry Details</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-6">{selectedMinistry.title}</h3>
                
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>{selectedMinistry.detailed_description}</p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-6">
                    {selectedMinistry.schedule && (
                      <div className="flex items-start gap-3 mb-4">
                        <Users className="text-primary flex-shrink-0 mt-1" size={20} />
                        <div>
                          <p className="font-bold text-secondary mb-1">Schedule</p>
                          <p className="text-sm">{selectedMinistry.schedule}</p>
                        </div>
                      </div>
                    )}
                    {selectedMinistry.leader && (
                      <div className="flex items-start gap-3">
                        <Users className="text-primary flex-shrink-0 mt-1" size={20} />
                        <div>
                          <p className="font-bold text-secondary mb-1">Ministry Leader</p>
                          <p className="text-sm">{selectedMinistry.leader}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-secondary transition-colors">
                    Join This Ministry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Ministries;
