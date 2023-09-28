import React, { useState } from "react";
import { CoordinateGraph, MusicPlayer, TimeLineGraph } from "./components";

import "./App.sass";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [valence, setValence] = useState([]);
  const [arousal, setArousal] = useState([]);

  const handleCsvUpdate = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result.split("\n");
      file.name.includes("valence") ? setValence(csvData) : setArousal(csvData);
    };
    reader.readAsText(file);
  };

  const handleTimeUpdate = (e) => {
    const audio = e.target;
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = currentTime / duration;
    setX(valence[Math.floor(progress * (valence.length - 1))]);
    setY(arousal[Math.floor(progress * (arousal.length - 1))]);
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
          handleCsvUpdate={handleCsvUpdate}
        />
      </div>
    </div>
  );
};

export default App;
