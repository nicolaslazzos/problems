try {
  const input = [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ];

  interface Pixel {
    x: number;
    y: number;
    border: boolean;
    value: number;
    adyacents: { x: number; y: number }[];
  }

  const pixelToObject = (matrix: number[][], x: number, y: number) => {
    const value = matrix[x][y];

    const pixel: Pixel = { x, y, value, border: false, adyacents: [] };

    const dim = [matrix.length - 1, matrix[0].length - 1];

    if (x === 0 || y === 0 || x === dim[0] || y === dim[1]) pixel.border = true;

    if (!value || pixel.border) return pixel;

    const adyacents: Pixel["adyacents"] = [
      { x: x - 1, y },
      { x, y: y + 1 },
      { x: x + 1, y },
      { x, y: y - 1 },
    ];

    pixel.adyacents = adyacents.filter(({ x, y }) => !!matrix[x][y]);

    return pixel;
  };

  const isNotIsland = (matrix: Pixel[][], pixel: Pixel, initial?: Pixel): boolean => {
    if (initial) {
      if (isSamePixel(pixel, initial)) return false;
    } else {
      initial = pixel;
    }

    if (pixel.border) return !!pixel.value;

    return pixel.adyacents.some(({ x, y }) => {
      const adyacent = matrix[x][y];

      if (isSamePixel(adyacent, pixel)) return false;

      return isNotIsland(matrix, adyacent, initial);
    });
  };

  const isSamePixel = (p1: Pixel, p2: Pixel): boolean => {
    return p1.x === p2.x && p1.y === p2.y;
  };

  const solve = (matrix: number[][]) => {
    const converted: Pixel[][] = matrix.map((row, x) => row.map((pixel, y) => pixelToObject(matrix, x, y)));

    return converted.map((row) => row.map((pixel) => (isNotIsland(converted, pixel) ? 1 : 0)));
  };

  console.log(input);

  const output = solve(input);

  console.log(output);
} catch (e) {
  console.error(e);
}
