import React, { useState, useRef } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";

const MusicPlayer = ({ onTimeUpdate, handleCsvUpdate }) => {
  const [file, setFile] = useState(null);
  const [songName, setSongName] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleSongChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setSongName(e.target.files[0].name);
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
    <div className="controls-container">
      <label className="select-button" htmlFor="song-file">
        Select Song{file && <span>{songName}</span>}
      </label>
      <input
        id="song-file"
        type="file"
        style={{display:"none"}}
        accept="audio/*"
        onChange={handleSongChange}
      />
      
      <label className="select-button" htmlFor="valence-file">
        Select Valence
      </label>
      <input
        id="valence-file"
        type="file"
        style={{display:"none"}}
        accept=".csv"
        onChange={handleCsvUpdate}
      />

      <label className="select-button" htmlFor="valence-file">
        Select Arousal
      </label>
      <input
        id="arousal-file"
        type="file"
        style={{display:"none"}}
        accept=".csv"
        onChange={handleCsvUpdate}
      />

      {file && (
        <>
          <audio
            ref={audioRef}
            src={file}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={onTimeUpdate}
          />
          <button className="select-button" onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
          <ProgressBar audioRef={audioRef} />
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
