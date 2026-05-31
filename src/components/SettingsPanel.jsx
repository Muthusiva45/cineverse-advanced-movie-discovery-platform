import { AnimatePresence, motion } from 'framer-motion';
import { FiDownload, FiMoon, FiSettings, FiSun, FiX } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useWatchlist } from '../context/WatchlistContext';
import { downloadJson } from '../utils/downloadData';

function SettingsPanel({ open, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const { watchlist } = useWatchlist();
  const { favorites } = useFavorites();
  const { recentlyViewed } = useRecentlyViewed();
  const toast = useToast();

  const exportData = () => {
    downloadJson('cineverse-library.json', {
      exportedAt: new Date().toISOString(),
      theme,
      watchlist,
      favorites,
      recentlyViewed,
    });
    toast?.showToast('CineVerse data downloaded');
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[85] bg-black/55 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            animate={{ x: 0 }}
            className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-cinema-panel p-5 shadow-cinematic"
            exit={{ x: '100%' }}
            initial={{ x: '100%' }}
            onClick={(event) => event.stopPropagation()}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cinema-red">Control Room</p>
                <h2 className="mt-2 text-2xl font-black text-white">Settings</h2>
              </div>
              <button
                aria-label="Close settings"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-cinema-red"
                onClick={onClose}
                type="button"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-8 grid gap-4">
              <section className="glass-panel rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-cinema-red/15 text-cinema-red">
                    <FiSettings />
                  </span>
                  <div>
                    <h3 className="font-black text-white">Appearance</h3>
                    <p className="mt-1 text-sm text-cinema-muted">
                      Switch between the cinematic dark UI and a clean white studio mode.
                    </p>
                  </div>
                </div>
                <button
                  className="magnetic-button mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-cinema-red px-4 font-extrabold text-white"
                  onClick={toggleTheme}
                  type="button"
                >
                  {theme === 'light' ? <FiMoon /> : <FiSun />}
                  {theme === 'light' ? 'Use Dark Mode' : 'Use White Mode'}
                </button>
              </section>

              <section className="glass-panel rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-cinema-red/15 text-cinema-red">
                    <FiDownload />
                  </span>
                  <div>
                    <h3 className="font-black text-white">Downloads</h3>
                    <p className="mt-1 text-sm text-cinema-muted">
                      Export your watchlist, favorites, recently viewed movies, and theme preference as JSON.
                    </p>
                  </div>
                </div>
                <button
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 font-extrabold text-white transition hover:border-cinema-red hover:bg-cinema-red"
                  onClick={exportData}
                  type="button"
                >
                  <FiDownload />
                  Download Library
                </button>
              </section>

              <section className="glass-panel rounded-lg p-4">
                <h3 className="font-black text-white">Local Library</h3>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-2xl font-black text-white">{watchlist.length}</p>
                    <p className="mt-1 text-xs text-cinema-muted">Watchlist</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-2xl font-black text-white">{favorites.length}</p>
                    <p className="mt-1 text-xs text-cinema-muted">Favorites</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-2xl font-black text-white">{recentlyViewed.length}</p>
                    <p className="mt-1 text-xs text-cinema-muted">Recent</p>
                  </div>
                </div>
              </section>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default SettingsPanel;
