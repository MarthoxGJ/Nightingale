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
    ctx.strokeStyle = "#FFFFFF";

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the x-axis
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();

    if (points.length > 1) {
      ctx.beginPath();

      for (let i = 0; i < points.length; i++) {
        const pointX = (points[i].x / (points.length - 1)) * canvasWidth;
        const pointY = (1 - points[i].y) * (canvasHeight / 2);
        ctx.lineTo(pointX, pointY);
      }

      ctx.stroke();
    }
  };

  return <canvas ref={canvasRef} width={300} height={150} />;
};

export default TimeLineGraph;
