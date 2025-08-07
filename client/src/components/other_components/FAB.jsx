import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function FloatingFab({setActivePopup, scrollToHeroSection, openPlayGround }) {
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef(null);

  const buttons = [
    { label: 'Home', img: '/assets/img/btn/home.png', 
      onClick: () => 
      {
        setActivePopup(null);
        scrollToHeroSection();
        setIsOpen(false);
      }
      },

    { label: 'Playground', img: '/assets/img/btn/playground_btn_1.png', 
      onClick: () => {
        openPlayGround()
        setIsOpen(false)} },

    { label: 'Badges', img: '/assets/img/btn/badge.png', 
      onClick: () => {
        setActivePopup('badges');
        setIsOpen(false);
        
      } },

    { label: 'Leaderboard', img: '/assets/img/btn/b_trophy.png', 
      onClick: () => {
        setActivePopup('leaderboard')
        setIsOpen(false)
      } },
    { label: 'Voucher', img: '/assets/img/btn/voucher_btn.png', onClick: () => {
        setActivePopup('voucher');
        setIsOpen(false);
      } },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fabRef.current && !fabRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={fabRef} className="fixed bottom-6 right-6 z-[1000]">
      <div className="relative">
        <AnimatePresence>
          {isOpen &&
            buttons.map((btn, i) => (
              <motion.div
                key={btn.img}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -(i + 1) * 70 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  delay: i * 0.05,
                }}
                className="absolute right-15 flex items-center space-x-2"
                onClick={btn.onClick}
              >
                {/* Label */}
                <span className='text-sky-700 font-semibold font-outfit  bg-white/95 opacity-90 px-2 py-1 rounded-md text-sm shadow-xl'> {btn.label} </span>

                <img src={btn.img} alt="btn-icon" className="w-16 h-16 shadow-xl" />

              </motion.div>
            ))}
        </AnimatePresence>

        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-900 text-white shadow-inner shadow-blue-200 
             hover:animate-jello-horizontal relative flex items-center justify-center border-none  shadow-2xl
             "
        >
          <div className="">
            <AnimatePresence mode='wait'>
              {isOpen ? (
                <motion.img
                  key="close"
                  src="/assets/img/btn/close.png"
                  alt="close"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0 w-full h-full shadow-xl"
                />
              ) : (
                <motion.img
                  key="open"
                  src="/assets/img/btn/fab_bl.png"
                  alt="open"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0 w-full h-full shadow-xl"
                />
              )

              }
            </AnimatePresence>
          </div>


          <img src={isOpen ? "/assets/img/btn/close.png" : "/assets/img/btn/fab_bl.png"}
            alt="FAB-icon"
            className='' />


          {/* {isOpen ? 
          '×' : '+'} */}

          <span className="absolute top-1 w-2/3 h-0.5 bg-white/70 blur-sm rounded-full"></span>
          <span className="absolute bottom-1 w-2/3 h-0.5 bg-white/20 blur-sm rounded-full"></span>
        </button>

      </div>
    </div>
  );
}
