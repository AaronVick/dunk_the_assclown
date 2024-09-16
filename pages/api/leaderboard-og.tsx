import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../src/firebaseConfig'; // Firestore database
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const leaderboardRef = db.collection('leaderboard');
    const snapshot = await leaderboardRef.get();
    const leaderboard = snapshot.docs.map((doc) => doc.data());

    const shareText = encodeURIComponent(`Check out the current Dunk the Assclown leaderboard!`);
    const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL)}`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="data:image/png;base64,${await generateLeaderboardImage(leaderboard)}" />
          <meta property="fc:frame:button:1" content="Play Again" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/play" />
          <meta property="fc:frame:button:2" content="Share" />
          <meta property="fc:frame:button:2:action" content="link" />
          <meta property="fc:frame:button:2:target" content="${shareLink}" />
        </head>
        <body>
          <h1>Leaderboard</h1>
          <p>Check the latest leaderboard:</p>
          <pre>${JSON.stringify(leaderboard, null, 2)}</pre>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}

async function generateLeaderboardImage(leaderboard: any[]) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '40px',
        }}
      >
        <h1>Leaderboard</h1>
        <ul>
          {leaderboard.map((player, index) => (
            <li key={index}>
              {player.name}: {player.score} Dunks
            </li>
          ))}
        </ul>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
