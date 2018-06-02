
function dist(x1, y1, x2, y2) {
  let dX = x1 - x2;
  let dY = y1 - y2;
  return Math.sqrt(dX * dX + dY * dY);
}

function lerp(a, b, i) {
  return a * (1-i) + b * i;
}

function zeros(dims) {
  var value = [];
  // basecase
  if(dims.length == 1) {
    value.length = dims[0];
    value.fill(0);
    return value;
  }
  // recurse
  value = zeros(dims.slice(1));

  var array = [];
  for(let j = 0; j < dims[0]; j++) {
    array.push(value.slice());
  }
  return array;
}

function transpose(array) {
  var result = [];
  for(let c = 0; c < array[0].length; c++) {
    let row = [];
    for(let r = 0; r < array.length; r++) {
      row.push(array[r][c]);
    }
    result.push(row);
  }
  return result;
}

function flipHori(array) {
  var result = [];
  for(let r = 0; r < array.length; r++) {
    let row = [];
    for(let c = 0; c < array[r].length; c++) {
      row.push(array[r][array[r].length - 1 - c]);
    }
    result.push(row);
  }
  return result;
}

function randInt(min, max) {
  return Math.trunc(Math.random() * (max - min + 1) + min)
}

function randIdx(length) {
  return Math.trunc(Math.random() * length);
}
