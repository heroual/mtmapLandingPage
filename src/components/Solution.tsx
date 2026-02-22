import { motion } from 'motion/react';
import { Map, Zap, Route, LayoutDashboard, Cpu, History, ShieldCheck, Network } from 'lucide-react';

const solutions = [
  {
    icon: <Map />,
    title: "Carte Réseau Dynamique SIG",
    desc: "Visualisation géographique précise de l'ensemble de votre infrastructure fibre."
  },
  {
    icon: <Zap />,
    title: "Étude de Faisabilité Instantanée",
    desc: "Algorithmes de calcul automatique pour valider vos projets en quelques secondes."
  },
  {
    icon: <Route />,
    title: "Visualisation Chemin Optique Complet",
    desc: "Traçabilité de bout en bout, du NRO jusqu'à la prise terminale optique (PTO)."
  },
  {
    icon: <LayoutDashboard />,
    title: "Dashboard Décisionnel",
    desc: "Indicateurs clés de performance (KPI) pour un pilotage stratégique en temps réel."
  },
  {
    icon: <Network />,
    title: "Gestion intelligente des capacités",
    desc: "Optimisation de l'occupation des fourreaux et des boîtiers d'épissure."
  },
  {
    icon: <Cpu />,
    title: "Module AI prédictif",
    desc: "Anticipation des besoins de maintenance et des zones de saturation future."
  },
  {
    icon: <History />,
    title: "Historisation & Audit",
    desc: "Suivi complet des modifications pour une conformité et une traçabilité totale."
  },
  {
    icon: <ShieldCheck />,
    title: "Rôles sécurisés (RLS)",
    desc: "Gestion fine des accès basée sur les rôles pour une sécurité maximale des données."
  }
];

export const Solution = () => {
  return (
    <section id="solution" className="py-24 bg-white/[0.02] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-display mb-6"
          >
            MTMAP-FO : Le Digital Twin FTTH
          </motion.h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Une suite d'outils intégrés pour une maîtrise totale de votre cycle de vie réseau.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-black/40 border border-white/5 hover:border-brand/30 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-brand mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-glow-red transition-all">
                {item.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
