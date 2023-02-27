const createShader = (
  context: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = context.createShader(type);
  if (!shader) {
    context.deleteShader(shader);
    return;
  }
  context.shaderSource(shader, source);
  context.compileShader(shader);
  const success = context.getShaderParameter(shader, context.COMPILE_STATUS);
  if (!success) {
    console.log(context.getShaderInfoLog(shader));
    context.deleteShader(shader);
    return;
  }
  return shader;
};

export default createShader;
