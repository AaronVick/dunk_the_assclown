import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DunkedPage() {
  const router = useRouter();

  const handleShare = () => {
    const shareText = encodeURIComponent(`I just dunked the clown in DUNK the ASSCLOWN! Play now!`);
    const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL)}`;
    window.open(shareLink, '_blank');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/dunked.jpeg" alt="Dunked!" style={{ maxWidth: '100%' }} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => router.push('/')}>Play Again</button>
        <button onClick={handleShare} style={{ marginLeft: '10px' }}>Share</button>
      </div>
    </div>
  );
}
