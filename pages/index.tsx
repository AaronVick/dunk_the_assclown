import { useState } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const startGame = async () => {
    setLoading(true);
    try {
      // Simulate wallet transaction and redirect to the Throw page
      // Handle wallet transaction here (mocked for now)
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/throw');
    } catch (error) {
      console.error('Transaction failed', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/dunk_splash.jpeg" alt="Dunk the Assclown" style={{ maxWidth: '100%' }} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={startGame} disabled={loading}>
          {loading ? 'Processing...' : 'Play Now'}
        </button>
      </div>
    </div>
  );
}
