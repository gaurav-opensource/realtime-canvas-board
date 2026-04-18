// Draw Line (Pen)
export const drawLine = (ctx, x0, y0, x1, y1, color, scale = 1) => {
  ctx.strokeStyle = color;

  // IMPORTANT FIXES
  ctx.lineWidth = 2 / scale;    
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
};

// Straight Line
export const drawStraightLine = (ctx, x0, y0, x1, y1, color, scale = 1) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2 / scale;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
};

// Rectangle
export const drawRect = (ctx, x0, y0, x1, y1, color, scale = 1) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2 / scale;

  ctx.lineJoin = "round";

  ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
};

// Circle
export const drawCircle = (ctx, x0, y0, x1, y1, color, scale = 1) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2 / scale;

  const radius = Math.sqrt(
    Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)
  );

  ctx.beginPath();
  ctx.arc(x0, y0, radius, 0, Math.PI * 2);
  ctx.stroke();
};

// Eraser
export const erase = (ctx, x0, y0, x1, y1, scale = 1) => {
  ctx.globalCompositeOperation = "destination-out";

  ctx.lineWidth = 10 / scale; // zoom-safe eraser
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  ctx.globalCompositeOperation = "source-over";
};

// MAIN FUNCTION
export const drawShape = (ctx, data, scale = 1) => {
  const { tool, x0, y0, x1, y1, color } = data;

  if (tool === "pen") {
    drawLine(ctx, x0, y0, x1, y1, color, scale);

  } else if (tool === "rect") {
    drawRect(ctx, x0, y0, x1, y1, color, scale);

  } else if (tool === "circle") {
    drawCircle(ctx, x0, y0, x1, y1, color, scale);

  } else if (tool === "line") {
    drawStraightLine(ctx, x0, y0, x1, y1, color, scale);

  } else if (tool === "eraser") {
    erase(ctx, x0, y0, x1, y1, scale);
  }
};