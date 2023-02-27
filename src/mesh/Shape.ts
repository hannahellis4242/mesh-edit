import { v4 } from "uuid";
import Edge from "./Edge";
import Surface, { createSurface } from "./Surface";
import Vertex from "./Vertex";

export default class Shape {
  vertices: Vertex[];
  edges: Edge[];
  surfaces: Surface[];
  constructor() {
    this.vertices = [];
    this.edges = [];
    this.surfaces = [];
  }
  findVertexByTag(target: string) {
    return this.vertices.find(({ tag }) => target === tag);
  }
  findEdgeByTag(target: string) {
    return this.edges.find(({ tag }) => target === tag);
  }
  addVertex(x: number, y: number, z: number): string {
    const found = this.vertices.find(
      (vertex) => vertex.x === x && vertex.y === y && vertex.z === z
    );
    if (found) {
      return found.tag;
    }
    const tag = v4();
    this.vertices.push(new Vertex(x, y, z, tag));
    return tag;
  }
  addEdge(sourceTag: string, targetTag: string) {
    const source = this.findVertexByTag(sourceTag);
    if (!source) {
      return;
    }
    const target = this.findVertexByTag(targetTag);
    if (!target) {
      return;
    }
    const tag = v4();
    this.edges.push(new Edge(source, target, tag));
    return tag;
  }
  addSurface([e1, e2, e3]: [string, string, string]) {
    const edge1 = this.findEdgeByTag(e1);
    if (!edge1) {
      return;
    }
    const edge2 = this.findEdgeByTag(e2);
    if (!edge2) {
      return;
    }
    const edge3 = this.findEdgeByTag(e3);
    if (!edge3) {
      return;
    }
    const tag = v4();
    const surface = createSurface([edge1, edge2, edge3], tag);
    if (!surface) {
      return;
    }
    this.surfaces.push(surface);
    return tag;
  }
}

export const createPoints = (shape: Shape) => {
  return shape.surfaces
    .flatMap(({ edges }) => {
      const [e1, e2] = edges;
      return [e1.source, e1.target, e2.target];
    })
    .flatMap(({ x, y, z }) => [x, y, z]);
};

export const drawShape = (context: WebGLRenderingContext) => (shape: Shape) => {
  const points = createPoints(shape);
  context.bufferData(
    context.ARRAY_BUFFER,
    new Float32Array(points),
    context.STATIC_DRAW
  );
  context.drawArrays(context.TRIANGLES, 0, points.length / 3);
};
