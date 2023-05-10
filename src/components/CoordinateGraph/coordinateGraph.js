import React, { useEffect, useRef } from "react";

const CoordinateGraph = ({ x, y }) => {
  const canvasRef = useRef(null);

  const draw = (ctx, position) => {
    const { x, y } = position;
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the axis
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();

    // Draw the point
    const pointX = (x + 1) * (canvasWidth / 2);
    const pointY = (1 - y) * (canvasHeight / 2);
    ctx.beginPath();
    ctx.arc(pointX, pointY, 5, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context, { x, y });
  }, [x, y]);

  return (
    <div>
      <canvas ref={canvasRef} width="300" height="300" />
    </div>
  );
};

export default CoordinateGraph;
