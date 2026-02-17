const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🏠 CleanHome</h3>
            <p className="text-gray-400">
              La plateforme qui connecte les clients avec les meilleurs professionnels du nettoyage
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Accueil</a></li>
              <li><a href="/login" className="hover:text-white transition">Connexion</a></li>
              <li><a href="/register" className="hover:text-white transition">Inscription</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 contact@cleanhome.com</li>
              <li>📞 +33 1 23 45 67 89</li>
              <li>📍 Paris, France</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 CleanHome. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;