import React, { useState } from "react";
import { CoordinateGraph, MusicPlayer, TimeLineGraph } from "./components";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [progress, setProgress] = useState(0);

  const xValues = Array.from({ length: 100 }, (_, i) => i / 49 - 1); // Example array of 100 x values between -1 and 1

  const handleTimeUpdate = (e) => {
    const audio = e.target;
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = currentTime / duration;

    setX(xValues[Math.floor(progress * (xValues.length - 1))]); // Get the x value based on progress
    setY(Math.sin(2 * Math.PI * progress)); // Calculate the sine wave value based on progress
    setProgress(progress);
  };

  return (
    <div>
      <h1>Coordinate Graph, Time Line Graph, and Music Player</h1>
      <CoordinateGraph x={x} y={y} />
      <TimeLineGraph xValues={xValues} progress={progress} />
      <TimeLineGraph xValues={xValues} progress={progress} />
      <MusicPlayer onTimeUpdate={handleTimeUpdate} />
    </div>
  );
};

export default App;
