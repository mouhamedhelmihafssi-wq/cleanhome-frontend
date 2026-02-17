import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaHome, FaCar, FaBuilding, FaTree, FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaArrowLeft, FaClipboardList, FaCheckCircle, FaClock } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import api from '../services/api';

const CLEANING_TYPES = [
  { value: 'maison', label: 'Maison', icon: FaHome, description: 'Appartement, villa, studio...', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', iconBg: 'bg-blue-100', activeBorder: 'border-blue-500' },
  { value: 'voiture', label: 'Voiture', icon: FaCar, description: 'Intérieur, extérieur, complet', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', iconBg: 'bg-green-100', activeBorder: 'border-green-500' },
  { value: 'batiment', label: 'Bâtiment', icon: FaBuilding, description: 'Immeuble, commerce, entrepôt', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', iconBg: 'bg-purple-100', activeBorder: 'border-purple-500' },
  { value: 'bureau', label: 'Bureau', icon: MdMeetingRoom, description: 'Open space, salle de réunion', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', iconBg: 'bg-orange-100', activeBorder: 'border-orange-500' },
  { value: 'jardin', label: 'Jardin', icon: FaTree, description: 'Gazon, arbres, piscine', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', iconBg: 'bg-emerald-100', activeBorder: 'border-emerald-500' },
];

const STATUS_BADGES = {
  en_attente: { class: 'badge-yellow', label: 'En attente' },
  confirmee: { class: 'badge-green', label: 'Confirmée' },
  en_cours: { class: 'badge-blue', label: 'En cours' },
  terminee: { class: 'badge-green', label: 'Terminée' },
  annulee: { class: 'badge-red', label: 'Annulée' },
};

const ClientDashboard = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    titre: '', description: '', adresse: '', ville: '', code_postal: '',
    date_service: '', heure_debut: '', budget: '',
  });
  const [details, setDetails] = useState({});

  useEffect(() => { fetchReservations(); }, []);

  const fetchReservations = async () => {
    try {
      const res = await api.get('/reservations');
      setReservations(res.data.data || res.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDetailChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDetails({ ...details, [name]: type === 'checkbox' ? checked : value });
  };
  const handleSelectType = (type) => { setSelectedType(type); setDetails({}); };
  const handleBack = () => { setSelectedType(null); setDetails({}); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/reservations', {
        type_service: selectedType, titre: formData.titre, description: formData.description,
        adresse_service: formData.adresse, ville: formData.ville, code_postal: formData.code_postal,
        date_service: formData.date_service, heure_debut: formData.heure_debut,
        prix_propose: formData.budget, details,
      });
      toast.success('Demande créée avec succès !');
      setSelectedType(null);
      setFormData({ titre: '', description: '', adresse: '', ville: '', code_postal: '', date_service: '', heure_debut: '', budget: '' });
      setDetails({});
      fetchReservations();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setSubmitting(false);
    }
  };

  const renderTypeDetails = () => {
    switch (selectedType) {
      case 'maison':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre de chambres</label>
              <input type="number" name="nombre_chambres" min="1" value={details.nombre_chambres || ''} onChange={handleDetailChange} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre d'étages</label>
              <input type="number" name="nombre_etages" min="1" value={details.nombre_etages || ''} onChange={handleDetailChange} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre de salles de bain</label>
              <input type="number" name="nombre_salles_bain" min="1" value={details.nombre_salles_bain || ''} onChange={handleDetailChange} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Type de service</label>
              <select name="type_service_detail" value={details.type_service_detail || ''} onChange={handleDetailChange} className="input-field" required>
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
              <label className="block text-sm font-medium text-gray-600 mb-1">Modèle</label>
              <input type="text" name="nom_voiture" value={details.nom_voiture || ''} onChange={handleDetailChange} placeholder="Ex: Peugeot 308" className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Type</label>
              <select name="type_voiture" value={details.type_voiture || ''} onChange={handleDetailChange} className="input-field" required>
                <option value="">-- Choisir --</option>
                <option value="standard">Standard</option>
                <option value="4x4">4x4</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Zone de nettoyage</label>
              <select name="zone_nettoyage" value={details.zone_nettoyage || ''} onChange={handleDetailChange} className="input-field" required>
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
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre d'étages</label>
              <input type="number" name="nombre_etages" min="1" value={details.nombre_etages || ''} onChange={handleDetailChange} className="input-field" required />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" name="avec_ascenseur" checked={details.avec_ascenseur || false} onChange={handleDetailChange} className="w-5 h-5 text-purple-600 rounded" />
              <label className="text-sm text-gray-700">Avec ascenseur</label>
            </div>
          </div>
        );
      case 'bureau':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Surface (m²)</label>
              <input type="number" name="surface" min="1" step="0.01" value={details.surface || ''} onChange={handleDetailChange} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Type de service</label>
              <select name="type_service_detail" value={details.type_service_detail || ''} onChange={handleDetailChange} className="input-field" required>
                <option value="">-- Choisir --</option>
                <option value="grand_menage">Grand ménage</option>
                <option value="rangement">Rangement</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_cuisine" checked={details.avec_cuisine || false} onChange={handleDetailChange} className="w-5 h-5 rounded" />
              <label className="text-sm text-gray-700">Avec cuisine</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_toilette" checked={details.avec_toilette || false} onChange={handleDetailChange} className="w-5 h-5 rounded" />
              <label className="text-sm text-gray-700">Avec toilette</label>
            </div>
          </div>
        );
      case 'jardin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Surface (m²)</label>
              <input type="number" name="surface" min="1" step="0.01" value={details.surface || ''} onChange={handleDetailChange} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Type de service</label>
              <select name="type_service_detail" value={details.type_service_detail || ''} onChange={handleDetailChange} className="input-field" required>
                <option value="">-- Choisir --</option>
                <option value="inclure_tout">Inclure tout</option>
                <option value="une_par_choix">Choisir les services</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_gazon" checked={details.avec_gazon || false} onChange={handleDetailChange} className="w-5 h-5 rounded" />
              <label className="text-sm text-gray-700">Gazon</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_arbres" checked={details.avec_arbres || false} onChange={handleDetailChange} className="w-5 h-5 rounded" />
              <label className="text-sm text-gray-700">Arbres</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="avec_piscine" checked={details.avec_piscine || false} onChange={handleDetailChange} className="w-5 h-5 rounded" />
              <label className="text-sm text-gray-700">Piscine</label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const activeType = CLEANING_TYPES.find(t => t.value === selectedType);
  const activeCount = reservations.filter(r => !['terminee', 'annulee'].includes(r.statut)).length;
  const completedCount = reservations.filter(r => r.statut === 'terminee').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bonjour, {user?.prenom} !</h1>
          <p className="text-gray-500 mt-1">Que souhaitez-vous faire nettoyer ?</p>
        </div>

        {!selectedType ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="card flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaClipboardList className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{reservations.length}</p>
                  <p className="text-xs text-gray-500">Total demandes</p>
                </div>
              </div>
              <div className="card flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <FaClock className="text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                  <p className="text-xs text-gray-500">En cours</p>
                </div>
              </div>
              <div className="card flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <FaCheckCircle className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                  <p className="text-xs text-gray-500">Terminées</p>
                </div>
              </div>
            </div>

            {/* Cleaning types */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Choisissez un service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CLEANING_TYPES.map(({ value, label, icon: Icon, description, bg, border, text, iconBg }) => (
                  <button key={value} onClick={() => handleSelectType(value)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left hover:shadow-md ${bg} ${border}`}
                  >
                    <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`text-2xl ${text}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${text}`}>{label}</h3>
                      <p className="text-gray-500 text-sm">{description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent reservations */}
            {reservations.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Réservations récentes</h2>
                <div className="space-y-3">
                  {reservations.slice(0, 5).map((r) => {
                    const status = STATUS_BADGES[r.statut] || STATUS_BADGES.en_attente;
                    return (
                      <div key={r.id} className="card flex items-center justify-between !p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <FaClipboardList className="text-gray-400 text-sm" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{r.titre || r.type_service}</p>
                            <p className="text-xs text-gray-400">{r.ville} - {r.date_service ? new Date(r.date_service).toLocaleDateString('fr-FR') : ''}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {r.prix_propose && <span className="text-sm font-bold text-gray-900">{r.prix_propose} DT</span>}
                          <span className={`badge ${status.class}`}>{status.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Form */
          <div className="max-w-3xl mx-auto">
            <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 text-sm font-medium transition-colors">
              <FaArrowLeft className="text-xs" /> Retour aux services
            </button>

            <div className={`${activeType.bg} ${activeType.activeBorder} border-2 rounded-2xl p-5 mb-6 flex items-center gap-4`}>
              <div className={`w-14 h-14 ${activeType.iconBg} rounded-xl flex items-center justify-center`}>
                <activeType.icon className={`text-2xl ${activeType.text}`} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${activeType.text}`}>Nettoyage {activeType.label}</h2>
                <p className="text-gray-500 text-sm">{activeType.description}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="card space-y-5">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-3 text-sm">Détails du service</h3>
                {renderTypeDetails()}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la demande</label>
                <input type="text" name="titre" value={formData.titre} onChange={handleChange}
                  placeholder={`Ex: Nettoyage ${activeType.label.toLowerCase()} complet`} className="input-field" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange}
                  placeholder="Décrivez votre besoin en détail..." rows="3" className="input-field resize-none" required />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="text-blue-600 text-xs" /> Adresse
                </label>
                <input type="text" name="adresse" value={formData.adresse} onChange={handleChange}
                  placeholder="Ex: 123 Rue de la Paix" className="input-field" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                  <input type="text" name="ville" value={formData.ville} onChange={handleChange}
                    placeholder="Ex: Tunis" className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                  <input type="text" name="code_postal" value={formData.code_postal} onChange={handleChange}
                    placeholder="Ex: 1000" className="input-field" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className="text-blue-600 text-xs" /> Date
                  </label>
                  <input type="date" name="date_service" value={formData.date_service} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                  <input type="time" name="heure_debut" value={formData.heure_debut} onChange={handleChange}
                    className="input-field" required />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaMoneyBillWave className="text-blue-600 text-xs" /> Budget (DT)
                </label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange}
                  placeholder="Ex: 150" min="0" step="0.01" className="input-field" required />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={submitting} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {submitting ? 'Envoi...' : 'Envoyer la demande'}
                </button>
                <button type="button" onClick={handleBack} className="btn-secondary">Annuler</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
