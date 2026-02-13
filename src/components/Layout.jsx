import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const pages = [
  { path: '/', name: 'Welcome', number: 1 },
  { path: '/reasons', name: 'Reasons', number: 2 },
  { path: '/letter', name: 'Letter', number: 3 },
  { path: '/question', name: 'Question', number: 4 },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const currentPageIndex = pages.findIndex((p) => p.path === location.pathname);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handlePlayMusic = () => {
      audioRef.current.play().catch(err => console.log("User interaction required", err));
      setIsPlaying(true);
    };

    window.addEventListener('play-music', handlePlayMusic);
    return () => window.removeEventListener('play-music', handlePlayMusic);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-soft-pink">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            {pages.map((page, index) => (
              <div
                key={page.path}
                className={`flex-1 h-1 mx-1 rounded-full transition-all duration-300 ${index <= currentPageIndex ? 'bg-crimson' : 'bg-gray-200'
                  }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            {pages.map((page) => (
              <span
                key={page.path}
                className={location.pathname === page.path ? 'text-crimson font-semibold' : ''}
              >
                {page.number}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Music Toggle */}
      <div className="fixed top-20 right-6 z-50">
        <motion.button
          onClick={toggleMusic}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 ${isPlaying ? 'bg-crimson text-white' : 'bg-white/90 text-crimson'
            }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zm13.364-5.228A4.992 4.992 0 0015.536 8.464m2.828-9.9a9 9 0 010 12.728" />
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </motion.button>
        <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
        <div className="flex gap-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-xl border border-soft-pink justify-center">
          {currentPageIndex > 0 && (
            <Link
              to={pages[currentPageIndex - 1].path}
              className="px-6 py-3 text-crimson hover:bg-soft-pink rounded-full transition-all duration-300 font-medium text-sm md:text-base"
            >
              ← Back
            </Link>
          )}
          {currentPageIndex < pages.length - 1 && currentPageIndex !== 0 && (
            <Link
              to={pages[currentPageIndex + 1].path}
              className="px-8 py-3 bg-crimson text-white hover:bg-bright-red rounded-full transition-all duration-300 flex items-center gap-2 font-medium shadow-lg text-sm md:text-base"
            >
              Next →
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-24">{children}</main>
    </div>
  );
};

export default Layout;
