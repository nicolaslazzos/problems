try {
  const blocks = [
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: true,
      school: false,
      store: false,
    },
    {
      gym: true,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: true,
    },
  ];

  const reqs = ["gym", "school", "store"];

  interface Block {
    [req: string]: boolean | number;
  }

  const solve = (blocks: Block[], reqs: string[]) => {
    if (!blocks.length) return -1;

    if (blocks.length === 1) return 1;

    const distances: Block[] = [reqs.reduce((res, req) => ({ ...res, [req]: -1 }), { max: -1 })];

    let best: number = blocks.length - 1;

    for (let i = 1; i < blocks.length; i++) {
      const distance: Block = reqs.reduce((res, req) => ({ ...res, [req]: -1 }), { max: -1 });

      for (let j = 0; j < reqs.length; j++) {
        const req = reqs[j];

        if (blocks[i][req]) {
          distance[req] = 0;
        } else {
          const prev = distances[i - 1][req] as number;

          if (prev >= 0) {
            distance[req] = prev + 1;
          }
        }

        if (distance[req] > distance.max) {
          distance.max = distance[req];
        }
      }

      distances.push(distance);
    }

    for (let i = blocks.length - 2; i >= 0; i--) {
      const distance = distances[i];

      for (let j = 0; j < reqs.length; j++) {
        const req = reqs[j];

        if (blocks[i][req]) {
          distance[req] = 0;
        } else {
          const prev = distances[i + 1][req] as number;

          if (prev >= 0 && distance[req] < 0) {
            distance[req] = prev + 1;
          }
        }

        if (distance[req] > distance.max) {
          distance.max = distance[req];
        }
      }

      if (best < 0 || distance.max < distances[best].max) {
        best = i;
      }
    }

    return best;
  };

  console.log(blocks);
  console.log(reqs);

  const output = solve(blocks, reqs);

  console.log("index of best:", output);
} catch (e) {
  console.error(e);
}
