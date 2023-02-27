import { mat_size } from "./size";

const mat_vec_mult = (
  matrix: number[][],
  vector: number[]
): number[] | undefined => {
  const size = mat_size(matrix);
  if (!size) {
    return undefined;
  }
  if (vector.length !== size.cols) {
    return undefined;
  }
  let out = Array(size.rows).fill(0);
  for (let i = 0; i < size.rows; ++i) {
    for (let j = 0; j < size.cols; ++j) {
      out[i] += matrix[i][j] * vector[j];
    }
  }
  return out;
};
export default mat_vec_mult;
