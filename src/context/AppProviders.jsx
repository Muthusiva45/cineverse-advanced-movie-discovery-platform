import { FavoritesProvider } from './FavoritesContext';
import { RecentlyViewedProvider } from './RecentlyViewedContext';
import { ThemeProvider } from './ThemeContext';
import { ToastProvider } from './ToastContext';
import { WatchlistProvider } from './WatchlistContext';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WatchlistProvider>
          <FavoritesProvider>
            <RecentlyViewedProvider>{children}</RecentlyViewedProvider>
          </FavoritesProvider>
        </WatchlistProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
