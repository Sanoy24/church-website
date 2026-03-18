import { useState, useEffect, useRef } from "react";
import { ArrowRight, Users, X, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../services/api";

const DUMMY_MINISTRIES = [
    {
        title: "Youth Ministry",
        description:
            "Empowering the next generation to lead with faith, hope, and love. Our youth programs focus on spiritual growth and community service.",
        detailed_description:
            "Our Youth Ministry is a vibrant community where teenagers can explore their faith, build lasting friendships, and serve others. We meet weekly for worship, bible study, and fun activities. We also organize annual retreats and local mission projects to help our youth put their faith into action.",
        image_url:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop",
        schedule: "Fridays at 7:00 PM",
        leader: "Mark & Sarah Johnson",
    },
    {
        title: "Worship Team",
        description:
            "Leading our congregation in heart-felt worship through music and arts. Join us in creating an atmosphere of praise.",
        detailed_description:
            "The Worship Team is dedicated to glorifying God through excellent musical and technical ministry. Whether you play an instrument, sing, or are interested in sound and visuals, there's a place for you to serve. We focus on a blend of contemporary worship and timeless hymns.",
        image_url:
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop",
        schedule: "Practice on Thursdays at 6:30 PM",
        leader: "David Chen",
    },
    {
        title: "Children's Ministry",
        description:
            "Creating a safe and fun environment for children to learn about God's love. We have programs for all ages.",
        detailed_description:
            "Our Children's Ministry (Sunday School) provides age-appropriate lessons that bring the Bible to life. Through stories, crafts, and games, children discover the wonders of God's Word. We are committed to partnering with parents to build a strong spiritual foundation for every child.",
        image_url:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop",
        schedule: "Sundays at 9:00 AM & 11:00 AM",
        leader: "Grace Miller",
    },
    {
        title: "Children's Ministry",
        description:
            "Creating a safe and fun environment for children to learn about God's love. We have programs for all ages.",
        detailed_description:
            "Our Children's Ministry (Sunday School) provides age-appropriate lessons that bring the Bible to life. Through stories, crafts, and games, children discover the wonders of God's Word. We are committed to partnering with parents to build a strong spiritual foundation for every child.",
        image_url:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop",
        schedule: "Sundays at 9:00 AM & 11:00 AM",
        leader: "Grace Miller",
    },
];

const Ministries = () => {
    const [ministries, setMinistries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMinistry, setSelectedMinistry] = useState(null);
    const scrollerRef = useRef(null);

    useEffect(() => {
        loadMinistries();
    }, []);

    const loadMinistries = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.ministries.getAll();
            if (data && data.length > 0) {
                setMinistries(data);
            } else {
                setMinistries(DUMMY_MINISTRIES);
            }
        } catch (err) {
            console.error("Failed to load ministries, using dummy data:", err);
            setMinistries(DUMMY_MINISTRIES);
            // We don't set error state here because we want to show dummy data instead
        } finally {
            setLoading(false);
        }
    };

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

    // Disable body scroll when modal is open
    useEffect(() => {
        if (selectedMinistry) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedMinistry]);

    if (loading) {
        return (
            <section id="ministries" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">
                                Loading ministries...
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="ministries" className="py-20 bg-gray-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold uppercase tracking-wider text-sm">
                        Our Ministries
                    </span>
                    <h2 className="text-4xl font-serif font-bold text-secondary mt-2">
                        Ways to Get Involved
                    </h2>
                    <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
                </div>

                <div className="relative">
                    {/* Navigation Arrows for Carousel */}
                    {ministries.length > 6 && (
                        <>
                            <button
                                onClick={() => scroll("left")}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-secondary hover:text-primary transition-colors hidden lg:flex"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-secondary hover:text-primary transition-colors hidden lg:flex"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    <div
                        ref={scrollerRef}
                        className={`${
                            ministries.length > 6
                                ? "flex overflow-x-auto pb-12 gap-8 no-scrollbar snap-x snap-mandatory"
                                : "grid grid-cols-1 md:grid-cols-3 gap-8"
                        }`}
                    >
                        {ministries.map((ministry, index) => (
                            <div
                                key={index}
                                className={`${
                                    ministries.length > 6
                                        ? "flex-none w-[300px] md:w-[400px] snap-start"
                                        : ""
                                } group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 relative`}
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
                                    <h3 className="text-2xl font-serif font-bold text-secondary mb-3">
                                        {ministry.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                                        {ministry.description}
                                    </p>
                                    <div className="mt-auto">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedMinistry(ministry);
                                            }}
                                            className="inline-flex items-center text-primary font-bold uppercase text-sm tracking-wide gap-2 group-hover:gap-3 transition-all hover:text-red-600"
                                        >
                                            Read More <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
                                <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2">
                                    Ministry Details
                                </span>
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-6">
                                    {selectedMinistry.title}
                                </h3>

                                <div className="space-y-6 text-gray-600 leading-relaxed">
                                    <p>
                                        {selectedMinistry.detailed_description}
                                    </p>

                                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-6">
                                        {selectedMinistry.schedule && (
                                            <div className="flex items-start gap-3 mb-4">
                                                <Users
                                                    className="text-primary flex-shrink-0 mt-1"
                                                    size={20}
                                                />
                                                <div>
                                                    <p className="font-bold text-secondary mb-1">
                                                        Schedule
                                                    </p>
                                                    <p className="text-sm">
                                                        {
                                                            selectedMinistry.schedule
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {selectedMinistry.leader && (
                                            <div className="flex items-start gap-3">
                                                <Users
                                                    className="text-primary flex-shrink-0 mt-1"
                                                    size={20}
                                                />
                                                <div>
                                                    <p className="font-bold text-secondary mb-1">
                                                        Ministry Leader
                                                    </p>
                                                    <p className="text-sm">
                                                        {
                                                            selectedMinistry.leader
                                                        }
                                                    </p>
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
