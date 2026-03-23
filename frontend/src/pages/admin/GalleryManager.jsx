import { useEffect, useState } from "react";
import {
    ArrowUpDown,
    ImagePlus,
    Loader2,
    Sparkles,
    Trash2,
    Upload,
    X,
    Pencil,
    Files,
} from "lucide-react";
import { api } from "../../services/api";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

const initialFormData = {
    title: "",
    description: "",
    category: "",
    event_date: "",
    image_url: "",
    display_order: 0,
    is_featured: false,
};

const initialBulkFormData = {
    category: "",
    description: "",
    event_date: "",
    display_order_start: 0,
    is_featured: false,
};

const titleFromFilename = (filename) => {
    const baseName = filename.replace(/\.[^/.]+$/, "");
    const cleaned = baseName.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

    if (!cleaned) {
        return "Gallery Photo";
    }

    return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
};

const GalleryManager = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showBulkForm, setShowBulkForm] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState(null);
    const [deletingPhoto, setDeletingPhoto] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [bulkFormData, setBulkFormData] = useState(initialBulkFormData);
    const [bulkFiles, setBulkFiles] = useState([]);
    const [bulkUploading, setBulkUploading] = useState(false);

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        try {
            const data = await api.gallery.getAll();
            setPhotos(data);
        } catch (error) {
            alert("Failed to load gallery photos: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const result = await api.upload.image(file);
            setFormData((prev) => ({ ...prev, image_url: result.url }));
        } catch (error) {
            alert("Upload failed: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setEditingPhoto(null);
        setShowForm(false);
        setFormData(initialFormData);
    };

    const resetBulkForm = () => {
        setShowBulkForm(false);
        setBulkFormData(initialBulkFormData);
        setBulkFiles([]);
    };

    const handleEdit = (photo) => {
        setEditingPhoto(photo);
        setFormData({
            title: photo.title,
            description: photo.description || "",
            category: photo.category || "",
            event_date: photo.event_date
                ? new Date(photo.event_date).toISOString().split("T")[0]
                : "",
            image_url: photo.image_url || "",
            display_order: photo.display_order || 0,
            is_featured: !!photo.is_featured,
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPhoto) {
                await api.gallery.update(editingPhoto.id, formData);
            } else {
                await api.gallery.create(formData);
            }
            await loadPhotos();
            resetForm();
        } catch (error) {
            alert("Failed to save gallery photo: " + error.message);
        }
    };

    const confirmDelete = async () => {
        if (!deletingPhoto) return;
        try {
            await api.gallery.delete(deletingPhoto.id);
            await loadPhotos();
            setDeletingPhoto(null);
        } catch (error) {
            alert("Failed to delete gallery photo: " + error.message);
        }
    };

    const handleBulkSubmit = async (e) => {
        e.preventDefault();

        try {
            if (bulkFiles.length === 0) {
                throw new Error("Please choose at least one image.");
            }

            setBulkUploading(true);

            const uploadResult = await api.upload.images(bulkFiles);
            const startingDisplayOrder =
                Number.parseInt(bulkFormData.display_order_start, 10) || 0;
            const photosPayload = uploadResult.files.map((file, index) => ({
                title: titleFromFilename(file.originalName),
                description: bulkFormData.description,
                category: bulkFormData.category,
                event_date: bulkFormData.event_date,
                image_url: file.url,
                display_order: startingDisplayOrder + index,
                is_featured: bulkFormData.is_featured,
            }));

            try {
                await api.gallery.bulkCreate(photosPayload);
            } catch (error) {
                throw new Error(`Gallery records could not be created: ${error.message}`);
            }

            await loadPhotos();
            resetBulkForm();
        } catch (error) {
            alert("Failed to import gallery photos: " + error.message);
        } finally {
            setBulkUploading(false);
        }
    };

    if (loading) {
        return <div className="p-8">Loading gallery...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-secondary">
                        Gallery Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Curate the moments people see on the church gallery
                        page.
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors font-bold uppercase tracking-wider"
                >
                    <ImagePlus size={20} />
                    Add Photo
                </button>
                <button
                    onClick={() => setShowBulkForm(true)}
                    className="flex items-center gap-2 px-6 py-3 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors font-bold uppercase tracking-wider"
                >
                    <Files size={20} />
                    Bulk Upload
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                    >
                        <div className="relative h-52">
                            <img
                                src={photo.image_url}
                                alt={photo.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                {photo.category && (
                                    <span className="px-3 py-2 rounded-full bg-black/60 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                                        {photo.category}
                                    </span>
                                )}
                                {photo.is_featured && (
                                    <span className="px-3 py-2 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-2xl font-serif font-bold text-secondary">
                                {photo.title}
                            </h2>
                            <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                                {photo.description || "No description yet."}
                            </p>

                            <div className="mt-5 space-y-2 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <ArrowUpDown size={15} className="text-primary" />
                                    Display order: {photo.display_order ?? 0}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sparkles size={15} className="text-primary" />
                                    {photo.event_date
                                        ? new Date(photo.event_date).toLocaleDateString()
                                        : "No event date"}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => handleEdit(photo)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                                >
                                    <Pencil size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => setDeletingPhoto(photo)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="text-2xl font-serif font-bold text-secondary">
                                {editingPhoto ? "Edit Gallery Photo" : "Add Gallery Photo"}
                            </h2>
                            <button
                                onClick={resetForm}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                title: e.target.value,
                                            }))
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                category: e.target.value,
                                            }))
                                        }
                                        placeholder="Worship, Youth, Outreach..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Event Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.event_date}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                event_date: e.target.value,
                                            }))
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.display_order}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                display_order: Number(e.target.value),
                                            }))
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Photo
                                </label>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            placeholder="Paste image URL here..."
                                            value={formData.image_url}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    image_url: e.target.value,
                                                }))
                                            }
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                            required
                                        />
                                        <label className="relative flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border border-gray-300 min-w-[120px]">
                                            {uploading ? (
                                                <Loader2
                                                    size={18}
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <Upload size={18} />
                                            )}
                                            <span className="ml-2 text-xs font-bold uppercase tracking-wider">
                                                {uploading ? "Busy..." : "Upload"}
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                            />
                                        </label>
                                    </div>

                                    {formData.image_url && (
                                        <div className="relative h-48 rounded-xl overflow-hidden border border-gray-200">
                                            <img
                                                src={formData.image_url}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = "none";
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                                <input
                                    type="checkbox"
                                    checked={formData.is_featured}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            is_featured: e.target.checked,
                                        }))
                                    }
                                    className="w-4 h-4 accent-primary"
                                />
                                <div>
                                    <p className="font-bold text-secondary">
                                        Mark as featured
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Featured photos are highlighted first on
                                        the public gallery page.
                                    </p>
                                </div>
                            </label>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-bold uppercase tracking-wider"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors font-bold uppercase tracking-wider"
                                >
                                    {editingPhoto ? "Update Photo" : "Create Photo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showBulkForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-secondary">
                                    Bulk Upload Gallery Photos
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Select many photos from your computer and we
                                    will create gallery entries for all of them.
                                </p>
                            </div>
                            <button
                                onClick={resetBulkForm}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleBulkSubmit} className="p-6 space-y-4">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                                <div>
                                    <p className="font-bold text-secondary">
                                        How bulk upload works
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Each photo is uploaded to the backend,
                                        then added to the gallery automatically.
                                        Titles are generated from the file
                                        names.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Select Photos
                                </label>
                                <label className="flex flex-col items-center justify-center gap-3 px-6 py-10 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-white transition-colors cursor-pointer text-center">
                                    <Upload size={24} className="text-primary" />
                                    <div>
                                        <p className="font-bold text-secondary">
                                            Choose multiple images
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            JPG, PNG, WEBP and other image files
                                            are supported.
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) =>
                                            setBulkFiles(Array.from(e.target.files || []))
                                        }
                                        disabled={bulkUploading}
                                    />
                                </label>
                            </div>

                            {bulkFiles.length > 0 && (
                                <div className="rounded-xl border border-gray-200 p-4">
                                    <p className="font-bold text-secondary">
                                        {bulkFiles.length} photo
                                        {bulkFiles.length === 1 ? "" : "s"} selected
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {bulkFiles.map((file) => (
                                            <span
                                                key={`${file.name}-${file.lastModified}`}
                                                className="px-3 py-2 rounded-full bg-gray-100 text-xs font-medium text-gray-700"
                                            >
                                                {file.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        value={bulkFormData.category}
                                        onChange={(e) =>
                                            setBulkFormData((prev) => ({
                                                ...prev,
                                                category: e.target.value,
                                            }))
                                        }
                                        placeholder="Worship, Youth, Outreach..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Event Date
                                    </label>
                                    <input
                                        type="date"
                                        value={bulkFormData.event_date}
                                        onChange={(e) =>
                                            setBulkFormData((prev) => ({
                                                ...prev,
                                                event_date: e.target.value,
                                            }))
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Starting Display Order
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={bulkFormData.display_order_start}
                                        onChange={(e) =>
                                            setBulkFormData((prev) => ({
                                                ...prev,
                                                display_order_start: e.target.value,
                                            }))
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    />
                                </div>

                                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                                    <input
                                        type="checkbox"
                                        checked={bulkFormData.is_featured}
                                        onChange={(e) =>
                                            setBulkFormData((prev) => ({
                                                ...prev,
                                                is_featured: e.target.checked,
                                            }))
                                        }
                                        className="w-4 h-4 accent-primary"
                                    />
                                    <div>
                                        <p className="font-bold text-secondary">
                                            Mark all as featured
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Useful for a special event album.
                                        </p>
                                    </div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Shared Description
                                </label>
                                <textarea
                                    value={bulkFormData.description}
                                    onChange={(e) =>
                                        setBulkFormData((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    rows="4"
                                    placeholder="Optional description applied to every uploaded photo."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={resetBulkForm}
                                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-bold uppercase tracking-wider"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={bulkUploading}
                                    className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors font-bold uppercase tracking-wider"
                                >
                                    {bulkUploading ? "Uploading..." : "Upload Photos"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <DeleteConfirmModal
                isOpen={!!deletingPhoto}
                onClose={() => setDeletingPhoto(null)}
                onConfirm={confirmDelete}
                title="Delete Gallery Photo"
                itemName={deletingPhoto?.title}
            />
        </div>
    );
};

export default GalleryManager;
