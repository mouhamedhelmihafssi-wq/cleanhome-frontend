import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CleanerDashboard = () => {
  const { user } = useAuth();
  const [candidatures, setCandidatures] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [candidaturesRes, reservationsRes] = await Promise.all([
        api.get('/candidatures'),
        api.get('/reservations/nettoyeur'),
      ]);
      setCandidatures(candidaturesRes.data);
      setReservations(reservationsRes.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostuler = async (reservationId) => {
    try {
      await api.post('/candidatures', { reservation_id: reservationId });
      alert('Candidature envoyée !');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur lors de la candidature');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          🧹 Bonjour {user?.prenom} !
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Missions disponibles</h3>
            <p className="text-3xl font-bold text-blue-600">{candidatures.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Réservations en cours</h3>
            <p className="text-3xl font-bold text-green-600">{reservations.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Missions complétées</h3>
            <p className="text-3xl font-bold text-purple-600">
              {reservations.filter(r => r.statut === 'terminee').length}
            </p>
          </div>
        </div>

        {/* Candidatures disponibles */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">💼 Missions disponibles</h2>
          {candidatures.length === 0 ? (
            <p className="text-gray-600">Aucune mission disponible</p>
          ) : (
            <div className="space-y-4">
              {candidatures.map((candidature) => (
                <div key={candidature.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{candidature.titre}</h3>
                      <p className="text-gray-600 mt-1">{candidature.description}</p>
                      <div className="mt-2 flex gap-4 text-sm text-gray-600">
                        <span>📍 {candidature.adresse}</span>
                        <span>📅 {new Date(candidature.dateDisponibilite).toLocaleDateString()}</span>
                        <span>💰 {candidature.budget}€</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePostuler(candidature.id)}
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ml-4"
                    >
                      Postuler
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mes réservations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">📋 Mes réservations</h2>
          {reservations.length === 0 ? (
            <p className="text-gray-600">Aucune réservation</p>
          ) : (
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{reservation.candidature?.titre}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        📅 {new Date(reservation.dateReservation).toLocaleDateString()}
                      </p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
                        reservation.statut === 'confirmee' ? 'bg-green-100 text-green-800' :
                        reservation.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {reservation.statut}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">
                        {reservation.candidature?.budget}€
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CleanerDashboard;