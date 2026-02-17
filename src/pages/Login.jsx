import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    type: 'client',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      const { token, user } = response.data.data;
      login(user, token);

      if (user.type === 'client') {
        navigate('/client-dashboard');
      } else if (user.type === 'nettoyeur') {
        navigate('/cleaner-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Bon retour !</h1>
          <p className="text-gray-500 mt-1">Connectez-vous à votre compte</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Je suis</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'client', label: 'Client' },
                  { value: 'nettoyeur', label: 'Nettoyeur' },
                ].map(({ value, label }) => (
                  <label key={value}
                    className={`flex items-center justify-center py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                      formData.type === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <input type="radio" name="type" value={value} checked={formData.type === value}
                      onChange={handleChange} className="hidden" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="votre@email.com" className="input-field pl-11" required />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="password" name="mot_de_passe" value={formData.mot_de_passe} onChange={handleChange}
                  placeholder="Votre mot de passe" className="input-field pl-11" required />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connexion...
                </span>
              ) : (
                <>Se connecter <FaArrowRight /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
