const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
};

export default resizeCanvasToDisplaySize;
