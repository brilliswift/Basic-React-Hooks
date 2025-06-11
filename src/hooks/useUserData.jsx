import { useState, useEffect } from 'react';

// Custom Hook untuk API simulation
export const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Simulasi API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockUsers = [
          { id: 1, name: 'Ahmad Rizki', role: 'Frontend Developer', status: 'active' },
          { id: 2, name: 'Siti Nurhaliza', role: 'Backend Developer', status: 'active' },
          { id: 3, name: 'Budi Santoso', role: 'UI/UX Designer', status: 'inactive' }
        ];
        setUsers(mockUsers);
      } catch (err) {
        setError('Gagal memuat data pengguna');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, loading, error };
};