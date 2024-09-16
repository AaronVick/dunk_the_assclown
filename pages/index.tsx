import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  const shareText = encodeURIComponent('Get ready to dunk the clown in Dunk the Assclown!');
  const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL)}`;

  const logAction = (action: string) => {
    console.log(`Action performed: ${action}`);
  };

  return (
    <div>
      <h1>Welcome to Dunk the Assclown!</h1>
      <button
        onClick={() => {
          logAction('Start Playing');
          router.push('/play');
        }}
      >
        Start Playing
      </button>
      <button
        onClick={() => {
          logAction('Share on Farcaster');
          window.location.href = shareLink;
        }}
      >
        Share on Farcaster
      </button>
    </div>
  );
}
