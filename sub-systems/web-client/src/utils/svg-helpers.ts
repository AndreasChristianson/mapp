export const transformMouseEventPosition = (event: React.MouseEvent<SVGSVGElement, MouseEvent>, matrix: DOMMatrix) =>
  transformPosition({ x: event.clientX, y: event.clientY }, matrix);

export const transformPosition = (position: { x: number, y: number }, matrix: DOMMatrix) => ({
  x: (position.x - matrix.e) / matrix.a,
  y: (position.y - matrix.f) / matrix.d
});

export const addPositions = (...positions: { x: number, y: number }[]) => positions.reduce(
  (sumPosition, position) => ({
    x: sumPosition.x + position.x,
    y: sumPosition.y + position.y
  }),
  { x: 0, y: 0 }
)
export const negatePosition = ({ x, y }: { x: number, y: number }) => ({
  x: -1 * x,
  y: -1 * y
})