import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import FullPageLoader from './components/FullPageLoader';
import MobileNav from './components/MobileNav';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Compare from './pages/Compare';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Watchlist from './pages/Watchlist';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen bg-cinema-black text-white transition-colors duration-300">
      {loading ? <FullPageLoader onComplete={finishLoading} /> : null}
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <MobileNav />
      <BackToTop />
    </div>
  );
}

export default App;
