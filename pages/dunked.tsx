import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

export default function Dunked() {
  const router = useRouter();

  // Simulate wallet interaction using ethers.js (or other library)
  const handleWalletInteraction = async () => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found');
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const transaction = await signer.sendTransaction({
        to: '0x1234...', // replace with the correct address
        value: ethers.utils.parseEther('0.5'), // 0.5 ETH equivalent
      });

      console.log('Transaction successful', transaction);
    } catch (error) {
      console.error('Wallet interaction failed', error);
    }
  };

  const shareText = encodeURIComponent('I dunked the clown!\n\nSee if you can do better.');
  const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL)}`;

  useEffect(() => {
    // Perform wallet interaction after dunking
    handleWalletInteraction();
  }, []);

  return (
    <div>
      <h1>Congrats! You Dunked the Clown!</h1>
      <button onClick={() => router.push('/')}>Play Again</button>
      <button onClick={() => window.location.href = shareLink}>Share on Farcaster</button>
    </div>
  );
}
