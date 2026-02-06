import { useRef, useState, useEffect } from 'react';
import { Play, Calendar, Clock, ChevronLeft, ChevronRight, X, Search, Filter } from 'lucide-react';

const Sermons = () => {
  const scrollRef = useRef(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sermons = [
    {
      title: "Walking in Faith",
      series: "Foundations",
      preacher: "Pastor John Doe",
      date: "Oct 15, 2023",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop"
    },
    {
      title: "The Power of Prayer",
      series: "Foundations",
      preacher: "Pastor Jane Smith",
      date: "Oct 08, 2023",
      image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2574&auto=format&fit=crop"
    },
    {
      title: "Community & Grace",
      series: "Community",
      preacher: "Pastor John Doe",
      date: "Oct 01, 2023",
      image: "https://images.unsplash.com/photo-1510590611086-309679432aa8?q=80&w=2669&auto=format&fit=crop"
    },
    {
      title: "Hope in Hardship",
      series: "Endurance",
      preacher: "Pastor Jane Smith",
      date: "Sep 24, 2023",
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "Living with Purpose",
      series: "Life Skills",
      preacher: "Pastor John Doe",
      date: "Sep 17, 2023",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2669&auto=format&fit=crop"
    }
  ];

  const sermonsArchive = [
    ...sermons,
    { title: "Strength in Weakness", series: "Foundations", preacher: "Pastor Mary King", date: "Sep 10, 2023", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop" },
    { title: "The Art of Gratitude", series: "Life Skills", preacher: "Pastor John Doe", date: "Sep 03, 2023", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2574&auto=format&fit=crop" },
    { title: "Peace Amidst Storms", series: "Endurance", preacher: "Pastor Jane Smith", date: "Aug 27, 2023", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2670&auto=format&fit=crop" },
    { title: "Leading with Love", series: "Community", preacher: "Pastor Mary King", date: "Aug 20, 2023", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop" },
    { title: "A Heart for Service", series: "Life Skills", preacher: "Pastor John Doe", date: "Aug 13, 2023", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2670&auto=format&fit=crop" },
    { title: "Understanding Grace", series: "Foundations", preacher: "Pastor Jane Smith", date: "Aug 06, 2023", image: "https://images.unsplash.com/photo-1459183885447-df53d1f0d3bb?q=80&w=2670&auto=format&fit=crop" },
  ];

  const filteredSermons = sermonsArchive.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.preacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.series.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isGalleryOpen]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="sermons" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Latest Messages</span>
            <h2 className="text-4xl font-serif font-bold text-secondary mt-2">Sermons & Teachings</h2>
            <div className="w-16 h-1 bg-primary mt-6"></div>
          </div>
          
          <div className="hidden md:block">
            <button 
              onClick={() => setIsGalleryOpen(true)}
              className="px-6 py-3 border-2 border-secondary text-secondary font-bold uppercase text-sm hover:bg-secondary hover:text-white transition-colors"
            >
              View All Sermons
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-8 gap-8 scroll-smooth no-scrollbar snap-x snap-mandatory"
          >
            {sermons.map((sermon, index) => (
              <div 
                key={index} 
                className="flex-none w-[300px] md:w-[400px] snap-start bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 md:h-56 group">
                  <img 
                    src={sermon.image} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                      <Play size={20} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 uppercase tracking-wide">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} /> {sermon.date}
                    </div>
                    <span className="text-primary font-bold">{sermon.series}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-secondary mb-2 hover:text-primary transition-colors cursor-pointer line-clamp-1">
                    {sermon.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">By {sermon.preacher}</p>
                  <button className="text-primary font-bold uppercase text-xs tracking-wider border-b-2 border-transparent hover:border-primary transition-all">
                    Watch Sermon
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Visual Indicators */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-full bg-gradient-to-l from-light to-transparent pointer-events-none md:opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"></div>
        </div>

        {/* Repositioned Arrows: Bottom Center */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
              aria-label="Scroll Right"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
        
        <div className="mt-12 md:hidden text-center">
          <button 
            onClick={() => setIsGalleryOpen(true)}
            className="px-6 py-3 border-2 border-secondary text-secondary font-bold uppercase text-sm hover:bg-secondary hover:text-white transition-colors w-full"
          >
            View All Sermons
          </button>
        </div>
      </div>

      {/* Full-Screen Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-xl flex flex-col p-6 md:p-12 overflow-y-auto animate-in fade-in duration-300">
          <button 
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
          >
            <X size={40} />
          </button>

          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Archive</span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mt-4">All Sermons</h2>
                <div className="w-24 h-1 bg-primary mt-8"></div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search title, series, or pastor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            {/* Results Grid */}
            {filteredSermons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredSermons.map((sermon, index) => (
                  <div 
                    key={index} 
                    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 animate-in zoom-in-95 duration-500 delay-[index*50ms]"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={sermon.image} 
                        alt={sermon.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-secondary/40 group-hover:bg-transparent transition-colors"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-xl">
                          <Play size={20} fill="currentColor" className="ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] text-primary font-bold uppercase tracking-widest px-2 py-1 bg-primary/10 rounded">{sermon.series}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{sermon.date}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {sermon.title}
                      </h3>
                      <p className="text-gray-400 text-xs mb-4 uppercase tracking-wide">By {sermon.preacher}</p>
                      <button className="w-full py-3 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[2px] hover:bg-white hover:text-secondary transition-all rounded-lg">
                        Listen To Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-gray-400 text-xl font-serif italic">No sermons found matching your search.</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-6 text-primary font-bold uppercase text-sm tracking-widest hover:text-white transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Sermons;
