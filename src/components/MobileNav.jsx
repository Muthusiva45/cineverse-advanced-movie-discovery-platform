import { FiHeart, FiHome, FiSearch, FiSettings, FiShuffle } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const items = [
  { label: 'Home', to: '/', icon: FiHome },
  { label: 'Search', to: '/search', icon: FiSearch },
  { label: 'Saved', to: '/watchlist', icon: FiHeart },
  { label: 'Compare', to: '/compare', icon: FiShuffle },
  { label: 'Settings', to: '/settings', icon: FiSettings },
];

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-cinema-black/92 px-2 py-2 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              className={({ isActive }) =>
                `grid place-items-center gap-1 rounded-md px-1 py-2 text-[11px] font-bold transition ${
                  isActive ? 'bg-cinema-red text-white' : 'text-cinema-muted hover:bg-white/5 hover:text-white'
                }`
              }
              key={item.to}
              to={item.to}
            >
              <Icon className="text-lg" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;
