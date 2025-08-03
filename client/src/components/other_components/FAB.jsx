import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingFab() {
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    { label: 'M', onClick: () => alert('M clicked') },
    { label: 'W', onClick: () => alert('W clicked') },
    { label: 'S', onClick: () => alert('S clicked') },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <div className="relative">
        <AnimatePresence>
          {isOpen &&
            buttons.map((btn, i) => (
              <motion.button
                key={btn.label}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -(i + 1) * 70 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  delay: i * 0.05,
                }}
                className="absolute right-0 w-12 h-12 rounded-full bg-green-400 text-white font-bold shadow-lg"
                onClick={btn.onClick}
              >
                {btn.label}
              </motion.button>
            ))}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-purple-600 text-white text-2xl font-bold shadow-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}
