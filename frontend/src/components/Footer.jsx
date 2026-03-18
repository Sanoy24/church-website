import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    MapPin,
    Phone,
    Mail,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* About Column */}
                    <div>
                        <div className="flex items-center mb-6">
                            <span className="text-2xl font-bold font-serif uppercase tracking-wider text-white">
                                Zegen<span className="text-primary">.</span>
                            </span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                            We are a Bible-believing church, dedicated to
                            serving our community and spreading the love of
                            Christ. Join us in our journey of faith.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map(
                                (Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold uppercase tracking-wider mb-6 border-l-4 border-primary pl-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: "About Us", href: "#about" },
                                { name: "Ministries", href: "#ministries" },
                                { name: "Sermons", href: "#sermons" },
                                { name: "Events", href: "#events" },
                                { name: "Contact", href: "#footer" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50"></span>{" "}
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold uppercase tracking-wider mb-6 border-l-4 border-primary pl-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin
                                    size={20}
                                    className="text-primary mt-1 shrink-0"
                                />
                                <span>
                                    123 Church Avenue,
                                    <br />
                                    City Name, ST 12345
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone
                                    size={20}
                                    className="text-primary shrink-0"
                                />
                                <span>(123) 456-7890</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail
                                    size={20}
                                    className="text-primary shrink-0"
                                />
                                <span>hello@zegen-church.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold uppercase tracking-wider mb-6 border-l-4 border-primary pl-4">
                            Newsletter
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter to receive the latest
                            news and updates.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                            />
                            <button className="bg-primary text-white font-bold uppercase text-xs py-3 tracking-widest hover:bg-red-600 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} Zegen Church. All
                        Rights Reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
