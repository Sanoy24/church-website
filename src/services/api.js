const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
};

export const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return handleResponse(res);
    },
    
    signup: async (email, password, role = 'editor') => {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      return handleResponse(res);
    },
    
    changePassword: async (currentPassword, newPassword) => {
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      return handleResponse(res);
    },
    
    getCurrentUser: async () => {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: getAuthHeader()
      });
      return handleResponse(res);
    },
    
    getAllUsers: async () => {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: getAuthHeader()
      });
      return handleResponse(res);
    },
    
    deleteUser: async (id) => {
      const res = await fetch(`${API_URL}/auth/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      return handleResponse(res);
    }
  },

  // Ministries
  ministries: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/ministries`);
      return handleResponse(res);
    },
    
    getById: async (id) => {
      const res = await fetch(`${API_URL}/ministries/${id}`);
      return handleResponse(res);
    },
    
    create: async (data) => {
      const res = await fetch(`${API_URL}/ministries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    
    update: async (id, data) => {
      const res = await fetch(`${API_URL}/ministries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    
    delete: async (id) => {
      const res = await fetch(`${API_URL}/ministries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      return handleResponse(res);
    }
  },

  // Events
  events: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/events`);
      return handleResponse(res);
    },
    
    getById: async (id) => {
      const res = await fetch(`${API_URL}/events/${id}`);
      return handleResponse(res);
    },
    
    getCalendar: async (year, month) => {
      const res = await fetch(`${API_URL}/events/calendar/${year}/${month}`);
      return handleResponse(res);
    },
    
    create: async (data) => {
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    
    update: async (id, data) => {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    
    delete: async (id) => {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      return handleResponse(res);
    }
  },

  // Sermons
  sermons: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const res = await fetch(`${API_URL}/sermons${queryString ? `?${queryString}` : ''}`);
      return handleResponse(res);
    },
    
    getRecent: async (limit = 5) => {
      const res = await fetch(`${API_URL}/sermons/recent?limit=${limit}`);
      return handleResponse(res);
    },
    
    getById: async (id) => {
      const res = await fetch(`${API_URL}/sermons/${id}`);
      return handleResponse(res);
    },
    
    create: async (data) => {
      const res = await fetch(`${API_URL}/sermons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    
    update: async (id, data) => {
      const res = await fetch(`${API_URL}/sermons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    
    delete: async (id) => {
      const res = await fetch(`${API_URL}/sermons/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      return handleResponse(res);
    }
  },

  // Donations
  donations: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/donations`);
      return handleResponse(res);
    },
    
    getById: async (id) => {
      const res = await fetch(`${API_URL}/donations/${id}`);
      return handleResponse(res);
    },
    
    create: async (data) => {
      const res = await fetch(`${API_URL}/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    
    update: async (id, data) => {
      const res = await fetch(`${API_URL}/donations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    
    delete: async (id) => {
      const res = await fetch(`${API_URL}/donations/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      return handleResponse(res);
    }
  }
};
