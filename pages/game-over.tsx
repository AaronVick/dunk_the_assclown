import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function GameOverPage() {
  const [leaderboardImage, setLeaderboardImage] = useState('');

  useEffect(() => {
    const fetchLeaderboardImage = async () => {
      try {
        console.log('Fetching leaderboard image...');
        const res = await fetch('/api/leaderboard-og');
        if (res.ok) {
          const imageUrl = res.url;
          console.log('Leaderboard image fetched successfully:', imageUrl);
          setLeaderboardImage(imageUrl);
        } else {
          console.error('Failed to fetch leaderboard image.');
        }
      } catch (error) {
        console.error('Error fetching leaderboard image:', error);
      }
    };

    fetchLeaderboardImage();
  }, []);

  const handleShare = () => {
    try {
      const shareText = encodeURIComponent(`Check out the leaderboard in DUNK the ASSCLOWN!`);
      const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL)}`;
      console.log('Sharing on Farcaster with URL:', shareLink);
      window.open(shareLink, '_blank');
    } catch (error) {
      console.error('Error sharing on Farcaster:', error);
      alert('Unable to share the leaderboard. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Game Over</h1>
      {leaderboardImage ? (
        <img src={leaderboardImage} alt="Leaderboard" style={{ maxWidth: '100%' }} />
      ) : (
        <p>Loading leaderboard...</p>
      )}
      <div style={{ marginTop: '20px' }}>
        <Link href="/">
          <button>Play Again</button>
        </Link>
        <button onClick={handleShare} style={{ marginLeft: '10px' }}>Share</button>
      </div>
    </div>
  );
}
