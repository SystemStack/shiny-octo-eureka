// function createSpiderLeg() {}

// function createSpider() {
//   // a spider model has 8 legs, each leg has 2 bones, and each bone has 2 vertices
//   // the vertices are stored in an array of length 24
//   // the first 8 vertices are the first leg, the next 8 are the second leg, and so on
//   // the first 4 vertices are the first bone, the next 4 are the second bone, and so on
//   // the first 2 vertices are the first vertex, the next 2 are the second vertex, and so on
//   // the first vertex is the top of the first bone, the second vertex is the bottom of the first bone,
//   // the third vertex is the top of the second bone, and so on
//   // the first vertex is the top of the first leg, the second vertex is the bottom of the first leg,
//   // the third vertex is the top of the second leg, and so on
//   var vertices = [
//     // leg 1
//     -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
//     // leg 2
//     -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
//     // leg 3
//     -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
//     // leg 4
//     -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
//     // leg 5
//     -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
//     // leg 6
//     -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
//     // leg 7
//     -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
//     // leg 8
//     -0.05, 0.05, 0.0, -0.05, -0.05, 0.0, 0.05, -0.05, 0.0, 0.05, 0.05, 0.0,
//     // spine
//     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//     // head
//     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//     // eye
//     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//     // mouth
//     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
//   ];
//   var indices = [
//     // leg 1
//     0, 1, 2, 0, 2, 3,
//     // leg 2
//     4, 5, 6, 4, 6, 7,
//     // leg 3
//     8, 9, 10, 8, 10, 11,
//     // leg 4
//     12, 13, 14, 12, 14, 15,
//     // leg 5
//     16, 17, 18, 16, 18, 19,
//     // leg 6
//     20, 21, 22, 20, 22, 23,
//     // leg 7
//     24, 25, 26, 24, 26, 27,
//     // leg 8
//     28, 29, 30, 28, 30, 31,
//     // spine
//     32, 33, 34, 32, 34, 35,
//     // head
//     36, 37, 38, 36, 38, 39,
//     // eye
//     40, 41, 42, 40, 42, 43,
//     // mouth
//     44, 45, 46, 44, 46, 47,
//   ];
//   var geometry = new BufferGeometry();
//   geometry.setIndex(indices);
//   geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
//   geometry.computeBoundingSphere();
//   var material = new MeshBasicMaterial({
//     color: "white",
//     wireframe: false,
//   });
//   var mesh = new Mesh(geometry, material);
//   // mesh.scale.set(0.1, 0.1, 0.1);
//   mesh.scale.set(1, 1, 1);
//   mesh.updateMatrix();
//   return mesh;
// }
