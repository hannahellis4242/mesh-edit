import Edge, { direction } from "./Edge";
import Vector, { cross, unit } from "./Vector";

export default class Surface {
  readonly normal: Vector;
  constructor(public edges: [Edge, Edge, Edge], public readonly tag: string) {
    const [e1, e2] = this.edges;
    this.normal = unit(cross(direction(e1), direction(e2)));
  }
}

const isValid = ([e1, e2, e3]: [Edge, Edge, Edge]) => {
  //edge 1 and edge 2 must share a source
  if (e1.source.tag !== e2.source.tag) {
    return false;
  }
  if (e1.target.tag === e2.target.tag) {
    return false;
  }
  //now we have to be in either one of two situations.
  //Either edge1's target is the source of edge3
  if (e1.target.tag === e3.source.tag) {
    //then edge 2's target must be the same as edge 3's
    if (e2.target.tag !== e3.target.tag) {
      return false;
    }
    return true;
  }
  //or we're in the case that edge2's target is the source of edge3
  if (e2.target.tag === e3.source.tag) {
    //then edge 1's target is the same as edge 3's
    if (e1.target.tag !== e3.target.tag) {
      return false;
    }
    return true;
  }
  //if neither of these is true,
  return false;
};

export const createSurface = (edges: [Edge, Edge, Edge], tag: string) =>
  isValid(edges) ? new Surface(edges, tag) : undefined;
