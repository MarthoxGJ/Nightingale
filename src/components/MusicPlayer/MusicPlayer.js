import React, { useState, useRef } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";

const MusicPlayer = ({ onTimeUpdate, handleCsvUpdate }) => {
  const [file, setFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleSongChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  return (
    <div>
      <div>
        Song
        <input type="file" accept="audio/*" onChange={handleSongChange} />
      </div>
      <div>
        Valence
        <input type="file" accept=".csv" onChange={handleCsvUpdate} />
      </div>
      <div>
        Arousal
        <input type="file" accept=".csv" onChange={handleCsvUpdate} />
      </div>
      {file && (
        <>
          <audio
            ref={audioRef}
            src={file}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={onTimeUpdate}
          />
          <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
          <ProgressBar audioRef={audioRef} />
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
