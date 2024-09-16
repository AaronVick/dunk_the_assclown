import { useRouter } from 'next/router';

export default function NotDunked() {
  const router = useRouter();

  const shareText = encodeURIComponent('I tried but couldn\'t dunk the clown. Can you do it?');
  const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL)}`;

  const handleLog = (action: string) => {
    console.log(`Action performed: ${action}`);
  };

  return (
    <div>
      <h1>Too Bad! You Couldn't Dunk the Clown</h1>
      <button
        onClick={() => {
          handleLog('Try Again');
          router.push('/');
        }}
      >
        Try Again
      </button>
      <button
        onClick={() => {
          handleLog('Share on Farcaster');
          window.location.href = shareLink;
        }}
      >
        Share on Farcaster
      </button>
    </div>
  );
}
