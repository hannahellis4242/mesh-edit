import {
  multiply,
  orthographicProjection,
  translation,
} from "./lin-alg/matrix4";
import Shape, { drawShape } from "./mesh/Shape";
import resizeCanvasToDisplaySize from "./utils/resizeCanvasToDisplaySize";
import setupProgram from "./webgl/setupProgram";
import vertex_shader_source from "./webgl/vertexShaders/orthographic";

const fragment_shader_source = `// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

uniform vec4 u_colour;

void main() {
  gl_FragColor = u_colour;
}`;

const setRectangle = (
  context: WebGLRenderingContext,
  w: number,
  s: number,
  e: number,
  n: number
) => {
  context.bufferData(
    context.ARRAY_BUFFER,
    new Float32Array([w, s, e, s, w, n, w, n, e, s, e, n]),
    context.STATIC_DRAW
  );
};

const randomInt = (range: number) => {
  return Math.floor(Math.random() * range);
};

const load = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    return;
  }
  const context = canvas.getContext("webgl");
  if (!context) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }
  const program = setupProgram(
    context,
    vertex_shader_source,
    fragment_shader_source
  );
  if (!program) {
    return;
  }
  //gl vars
  const positionAttributeLocation = context.getAttribLocation(
    program,
    "a_position"
  );
  const matrixLocation = context.getUniformLocation(program, "u_matrix");
  const colourUniformLocation = context.getUniformLocation(program, "u_colour");

  //set up canvas size
  resizeCanvasToDisplaySize(canvas);
  context.viewport(0, 0, context.canvas.width, context.canvas.height);

  // Set clear color to black, fully opaque
  context.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  context.clear(context.COLOR_BUFFER_BIT);

  context.useProgram(program);
  context.enableVertexAttribArray(positionAttributeLocation);
  //gl buffers
  const positionBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
  const size = 3;
  const type = context.FLOAT;
  const normalise = false;
  const stride = 0;
  const offset = 0;
  context.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalise,
    stride,
    offset
  );

  const projection = orthographicProjection(
    canvas.clientWidth,
    canvas.clientHeight,
    400
  );
  const translate = translation(-50, -50, -50);
  const matrix4 = multiply(projection, translate);
  context.uniformMatrix4fv(matrixLocation, false, matrix4);

  context.uniform4f(colourUniformLocation, 1, 0, 0, 1);

  const shape = new Shape();
  const p1 = shape.addVertex(0, 0, 0);
  const p2 = shape.addVertex(100, 0, 0);
  const p3 = shape.addVertex(0, 100, 0);
  const p4 = shape.addVertex(0, 0, 100);

  const ea = shape.addEdge(p1, p2)!;
  const eb = shape.addEdge(p1, p3)!;
  const ec = shape.addEdge(p1, p4)!;
  const ed = shape.addEdge(p4, p2)!;
  const ee = shape.addEdge(p4, p3)!;
  const ef = shape.addEdge(p1, p3)!;

  shape.addSurface([ea, ec, ed]);
  shape.addSurface([ec, eb, ee]);
  shape.addSurface([eb, ea, ef]);
  shape.addSurface([ed, ee, ef]);

  //console.log(JSON.stringify(shape, null, 2));

  drawShape(context)(shape);

  /*{
    for (let i = 0; i < 500; ++i) {
      const x = randomInt(800);
      const y = randomInt(600);
      const w = randomInt(200);
      const h = randomInt(200);
      setRectangle(context, x, y, x + w, y + h);
      //set a random colour
      context.uniform4f(
        colourUniformLocation,
        Math.random(),
        Math.random(),
        Math.random(),
        1
      );
      context.drawArrays(context.TRIANGLES, 0, 6);
    }
  }*/
};

load();
