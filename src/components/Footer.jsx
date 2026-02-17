import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-white">Clean<span className="text-blue-400">Home</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La plateforme de confiance qui connecte les clients avec des professionnels du nettoyage qualifiés.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Connexion</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Inscription</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Nettoyage Maison</li>
              <li className="text-gray-400">Nettoyage Voiture</li>
              <li className="text-gray-400">Nettoyage Bureau</li>
              <li className="text-gray-400">Entretien Jardin</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>contact@cleanhome.tn</li>
              <li>+216 71 234 567</li>
              <li>Tunis, Tunisie</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; 2026 CleanHome. Tous droits réservés.</p>
          <div className="flex gap-6 text-sm">
            <span className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Conditions</span>
            <span className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
