import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, Calendar, Clock, MapPin, X, Upload, Loader2 } from 'lucide-react';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image_url: ''
  });

  useEffect(() => {
    loadEvents();
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

  const loadEvents = async () => {
    try {
      const data = await api.events.getAll();
      setEvents(data);
    } catch (error) {
      alert('Failed to load events: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await api.events.update(editingEvent.id, formData);
      } else {
        await api.events.create(formData);
      }
      loadEvents();
      resetForm();
    } catch (error) {
      alert('Failed to save event: ' + error.message);
    }
  };

  const handleDeleteClick = (event) => {
    setDeletingEvent(event);
  };

  const confirmDelete = async () => {
    if (!deletingEvent) return;
    try {
      await api.events.delete(deletingEvent.id);
      loadEvents();
      setDeletingEvent(null);
    } catch (error) {
      alert('Failed to delete event: ' + error.message);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image_url: event.image_url || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image_url: ''
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-secondary">Events Management</h1>
          <p className="text-gray-600 mt-1">Manage church events and calendar</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors font-bold uppercase tracking-wider"
        >
          <Plus size={20} />
          Add Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {event.image_url && (
              <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
              <h3 className="font-serif font-bold text-xl text-secondary mb-3">{event.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-primary" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} className="text-primary" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-primary" />
                  {event.location}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(event)}
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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-serif font-bold text-secondary">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  rows="4"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="e.g., 7:00 PM - 9:00 PM"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Image</label>
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
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={confirmDelete}
        title="Delete Event"
        itemName={deletingEvent?.title}
      />
    </div>
  );
};

export default EventsManager;
