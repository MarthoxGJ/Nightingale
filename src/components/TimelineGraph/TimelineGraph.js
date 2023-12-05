import React, { useEffect, useRef, useState } from "react";

const TimeLineGraph = ({ values, progress }) => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const index = Math.floor(progress);
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
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();

    if (points.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "#FF0000";

      for (let i = 0; i < points.length; i++) {
        const pointX = (points[i].x / (points.length - 1)) * canvasWidth;
        const pointY = ((1 - points[i].y) / 2) * canvasHeight;
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.stroke();
    }
  };

  return <canvas ref={canvasRef} width={400} height={300} />;
};

export default TimeLineGraph;
