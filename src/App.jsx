import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import CleanerDashboard from './pages/CleanerDashboard';
import Reservations from './pages/Reservations';
import Profile from './pages/Profile';
import CreateCandidature from './pages/CreateCandidature';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Routes protégées - Client */}
              <Route
                path="/client-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-candidature"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <CreateCandidature />
                  </ProtectedRoute>
                }
              />

              {/* Routes protégées - Nettoyeur */}
              <Route
                path="/cleaner-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['nettoyeur']}>
                    <CleanerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Routes protégées - Tous */}
              <Route
                path="/reservations"
                element={
                  <ProtectedRoute>
                    <Reservations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;