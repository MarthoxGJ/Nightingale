import React, { useState } from "react";
import { CoordinateGraph, MusicPlayer } from "./components";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleTimeUpdate = (e) => {
    const audio = e.target;
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = currentTime / duration;

    // Change the setX and setY to take the n value of the emotional data
    setX(progress * 2 - 1); // Convert progress (0 to 1) to the range (-1 to 1)
    setY(Math.sin(2 * Math.PI * progress)); // Calculate the sine wave value based on progress
  };

  return (
    <div>
      <h1>Coordinate Graph and Music Player</h1>
      <CoordinateGraph x={x} y={y} />
      <MusicPlayer onTimeUpdate={handleTimeUpdate} />
    </div>
  );
};

export default App;
