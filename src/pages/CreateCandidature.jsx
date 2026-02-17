import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaHome, FaCalendarAlt, FaMoneyBillWave, FaFileAlt } from 'react-icons/fa';
import api from '../services/api';

const CreateCandidature = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    adresse: '',
    dateDisponibilite: '',
    budget: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/candidatures', formData);
      toast.success('Candidature créée avec succès !');
      navigate('/client-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            📝 Créer une nouvelle candidature
          </h1>
          <p className="text-gray-600 mb-8">
            Décrivez votre besoin en nettoyage et recevez des propositions de professionnels qualifiés
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaFileAlt className="text-blue-600" />
                Titre de la mission
              </label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                placeholder="Ex: Nettoyage complet d'un appartement 3 pièces"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaFileAlt className="text-blue-600" />
                Description détaillée
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez en détail ce que vous attendez : pièces à nettoyer, type de nettoyage, particularités..."
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                required
              />
            </div>

            {/* Adresse */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaHome className="text-blue-600" />
                Adresse
              </label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                placeholder="Ex: 123 Rue de la Paix, 75002 Paris"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaCalendarAlt className="text-blue-600" />
                Date de disponibilité
              </label>
              <input
                type="date"
                name="dateDisponibilite"
                value={formData.dateDisponibilite}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaMoneyBillWave className="text-blue-600" />
                Budget (€)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Ex: 150"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Création...
                  </span>
                ) : (
                  '✓ Publier la candidature'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/client-dashboard')}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6"
        >
          <h3 className="font-bold text-blue-900 mb-2">💡 Conseils pour une bonne candidature</h3>
          <ul className="space-y-2 text-blue-800">
            <li>✓ Soyez précis dans votre description</li>
            <li>✓ Indiquez la surface approximative à nettoyer</li>
            <li>✓ Mentionnez si vous fournissez le matériel</li>
            <li>✓ Proposez un budget réaliste</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCandidature;