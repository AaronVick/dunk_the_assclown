import { useRouter } from 'next/router';

export default function GameOver() {
  const router = useRouter();

  const shareText = encodeURIComponent('I just dunked the clown!\n\nJoin me in Dunk the Assclown!');
  const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL)}`;

  const handleError = (message: string) => {
    console.error('Game over error:', message);
    alert('Something went wrong. Please try again.');
  };

  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={() => router.push('/')}>Play Again</button>
      <button
        onClick={() => {
          try {
            window.location.href = shareLink;
          } catch (error) {
            handleError('Share link failed');
          }
        }}
      >
        Share on Farcaster
      </button>
    </div>
  );
}
