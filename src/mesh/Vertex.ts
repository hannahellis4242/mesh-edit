import Vector from "./Vector";

export default class Vertex implements Vector {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number,
    public readonly tag: string
  ) {}
}
