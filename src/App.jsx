import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import FullPageLoader from './components/FullPageLoader';
import MobileNav from './components/MobileNav';
import Navbar from './components/Navbar';
import ParallaxGlow from './components/ParallaxGlow';
import ScrollProgress from './components/ScrollProgress';
import SmoothScroll from './components/SmoothScroll';
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
      <SmoothScroll />
      <ParallaxGlow />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -24, filter: 'blur(12px)' }}
          initial={{ opacity: 0, y: 32, filter: 'blur(16px)' }}
          key={location.pathname}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
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
        </motion.div>
      </AnimatePresence>
      <Footer />
      <MobileNav />
      <BackToTop />
    </div>
  );
}

export default App;
