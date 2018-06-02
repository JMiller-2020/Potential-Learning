const LINK_COLOR = "#ddd";
const LINK_LEN = 100;
const LINK_BOUNCE = 0.2;
const LINK_STRETCH = 0.9;
const LINK_PULL = 0;
const ORDERING_DISTANCE = 50;

const NODE_RADIUS = 4;
const NODE_COLOR = "#edd";
const ANCHOR_STROKE_COLOR = "#2ff"

const BASELINE_VALUE = 0;
const DEFAULT_THRESHOLD = 1;

const GRAVITY = 0;

var idCounter = 0;

class Neuron {

  // id, value, threshold,
  // ins, weights, linkLens,
  // x, y, r, c

  constructor(x, y, isAnchor=false) {
    this.id = idCounter++;
    this.value = BASELINE_VALUE;
    this.threshold = DEFAULT_THRESHOLD;
    this.x = this.prevX = x;
    this.y = this.prevY = y;
    this.r = NODE_RADIUS;
    this.c = NODE_COLOR;
    this.isAnchor = isAnchor;
    this.ins = [];
    this.weights = [];
    this.linkLens = [];
  }

  addIn(other, weight=1) {
    this.ins.push(other);
    this.weights.push(weight);
    // this.linkLens.push(LINK_LEN);
    this.linkLens.push(dist(this.x, this.y, other.x, other.y));
  }

  getPotential() {
    return Math.max(this.threshold - this.value, 0);
  }

  contains(x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    let result = ctx.isPointInPath(x, y);
    ctx.restore();
    return result;
  }

  drawConns(ctx, useGradient=false) {
    ctx.save();
    for(let i = 0; i < this.ins.length; i++) {
      ctx.beginPath();
      ctx.moveTo(this.ins[i].x, this.ins[i].y);
      ctx.lineTo(this.x, this.y);
      if(useGradient) {
        let grd=ctx.createLinearGradient(this.ins[i].x,this.ins[i].y,this.x,this.y);
        grd.addColorStop(0,"#00000000");
        grd.addColorStop(0.5,LINK_COLOR);
        ctx.strokeStyle = grd;
      } else {
        ctx.strokeStyle = LINK_COLOR;
      }
      ctx.lineWidth = this.weights[i];
      ctx.stroke();
    }
    ctx.restore();
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fillStyle = this.c;
    ctx.fill();
    if(this.isAnchor) {
      ctx.strokeStyle = ANCHOR_STROKE_COLOR
      ctx.stroke();
    }
    ctx.restore();
  }

  bound(ctx) {
    let deltaX = this.x - this.prevX;
    let deltaY = this.y - this.prevY;
    // bound checks
    if(this.y > ctx.canvas.height - this.r) {
      this.prevY = ctx.canvas.height - this.r + deltaY;
      this.y = ctx.canvas.height - this.r;
    }
    if(this.y < this.r) {
      this.prevY = deltaY + this.r;
      this.y = this.r;
    }
    if(this.x > ctx.canvas.width) {
      this.prevX = ctx.canvas.width - this.r + deltaX;
      this.x = ctx.canvas.width - this.r;
    }
    if(this.x < this.r) {
      this.prevX = deltaX + this.r;
      this.x = this.r;
    }
  }

  physicsTick() {
    if(!this.isAnchor) {
      let deltaX = this.x - this.prevX;
      let deltaY = this.y - this.prevY;
      this.prevX = this.x;
      this.prevY = this.y;

      this.x += deltaX;
      this.y += deltaY + GRAVITY;
    }

    for(let i = 0; i < this.ins.length; i++) {
      let other = this.ins[i];
      if(this.isAnchor && other.isAnchor) { continue; }

      let d = dist(this.x, this.y, other.x, other.y);
      let distRatio = this.linkLens[i] / d;
      let stretch = lerp(1, distRatio, LINK_STRETCH);
      this.linkLens[i] /= stretch / (1 - LINK_PULL);
      let bounce = lerp(1, distRatio, LINK_BOUNCE);
      let orderingForce = Math.exp(Math.min(ORDERING_DISTANCE + other.x - this.x, 0));
      // console.log(LINK_ORDERING * orderingForce);
      if(other.isAnchor) {
        this.x = lerp(other.x, this.x, bounce) + orderingForce;
        this.y = lerp(other.y, this.y, bounce);
      } else if(this.isAnchor) {
        other.x = lerp(this.x, other.x, bounce) - orderingForce;
        other.y = lerp(this.y, other.y, bounce);
      } else {
        this.x = lerp(other.x, this.x, 0.5 + bounce/2) + orderingForce/2;
        this.y = lerp(other.y, this.y, 0.5 + bounce/2);
        other.x = lerp(this.x, other.x, 0.5 + bounce/2) - orderingForce/2;
        other.y = lerp(this.y, other.y, 0.5 + bounce/2);
      }
    }
  }

  tick() {
    this.physicsTick();

    for(let i = 0; i < this.ins.length; i++) {

    }
  }
}
