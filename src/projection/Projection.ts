//see https://en.wikipedia.org/wiki/Orthographic_projection for how this works
import Edge from "../mesh/Edge";
import Vertex from "../mesh/Vertex";
import Params from "./Params";
import Point from "../drawing/Point";
import Line from "../drawing/Line";
import mat_vec_mult from "../lin-alg/mat_vec_mult";

export default class Projection {
  matrix: number[][];
  constructor({ left, right, top, bottom, near, far }: Params) {
    this.matrix = [
      [2 / (right - left), 0, 0, (left + right) / (left - right)],
      [0, 2 / (top - bottom), 0, (bottom + top) / (bottom - top)],
      [0, 0, 2 / (near - far), (near + far) / (near - far)],
      [0, 0, 0, 1],
    ];
  }
  projectVertex({ x, y, z }: Vertex): Point | undefined {
    const v = [x, y, z, 1];
    const w = mat_vec_mult(this.matrix, v);
    if (!w) {
      return undefined;
    }
    return new Point(w[0], w[1]);
  }
  projectEdge({ source, target }: Edge): Line | undefined {
    const start = this.projectVertex(source);
    if (!start) {
      return undefined;
    }
    const end = this.projectVertex(target);
    if (!end) {
      return undefined;
    }
    return new Line(start, end);
  }
}
