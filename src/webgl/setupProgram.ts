import createProgram from "./createProgram";
import createShader from "./createShader";

const setupProgram = (
  context: WebGLRenderingContext,
  vertex_shader_source: string,
  fragment_shader_source: string
) => {
  //setup shaders
  const vertexShader = createShader(
    context,
    context.VERTEX_SHADER,
    vertex_shader_source
  );
  if (!vertexShader) {
    console.log("could not create vertex shader");
    return;
  }
  const fragmentShader = createShader(
    context,
    context.FRAGMENT_SHADER,
    fragment_shader_source
  );
  if (!fragmentShader) {
    console.log("could not create fragment shader");
    return;
  }
  //setup program
  const program = createProgram(context, vertexShader, fragmentShader);
  if (!program) {
    console.log("could not create program");
    return;
  }
  return program;
};

export default setupProgram;
