import { useEffect, useState } from "react";
import {
    Loader2,
    Pencil,
    Plus,
    Trash2,
    Upload,
    X,
} from "lucide-react";
import { api } from "../../services/api";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

const initialFormData = {
    name: "",
    role: "",
    bio: "",
    image_url: "",
    display_order: 0,
    is_active: true,
};

const StaffManager = () => {
    const [staffMembers, setStaffMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [deletingMember, setDeletingMember] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        loadStaffMembers();
    }, []);

    const loadStaffMembers = async () => {
        try {
            const data = await api.staff.getAdminAll();
            setStaffMembers(data);
        } catch (error) {
            alert("Failed to load staff members: " + error.message);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingMember) {
                await api.staff.update(editingMember.id, formData);
            } else {
                await api.staff.create(formData);
            }
            await loadStaffMembers();
            resetForm();
        } catch (error) {
            alert("Failed to save staff member: " + error.message);
        }
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio || "",
            image_url: member.image_url || "",
            display_order: member.display_order || 0,
            is_active: !!member.is_active,
        });
        setShowForm(true);
    };

    const confirmDelete = async () => {
        if (!deletingMember) return;
        try {
            await api.staff.delete(deletingMember.id);
            await loadStaffMembers();
            setDeletingMember(null);
        } catch (error) {
            alert("Failed to delete staff member: " + error.message);
        }
    };

    const resetForm = () => {
        setEditingMember(null);
        setShowForm(false);
        setFormData(initialFormData);
    };

    if (loading) {
        return <div className="p-8">Loading staff...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-secondary">
                        Staff Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Control the team members shown in the public staff section.
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors font-bold uppercase tracking-wider"
                >
                    <Plus size={20} />
                    Add Staff
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {staffMembers.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                    >
                        <div className="relative h-64">
                            <img
                                src={member.image_url}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="px-3 py-2 rounded-full bg-black/60 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                                    {member.role}
                                </span>
                                {!member.is_active && (
                                    <span className="px-3 py-2 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                                        Hidden
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-2xl font-serif font-bold text-secondary">
                                {member.name}
                            </h2>
                            <p className="mt-2 text-gray-600 text-sm min-h-[3rem]">
                                {member.bio || "No biography added yet."}
                            </p>

                            <div className="mt-4 text-sm text-gray-500">
                                Display order: {member.display_order ?? 0}
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => handleEdit(member)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                                >
                                    <Pencil size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => setDeletingMember(member)}
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
                                {editingMember ? "Edit Staff Member" : "Add Staff Member"}
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
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                role: e.target.value,
                                            }))
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            bio: e.target.value,
                                        }))
                                    }
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                is_active: e.target.checked,
                                            }))
                                        }
                                        className="w-4 h-4 accent-primary"
                                    />
                                    <div>
                                        <p className="font-bold text-secondary">
                                            Show on public site
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Turn this off to hide the member without deleting them.
                                        </p>
                                    </div>
                                </label>
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
                                                <Loader2 size={18} className="animate-spin" />
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
                                    {editingMember ? "Update Staff" : "Create Staff"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <DeleteConfirmModal
                isOpen={!!deletingMember}
                onClose={() => setDeletingMember(null)}
                onConfirm={confirmDelete}
                title="Delete Staff Member"
                itemName={deletingMember?.name}
            />
        </div>
    );
};

export default StaffManager;
