import { motion } from 'motion/react';
import { Users, Building2, HardHat, Briefcase, BarChart3 } from 'lucide-react';

const targets = [
  { icon: <Building2 />, title: "Opérateurs Télécom", desc: "Gérez vos infrastructures nationales avec une précision chirurgicale." },
  { icon: <HardHat />, title: "Bureaux d’Études", desc: "Optimisez vos conceptions et accélérez vos livrables techniques." },
  { icon: <Briefcase />, title: "Directions Techniques", desc: "Pilotez la maintenance et l'évolution de votre réseau Digital Twin." },
  { icon: <BarChart3 />, title: "Directions Commerciales", desc: "Visualisez l'éligibilité et planifiez vos ouvertures de services." },
  { icon: <Users />, title: "Décideurs stratégiques", desc: "Transformez vos données réseau en leviers de croissance business." }
];

export const Target = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Pour qui ?</h2>
          <p className="text-white/50">Une solution adaptée à tous les acteurs de la chaîne de valeur FTTH.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {targets.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 text-center group hover:bg-brand/10 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center text-brand mx-auto mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
