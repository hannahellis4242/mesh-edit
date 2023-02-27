import Vector, { subtract } from "./Vector";
import Vertex from "./Vertex";

export default class Edge {
  constructor(
    public readonly source: Vertex,
    public readonly target: Vertex,
    public readonly tag: string
  ) {}
}

export const direction = ({ target, source }: Edge): Vector =>
  subtract(target, source);
