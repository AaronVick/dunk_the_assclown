import { useEffect, useState } from 'react';
import { db } from '../src/firebaseConfig'; // Assuming you're using Firestore

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const snapshot = await db.collection('leaderboard').get();
      const data = snapshot.docs.map((doc) => doc.data());
      setLeaderboard(data);
      console.log('Fetched leaderboard:', data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((player, index) => (
          <li key={index}>
            {player.name}: {player.score} Dunks
          </li>
        ))}
      </ul>
    </div>
  );
}
