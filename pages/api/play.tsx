import { NextApiRequest, NextApiResponse } from 'next';
import { ref, push } from 'firebase-admin/database';
import { db } from '../../src/firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const playerId = req.body.playerId || 'anonymous';  // Handle player ID

      // Log the player ID
      console.log(`Player ID: ${playerId} is playing`);

      // Simulate the weighted probability for a dunk (33% chance)
      const hitTarget = Math.random() < 0.33;
      console.log(`Did player dunk? ${hitTarget ? 'Yes' : 'No'}`);

      // Record the game session in Firebase
      const gameSessionRef = ref(db, 'gameSessions');
      await push(gameSessionRef, {
        playerId,
        dunksMade: hitTarget ? 1 : 0,
        timestamp: new Date().toISOString()
      });
      console.log('Game session recorded in Firebase');

      // Return game result
      return res.status(200).json({
        success: true,
        result: hitTarget ? 'dunked' : 'missed',
        image: hitTarget ? '/dunked.jpeg' : '/notdunked.jpeg'
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error during game session', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
