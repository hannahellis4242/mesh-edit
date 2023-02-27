const vertex_shader_source = `// an attribute will receive data from a buffer
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_translation;

// all shaders have a main function
void main() {
  vec2 pos = a_position+u_translation;
  vec2 zeroToOne = pos/u_resolution;
  vec2 zeroToTwo = zeroToOne *2.0;

  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace,0,1);
}`;

export default vertex_shader_source;
