import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {  FaStar, FaCalendarAlt, FaShieldAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold mb-6"
            >
              🏠 CleanHome
            </motion.h1>
            <p className="text-2xl mb-4 text-blue-100">
              Votre maison propre en un clic
            </p>
            <p className="text-lg mb-10 text-blue-200 max-w-2xl mx-auto">
              Connectez-vous avec des professionnels du nettoyage vérifiés et de confiance
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all shadow-lg"
              >
                Commencer Gratuitement
              </Link>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-400 transform hover:scale-105 transition-all shadow-lg border-2 border-white"
              >
                Se connecter
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Nettoyeurs vérifiés</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">10k+</div>
              <div className="text-gray-600">Services réalisés</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Note moyenne</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support disponible</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Pourquoi choisir CleanHome ?
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-4 text-blue-600">
                
            
              </div>
              <h3 className="text-2xl font-bold mb-3">Professionnels qualifiés</h3>
              <p className="text-gray-600">
                Tous nos nettoyeurs sont vérifiés, formés et certifiés pour vous garantir un service de qualité
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-4 text-yellow-500">
                <FaStar />
              </div>
              <h3 className="text-2xl font-bold mb-3">Système d'évaluation</h3>
              <p className="text-gray-600">
                Consultez les avis et notations pour choisir le meilleur professionnel pour vos besoins
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-4 text-green-600">
                <FaCalendarAlt />
              </div>
              <h3 className="text-2xl font-bold mb-3">Réservation flexible</h3>
              <p className="text-gray-600">
                Réservez aux horaires qui vous conviennent, 7j/7, avec confirmation instantanée
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-4 text-purple-600">
                <FaShieldAlt />
              </div>
              <h3 className="text-2xl font-bold mb-3">Paiement sécurisé</h3>
              <p className="text-gray-600">
                Toutes les transactions sont sécurisées et protégées par notre garantie satisfaction
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-4 text-red-600">
                <FaClock />
              </div>
              <h3 className="text-2xl font-bold mb-3">Gain de temps</h3>
              <p className="text-gray-600">
                Trouvez un professionnel en quelques minutes et libérez votre temps pour ce qui compte vraiment
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-4 text-indigo-600">
                <FaMoneyBillWave />
              </div>
              <h3 className="text-2xl font-bold mb-3">Tarifs transparents</h3>
              <p className="text-gray-600">
                Aucun frais caché, vous connaissez le prix avant de réserver
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Prêt à commencer ?
          </motion.h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez des milliers de clients satisfaits
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all shadow-lg"
          >
            S'inscrire maintenant →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;