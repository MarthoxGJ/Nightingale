import React, { useState } from "react";
import { CoordinateGraph, MusicPlayer, TimeLineGraph } from "./components";

import "./App.sass";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [valence, setValence] = useState([]);
  const [arousal, setArousal] = useState([]);

  const handleDataUpdate = (valenceArray, arousalArray) => {
    // Every value greater than 1 is set to 1 and every value less than -1 is set to -1
    const normalizedValence = valenceArray.map((valence) => Math.min(1, Math.max(-1, valence)));
    const normalizedArousal = arousalArray.map((arousal) => Math.min(1, Math.max(-1, arousal)));
    setValence(normalizedValence);
    setArousal(normalizedArousal);
  };

  const handleTimeUpdate = (e) => {
    const audio = e.target;
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = Math.floor((currentTime / duration) * valence.length);
    setX(arousal[progress]);
    setY(valence[progress]);
    setProgress(progress);
  };

  return (
    <div className="container">
      <h1 className="page-title">
      ENSA Dataset music player
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
