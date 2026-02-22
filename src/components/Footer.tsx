export const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-lg font-bold tracking-tighter font-display">
              MTMAP<span className="text-brand">-FO</span>
            </span>
          </div>

          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-brand transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-brand transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-brand transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="text-center text-xs text-white/20 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} MTMAP Solutions. Tous droits réservés. Plateforme Stratégique FTTH.
        </div>
      </div>
    </footer>
  );
};
