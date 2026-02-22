import { motion } from 'motion/react';
import { ArrowRight, User, Globe, Server, Database, Shield } from 'lucide-react';

export const Architecture = () => {
  return (
    <section id="security" className="py-24 bg-black/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Sécurité & Architecture</h2>
          <p className="text-white/50">Une infrastructure robuste, scalable et hautement sécurisée.</p>
        </div>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent hidden lg:block" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {[
              { icon: <User />, label: "Utilisateur", sub: "Interface Web" },
              { icon: <Globe />, label: "Frontend", sub: "React / Vite" },
              { icon: <Server />, label: "API", sub: "Node.js / Express" },
              { icon: <Database />, label: "PostgreSQL", sub: "PostGIS SIG" },
              { icon: <Shield />, label: "RLS", sub: "Sécurité Native" }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-20 h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-brand mb-4 glow-red group-hover:border-brand/50 transition-all"
                >
                  {step.icon}
                </motion.div>
                <div className="text-center">
                  <div className="font-bold text-sm">{step.label}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">{step.sub}</div>
                </div>
                {idx < 4 && (
                  <div className="lg:hidden my-4 text-brand/30">
                    <ArrowRight className="rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 p-8 rounded-2xl bg-brand/5 border border-brand/20 text-center max-w-3xl mx-auto">
          <p className="text-white/70 italic">
            "Notre architecture est conçue pour supporter des millions d'objets réseau avec une latence minimale, tout en garantissant une isolation stricte des données par client."
          </p>
        </div>
      </div>
    </section>
  );
};
