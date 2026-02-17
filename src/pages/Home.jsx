import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaShieldAlt, FaClock, FaMoneyBillWave, FaUserCheck, FaHome, FaCar, FaBuilding, FaTree, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleServiceClick = (type) => {
    if (user && user.type === 'client') {
      navigate(`/client-dashboard?type=${type}`);
    } else {
      navigate('/register');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Plateforme N°1 de nettoyage en Tunisie
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Votre espace propre,<br />
              <span className="text-blue-200">en un clic</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connectez-vous avec des professionnels du nettoyage vérifiés. Maison, voiture, bureau ou jardin — nous couvrons tous vos besoins.
            </motion.p>

            {!user && (
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2">
                  Commencer gratuitement <FaArrowRight />
                </Link>
                <Link to="/login" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                  Se connecter
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-2">Nos services</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900">Que souhaitez-vous nettoyer ?</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { value: 'maison', icon: FaHome, label: 'Maison', bg: 'bg-blue-50', border: 'border-blue-100', iconColor: 'text-blue-600', titleColor: 'text-blue-800', desc: 'Appartement, villa' },
              { value: 'voiture', icon: FaCar, label: 'Voiture', bg: 'bg-green-50', border: 'border-green-100', iconColor: 'text-green-600', titleColor: 'text-green-800', desc: 'Intérieur, extérieur' },
              { value: 'batiment', icon: FaBuilding, label: 'Bâtiment', bg: 'bg-purple-50', border: 'border-purple-100', iconColor: 'text-purple-600', titleColor: 'text-purple-800', desc: 'Immeuble, commerce' },
              { value: 'bureau', icon: MdMeetingRoom, label: 'Bureau', bg: 'bg-orange-50', border: 'border-orange-100', iconColor: 'text-orange-600', titleColor: 'text-orange-800', desc: 'Open space, salle' },
              { value: 'jardin', icon: FaTree, label: 'Jardin', bg: 'bg-emerald-50', border: 'border-emerald-100', iconColor: 'text-emerald-600', titleColor: 'text-emerald-800', desc: 'Gazon, piscine' },
            ].map(({ value, icon: Icon, label, bg, border, iconColor, titleColor, desc }) => (
              <motion.div key={value} variants={fadeUp} whileHover={{ y: -6 }}
                onClick={() => handleServiceClick(value)}
                className={`${bg} border-2 ${border} rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg transition-all`}
              >
                <Icon className={`text-3xl ${iconColor} mx-auto mb-3`} />
                <h3 className={`font-bold ${titleColor}`}>{label}</h3>
                <p className="text-gray-500 text-xs mt-1">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Professionnels', color: 'text-blue-600' },
              { value: '10K+', label: 'Services réalisés', color: 'text-emerald-600' },
              { value: '4.9', label: 'Note moyenne', color: 'text-amber-500' },
              { value: '24/7', label: 'Support client', color: 'text-purple-600' },
            ].map(({ value, label, color }) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <p className={`text-3xl md:text-4xl font-extrabold ${color}`}>{value}</p>
                <p className="text-gray-500 text-sm mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-2">Comment ça marche</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900">Simple comme 1, 2, 3</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Choisissez le service', desc: 'Sélectionnez le type de nettoyage et remplissez les détails de votre demande.' },
              { step: '2', title: 'Recevez des offres', desc: 'Des professionnels qualifiés vous envoient leurs propositions et tarifs.' },
              { step: '3', title: 'Profitez du résultat', desc: 'Choisissez le meilleur professionnel et profitez d\'un espace impeccable.' },
            ].map(({ step, title, desc }) => (
              <motion.div key={step} variants={fadeUp} className="text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-2">Nos avantages</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900">Pourquoi choisir CleanHome ?</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FaUserCheck, title: 'Professionnels vérifiés', desc: 'Chaque nettoyeur est vérifié et certifié pour garantir un service de qualité.', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
              { icon: FaStar, title: 'Avis et notations', desc: 'Consultez les évaluations pour choisir le professionnel idéal.', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
              { icon: FaCalendarAlt, title: 'Réservation flexible', desc: 'Réservez aux horaires qui vous conviennent, 7j/7.', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
              { icon: FaShieldAlt, title: 'Paiement sécurisé', desc: 'Transactions protégées avec garantie satisfaction.', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
              { icon: FaClock, title: 'Gain de temps', desc: 'Trouvez un professionnel en quelques minutes.', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
              { icon: FaMoneyBillWave, title: 'Tarifs transparents', desc: 'Aucun frais caché, prix connu avant réservation.', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
            ].map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
              <motion.div key={title} variants={fadeUp} whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`text-xl ${iconColor}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à commencer ?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Rejoignez des milliers de clients satisfaits et trouvez votre professionnel.
            </motion.p>
            {!user && (
              <>
                <motion.div variants={fadeUp}>
                  <Link to="/register" className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl">
                    Créer un compte <FaArrowRight />
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-blue-200">
                  <span className="flex items-center gap-1"><FaCheckCircle /> Inscription gratuite</span>
                  <span className="flex items-center gap-1"><FaCheckCircle /> Sans engagement</span>
                  <span className="flex items-center gap-1"><FaCheckCircle /> Support 24/7</span>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
