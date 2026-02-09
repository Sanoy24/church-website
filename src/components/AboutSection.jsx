import { useState, useEffect } from "react";
import { CheckCircle, X, History, Users, Target, Globe } from "lucide-react";

const AboutSection = () => {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    // Prevent scroll when modal is open
    useEffect(() => {
        if (isHistoryOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isHistoryOpen]);

    return (
        <section id="aboutus" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://i.imgur.com/bpUzUv3.jpeg"
                                alt="Church Gathering"
                                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
                            />
                            <img
                                src="https://i.imgur.com/kcX7eD7.jpeg"
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
                        <span className="text-primary font-bold uppercase tracking-wider text-sm">
                            About Our Church
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mt-4 mb-6 leading-tight">
                            A Place of Love, <br /> Hope, and Faith
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            At Zegen, we believe in the transformative power of
                            God's love. We are dedicated to creating a welcoming
                            community where everyone can experience grace,
                            growth, and authentic connection.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                "Bible-Centered Teaching",
                                "Community Focused",
                                "Compassionate Service",
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle
                                        className="text-primary"
                                        size={20}
                                    />
                                    <span className="text-secondary font-medium text-lg">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsHistoryOpen(true)}
                            className="px-8 py-4 bg-secondary text-white text-sm font-bold uppercase tracking-widest hover:bg-primary transition-colors flex items-center gap-2 group"
                        >
                            Learn More About Us
                            <History
                                size={18}
                                className="transition-transform group-hover:rotate-12"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* History Modal */}
            {isHistoryOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-secondary/80 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsHistoryOpen(false)}
                    />

                    <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 fade-in duration-300">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-secondary">
                                    Our Journey of Faith
                                </h3>
                                <p className="text-primary text-sm font-bold uppercase tracking-widest mt-1">
                                    Est. 1998
                                </p>
                            </div>
                            <button
                                onClick={() => setIsHistoryOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-secondary"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 md:p-12 space-y-12">
                            {/* Founding Story */}
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-serif font-bold text-secondary mb-4">
                                        The Humble Beginnings
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed italic">
                                        {/* "Zegen Church began as a small home-based prayer group in 1998. Five families came together, driven by a shared vision to create a community where the love of Christ could be experienced in its purest form." */}
                                        ስድስት አሰርት ኣመታት ወደኋላ መለስ ብለን ስናልፍ፣ በዚህች
                                        ቤተክርስቲያን ተከላ፣ እድገት ፤ በስብራትና ጥገናዋ፣ በስደትና
                                        መገለልዋ፤ በመውደቅና መነሳቷ ውስጥ ስንቶች አብረዋት ዘለቁ፤
                                        ስንቶችስ ከመንገዷ ላይ ገለል አሉ? በሐዋሪያት ዘመን
                                        እንደነበረው ሁሉ በእኛና በትውልዱ ዘመን ሁሉም አብሮን
                                        እንደተነሳ አልዘለቀም፡፡ ይህንን የሚያውቀው አምላክ ደግሞ
                                        ደካሞቹን እያበረታ፤ ይከርማሉ ያልተባሉትን እያከረመ፤ ይዘልቃሉ
                                        ተብለው ያልታሰቡትን እያዘለቀ፤ ዛሬ ለደረስንበት አድርሶናል፡፡
                                        ማንም ቢሆን በራሱ ብርቱ ነኝ አይልም ፤ይልቅ በእነዚህ ሁሉ
                                        ዘመናት “ትናንትናም ዛሬም ለዘላለም ሁሉ ያው” የሆነው
                                        የማይለዋወጠው ባለክብሩ፣ ጌታ እያበረታን እዚህ ደርሰናል፡፡
                                    </p>
                                </div>
                            </div>

                            {/* Expansion */}
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-serif font-bold text-secondary mb-4">
                                        A Vision Realized
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        By 2005, the congregation had grown to
                                        over 200 members. We moved into our
                                        first dedicated sanctuary and launched
                                        our community outreach programs,
                                        establishing food pantries and youth
                                        empowerment initiatives that still
                                        thrive today.
                                    </p>
                                </div>
                            </div>

                            {/* Global Vision */}
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-serif font-bold text-secondary mb-4">
                                        Zegen Today
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Today, Zegen is more than just a
                                        building—it's a global community. We
                                        embrace modern technology to spread the
                                        Gospel across borders, while maintaining
                                        the intimate, family-focused atmosphere
                                        that has defined us for over two
                                        decades. Our mission remains simple: To
                                        love God, and to love our neighbor.
                                    </p>
                                </div>
                            </div>

                            {/* Quote/Scripture */}
                            <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-primary text-center italic">
                                <p className="text-secondary font-serif text-lg">
                                    "And we know that in all things God works
                                    for the good of those who love him, who have
                                    been called according to his purpose."
                                </p>
                                <span className="block mt-4 text-primary font-bold text-sm">
                                    — Romans 8:28
                                </span>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-gray-100 flex justify-center">
                            <button
                                onClick={() => setIsHistoryOpen(false)}
                                className="px-12 py-4 bg-secondary text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all rounded-full"
                            >
                                Close Story
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AboutSection;
