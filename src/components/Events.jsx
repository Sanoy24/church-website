import { useState, useEffect } from 'react';
import { MapPin, Calendar as CalendarIcon, Clock, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  {
    title: "Community Prayer Night",
    date: { month: "NOV", day: "14", full: "2023-11-14" },
    time: "7:00 PM - 8:30 PM",
    location: "Main Sanctuary",
    image: "https://images.unsplash.com/photo-1510590611086-309679432aa8?q=80&w=2669&auto=format&fit=crop",
    description: "Join us for a powerful evening of community prayer and worship. This is a special time dedicated to coming together as one family to seek God's presence, pray for our community, and support one another in faith. Whether you're a regular member or visiting for the first time, all are welcome."
  },
  {
    title: "Youth Summer Camp",
    date: { month: "DEC", day: "05", full: "2023-12-05" },
    time: "9:00 AM - 4:00 PM",
    location: "Camp Valley Center",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop",
    description: "An exciting week for our youth to build friendships, grow in faith, and enjoy outdoor activities! Our summer camp features team-building exercises, inspiring workshops, and fun recreational games designed to empower and inspire the next generation."
  },
  {
    title: "Christmas Choir Practice",
    date: { month: "DEC", day: "12", full: "2023-12-12" },
    time: "6:00 PM - 8:00 PM",
    location: "Music Hall",
    image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2670&auto=format&fit=crop",
    description: "Help us prepare for our annual Christmas concert. We're looking for passionate voices to join our choir as we practice beautiful carols and hymns. No previous experience required—just a heart for worship and a love for music!"
  }
];

const Events = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date(2023, 10, 1)); // Starting in Nov 2023 for demo

  useEffect(() => {
    if (isCalendarOpen || selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCalendarOpen, selectedEvent]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-24 md:h-32 border border-white/5 bg-white/2"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEvent = events.some(e => e.date.full === dateStr);
        const dayEvents = events.filter(e => e.date.full === dateStr);

        days.push(
            <div key={day} className="h-24 md:h-32 border border-white/5 bg-white/5 p-2 relative group hover:bg-white/10 transition-colors cursor-pointer" onClick={() => dayEvents[0] && setSelectedEvent(dayEvents[0])}>
                <span className={`text-sm font-bold ${hasEvent ? 'text-primary' : 'text-gray-400'}`}>{day}</span>
                <div className="mt-1 space-y-1">
                    {dayEvents.map((e, i) => (
                        <div key={i} className="text-[10px] bg-primary text-white p-1 rounded truncate uppercase font-bold tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
                            {e.title}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return days;
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Upcoming Events</span>
            <h2 className="text-4xl font-serif font-bold text-secondary mt-2">Join Us This Season</h2>
            <div className="w-16 h-1 bg-primary mt-6"></div>
          </div>
          <button 
            onClick={() => setIsCalendarOpen(true)}
            className="hidden md:flex px-8 py-4 bg-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors items-center gap-2"
          >
            <CalendarIcon size={16} /> View Calendar <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="group bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white p-3 rounded text-center shadow-lg min-w-[70px]">
                  <span className="block text-primary font-bold text-sm uppercase tracking-wider">{event.date.month}</span>
                  <span className="block text-3xl font-bold text-secondary leading-none">{event.date.day}</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-serif font-bold text-secondary mb-4 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedEvent(event)}>
                  {event.title}
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <Clock size={16} className="text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <MapPin size={16} className="text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEvent(event)}
                  className="w-full py-3 border border-gray-200 text-secondary font-bold uppercase text-xs tracking-wider hover:bg-secondary hover:text-white hover:border-secondary transition-all"
                >
                  Event Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:hidden text-center">
            <button 
                onClick={() => setIsCalendarOpen(true)}
                className="px-8 py-4 bg-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors items-center gap-2 inline-flex"
            >
                <CalendarIcon size={16} /> View Calendar <ArrowRight size={16} />
            </button>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="bg-white max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-secondary hover:bg-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="md:w-1/2 h-64 md:h-full relative">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-primary text-white p-3 rounded text-center shadow-lg">
                <span className="block font-bold text-xs uppercase tracking-wider">{selectedEvent.date.month}</span>
                <span className="block text-2xl font-bold leading-none">{selectedEvent.date.day}</span>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Events Archive</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-6">{selectedEvent.title}</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Time</p>
                    <p className="font-medium">{selectedEvent.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Location</p>
                    <p className="font-medium">{selectedEvent.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-sm text-gray-600 mb-8">
                <p>{selectedEvent.description}</p>
              </div>
              
              <button 
                className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest rounded hover:bg-secondary transition-all shadow-lg"
              >
                Add To Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-xl flex flex-col p-6 md:p-12 overflow-y-auto animate-in fade-in duration-300">
          <button 
            onClick={() => setIsCalendarOpen(false)}
            className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
          >
            <X size={40} />
          </button>

          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Interactive Grid</span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mt-4 uppercase">
                    {currentDate.toLocaleString('default', { month: 'long' })} <span className="text-white/30">{currentDate.getFullYear()}</span>
                </h2>
                <div className="w-24 h-1 bg-primary mt-8"></div>
              </div>

              <div className="flex gap-4">
                <button onClick={prevMonth} className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextMonth} className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 border-t border-l border-white/10">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-4 border-r border-b border-white/10 text-center text-xs font-bold uppercase tracking-widest text-white/50 bg-white/5">
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>

            <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sync with your apps</h3>
                    <p className="text-gray-400 text-sm">Download our events directly to your phone's calendar.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-primary transition-all">Add to Google</button>
                    <button className="px-6 py-3 bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-primary transition-all">Apple Calendar</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
