import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2574&auto=format&fit=crop" 
                alt="Church Gathering" 
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1510590611086-309679432aa8?q=80&w=2669&auto=format&fit=crop" 
                alt="Worship" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -z-10 top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full"></div>
            <div className="absolute -z-10 bottom-4 -right-4 w-32 h-32 bg-secondary/5 rounded-full"></div>
          </div>

          {/* Content */}
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm">About Our Church</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mt-4 mb-6 leading-tight">
              A Place of Love, <br/> Hope, and Faith
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              At Zegen, we believe in the transformative power of God's love. We are dedicated to creating a welcoming community where everyone can experience grace, growth, and authentic connection.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Bible-Centered Teaching",
                "Community Focused",
                "Compassionate Service"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span className="text-secondary font-medium text-lg">{item}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-secondary text-white text-sm font-bold uppercase tracking-widest hover:bg-primary transition-colors">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
