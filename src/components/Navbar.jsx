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
        <nav className="mx-auto grid h-20 w-full max-w-[1760px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8 xl:px-10">
          <Link className="brand-mark flex min-w-0 shrink-0 items-center gap-3 text-white" to="/">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-cinema-red text-xl font-black shadow-glow">
              CV
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block whitespace-nowrap text-xl font-black tracking-tight 2xl:text-2xl">
                Cine<span className="text-cinema-red">Verse</span>
              </span>
              <span className="hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.28em] text-cinema-muted 2xl:block">
                Discover. Save. Compare.
              </span>
            </span>
            <span className="text-2xl font-black tracking-tight sm:hidden">
              Cine<span className="text-cinema-red">Verse</span>
            </span>
          </Link>

          <div className="hidden min-w-0 items-center justify-center gap-1 xl:flex 2xl:gap-2">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-semibold transition hover:text-white 2xl:text-sm ${
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

          <div className="hidden min-w-0 shrink-0 items-center gap-2 xl:flex">
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
              className="nav-action hidden h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cinema-red hover:text-cinema-red 2xl:grid"
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
              className="nav-action relative hidden h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cinema-red hover:text-cinema-red 2xl:grid"
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

          <div className="flex items-center justify-end gap-2 xl:hidden">
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
          <div className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/10 bg-cinema-black/95 px-4 py-5 backdrop-blur-xl xl:hidden">
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
