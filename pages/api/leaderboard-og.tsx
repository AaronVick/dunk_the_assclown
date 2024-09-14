import { NextApiRequest, NextApiResponse } from 'next';
import { ref, get } from 'firebase-admin/database';
import { db } from '../../src/firebaseConfig';
import { ImageResponse } from '@vercel/og';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Generating leaderboard image...');
    
    const gameSessionsRef = ref(db, 'gameSessions');
    const snapshot = await get(gameSessionsRef);
    
    if (!snapshot.exists()) {
      console.log('No game sessions found');
      return res.status(404).json({ error: 'No data available' });
    }

    const playerScores: { [playerId: string]: number } = {};

    // Aggregate scores
    snapshot.forEach((childSnapshot) => {
      const session = childSnapshot.val();
      const { playerId, dunksMade } = session;
      playerScores[playerId] = (playerScores[playerId] || 0) + dunksMade;
    });

    // Convert and sort by score
    const sortedLeaderboard = Object.keys(playerScores)
      .map(playerId => ({ playerId, dunks: playerScores[playerId] }))
      .sort((a, b) => b.dunks - a.dunks)
      .slice(0, 10);  // Top 10 players

    const leaderboardContent = sortedLeaderboard
      .map((player, index) => `${index + 1}. ${player.playerId}: ${player.dunks} dunks`)
      .join('\n');

    // Log leaderboard
    console.log('Leaderboard generated:', leaderboardContent);

    // Meta tags for Farcaster
    const shareText = encodeURIComponent(`Check out the leaderboard in DUNK the ASSCLOWN!`);
    const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL)}`;

    // OG image generation
    const image = new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: 'white',
            background: 'black',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Leaderboard</h1>
          <pre style={{ fontSize: '30px', textAlign: 'center' }}>{leaderboardContent}</pre>
        </div>
      ),
      { width: 1200, height: 630 }
    );

    // Return the OG image and Farcaster meta tags
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="Leaderboard" />
          <meta property="fc:frame:image" content="data:image/png;base64,${image.toString('base64')}" />
          <meta property="fc:frame:button:1" content="Play Again" />
          <meta property="fc:frame:button:2" content="Share" />
          <meta property="fc:frame:button:2:action" content="link" />
          <meta property="fc:frame:button:2:target" content="${shareLink}" />
        </head>
      </html>
    `);
  } catch (error) {
    console.error('Error generating leaderboard image', error);
    return res.status(500).json({ error: 'Failed to generate leaderboard image' });
  }
}
