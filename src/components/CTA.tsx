import { motion } from 'motion/react';

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand/10 blur-3xl rounded-full -translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black font-display mb-8"
        >
          Prêt à transformer votre <br />
          <span className="text-brand">gestion réseau ?</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg mb-12"
        >
          Rejoignez les leaders des télécoms qui utilisent MTMAP-FO pour piloter leur déploiement FTTH avec une efficacité sans précédent.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="w-full sm:w-auto bg-brand hover:bg-brand/90 text-white px-12 py-5 rounded-full text-xl font-bold transition-all hover:scale-105 active:scale-95 glow-red">
            Demander une Présentation
          </button>
          <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-12 py-5 rounded-full text-xl font-bold transition-all">
            Nous Contacter
          </button>
        </motion.div>
      </div>
    </section>
  );
};
