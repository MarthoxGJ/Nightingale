import React, { useState } from "react";
import { CoordinateGraph, MusicPlayer, TimeLineGraph } from "./components";

import "./App.sass";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [valence, setValence] = useState([]);
  const [arousal, setArousal] = useState([]);

  const getMaxRange = (valenceArray, arousalArray) => {
    const maxValence = Math.max(...valenceArray.map(Math.abs));
    const maxArousal = Math.max(...arousalArray.map(Math.abs));
    return Math.max(maxValence, maxArousal);
  };

  const handleDataUpdate = (valenceArray, arousalArray) => {
    const maxRange = getMaxRange(valenceArray, arousalArray);
    const normalizedValence = valenceArray.map(valence => valence / maxRange);
    const normalizedArousal = arousalArray.map(arousal => arousal / maxRange);
    setValence(normalizedValence);
    setArousal(normalizedArousal);
  };

  const handleTimeUpdate = (e) => {
    const audio = e.target;
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = Math.floor((currentTime / duration) * valence.length);
    setX(valence[progress]);
    setY(arousal[progress]);
    setProgress(progress);
  };

  return (
    <div className="container">
      <h1 className="page-title">
        Coordinate Graph, Time Line Graph, and Music Player
      </h1>
      <div className="coordinate-graph-container">
        <p className="YAxis">Arousal</p>
        <div className="graph-with-label">
          <p className="XAxis">Valence</p>
          <CoordinateGraph x={x} y={y} />
        </div>
      </div>
      <div className="graph-container">
        <div className="time-line-container">
          <div className="labels">
            <p className="YAxis">Time</p>
            <p className="XAxis">Valence</p>
          </div>
          <TimeLineGraph values={valence} progress={progress} />
        </div>
        <div className="time-line-container">
          <div className="labels">
            <p className="YAxis">Time</p>
            <p className="XAxis">Arousal</p>
          </div>
          <TimeLineGraph values={arousal} progress={progress} />
        </div>
      </div>
      <div className="music-player">
        <MusicPlayer
          onTimeUpdate={handleTimeUpdate}
          onDataUpdate={handleDataUpdate}
        />
      </div>
    </div>
  );
};

export default App;
