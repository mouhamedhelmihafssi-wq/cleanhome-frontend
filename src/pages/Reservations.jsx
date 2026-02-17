import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Reservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const endpoint = user.role === 'client' 
        ? '/reservations' 
        : '/reservations/nettoyeur';
      const response = await api.get(endpoint);
      setReservations(response.data);
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
        <h1 className="text-3xl font-bold mb-8">📋 Mes Réservations</h1>

        {reservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">Aucune réservation pour le moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {reservation.candidature?.titre || 'Réservation'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {reservation.candidature?.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">📍 Adresse:</p>
                        <p className="font-semibold">{reservation.candidature?.adresse}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">📅 Date:</p>
                        <p className="font-semibold">
                          {new Date(reservation.dateReservation).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">💰 Budget:</p>
                        <p className="font-semibold text-blue-600">
                          {reservation.candidature?.budget}€
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">📊 Statut:</p>
                        <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                          reservation.statut === 'confirmee' ? 'bg-green-100 text-green-800' :
                          reservation.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                          reservation.statut === 'terminee' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {reservation.statut}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;