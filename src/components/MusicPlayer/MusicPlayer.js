import React, { useState, useRef } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";

const MusicPlayer = ({ onTimeUpdate }) => {
  const [file, setFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleFileChange = (e) => {
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
      <input type="file" accept="audio/*" onChange={handleFileChange} />
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
