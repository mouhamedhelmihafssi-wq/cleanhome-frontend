import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const ClientDashboard = () => {
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
        api.get('/reservations'),
      ]);
      setCandidatures(candidaturesRes.data);
      setReservations(reservationsRes.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
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
          👋 Bonjour {user?.prenom} !
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Candidatures disponibles</h3>
            <p className="text-3xl font-bold text-blue-600">{candidatures.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Réservations actives</h3>
            <p className="text-3xl font-bold text-green-600">{reservations.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Services complétés</h3>
            <p className="text-3xl font-bold text-purple-600">
              {reservations.filter(r => r.statut === 'terminee').length}
            </p>
          </div>
        </div>

        {/* Candidatures récentes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">🔍 Candidatures récentes</h2>
          {candidatures.length === 0 ? (
            <p className="text-gray-600">Aucune candidature disponible</p>
          ) : (
            <div className="space-y-4">
              {candidatures.slice(0, 5).map((candidature) => (
                <div key={candidature.id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{candidature.titre}</h3>
                      <p className="text-gray-600 text-sm">{candidature.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        📍 {candidature.adresse} | 💰 {candidature.budget}€
                      </p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Voir détails
                    </button>
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

export default ClientDashboard;