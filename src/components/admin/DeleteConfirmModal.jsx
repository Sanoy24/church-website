import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-4 animate-bounce">
            <AlertTriangle size={32} />
          </div>
          
          <h2 className="text-2xl font-serif font-bold text-secondary mb-2">{title || 'Confirm Deletion'}</h2>
          
          <p className="text-gray-600 mb-6 px-4">
            {message || `Are you sure you want to delete ${itemName ? `"${itemName}"` : 'this item'}? This action cannot be undone.`}
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-bold uppercase text-xs tracking-widest text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all transform active:scale-95 font-bold uppercase text-xs tracking-widest"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
