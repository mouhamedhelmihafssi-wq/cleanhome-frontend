import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaSave } from 'react-icons/fa';
import api from '../services/api';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put(`/auth/profile/${user.id}`, formData);
      const updatedUser = response.data.user || response.data.data;
      login(updatedUser, localStorage.getItem('token'));
      toast.success('Profil mis à jour avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mon profil</h1>

        <div className="card">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="text-blue-700 font-bold text-xl">
                {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">{user?.prenom} {user?.nom}</h2>
              <span className="badge badge-blue capitalize">{user?.type}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input type="text" name="nom" value={formData.nom} onChange={handleChange}
                    className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange}
                  className="input-field" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className="input-field pl-11" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange}
                  className="input-field pl-11" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 !mt-6">
              {loading ? 'Mise à jour...' : <><FaSave /> Enregistrer</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
