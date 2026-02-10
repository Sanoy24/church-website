import { useState, useEffect, useRef } from "react";
import {
    MapPin,
    Calendar as CalendarIcon,
    Clock,
    ArrowRight,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { api } from "../services/api";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    const downloadICS = (event) => {
        const formatDate = (dateStr, timeStr) => {
            // dateStr is "YYYY-MM-DD"
            // timeStr is "hh:mm AM/PM"
            const [hours, minutes] = timeStr.split(/:| /);
            const isPM = timeStr.includes("PM");
            let h = parseInt(hours);
            if (isPM && h < 12) h += 12;
            if (!isPM && h === 12) h = 0;

            const date = new Date(dateStr + "T00:00:00");
            date.setHours(h, parseInt(minutes));

            return date.toISOString().replace(/-|:|\.\d+/g, "");
        };

        const startTime = formatDate(event.date.full, event.time);
        const endTime = formatDate(event.date.full, event.time); // Assuming same time for now as end time isn't stored

        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "BEGIN:VEVENT",
            `DTSTART:${startTime}`,
            `DTEND:${endTime}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description}`,
            `LOCATION:${event.location}`,
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\n");

        const blob = new Blob([icsContent], {
            type: "text/calendar;charset=utf-8",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute(
            "download",
            `${event.title.replace(/\s+/g, "_")}.ics`,
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const addToGoogleCalendar = (event) => {
        const formatDate = (dateStr, timeStr) => {
            const [hours, minutes] = timeStr.split(/:| /);
            const isPM = timeStr.includes("PM");
            let h = parseInt(hours);
            if (isPM && h < 12) h += 12;
            if (!isPM && h === 12) h = 0;

            const date = new Date(dateStr + "T00:00:00");
            date.setHours(h, parseInt(minutes));
            return date.toISOString().replace(/-|:|\.\d+/g, "");
        };

        const startTime = formatDate(event.date.full, event.time);
        const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${startTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
        window.open(url, "_blank");
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.events.getAll();

            const now = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(now.getMonth() - 1);
            const oneMonthAhead = new Date();
            oneMonthAhead.setMonth(now.getMonth() + 1);

            // Filter and Transform
            const transformedEvents = data
                .filter((event) => {
                    const eventDate = new Date(event.date);
                    return (
                        eventDate >= oneMonthAgo && eventDate <= oneMonthAhead
                    );
                })
                .map((event) => {
                    const dateObj = new Date(event.date);
                    const monthNames = [
                        "JAN",
                        "FEB",
                        "MAR",
                        "APR",
                        "MAY",
                        "JUN",
                        "JUL",
                        "AUG",
                        "SEP",
                        "OCT",
                        "NOV",
                        "DEC",
                    ];
                    return {
                        ...event,
                        date: {
                            month: monthNames[dateObj.getMonth()],
                            day: String(dateObj.getDate()).padStart(2, "0"),
                            full: dateObj.toISOString().split("T")[0],
                        },
                        image: event.image_url, // Ensure proper field mapping
                    };
                });
            setEvents(transformedEvents);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isCalendarOpen || selectedEvent) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isCalendarOpen, selectedEvent]);

    const scrollerRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollerRef.current) return;
        const { scrollLeft, clientWidth } = scrollerRef.current;
        const scrollAmount = clientWidth * 0.8;
        scrollerRef.current.scrollTo({
            left:
                direction === "left"
                    ? scrollLeft - scrollAmount
                    : scrollLeft + scrollAmount,
            behavior: "smooth",
        });
    };

    const getDaysInMonth = (year, month) =>
        new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) =>
        new Date(year, month, 1).getDay();

    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div
                    key={`empty-${i}`}
                    className="h-24 md:h-32 border border-white/5 bg-white/2"
                ></div>,
            );
        }

        // Actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayEvents = events.filter((e) => e.date.full === dateStr);
            const hasEvent = dayEvents.length > 0;

            days.push(
                <div
                    key={day}
                    className="h-24 md:h-32 border border-white/5 bg-white/5 p-2 relative group hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() =>
                        dayEvents[0] && setSelectedEvent(dayEvents[0])
                    }
                >
                    <span
                        className={`text-sm font-bold ${hasEvent ? "text-primary" : "text-gray-400"}`}
                    >
                        {day}
                    </span>
                    <div className="mt-1 space-y-1">
                        {dayEvents.map((e, i) => (
                            <div
                                key={i}
                                className="text-[10px] bg-primary text-white p-1 rounded truncate uppercase font-bold tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity"
                            >
                                {e.title}
                            </div>
                        ))}
                    </div>
                </div>,
            );
        }

        return days;
    };

    const nextMonth = () =>
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
        );
    const prevMonth = () =>
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );

    const downloadMonthICS = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const monthEvents = events.filter((e) => {
            const d = new Date(e.date.full);
            return d.getFullYear() === year && d.getMonth() === month;
        });

        if (monthEvents.length === 0)
            return alert("No events found for this month.");

        const formatDate = (dateStr, timeStr) => {
            const [hours, minutes] = timeStr.split(/:| /);
            const isPM = timeStr.includes("PM");
            let h = parseInt(hours);
            if (isPM && h < 12) h += 12;
            if (!isPM && h === 12) h = 0;
            const date = new Date(dateStr + "T00:00:00");
            date.setHours(h, parseInt(minutes));
            return date.toISOString().replace(/-|:|\.\d+/g, "");
        };

        const icsEvents = monthEvents
            .map((event) => {
                const startTime = formatDate(event.date.full, event.time);
                return [
                    "BEGIN:VEVENT",
                    `DTSTART:${startTime}`,
                    `DTEND:${startTime}`,
                    `SUMMARY:${event.title}`,
                    `DESCRIPTION:${event.description}`,
                    `LOCATION:${event.location}`,
                    "END:VEVENT",
                ].join("\n");
            })
            .join("\n");

        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            icsEvents,
            "END:VCALENDAR",
        ].join("\n");

        const blob = new Blob([icsContent], {
            type: "text/calendar;charset=utf-8",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute(
            "download",
            `${currentDate.toLocaleString("default", { month: "long" })}_Events.ics`,
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <section id="events" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading events...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="events" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-20">
                        <p className="text-red-600 mb-4">
                            Failed to load events: {error}
                        </p>
                        <button
                            onClick={loadEvents}
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
        <section id="events" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-wider text-sm">
                            Upcoming Events
                        </span>
                        <h2 className="text-4xl font-serif font-bold text-secondary mt-2">
                            Join Us This Season
                        </h2>
                        <div className="w-16 h-1 bg-primary mt-6"></div>
                    </div>
                    <button
                        onClick={() => setIsCalendarOpen(true)}
                        className="hidden md:flex px-8 py-4 bg-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors items-center gap-2"
                    >
                        <CalendarIcon size={16} /> View Calendar{" "}
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="relative group">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-secondary hover:text-primary transition-colors hidden lg:flex"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-secondary hover:text-primary transition-colors hidden lg:flex"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div
                        ref={scrollerRef}
                        className="flex overflow-x-auto pb-8 gap-8 scroll-smooth no-scrollbar snap-x snap-mandatory"
                    >
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="flex-none w-[300px] md:w-[400px] snap-start group bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={
                                            event.image ||
                                            "https://images.unsplash.com/photo-1510590611086-309679432aa8?q=80&w=2669&auto=format&fit=crop"
                                        }
                                        alt={event.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white p-3 rounded text-center shadow-lg min-w-[70px]">
                                        <span className="block text-primary font-bold text-sm uppercase tracking-wider">
                                            {event.date.month}
                                        </span>
                                        <span className="block text-3xl font-bold text-secondary leading-none">
                                            {event.date.day}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3
                                        className="text-xl font-serif font-bold text-secondary mb-4 group-hover:text-primary transition-colors cursor-pointer"
                                        onClick={() => setSelectedEvent(event)}
                                    >
                                        {event.title}
                                    </h3>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                                            <Clock
                                                size={16}
                                                className="text-primary"
                                            />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                                            <MapPin
                                                size={16}
                                                className="text-primary"
                                            />
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

                        {events.length === 0 && (
                            <div className="min-w-full text-center py-12">
                                <p className="text-gray-500 italic">
                                    No events scheduled for this period.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Visual Indicator (right gradient) */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none md:opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"></div>
                </div>

                <div className="mt-10 md:hidden text-center">
                    <button
                        onClick={() => setIsCalendarOpen(true)}
                        className="px-8 py-4 bg-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors items-center gap-2 inline-flex"
                    >
                        <CalendarIcon size={16} /> View Calendar{" "}
                        <ArrowRight size={16} />
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
                            <img
                                src={selectedEvent.image}
                                alt={selectedEvent.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-primary text-white p-3 rounded text-center shadow-lg">
                                <span className="block font-bold text-xs uppercase tracking-wider">
                                    {selectedEvent.date.month}
                                </span>
                                <span className="block text-2xl font-bold leading-none">
                                    {selectedEvent.date.day}
                                </span>
                            </div>
                        </div>

                        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">
                                Events Archive
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-6">
                                {selectedEvent.title}
                            </h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">
                                            Time
                                        </p>
                                        <p className="font-medium">
                                            {selectedEvent.time}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">
                                            Location
                                        </p>
                                        <p className="font-medium">
                                            {selectedEvent.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-sm text-gray-600 mb-8">
                                <p>{selectedEvent.description}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <button
                                    onClick={() =>
                                        addToGoogleCalendar(selectedEvent)
                                    }
                                    className="flex-1 py-4 bg-primary text-white font-bold uppercase tracking-widest rounded hover:bg-secondary transition-all shadow-lg text-xs"
                                >
                                    Add to Google
                                </button>
                                <button
                                    onClick={() => downloadICS(selectedEvent)}
                                    className="flex-1 py-4 bg-gray-100 text-secondary font-bold uppercase tracking-widest rounded hover:bg-gray-200 transition-all shadow-lg text-xs"
                                >
                                    Apple / Outlook
                                </button>
                            </div>
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
                                <span className="text-primary font-bold uppercase tracking-widest text-sm">
                                    Interactive Grid
                                </span>
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mt-4 uppercase">
                                    {currentDate.toLocaleString("default", {
                                        month: "long",
                                    })}{" "}
                                    <span className="text-white/30">
                                        {currentDate.getFullYear()}
                                    </span>
                                </h2>
                                <div className="w-24 h-1 bg-primary mt-8"></div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={prevMonth}
                                    className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextMonth}
                                    className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 border-t border-l border-white/10">
                            {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ].map((day) => (
                                <div
                                    key={day}
                                    className="py-4 border-r border-b border-white/10 text-center text-xs font-bold uppercase tracking-widest text-white/50 bg-white/5"
                                >
                                    {day}
                                </div>
                            ))}
                            {renderCalendarDays()}
                        </div>

                        <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Sync with your apps
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Download all events for{" "}
                                    {currentDate.toLocaleString("default", {
                                        month: "long",
                                    })}{" "}
                                    directly to your phone's calendar.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() =>
                                        alert(
                                            'For Google Calendar, please use the "Add to Google" button on individual event details for now.',
                                        )
                                    }
                                    className="px-6 py-3 bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-primary transition-all"
                                >
                                    Google Calendar
                                </button>
                                <button
                                    onClick={downloadMonthICS}
                                    className="px-6 py-3 bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-primary transition-all"
                                >
                                    Apple / Outlook (.ics)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Events;
