import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, Mic, X, Upload, Loader2 } from 'lucide-react';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';

const SermonsManager = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingSermon, setEditingSermon] = useState(null);
  const [deletingSermon, setDeletingSermon] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    series: '',
    preacher: '',
    date: '',
    image_url: '',
    video_url: ''
  });

  useEffect(() => {
    loadSermons();
  }, []);

  // Auto-fetch YouTube thumbnail
  useEffect(() => {
    const getYoutubeId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYoutubeId(formData.video_url);
    if (videoId && !formData.image_url) {
      setFormData(prev => ({
        ...prev,
        image_url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      }));
    }
  }, [formData.video_url, formData.image_url]);

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

  const loadSermons = async () => {
    try {
      const data = await api.sermons.getAll();
      setSermons(data);
    } catch (error) {
      alert('Failed to load sermons: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSermon) {
        await api.sermons.update(editingSermon.id, formData);
      } else {
        await api.sermons.create(formData);
      }
      loadSermons();
      resetForm();
    } catch (error) {
      alert('Failed to save sermon: ' + error.message);
    }
  };

  const handleDeleteClick = (sermon) => {
    setDeletingSermon(sermon);
  };

  const confirmDelete = async () => {
    if (!deletingSermon) return;
    try {
      await api.sermons.delete(deletingSermon.id);
      loadSermons();
      setDeletingSermon(null);
    } catch (error) {
      alert('Failed to delete sermon: ' + error.message);
    }
  };

  const handleEdit = (sermon) => {
    setEditingSermon(sermon);
    setFormData({
      title: sermon.title,
      series: sermon.series || '',
      preacher: sermon.preacher,
      date: sermon.date,
      image_url: sermon.image_url || '',
      video_url: sermon.video_url || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      series: '',
      preacher: '',
      date: '',
      image_url: '',
      video_url: ''
    });
    setEditingSermon(null);
    setShowForm(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-secondary">Sermons Management</h1>
          <p className="text-gray-600 mt-1">Manage sermon archive</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors font-bold uppercase tracking-wider"
        >
          <Plus size={20} />
          Add Sermon
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Series</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Preacher</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sermons.map((sermon) => (
              <tr key={sermon.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{sermon.title}</td>
                <td className="px-6 py-4 text-gray-600">{sermon.series || '-'}</td>
                <td className="px-6 py-4 text-gray-600">{sermon.preacher}</td>
                <td className="px-6 py-4 text-gray-600">{new Date(sermon.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(sermon)} className="text-blue-600 hover:text-blue-800 mr-3">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDeleteClick(sermon)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-serif font-bold text-secondary">
                {editingSermon ? 'Edit Sermon' : 'Add New Sermon'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sermon Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Series</label>
                  <input
                    type="text"
                    value={formData.series}
                    onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preacher</label>
                  <input
                    type="text"
                    value={formData.preacher}
                    onChange={(e) => setFormData({ ...formData, preacher: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sermon Cover Image</label>
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

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Video URL</label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
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
                  {editingSermon ? 'Update Sermon' : 'Create Sermon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingSermon}
        onClose={() => setDeletingSermon(null)}
        onConfirm={confirmDelete}
        title="Delete Sermon"
        itemName={deletingSermon?.title}
      />
    </div>
  );
};

export default SermonsManager;
