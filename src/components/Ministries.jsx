import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

const ministries = [
  {
    title: "Children's Ministry",
    description: "Nurturing the next generation in faith and love through engaging activities and biblical teaching.",
    detailedDescription: "Our Children's Ministry is dedicated to partnering with parents to lead children to become fully devoted followers of Christ. Through age-specific lessons, activities, and small groups, children learn biblical truths in a fun and safe environment. We offer programs for infants through 5th grade during all weekend services.",
    schedule: "Sundays at 9:00 AM & 11:00 AM",
    leader: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2669&auto=format&fit=crop"
  },
  {
    title: "Youth Ministry",
    description: "Empowering young people to live bold lives for Christ and make an impact in their world.",
    detailedDescription: "The Youth Ministry exists to reach students with the gospel and teach them how to walk with the Lord. We provide a space for middle and high school students to belong, ask questions, and grow in their faith. Join us for high-energy worship, relevant teaching, and small group discussions.",
    schedule: "Wednesdays at 7:00 PM",
    leader: "Mark Davis",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop"
  },
  {
    title: "Global Outreach",
    description: "Extending our hands to serve the community and spread the gospel across the nations.",
    detailedDescription: "We believe the church is called to go beyond its four walls. Our Global Outreach team coordinates mission trips, supports local community projects, and partners with organizations worldwide to meet physical and spiritual needs. Everyone has a part to play in the Great Commission.",
    schedule: "Various Monthly Events",
    leader: "Dr. James Wilson",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop"
  }
];

const Ministries = () => {
  const [selectedMinistry, setSelectedMinistry] = useState(null);

  // Disable body scroll when modal is open
    useEffect(() => {
    if (selectedMinistry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedMinistry]);

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
            <div key={index} className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={ministry.image} 
                  alt={ministry.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
              </div>
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
                  src={selectedMinistry.image} 
                  alt={selectedMinistry.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Ministry Details</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-6">{selectedMinistry.title}</h3>
                
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>{selectedMinistry.detailedDescription}</p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-6">
                    <div className="mb-3">
                      <span className="block font-bold text-secondary text-sm uppercase">Meeting Time</span>
                      <span>{selectedMinistry.schedule}</span>
                    </div>
                    <div>
                      <span className="block font-bold text-secondary text-sm uppercase">Team Leader</span>
                      <span>{selectedMinistry.leader}</span>
                    </div>
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
