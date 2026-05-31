import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';

function Toast({ toasts }) {
  return (
    <div className="fixed right-4 top-24 z-[90] grid w-[calc(100%-2rem)] max-w-sm gap-3 sm:right-6">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className="glass-panel flex items-start gap-3 rounded-md p-4 text-sm text-white"
            exit={{ opacity: 0, x: 24, scale: 0.98 }}
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            key={toast.id}
          >
            {toast.type === 'info' ? (
              <FiInfo className="mt-0.5 shrink-0 text-cinema-muted" />
            ) : (
              <FiCheckCircle className="mt-0.5 shrink-0 text-cinema-red" />
            )}
            <p className="font-semibold">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Toast;
