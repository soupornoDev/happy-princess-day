'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import MessageCard from '@/components/MessageCard';
import Confetti from '@/components/Confetti';
import { Toaster } from '@/lib/toast';

export default function Home() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    setShowConfetti(true);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleRestart = () => {
    setIsGiftOpened(false);
    setShowConfetti(false);
  };

  const toastOptions = {
    duration: 3000,
    style: {
      background: 'var(--primary)',
      color: 'var(--text)',
      borderRadius: '12px',
      padding: '12px 20px',
      fontSize: '14px',
    },
  };

  return (
    <>
      <main className="min-h-screen">
        {!isGiftOpened && (
          <Hero onOpenGift={handleOpenGift} isGiftOpened={isGiftOpened} />
        )}
        {isGiftOpened && (
          <MessageCard isRevealed={isGiftOpened} onRestart={handleRestart} />
        )}
        <Confetti trigger={showConfetti} onComplete={handleConfettiComplete} />

        <footer className="px-4 py-8 text-center text-text/60 relative z-50">
          <p className="text-sm">
            Happy Princess Day — {currentDate || 'Loading...'}
          </p>
          <p className="text-xs mt-2">Made with 💕 by Souporno Chakraborty</p>
        </footer>
      </main>

      <Toaster position="bottom-center" toastOptions={toastOptions} />
    </>
  );
}
