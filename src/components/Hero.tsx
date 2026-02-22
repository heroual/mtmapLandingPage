import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import ThreeMapBackground from './ThreeMapBackground';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0B0B0F]">
      {/* Three.js Background */}
      <ThreeMapBackground />

      {/* Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 backdrop-blur-sm"
        >
          <span className="text-brand text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            Souveraineté Numérique & Performance
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight mb-6"
        >
          MTMAP-FO : La Plateforme <br />
          <span className="text-brand text-glow-red">Décisionnelle Intelligente</span> <br />
          pour le FTTH au Maroc
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Visualisez. Analysez. Décidez. <br />
          Transformez votre réseau fibre en un Digital Twin stratégique pour une performance opérationnelle inégalée sur tout le territoire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button className="w-full sm:w-auto bg-brand hover:bg-brand/90 text-white px-8 py-4 rounded-md text-lg font-bold transition-all hover:scale-105 active:scale-95 glow-red flex items-center justify-center gap-2">
            Demander une Démonstration
            <span className="text-xl">›</span>
          </button>
          <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-md text-lg font-bold transition-all backdrop-blur-sm flex items-center justify-center gap-2">
            Découvrir la solution
            <span className="text-xl">›</span>
          </button>
        </motion.div>

        {/* Video Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="relative max-w-5xl mx-auto group"
        >
          <div className="absolute -inset-1 bg-brand/30 rounded-2xl blur-2xl group-hover:bg-brand/40 transition-all duration-500" />
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden border border-brand/50 bg-[#0a0a0a] backdrop-blur-xl shadow-[0_0_30px_rgba(225,6,0,0.3)]">
            
            {/* Inner Map Image for Video Thumbnail */}
            <div 
              className="absolute inset-0 opacity-40 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/2/2c/Morocco_location_map.svg")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'invert(1) sepia(1) hue-rotate(315deg) saturate(500%) brightness(0.8)'
              }}
            />
            
            {/* Simulated Nodes on Video Thumbnail */}
            <div className="absolute inset-0">
               <div className="absolute top-[45%] left-[45%] w-3 h-3 bg-brand rounded-full shadow-[0_0_15px_#E10600]" />
               <div className="absolute top-[35%] left-[55%] w-2 h-2 bg-brand rounded-full shadow-[0_0_10px_#E10600]" />
               <div className="absolute top-[65%] left-[35%] w-2 h-2 bg-brand rounded-full shadow-[0_0_10px_#E10600]" />
               
               {/* Connecting lines */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                 <line x1="45%" y1="45%" x2="55%" y2="35%" stroke="#E10600" strokeWidth="1" />
                 <line x1="45%" y1="45%" x2="35%" y2="65%" stroke="#E10600" strokeWidth="1" />
               </svg>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
              <button className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-[0_0_20px_rgba(225,6,0,0.8)] group/play">
                <Play className="fill-current w-6 h-6 ml-1" />
              </button>
            </div>
            
            {/* UI Overlays */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-brand uppercase tracking-widest">
              MOROCCO NETWORK: ACTIVE
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-1">
               <div className="w-1 h-3 bg-brand animate-pulse" />
               <div className="w-1 h-4 bg-brand animate-pulse delay-75" />
               <div className="w-1 h-2 bg-brand animate-pulse delay-150" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

