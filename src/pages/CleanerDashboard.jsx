import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaBriefcase, FaCheckCircle, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import api from '../services/api';

const STATUS_BADGES = {
  en_attente: { class: 'badge-yellow', label: 'En attente' },
  confirmee: { class: 'badge-green', label: 'Confirmée' },
  en_cours: { class: 'badge-blue', label: 'En cours' },
  terminee: { class: 'badge-green', label: 'Terminée' },
  annulee: { class: 'badge-red', label: 'Annulée' },
};

const CleanerDashboard = () => {
  const { user } = useAuth();
  const [candidatures, setCandidatures] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [candidaturesRes, reservationsRes] = await Promise.all([
        api.get('/candidatures'),
        api.get('/reservations/nettoyeur'),
      ]);
      setCandidatures(candidaturesRes.data.data || candidaturesRes.data);
      setReservations(reservationsRes.data.data || reservationsRes.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostuler = async (reservationId) => {
    try {
      await api.post('/candidatures', { reservation_id: reservationId });
      toast.success('Candidature envoyée !');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la candidature');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const completedCount = reservations.filter(r => r.statut === 'terminee').length;
  const activeCount = reservations.filter(r => !['terminee', 'annulee'].includes(r.statut)).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bonjour, {user?.prenom} !</h1>
          <p className="text-gray-500 mt-1">Trouvez de nouvelles missions de nettoyage</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBriefcase className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{candidatures.length}</p>
              <p className="text-xs text-gray-500">Disponibles</p>
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

        {/* Available missions */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Missions disponibles</h2>
          {candidatures.length === 0 ? (
            <div className="card text-center py-10">
              <FaBriefcase className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucune mission disponible pour le moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {candidatures.map((c) => (
                <div key={c.id} className="card !p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {c.type_service && (
                          <span className="badge badge-blue capitalize">{c.type_service}</span>
                        )}
                        <h3 className="font-semibold text-gray-900">{c.titre || 'Mission de nettoyage'}</h3>
                      </div>
                      {c.description && <p className="text-gray-500 text-sm mb-3 line-clamp-2">{c.description}</p>}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        {c.adresse_service && (
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-gray-400" /> {c.adresse_service}{c.ville ? `, ${c.ville}` : ''}
                          </span>
                        )}
                        {c.date_service && (
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-gray-400" /> {new Date(c.date_service).toLocaleDateString('fr-FR')}
                          </span>
                        )}
                        {c.prix_propose && (
                          <span className="flex items-center gap-1 font-semibold text-gray-700">
                            <FaMoneyBillWave className="text-gray-400" /> {c.prix_propose} DT
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => handlePostuler(c.id)}
                      className="btn-primary !py-2.5 !px-6 !text-sm whitespace-nowrap">
                      Postuler
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My reservations */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Mes missions</h2>
          {reservations.length === 0 ? (
            <div className="card text-center py-10">
              <FaCheckCircle className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucune mission attribuée</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reservations.map((r) => {
                const status = STATUS_BADGES[r.statut] || STATUS_BADGES.en_attente;
                return (
                  <div key={r.id} className="card flex items-center justify-between !p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <FaBriefcase className="text-gray-400 text-sm" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{r.titre || r.type_service || 'Mission'}</p>
                        <p className="text-xs text-gray-400">
                          {r.client_nom} {r.client_prenom} - {r.date_service ? new Date(r.date_service).toLocaleDateString('fr-FR') : ''}
                        </p>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CleanerDashboard;
