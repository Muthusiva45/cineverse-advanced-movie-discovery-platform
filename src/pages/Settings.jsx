import { motion } from 'framer-motion';
import { FiDownload, FiMoon, FiSettings, FiSun } from 'react-icons/fi';
import PageTitle from '../components/PageTitle';
import StatCard from '../components/StatCard';
import { useFavorites } from '../context/FavoritesContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useWatchlist } from '../context/WatchlistContext';
import { downloadJson } from '../utils/downloadData';

function Settings() {
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
    <motion.main
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto min-h-screen max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-10"
      exit={{ opacity: 0, y: 12 }}
      initial={{ opacity: 0, y: 12 }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-cinema-red">Control Room</p>
      <PageTitle>Settings</PageTitle>
      <p className="mt-4 max-w-2xl text-cinema-muted">
        Tune the interface, switch the white/dark theme, and download your local CineVerse library.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <section className="glass-panel rounded-lg p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-cinema-red/15 text-cinema-red">
              <FiSettings />
            </span>
            <div>
              <h2 className="text-xl font-black text-white">Appearance</h2>
              <p className="mt-2 text-sm leading-6 text-cinema-muted">
                Current mode: {theme === 'light' ? 'Clean White' : 'Cinematic Dark'}.
              </p>
            </div>
          </div>
          <button
            className="magnetic-button mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-cinema-red px-5 font-extrabold text-white"
            onClick={toggleTheme}
            type="button"
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to White Mode'}
          </button>
        </section>

        <section className="glass-panel rounded-lg p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-cinema-red/15 text-cinema-red">
              <FiDownload />
            </span>
            <div>
              <h2 className="text-xl font-black text-white">Downloads</h2>
              <p className="mt-2 text-sm leading-6 text-cinema-muted">
                Export watchlist, favorites, recently viewed movies, and theme preference as JSON.
              </p>
            </div>
          </div>
          <button
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 font-extrabold text-white transition hover:bg-cinema-red"
            onClick={exportData}
            type="button"
          >
            <FiDownload />
            Download Library
          </button>
        </section>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon={FiDownload} label="Watchlist" value={watchlist.length} helper="Saved movies included in export." />
        <StatCard icon={FiDownload} label="Favorites" value={favorites.length} helper="Favorites included in export." />
        <StatCard icon={FiDownload} label="Recently Viewed" value={recentlyViewed.length} helper="Recent history included in export." />
      </div>
    </motion.main>
  );
}

export default Settings;
