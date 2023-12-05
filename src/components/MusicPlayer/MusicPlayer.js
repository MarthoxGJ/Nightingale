import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";

import arousalCSV from "../../assets/arousal/arousal.csv"
import valenceCSV from "../../assets/valence/valence.csv"

const MusicPlayer = ({ onTimeUpdate, onDataUpdate }) => {
  const [songsIDs, setSongsIDs] = useState([]);
  const [valence, setValence] = useState([]);
  const [arousal, setArousal] = useState([]);

  const [file, setFile] = useState(null);
  const [songName, setSongName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const audioRef = useRef(null);

  const handleSongChange = (e) => {
    const song = e.target.value;
    setLoading(true);
    fetch(`http://104.237.5.250/evaluacionensa/${song}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      setFile(URL.createObjectURL(blob));
      setSongName(song);
      setIsPlaying(false);
      onDataUpdate(
        valence.find(songData => songData.songID === song.substring(0, song.length - 4)).data,
        arousal.find(songData => songData.songID === song.substring(0, song.length - 4)).data
      );
    })
    .catch(error => {
      console.error('There was an error fetching the song:', error);
    })
    .finally(() => {
      setLoading(false);
    });
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

  const parseCSV = async (csv) => {
    try {
      const response = await fetch(csv);
      const csvText = await response.text();
      const csvData = csvText.split("\n");
      const songData = csvData.map(row => {
        const [songID, songName, ...data] = row.split(",");
        return { songID, songName, data };
      });
      return songData;
    } catch (error) {
      return console.error('Error fetching CSV:', error);
    }
  }

  const getSongName = (songFileName) => {
    const songID = songFileName.substring(0, songFileName.length - 4);
    const songName = valence.find(song => song.songID === songID).songName;
    return `(${songID}) ${songName}`;
  }

  useEffect(() => {
    parseCSV(arousalCSV).then(data => {
      setArousal(data);
    });
    parseCSV(valenceCSV).then(data => {
      setValence(data);
    });
  } , []);

  useEffect(() => {
    fetch('http://104.237.5.250/evaluacionensa/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      const regex = /href=".*\.mp3"/g;
      const matches = data.match(regex);
      const songs = matches.map(match => {
        return match.substring(6, match.length - 1);
      });
      setSongsIDs(songs);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, [arousal, valence]);

  return (
    <div className="controls-container">
      <select className="select-button" value={songName} onChange={handleSongChange} disabled={loading}>
        {loading ? (
          <option>Loading...</option>
        ) : (
          <>
            <option>Select a song</option>
            {songsIDs.map(song => (
              song === songName ? <option key={song} value={song}>{getSongName(song)}</option> : <option key={song} value={song}>{getSongName(song)}</option>
            ))}
          </>
        )}
      </select>

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
