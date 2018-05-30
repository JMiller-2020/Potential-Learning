
function dist(x1, y1, x2, y2) {
  let dX = x1 - x2;
  let dY = y1 - y2;
  return Math.sqrt(dX * dX + dY * dY);
}

function lerp(a, b, i) {
  return a * (1-i) + b * i;
}
