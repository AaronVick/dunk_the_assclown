import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ThrowPage() {
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const router = useRouter();

  useEffect(() => {
    console.log('Starting new throw session. Attempts left:', attemptsLeft);
  }, [attemptsLeft]);

  const handleThrowBall = async () => {
    try {
      // Simulate the weighted probability for a dunk (33% chance)
      const hitTarget = Math.random() < 0.33;
      console.log('Throw result:', hitTarget ? 'Dunked' : 'Missed');

      if (hitTarget) {
        router.push('/dunked');
      } else if (attemptsLeft > 1) {
        console.log('Missed the target. Updating attempts.');
        setAttemptsLeft(attemptsLeft - 1);
      } else {
        console.log('Last attempt missed. Game over.');
        router.push('/game-over');
      }
    } catch (error) {
      console.error('Error during the throw action:', error);
      alert('An error occurred while processing your throw. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/game_screen.jpeg" alt="Game Screen" style={{ maxWidth: '100%' }} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleThrowBall}>
          {attemptsLeft > 1 ? `Throw Again (${attemptsLeft} left)` : 'Last Attempt'}
        </button>
      </div>
    </div>
  );
}
