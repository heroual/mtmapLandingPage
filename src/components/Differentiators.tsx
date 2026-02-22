import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const diffs = [
  "Digital Twin complet",
  "Intelligence décisionnelle intégrée",
  "Validation hiérarchique automatique",
  "Architecture scalable nationale",
  "AI assistance réseau",
  "Optimisé performance terrain"
];

export const Differentiators = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">
              Pourquoi MTMAP est <span className="text-brand">unique</span> ?
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Plus qu'un simple SIG, MTMAP-FO est une plateforme de pilotage qui unifie les aspects techniques, commerciaux et financiers de vos déploiements fibre.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {diffs.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle2 className="text-brand w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand/10 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-2">
              <img
                src="https://picsum.photos/seed/mtmap-unique/800/600"
                alt="MTMAP Unique Features"
                className="rounded-xl opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-white/50">System Intelligence Active</span>
                </div>
                <p className="text-sm font-medium italic text-white/80">
                  "L'automatisation des processus de validation a réduit nos délais de mise en service de 25%."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
