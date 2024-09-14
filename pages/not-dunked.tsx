import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NotDunkedPage({ attemptsLeft = 0 }) {
  const router = useRouter();

  useEffect(() => {
    console.log('Player missed the dunk. Remaining attempts:', attemptsLeft);
  }, [attemptsLeft]);

  const handleThrowAgain = async () => {
    try {
      console.log(`Attempting another throw. Attempts left: ${attemptsLeft}`);
      if (attemptsLeft > 0) {
        router.push('/throw');
      } else {
        console.log('No attempts left. Navigating to game over.');
        router.push('/game-over');
      }
    } catch (error) {
      console.error('Error navigating to next attempt:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/notdunked.jpeg" alt="Not Dunked" style={{ maxWidth: '100%' }} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleThrowAgain}>
          {attemptsLeft > 0 ? `Throw Again (${attemptsLeft} left)` : 'Game Over'}
        </button>
      </div>
    </div>
  );
}
