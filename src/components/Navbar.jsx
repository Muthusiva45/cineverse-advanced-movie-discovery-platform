import { useEffect, useRef, useState } from 'react';
import { FiDownload, FiHeart, FiMenu, FiSearch, FiSettings, FiSun, FiX } from 'react-icons/fi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useWatchlist } from '../context/WatchlistContext';
import { downloadJson } from '../utils/downloadData';
import SearchBar from './SearchBar';
import SettingsPanel from './SettingsPanel';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Search', to: '/search' },
  { label: 'Watchlist', to: '/watchlist' },
  { label: 'Favorites', to: '/favorites' },
  { label: 'Compare', to: '/compare' },
  { label: 'Dashboard', to: '/dashboard' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const actionGuardRef = useRef(0);
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const { favorites } = useFavorites();
  const { recentlyViewed } = useRecentlyViewed();
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

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

  const handlePointerAction = (event, action) => {
    const now = Date.now();
    if (now - actionGuardRef.current < 220) return;
    actionGuardRef.current = now;
    event.preventDefault();
    action();
  };

  return (
    <>
      <header
        className={`site-header fixed left-0 right-0 top-0 z-50 transition duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-cinema-black/82 shadow-2xl backdrop-blur-xl'
            : 'bg-gradient-to-b from-black/75 to-transparent'
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <Link className="brand-mark shrink-0 text-2xl font-black tracking-tight text-white" to="/">
            Cine<span className="text-cinema-red">Verse</span>
          </Link>

          <div className="hidden items-center gap-5 md:flex lg:gap-6">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link text-sm font-semibold transition hover:text-white ${
                    isActive ? 'text-white' : 'text-cinema-muted'
                  }`
                }
                key={item.label}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <SearchBar compact onChange={setQuery} onSubmit={submitSearch} value={query} />
            <button
              aria-label="Toggle theme"
              className="nav-action grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cinema-red hover:text-cinema-red"
              onPointerDown={(event) => handlePointerAction(event, toggleTheme)}
              onMouseDown={(event) => handlePointerAction(event, toggleTheme)}
              type="button"
            >
              <FiSun />
            </button>
            <button
              aria-label="Download library"
              className="nav-action grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cinema-red hover:text-cinema-red"
              onPointerDown={(event) => handlePointerAction(event, exportData)}
              onMouseDown={(event) => handlePointerAction(event, exportData)}
              type="button"
            >
              <FiDownload />
            </button>
            <button
              aria-label="Open settings"
              className="nav-action grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cinema-red hover:text-cinema-red"
              onPointerDown={(event) => handlePointerAction(event, () => setSettingsOpen(true))}
              onMouseDown={(event) => handlePointerAction(event, () => setSettingsOpen(true))}
              type="button"
            >
              <FiSettings />
            </button>
            <Link
              aria-label="Favorites"
              className="nav-action relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cinema-red hover:text-cinema-red"
              to="/favorites"
            >
              <FiHeart />
              {favorites.length ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cinema-red px-1 text-[10px] font-black text-white">
                  {favorites.length}
                </span>
              ) : null}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              aria-label="Open search"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5"
              onClick={() => navigate('/search')}
              type="button"
            >
              <FiSearch />
            </button>
            <button
              aria-label="Toggle navigation"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {open ? (
          <div className="border-t border-white/10 bg-cinema-black/95 px-4 py-5 backdrop-blur-xl md:hidden">
            <div className="mb-4">
              <SearchBar onChange={setQuery} onSubmit={submitSearch} value={query} />
            </div>
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  className="rounded-md px-3 py-3 font-semibold text-cinema-muted transition hover:bg-white/5 hover:text-white"
                  key={item.label}
                  onClick={() => setOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </Link>
              ))}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <Link
                  className="rounded-md border border-white/10 px-3 py-3 text-center font-bold text-white"
                  onClick={() => setOpen(false)}
                  to="/settings"
                >
                  Theme
                </Link>
                <Link
                  className="rounded-md border border-white/10 px-3 py-3 text-center font-bold text-white"
                  onClick={() => setOpen(false)}
                  to="/settings"
                >
                  Download
                </Link>
                <Link
                  className="rounded-md border border-white/10 px-3 py-3 text-center font-bold text-white"
                  onClick={() => setOpen(false)}
                  to="/settings"
                >
                  Settings
                </Link>
              </div>
              <p className="px-3 pt-3 text-sm text-cinema-muted">
                {watchlist.length} in watchlist - {favorites.length} favorites
              </p>
            </div>
          </div>
        ) : null}
      </header>
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

export default Navbar;
