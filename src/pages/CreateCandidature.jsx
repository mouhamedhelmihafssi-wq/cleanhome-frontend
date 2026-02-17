import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaCalendarAlt, FaMoneyBillWave, FaFileAlt, FaBroom, FaCar, FaBuilding, FaTree } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import api from '../services/api';

const CLEANING_TYPES = [
  { value: 'maison', label: 'Maison', icon: FaHome, activeClass: 'border-blue-500 bg-blue-50 text-blue-700 shadow-md scale-105' },
  { value: 'voiture', label: 'Voiture', icon: FaCar, activeClass: 'border-green-500 bg-green-50 text-green-700 shadow-md scale-105' },
  { value: 'batiment', label: 'Bâtiment', icon: FaBuilding, activeClass: 'border-purple-500 bg-purple-50 text-purple-700 shadow-md scale-105' },
  { value: 'bureau', label: 'Bureau', icon: MdMeetingRoom, activeClass: 'border-orange-500 bg-orange-50 text-orange-700 shadow-md scale-105' },
  { value: 'jardin', label: 'Jardin', icon: FaTree, activeClass: 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md scale-105' },
];

const CreateCandidature = () => {
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type') || '';

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    adresse: '',
    ville: '',
    code_postal: '',
    dateDisponibilite: '',
    heure_debut: '',
    budget: '',
    type_service: typeFromUrl,
  });

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, type_service: type });
    setDetails({});
  };

  const handleDetailChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDetails({ ...details, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.type_service) {
      toast.error('Veuillez choisir un type de nettoyage');
      return;
    }

    setLoading(true);

    try {
      await api.post('/reservations', {
        type_service: formData.type_service,
        description: formData.description,
        adresse_service: formData.adresse,
        ville: formData.ville,
        code_postal: formData.code_postal,
        date_service: formData.dateDisponibilite,
        heure_debut: formData.heure_debut,
        prix_propose: formData.budget,
        titre: formData.titre,
        details,
      });
      toast.success('Demande créée avec succès !');
      navigate('/client-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const renderDetails = () => {
    switch (formData.type_service) {
      case 'maison':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nombre de chambres</label>
              <input type="number" name="nombre_chambres" min="1" value={details.nombre_chambres || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nombre d'étages</label>
              <input type="number" name="nombre_etages" min="1" value={details.nombre_etages || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nombre de salles de bain</label>
              <input type="number" name="nombre_salles_bain" min="1" value={details.nombre_salles_bain || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Type de service</label>
              <select name="type_service_detail" value={details.type_service_detail || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required>
                <option value="">-- Choisir --</option>
                <option value="grand_menage">Grand ménage</option>
                <option value="rangement">Rangement</option>
              </select>
            </div>
          </div>
        );

      case 'voiture':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nom de la voiture</label>
              <input type="text" name="nom_voiture" value={details.nom_voiture || ''} onChange={handleDetailChange}
                placeholder="Ex: Peugeot 308"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Type de voiture</label>
              <select name="type_voiture" value={details.type_voiture || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" required>
                <option value="">-- Choisir --</option>
                <option value="standard">Standard</option>
                <option value="4x4">4x4</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Zone de nettoyage</label>
              <select name="zone_nettoyage" value={details.zone_nettoyage || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" required>
                <option value="">-- Choisir --</option>
                <option value="exterieur">Extérieur</option>
                <option value="interieur">Intérieur</option>
                <option value="les_deux">Les deux</option>
              </select>
            </div>
          </div>
        );

      case 'batiment':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nombre d'étages</label>
              <input type="number" name="nombre_etages" min="1" value={details.nombre_etages || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" required />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" name="avec_ascenseur" checked={details.avec_ascenseur || false} onChange={handleDetailChange}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500" />
              <label className="text-gray-700 font-medium">Avec ascenseur</label>
            </div>
          </div>
        );

      case 'bureau':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Surface (m²)</label>
              <input type="number" name="surface" min="1" step="0.01" value={details.surface || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Type de service</label>
              <select name="type_service_detail" value={details.type_service_detail || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" required>
                <option value="">-- Choisir --</option>
                <option value="grand_menage">Grand ménage</option>
                <option value="rangement">Rangement</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_cuisine" checked={details.avec_cuisine || false} onChange={handleDetailChange}
                className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
              <label className="text-gray-700 font-medium">Avec cuisine</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_toilette" checked={details.avec_toilette || false} onChange={handleDetailChange}
                className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
              <label className="text-gray-700 font-medium">Avec toilette</label>
            </div>
          </div>
        );

      case 'jardin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Surface (m²)</label>
              <input type="number" name="surface" min="1" step="0.01" value={details.surface || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Type de service</label>
              <select name="type_service_detail" value={details.type_service_detail || ''} onChange={handleDetailChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition" required>
                <option value="">-- Choisir --</option>
                <option value="inclure_tout">Inclure tout</option>
                <option value="une_par_choix">Choisir les services</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_gazon" checked={details.avec_gazon || false} onChange={handleDetailChange}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
              <label className="text-gray-700 font-medium">Gazon</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_arbres" checked={details.avec_arbres || false} onChange={handleDetailChange}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
              <label className="text-gray-700 font-medium">Arbres</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_piscine" checked={details.avec_piscine || false} onChange={handleDetailChange}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
              <label className="text-gray-700 font-medium">Piscine</label>
            </div>
          </div>
        );

      default:
        return null;
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
            <FaBroom className="inline mr-2 text-blue-600" />
            Créer une nouvelle demande
          </h1>
          <p className="text-gray-600 mb-8">
            Décrivez votre besoin en nettoyage et recevez des propositions de professionnels qualifiés
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type de nettoyage */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                <FaBroom className="text-blue-600" />
                Type de nettoyage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {CLEANING_TYPES.map(({ value, label, icon: Icon, activeClass }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleTypeSelect(value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.type_service === value
                        ? activeClass
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Icon className="text-2xl" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic detail fields */}
            <AnimatePresence mode="wait">
              {formData.type_service && (
                <motion.div
                  key={formData.type_service}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                >
                  <h3 className="font-semibold text-gray-700 mb-4">
                    Détails - {CLEANING_TYPES.find(t => t.value === formData.type_service)?.label}
                  </h3>
                  {renderDetails()}
                </motion.div>
              )}
            </AnimatePresence>

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
                rows="4"
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
                placeholder="Ex: 123 Rue de la Paix"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Ville + Code postal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Ville</label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  placeholder="Ex: Paris"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Code postal</label>
                <input
                  type="text"
                  name="code_postal"
                  value={formData.code_postal}
                  onChange={handleChange}
                  placeholder="Ex: 75002"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Date + Heure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <FaCalendarAlt className="text-blue-600" />
                  Date souhaitée
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
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Heure de début</label>
                <input
                  type="time"
                  name="heure_debut"
                  value={formData.heure_debut}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
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
                  'Publier la demande'
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
          <h3 className="font-bold text-blue-900 mb-2">Conseils pour une bonne demande</h3>
          <ul className="space-y-2 text-blue-800">
            <li>- Choisissez le type de nettoyage adapté</li>
            <li>- Soyez précis dans votre description</li>
            <li>- Indiquez la surface approximative à nettoyer</li>
            <li>- Mentionnez si vous fournissez le matériel</li>
            <li>- Proposez un budget réaliste</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCandidature;
