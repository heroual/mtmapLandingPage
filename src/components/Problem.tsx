import { motion } from 'motion/react';
import { AlertCircle, Clock, Database, Layers, TrendingDown } from 'lucide-react';

const challenges = [
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Manque de visibilité réseau",
    desc: "Données fragmentées et absence de vision globale en temps réel sur l'état des infrastructures."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Études longues et imprécises",
    desc: "Processus manuels fastidieux entraînant des retards critiques dans le déploiement FTTH."
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Saturation non anticipée",
    desc: "Difficulté à prévoir la charge réseau, menant à des goulots d'étranglement imprévus."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Données dispersées",
    desc: "Multiplication des sources d'information sans synchronisation, source d'erreurs majeures."
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Absence de vision décisionnelle",
    desc: "Manque d'outils d'analyse pour transformer les données brutes en décisions stratégiques."
  }
];

export const Problem = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-display mb-6"
          >
            Les défis actuels des opérateurs FTTH
          </motion.h2>
          <div className="w-20 h-1 bg-brand mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-brand transition-colors">
                {item.title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
