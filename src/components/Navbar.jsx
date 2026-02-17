import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaClipboardList, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLink = (to, label, icon) => (
    <Link
      to={to}
      onClick={() => setMobileOpen(false)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive(to)
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Clean<span className="text-blue-600">Home</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {user ? (
              <>
                {user.type === 'client' && navLink('/client-dashboard', 'Dashboard', <FaTachometerAlt className="text-xs" />)}
                {user.type === 'nettoyeur' && navLink('/cleaner-dashboard', 'Dashboard', <FaTachometerAlt className="text-xs" />)}
                {navLink('/reservations', 'Reservations', <FaClipboardList className="text-xs" />)}
                {navLink('/profile', 'Profil', <FaUser className="text-xs" />)}

                <div className="w-px h-6 bg-gray-200 mx-2" />

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-700 font-semibold text-sm">
                      {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{user.prenom}</span>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Déconnexion"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors">
                  Connexion
                </Link>
                <Link to="/register" className="btn-primary !py-2 !px-5 !text-sm">
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg"
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-1">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-700 font-semibold">
                      {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.prenom} {user.nom}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.type}</p>
                  </div>
                </div>
                {user.type === 'client' && navLink('/client-dashboard', 'Dashboard', <FaTachometerAlt />)}
                {user.type === 'nettoyeur' && navLink('/cleaner-dashboard', 'Dashboard', <FaTachometerAlt />)}
                {navLink('/reservations', 'Reservations', <FaClipboardList />)}
                {navLink('/profile', 'Profil', <FaUser />)}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FaSignOutAlt /> Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg text-sm font-medium">
                  Connexion
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-blue-600 font-semibold text-sm">
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
