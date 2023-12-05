import React, { useEffect, useRef, useState } from "react";

const TimeLineGraph = ({ values, progress }) => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const index = Math.floor(progress * (values.length - 1));
    const newPoints = values
      .slice(0, index + 1)
      .map((value, index) => ({ x: index, y: value }));
    setPoints(newPoints);
  }, [values, progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context, points);
  }, [points]);

  const draw = (ctx, points) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
  
    // Set the background color
    ctx.strokeStyle = "#000000";
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    // Normalize the y values
    const maxY = Math.max(...points.map(p => p.y));
    const minY = Math.min(...points.map(p => p.y));
  
    // Function to normalize y values
    const normalizeY = y => (1 - (y - minY) / (maxY - minY)) * (canvasHeight);
  
    // Draw the x-axis
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();
  
    if (points.length > 1) {
      ctx.beginPath();
  
      for (let i = 0; i < points.length; i++) {
        const pointX = 0 + (points[i].x / (points.length - 1)) * (canvasWidth);
        const pointY = normalizeY(points[i].y);
        ctx.lineTo(pointX, pointY);
      }
  
      ctx.stroke();
    }
  };

  return <canvas ref={canvasRef} width={400} height={300} />;
};

export default TimeLineGraph;
