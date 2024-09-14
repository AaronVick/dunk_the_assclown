import { Frog } from 'frog';
import { handle } from 'frog/vercel';
import { ref, get, query, orderByChild } from 'firebase/database';
import { db } from '../src/firebaseConfig';

const app = new Frog();

// Function to fetch and calculate the top players from gameSessions
const fetchLeaderboard = async () => {
  const sessionsRef = ref(db, 'gameSessions');  // Firebase reference to gameSessions
  const snapshot = await get(sessionsRef);  // Retrieve all game sessions

  const playerScores: { [playerId: string]: number } = {};

  // Iterate through the sessions and calculate cumulative scores
  snapshot.forEach((childSnapshot) => {
    const session = childSnapshot.val();
    const { playerId, dunksMade } = session;

    if (!playerScores[playerId]) {
      playerScores[playerId] = 0;
    }

    playerScores[playerId] += dunksMade;  // Aggregate the successful dunks for each player
  });

  // Convert playerScores object to an array and sort by highest scores
  const sortedScores = Object.keys(playerScores)
    .map((playerId) => ({ playerId, score: playerScores[playerId] }))
    .sort((a, b) => b.score - a.score)  // Sort descending by score
    .slice(0, 10);  // Limit to top 10 players

  return sortedScores;
};

app.frame('/leaderboard', async (c) => {
  const leaderboard = await fetchLeaderboard();  // Fetch the top players

  return c.res({
    image: (
      <div>
        <h2>Leaderboard</h2>
        {leaderboard.map((player, index) => (
          <div key={index}>
            <p>{player.playerId}: {player.score} dunks</p>
          </div>
        ))}
      </div>
    ),
    intents: [
      <button onClick={() => c.redirect('/')}>Go Back</button>,
    ],
  });
});

export const GET = handle(app);
export const POST = handle(app);
