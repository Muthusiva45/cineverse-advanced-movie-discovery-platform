import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BlurReveal from '../components/BlurReveal';
import PageTitle from '../components/PageTitle';

function NotFound() {
  return (
    <motion.main
      animate={{ opacity: 1 }}
      className="grid min-h-screen place-items-center px-4 pt-20 text-center"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <BlurReveal>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-cinema-red">404</p>
        <PageTitle>Scene not found</PageTitle>
        <p className="mt-4 max-w-lg text-cinema-muted">
          This route did not make the final cut. Head back to the main discovery feed.
        </p>
        <Link
          className="mt-8 inline-flex h-12 items-center rounded-md bg-cinema-red px-6 font-extrabold text-white transition hover:bg-red-700"
          to="/"
        >
          Back Home
        </Link>
      </BlurReveal>
    </motion.main>
  );
}

export default NotFound;
