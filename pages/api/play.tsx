import { useState, useEffect } from 'react';
import { Button, Frog } from 'frog';

// Function to fetch the real-time crypto price (using CoinGecko API)
async function getCryptoPriceInUSD(tokenSymbol) {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol}&vs_currencies=usd`);
  const data = await response.json();
  return data[tokenSymbol].usd;
}

// Calculate the amount of crypto needed to pay 50 cents USD
async function calculateCryptoAmount(tokenSymbol) {
  const priceInUSD = await getCryptoPriceInUSD(tokenSymbol);
  const cryptoAmount = 0.50 / priceInUSD; // 50 cents USD to equivalent crypto
  return cryptoAmount;
}

export default function Play() {
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [selectedToken, setSelectedToken] = useState('eth'); // Default token as ETH

  // Token symbol mappings for CoinGecko API (you'll need to ensure these symbols match with CoinGecko)
  const tokenMapping = {
    eth: 'ethereum',
    usdc: 'usd-coin',
    moxie: 'moxie-token', // Placeholder, verify on CoinGecko
    degen: 'degen-token', // Placeholder, verify on CoinGecko
    assclown: 'assclown-token', // Placeholder, verify on CoinGecko
  };

  // Calculate the required crypto amount whenever the selected token changes
  useEffect(() => {
    const fetchCryptoAmount = async () => {
      const amount = await calculateCryptoAmount(tokenMapping[selectedToken]);
      setCryptoAmount(amount);
    };
    fetchCryptoAmount();
  }, [selectedToken]);

  // Handle transaction success
  const handleTransactionSuccess = () => {
    console.log('Transaction successful!');
    setIsPaid(true); // Game can start
  };

  const shareText = encodeURIComponent(`I just played Dunk the Assclown! See how I did.`);
  const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL)}`;

  return (
    <div>
      <h1>Let's Dunk the Clown!</h1>

      {!isPaid ? (
        <div>
          <label>Select Token to Pay:</label>
          <select onChange={(e) => setSelectedToken(e.target.value)} value={selectedToken}>
            <option value="eth">ETH</option>
            <option value="usdc">USDC</option>
            <option value="moxie">MOXIE</option>
            <option value="degen">DEGEN</option>
            <option value="assclown">ASSCLOWN</option>
          </select>
          <p>Pay 50 cents USD in {selectedToken.toUpperCase()}: {cryptoAmount} {selectedToken.toUpperCase()}</p>
          <Button.Transaction
            to={process.env.WALLET_ADDRESS} // Receiving wallet
            value={cryptoAmount.toString()} // Crypto equivalent of 50 cents USD
            onSuccess={handleTransactionSuccess}
            onError={(error) => console.error("Transaction failed:", error)}
          >
            Pay 50 cents to Play
          </Button.Transaction>
        </div>
      ) : (
        <div>
          <button onClick={() => alert('Throwing the ball!')}>Throw the Ball</button>
          <button onClick={() => window.location.href = shareLink}>Share on Farcaster</button>
        </div>
      )}
    </div>
  );
}
