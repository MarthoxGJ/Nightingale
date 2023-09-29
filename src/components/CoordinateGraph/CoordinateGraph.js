import React, { useEffect, useRef } from "react";

const CoordinateGraph = ({ x, y }) => {
  const canvasRef = useRef(null);

  const draw = (ctx, position) => {
    const { x, y } = position;
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    console.log(canvasWidth, canvasHeight)

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Select the color of the axis
    ctx.strokeStyle = "black";
    
    // Draw the axis
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();
    
    // Select the color of the point
    ctx.fillStyle = "red";

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
    <canvas height="300" width="300" ref={canvasRef}/>
  );
};

export default CoordinateGraph;
