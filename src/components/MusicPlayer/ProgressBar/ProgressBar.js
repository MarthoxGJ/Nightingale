import React, { useState, useEffect } from "react";

const ProgressBar = ({ audioRef }) => {
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);
    }
  };

  const handleClick = (e) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const progressBarRect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - progressBarRect.left;
      const newProgress = (clickX / progressBarRect.width) * 100;
      setProgress(newProgress);
      const newCurrentTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newCurrentTime;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [audioRef]);

  return (
    <div
      onClick={handleClick}
      style={{
        width: "100%",
        height: "5px",
        background: "#213555",
        cursor: "pointer",
      }}
    >
      <div
        style={{ width: `${progress}%`, height: "100%", background: "#E5D283" }}
      />
    </div>
  );
};

export default ProgressBar;
