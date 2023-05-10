import React, { useEffect, useRef, useState } from "react";

const TimeLineGraph = ({ xValues, progress }) => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const index = Math.floor(progress * (xValues.length - 1));
    const newPoints = xValues.slice(0, index + 1).map((x) => ({ x, y: x }));

    setPoints(newPoints);
  }, [xValues, progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context, points);
  }, [points]);

  const draw = (ctx, points) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the x-axis
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();

    if (points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        const pointX = (points[i].x + 1) * (canvasWidth / 2);
        const pointY = (1 - points[i].y) * (canvasHeight / 2);
        ctx.lineTo(pointX, pointY);
      }

      ctx.stroke();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width="300" height="150" />
    </div>
  );
};

export default TimeLineGraph;
