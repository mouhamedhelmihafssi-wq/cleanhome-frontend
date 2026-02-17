import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaClipboardList, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import api from '../services/api';

const STATUS_BADGES = {
  en_attente: { class: 'badge-yellow', label: 'En attente' },
  confirmee: { class: 'badge-green', label: 'Confirmée' },
  en_cours: { class: 'badge-blue', label: 'En cours' },
  terminee: { class: 'badge-green', label: 'Terminée' },
  annulee: { class: 'badge-red', label: 'Annulée' },
};

const Reservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchReservations(); }, []);

  const fetchReservations = async () => {
    try {
      if (!user) return;
      const endpoint = user.type === 'client' ? '/reservations' : '/reservations/nettoyeur';
      const response = await api.get(endpoint);
      setReservations(response.data.data || response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mes réservations</h1>

        {reservations.length === 0 ? (
          <div className="card text-center py-16">
            <FaClipboardList className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucune réservation pour le moment</p>
            <p className="text-gray-400 text-sm mt-1">Vos réservations apparaîtront ici</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map((r) => {
              const status = STATUS_BADGES[r.statut] || STATUS_BADGES.en_attente;
              return (
                <div key={r.id} className="card !p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {r.type_service && <span className="badge badge-blue capitalize">{r.type_service}</span>}
                        <h3 className="font-semibold text-gray-900">
                          {r.titre || r.candidature?.titre || 'Réservation'}
                        </h3>
                      </div>
                      {(r.description || r.candidature?.description) && (
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                          {r.description || r.candidature?.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        {(r.adresse_service || r.candidature?.adresse) && (
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-gray-400" />
                            {r.adresse_service || r.candidature?.adresse}
                          </span>
                        )}
                        {(r.date_service || r.dateReservation) && (
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-gray-400" />
                            {new Date(r.date_service || r.dateReservation).toLocaleDateString('fr-FR', {
                              weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </span>
                        )}
                        {(r.prix_propose || r.candidature?.budget) && (
                          <span className="flex items-center gap-1 font-semibold text-gray-700">
                            <FaMoneyBillWave className="text-gray-400" />
                            {r.prix_propose || r.candidature?.budget} DT
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`badge ${status.class}`}>{status.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
