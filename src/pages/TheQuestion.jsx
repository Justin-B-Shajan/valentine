import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import ConfettiEffect from '../components/ConfettiEffect';
import { submitResponse } from '../utils/formService';

const TheQuestion = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

  const noMessages = [
    "No",
    "Are you sure? 🥺",
    "Think again! 🧐",
    "Thangam please... ❤️",
    "Don't do this to me! 😭",
    "I'll be very sad... 💔",
    "Pretty please? 🙏",
    "Change your mind? ✨",
    "Last chance! 🌹"
  ];

  const handleYesClick = async () => {
    setShowConfetti(true);
    setIsSubmitting(true);

    const newHearts = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.8,
      size: Math.random() * 30 + 20,
    }));
    setHearts(newHearts);

    try {
      await submitResponse({
        response: 'YES!',
        message: 'She said YES! To the rest of our lives! 💕',
        noAttempts: noCount
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      setSubmitted(true); // Still show success UI
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveNoButton = useCallback(() => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    setNoButtonPos({ x, y });
    setNoCount(prev => (prev + 1) % noMessages.length);
  }, [noMessages.length]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      <ConfettiEffect trigger={showConfetti} duration={10000} />

      {/* Deep Romantic Background */}
      <div className="absolute inset-0 bg-[#0a0506]" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#1a0a0d] via-[#4a0e1c] to-[#0a0506] opacity-80"
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Sparkles & Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Heart Explosion */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
            zIndex: 50
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [1, 1, 0],
            y: [-20, -150],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2.5,
            delay: heart.delay,
            ease: 'easeOut',
          }}
        >
          {['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="question"
            className="relative z-10 w-full max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
          >
            <div className="glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-[-20px_-20px_60px_rgba(255,255,255,0.05),20px_20px_60px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-2xl text-center relative overflow-hidden">
              {/* Decorative Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-crimson to-transparent opacity-50" />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-5xl md:text-8xl mb-8 md:mb-12">💍</div>
                <h1 className="text-4xl md:text-7xl font-display text-white mb-6 md:mb-8 leading-tight tracking-tight px-2">
                  So... <br />
                  <span className="text-crimson bg-clip-text text-transparent bg-gradient-to-r from-crimson to-bright-red">
                    Will You Be Mine
                  </span>
                  <br />
                  Forever?
                </h1>

                <p className="text-lg md:text-2xl text-soft-pink/80 mb-10 md:mb-16 font-body italic px-4">
                  "Every love story is beautiful, but ours is my favorite."
                </p>

                <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center relative h-40 md:h-auto">
                  <motion.button
                    onClick={handleYesClick}
                    disabled={isSubmitting}
                    className="group relative px-10 md:px-16 py-4 md:py-6 bg-crimson text-white text-xl md:text-3xl font-display rounded-full shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:shadow-[0_0_50px_rgba(220,20,60,0.8)] transition-all duration-300 min-w-[200px] md:min-w-[220px]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{isSubmitting ? 'Sending...' : 'YES! ❤️'}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-bright-red to-dark-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.button>

                  <motion.button
                    animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    className="px-8 md:px-12 py-3 md:py-5 bg-white/5 hover:bg-white/10 text-white/50 text-base md:text-xl font-body rounded-full border border-white/10 transition-colors duration-300 min-w-[150px] md:min-w-[180px]"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {noMessages[noCount]}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="relative z-10 text-center max-w-4xl w-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          >
            <div className="glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 border border-crimson/20 shadow-[0_0_100px_rgba(220,20,60,0.2)]">
              <motion.div
                className="relative mx-auto mb-6 md:mb-12 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center p-2 bg-white rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                  <img
                    src="/Final.jpeg"
                    alt="Success"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <h1 className="text-4xl md:text-8xl font-display text-white mb-6 md:mb-8 text-shadow leading-tight">
                I Knew You'd Say <br />
                <span className="text-crimson">Yes!</span>
              </h1>

              <p className="text-xl md:text-4xl text-soft-pink font-body mb-8 md:mb-12 animate-pulse px-4">
                You've made me the happiest man alive! ❤️
              </p>

              <div className="flex justify-center gap-4">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-4xl"
                    animate={{
                      y: [0, -20, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    💖
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TheQuestion;

