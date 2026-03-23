import { useEffect, useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    Camera,
    Images,
    Sparkles,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { api } from "../services/api";

const cardPatterns = [
    "md:col-span-2 md:row-span-2",
    "",
    "",
    "md:col-span-2",
    "",
    "md:row-span-2",
];

const formatDate = (date) => {
    if (!date) return "Church moment";
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [activePhoto, setActivePhoto] = useState(null);

    useEffect(() => {
        const loadGallery = async () => {
            try {
                const data = await api.gallery.getAll();
                setPhotos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadGallery();
    }, []);

    useEffect(() => {
        if (activePhoto) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [activePhoto]);

    const categories = [
        "All",
        ...new Set(photos.map((photo) => photo.category).filter(Boolean)),
    ];

    const filteredPhotos =
        selectedCategory === "All"
            ? photos
            : photos.filter((photo) => photo.category === selectedCategory);

    const featuredPhoto =
        filteredPhotos.find((photo) => photo.is_featured) || filteredPhotos[0];

    return (
        <div className="min-h-screen bg-[#f3efe7] text-secondary">
            <Header />

            <section className="relative min-h-[90vh] overflow-hidden bg-secondary pt-28">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{
                            backgroundImage: featuredPhoto
                                ? `url('${featuredPhoto.image_url}')`
                                : undefined,
                        }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff5e1430,transparent_35%),linear-gradient(180deg,#05070d_0%,#0a0a0a_45%,#151515_100%)]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm uppercase tracking-[0.2em]"
                    >
                        <ArrowLeft size={16} />
                        Back Home
                    </Link>

                    <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-end">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-primary bg-white/5 text-xs font-bold uppercase tracking-[0.3em]">
                                <Camera size={14} />
                                Church Gallery
                            </span>
                            <h1 className="mt-6 text-5xl md:text-7xl font-serif font-bold text-white leading-[0.95]">
                                Moments of worship,
                                <br />
                                service, and family.
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
                                A living archive of what God is doing in and
                                through the church. Explore the joy, prayer,
                                outreach, and togetherness behind every season.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <a
                                    href="#gallery-grid"
                                    className="px-8 py-4 bg-primary text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-red-600 transition-colors"
                                >
                                    Explore Photos
                                </a>
                                <div className="px-8 py-4 border border-white/15 text-white/80 text-sm font-bold uppercase tracking-[0.2em] bg-white/5">
                                    {photos.length} captured stories
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                                <div className="flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.25em]">
                                    <Sparkles size={14} />
                                    Featured Frame
                                </div>
                                <h2 className="mt-4 text-3xl font-serif font-bold text-white">
                                    {featuredPhoto?.title ||
                                        "Beautiful church moments"}
                                </h2>
                                <p className="mt-3 text-white/65 leading-relaxed">
                                    {featuredPhoto?.description ||
                                        "Fresh moments from worship, community, and ministry life."}
                                </p>
                                <div className="mt-5 flex items-center gap-3 text-white/55 text-sm">
                                    <CalendarDays size={16} />
                                    {featuredPhoto
                                        ? formatDate(featuredPhoto.event_date)
                                        : "Always unfolding"}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-white/10 bg-[#13161d] p-6">
                                <p className="text-white/55 uppercase tracking-[0.2em] text-xs">
                                    Categories
                                </p>
                                <p className="mt-4 text-4xl font-serif font-bold text-white">
                                    {categories.length - 1}
                                </p>
                            </div>
                            <div className="rounded-[2rem] border border-white/10 bg-primary/15 p-6">
                                <p className="text-white/55 uppercase tracking-[0.2em] text-xs">
                                    Featured
                                </p>
                                <p className="mt-4 text-4xl font-serif font-bold text-white">
                                    {
                                        photos.filter(
                                            (photo) => photo.is_featured,
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative -mt-10 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(10,10,10,0.08)] border border-black/5 p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            <div>
                                <p className="text-primary font-bold uppercase tracking-[0.25em] text-xs">
                                    Curated Archive
                                </p>
                                <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-secondary">
                                    Browse by ministry moment
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                        className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                                            selectedCategory === category
                                                ? "bg-secondary text-white shadow-lg"
                                                : "bg-[#f5f0e7] text-secondary hover:bg-[#ece4d7]"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="gallery-grid" className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading && (
                        <div className="rounded-[2rem] bg-white p-16 text-center shadow-sm">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-gray-600">
                                Loading gallery moments...
                            </p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="rounded-[2rem] bg-white p-16 text-center shadow-sm">
                            <p className="text-red-600 mb-4">
                                Failed to load gallery: {error}
                            </p>
                            <Link
                                to="/"
                                className="inline-flex px-6 py-3 bg-secondary text-white uppercase tracking-[0.2em] text-xs font-bold"
                            >
                                Return Home
                            </Link>
                        </div>
                    )}

                    {!loading && !error && filteredPhotos.length === 0 && (
                        <div className="rounded-[2rem] bg-white p-16 text-center shadow-sm">
                            <Images
                                size={40}
                                className="mx-auto text-primary mb-4"
                            />
                            <p className="text-secondary text-2xl font-serif">
                                No photos yet in this category.
                            </p>
                        </div>
                    )}

                    {!loading && !error && filteredPhotos.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-[220px] gap-6">
                            {filteredPhotos.map((photo, index) => (
                                <button
                                    key={photo.id}
                                    type="button"
                                    onClick={() => setActivePhoto(photo)}
                                    className={`group relative overflow-hidden rounded-[1.75rem] text-left shadow-[0_24px_50px_rgba(10,10,10,0.12)] ${cardPatterns[index % cardPatterns.length]}`}
                                >
                                    <img
                                        src={photo.image_url}
                                        alt={photo.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-6">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                            <span>
                                                {photo.category || "Gallery"}
                                            </span>
                                            {photo.is_featured && (
                                                <span className="text-white/70">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="mt-3 text-2xl font-serif font-bold text-white leading-tight">
                                            {photo.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-white/70 line-clamp-2">
                                            {photo.description ||
                                                "Captured from a beautiful church moment."}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {activePhoto && (
                <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md p-4 md:p-8 overflow-y-auto">
                    <button
                        type="button"
                        onClick={() => setActivePhoto(null)}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={34} />
                    </button>

                    <div className="max-w-6xl mx-auto min-h-full flex items-center">
                        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] bg-[#111317] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
                            <div className="min-h-[320px] lg:min-h-[720px] bg-black">
                                <img
                                    src={activePhoto.image_url}
                                    alt={activePhoto.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-8 md:p-10 text-white flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-2 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
                                            {activePhoto.category || "Gallery"}
                                        </span>
                                        {activePhoto.is_featured && (
                                            <span className="px-3 py-2 rounded-full bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">
                                                Highlight
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="mt-6 text-4xl font-serif font-bold leading-tight">
                                        {activePhoto.title}
                                    </h3>
                                    <p className="mt-6 text-white/70 leading-relaxed text-lg">
                                        {activePhoto.description ||
                                            "A meaningful church memory captured for the community archive."}
                                    </p>
                                </div>

                                <div className="mt-10 pt-8 border-t border-white/10 space-y-4">
                                    <div className="flex items-center gap-3 text-white/65">
                                        <CalendarDays size={18} />
                                        <span>
                                            {formatDate(activePhoto.event_date)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/65">
                                        <Images size={18} />
                                        <span>YHBC Church</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Gallery;
