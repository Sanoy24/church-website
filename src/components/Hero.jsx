import { PlayCircle, ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative h-screen min-h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-slow-zoom"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
                <span className="block text-primary font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
                    Welcome to Zegen Church
                </span>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in-up delay-100">
                    Connect with God, <br /> Connect with People
                </h1>
                <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
                    We are a community reaching the world with the love of
                    Christ. Join us this Sunday for a life-changing experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
                    <a
                        href="https://www.youtube.com/@dawitfassilministries"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-red-600 transition-colors flex items-center justify-center gap-2 group"
                    >
                        <PlayCircle size={20} /> Watch Online
                    </a>
                    <a
                        href="https://t.me/DawitFassilMinistry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-transparent border-2 border-white text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-secondary transition-all flex items-center justify-center gap-2 group"
                    >
                        I'm New Here{" "}
                        <ArrowRight
                            size={20}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
