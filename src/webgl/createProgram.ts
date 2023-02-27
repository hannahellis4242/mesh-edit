const createProgram = (
  context: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) => {
  const program = context.createProgram();
  if (!program) {
    console.log("could not create program");
    context.deleteProgram(program);
    return;
  }
  context.attachShader(program, vertexShader);
  context.attachShader(program, fragmentShader);
  context.linkProgram(program);
  const success = context.getProgramParameter(program, context.LINK_STATUS);
  if (!success) {
    console.log(context.getProgramInfoLog(program));
    context.deleteProgram(program);
    return;
  }
  return program;
};

export default createProgram;
