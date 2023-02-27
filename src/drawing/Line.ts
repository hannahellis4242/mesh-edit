import Point from "./Point";

export default class Line {
  constructor(public start: Point, public end: Point) {}
  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(this.end.x, this.end.y);
    context.stroke();
  }
}
