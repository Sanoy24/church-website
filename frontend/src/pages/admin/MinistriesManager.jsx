import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload, Loader2 } from 'lucide-react';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';

const MinistriesManager = () => {
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState(null);
  const [deletingMinistry, setDeletingMinistry] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailed_description: '',
    schedule: '',
    leader: '',
    image_url: ''
  });

  useEffect(() => {
    loadMinistries();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await api.upload.image(file);
      setFormData({ ...formData, image_url: result.url });
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const loadMinistries = async () => {
    try {
      const data = await api.ministries.getAll();
      setMinistries(data);
    } catch (error) {
      alert('Failed to load ministries: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMinistry) {
        await api.ministries.update(editingMinistry.id, formData);
      } else {
        await api.ministries.create(formData);
      }
      loadMinistries();
      resetForm();
    } catch (error) {
      alert('Failed to save ministry: ' + error.message);
    }
  };

  const handleDeleteClick = (ministry) => {
    setDeletingMinistry(ministry);
  };

  const confirmDelete = async () => {
    if (!deletingMinistry) return;
    try {
      await api.ministries.delete(deletingMinistry.id);
      loadMinistries();
      setDeletingMinistry(null);
    } catch (error) {
      alert('Failed to delete ministry: ' + error.message);
    }
  };

  const handleEdit = (ministry) => {
    setEditingMinistry(ministry);
    setFormData({
      title: ministry.title,
      description: ministry.description,
      detailed_description: ministry.detailed_description,
      schedule: ministry.schedule || '',
      leader: ministry.leader || '',
      image_url: ministry.image_url || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      detailed_description: '',
      schedule: '',
      leader: '',
      image_url: ''
    });
    setEditingMinistry(null);
    setShowForm(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-secondary">Ministries Management</h1>
          <p className="text-gray-600 mt-1">Manage church ministries</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors font-bold uppercase tracking-wider"
        >
          <Plus size={20} />
          Add Ministry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministries.map((ministry) => (
          <div key={ministry.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {ministry.image_url && (
              <img src={ministry.image_url} alt={ministry.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
              <h3 className="font-serif font-bold text-xl text-secondary mb-2">{ministry.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{ministry.description}</p>
              {ministry.leader && (
                <p className="text-sm text-gray-500 mb-2"><strong>Leader:</strong> {ministry.leader}</p>
              )}
              {ministry.schedule && (
                <p className="text-sm text-gray-500 mb-4"><strong>Schedule:</strong> {ministry.schedule}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(ministry)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(ministry)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
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
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-serif font-bold text-secondary">
                {editingMinistry ? 'Edit Ministry' : 'Add New Ministry'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ministry Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  rows="2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                <textarea
                  value={formData.detailed_description}
                  onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  rows="4"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Schedule</label>
                  <input
                    type="text"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Leader</label>
                  <input
                    type="text"
                    value={formData.leader}
                    onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Image</label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste image URL here..."
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                    <label className="relative flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border border-gray-300 min-w-[120px]">
                      {uploading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Upload size={18} />
                      )}
                      <span className="ml-2 text-xs font-bold uppercase tracking-wider">
                        {uploading ? 'Busy...' : 'Upload'}
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
                    <div className="relative h-32 w-full rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={formData.image_url} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.style.display = 'none'}
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
                  {editingMinistry ? 'Update Ministry' : 'Create Ministry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingMinistry}
        onClose={() => setDeletingMinistry(null)}
        onConfirm={confirmDelete}
        title="Delete Ministry"
        itemName={deletingMinistry?.title}
      />
    </div>
  );
};

export default MinistriesManager;
