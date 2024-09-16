import { useState } from 'react';

export default function Throw() {
  const [throws, setThrows] = useState(3);

  const handleThrow = () => {
    if (throws > 0) {
      const hit = Math.random() > 0.5; // Random hit or miss
      if (hit) {
        alert('Bullseye! You dunked the clown!');
        window.location.href = '/dunked';
      } else {
        setThrows((prevThrows) => prevThrows - 1);
        if (throws === 1) {
          alert('No more throws left. Game Over.');
          window.location.href = '/game-over';
        } else {
          alert(`Missed! You have ${throws - 1} throws left.`);
        }
      }
    } else {
      alert('No throws left.');
    }
  };

  return (
    <div>
      <h1>Throw the Ball</h1>
      <button onClick={handleThrow}>Throw</button>
      <p>Throws left: {throws}</p>
    </div>
  );
}
