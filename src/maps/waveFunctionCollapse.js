// // create a 20x20 grid of cells with a 2d array of characters and colors for each cell using a wave function collapse algorithm
// function waveFunctionCollapse(width, height, seed) {
//   const map = [];
//   const random = new Random(seed);
//   const grid = [];
//   for (let y = 0; y < height; y++) {
//     const row = [];
//     for (let x = 0; x < width; x++) {
//       // row.push(random.nextInt(0, 5));
//       row.push(random.nextTile(0, 5));
//     }
//     grid.push(row);
//   }
//   return grid;
//   // for (let y = 0; y < height; y++) {
//   //   for (let x = 0; x < width; x++) {
//   //     // if (grid[y][x] === 1) {
//   //     map.push({ x, y });
//   //     // } else {
//   //     // console.log(`${x},${y}`);
//   //     // }
//   //   }
//   // }

//   // return map;
// }
// function Random(seed) {
//   this.seed = seed;
//   this.next = function () {
//     this.seed = (this.seed * 9301 + 49297) % 233280;
//     return this.seed / 233280;
//   };
//   this.nextInt = function (min, max) {
//     return Math.floor(this.next() * (max - min + 1) + min);
//   };
//   this.nextTile = function (min, max) {
//     return intToTile(this.nextInt(min, max));
//   };
// }
// function intToTile(i) {
//   switch (i) {
//     case 0:
//       return "🌱";
//     case 1:
//       return "🏝";
//     case 2:
//       return "🌳";
//     case 3:
//       return "💐";
//     case 4:
//       return "🌆";
//     default:
//       return "👹";
//   }
// }

// function prettyPrint(_map) {
//   let grid = _map.map((row) => row.join("")).join("\n");
//   console.log(grid);
//   // console.log(grid.map((row) => row.join("")).join("\n"));
//   // console.log(_map.map(({ x, y }) => `${x},${y}`).join("\n"));
//   // const str = _map
//   //   .map((row) => row.map((cell) => (cell === 1 ? "X" : " ")))
//   //   .join("\n");
//   // console.log(str);
//   // }
//   //   const str = map
//   //     .map((row) => row.map((cell) => (cell === 1 ? "X" : " ")))
//   //     .join("\n");
//   //   console.log(str);
// }
// const map = waveFunctionCollapse(5, 5, 25);
// prettyPrint(map);
