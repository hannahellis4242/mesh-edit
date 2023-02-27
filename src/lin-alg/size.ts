export default interface size {
  rows: number;
  cols: number;
}

export const mat_size = (matrix: number[][]): size | undefined => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const consistentCols = matrix
    .map((row) => row.length)
    .every((length) => cols === length);
  if (!consistentCols) {
    return undefined;
  }
  return { rows, cols };
};
