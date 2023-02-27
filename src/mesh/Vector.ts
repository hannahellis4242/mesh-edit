export default interface Vector {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export const zeroVec = () => {
  return { x: 0, y: 0, z: 0 };
};

export const add = (a: Vector, b: Vector): Vector => {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
};

export const negate = ({ x, y, z }: Vector): Vector => {
  return { x: -x, y: -y, z: -z };
};

export const subtract = (a: Vector, b: Vector): Vector => add(a, negate(b));

export const scale =
  (factor: number) =>
  ({ x, y, z }: Vector) => {
    return { x: factor * x, y: factor * y, z: factor * z };
  };

export const dot = (a: Vector, b: Vector): number => {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

export const unit = (a: Vector) => scale(1 / Math.sqrt(dot(a, a)))(a);

export const cross = (a: Vector, b: Vector): Vector => {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.z,
  };
};
