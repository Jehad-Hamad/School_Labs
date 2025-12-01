function drawPlane(gl, plane) {
  var xformMatrix = new Matrix4();
  xformMatrix.setIdentity();
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, plane);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, plane.vertexCount);
}

function drawSphere(gl, sphere, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .rotate(...rotating1)
    .rotate(...rotating2)
    .scale(...scaling);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, sphere);
  gl.drawElements(gl.TRIANGLES, sphere.indicesCount, gl.UNSIGNED_SHORT, 0);
}

function drawCylinder(gl, cylinder, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, cylinder);
  gl.drawElements(gl.TRIANGLES, cylinder.indicesCount, gl.UNSIGNED_SHORT, 0);
}

function drawPyramid(gl, pyramid, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, pyramid);
  gl.drawElements(gl.TRIANGLES, pyramid.indicesCount, gl.UNSIGNED_SHORT, 0);
}

function drawCircle(gl, circle, moving, scaling, rotating1) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, circle);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, circle.vertexCount);
}

function drawTriangle(gl, triangle, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, triangle);
  gl.drawArrays(gl.TRIANGLES, 0, triangle.vertexCount);
}

function drawSheet(gl, sheet, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, sheet);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, sheet.vertexCount);
}

function drawStar(gl, star, moving, scaling, rotating1) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, star);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, star.vertexCount);
}

function drawLine(gl, line, moving, scaling, rotating1) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, line);
  gl.drawArrays(gl.LINES, 0, line.vertexCount);
}

function drawCube(gl, cube, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, cube);
  gl.drawElements(gl.TRIANGLES, cube.indicesCount, gl.UNSIGNED_SHORT, 0);
}

function drawObject(gl, object, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, object);
  gl.drawElements(gl.TRIANGLES, object.indicesCount, gl.UNSIGNED_SHORT, 0);
}

function drawPlanes(gl, planes) {
  for (var i = 0; i < planes.length; i++) {
    drawPlane(gl, planes[i]);
  }
}

function drawPath(gl, sheet, benchs) {
  // STARTING PATH Leading to big encloure
  var pathX = WALL_MIN_X + 15;

  if (eyeX < WALL_MIN_X + 40 && eyeZ > -5 && eyeZ < 25) {
    drawSheet(
      gl,
      sheet,
      [pathX, 0.01, 0],
      [30, 0, 3.5],
      [90, 1, 0, 0],
      [0, 1, 0, 0]
    );

    drawObject(
      gl,
      benchs[0],
      [pathX - 10, 0, -3],
      [0.05, 0.05, 0.05],
      [-90, 0, 1, 0],
      [0, 1, 0, 0]
    );
  }

  // vertical line
  drawSheet(
    gl,
    sheet,
    [0, 0.01, 0],
    [WALL_MAX_X + 40, 0, 3.5],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  if (eyeX <= -15) {
    drawObject(
      gl,
      benchs[1],
      [pathX + 20, 0, -3],
      [0.05, 0.05, 0.05],
      [-90, 0, 1, 0],
      [0, 1, 0, 0]
    );

    drawObject(
      gl,
      benchs[2],
      [pathX + 40, 0, 3],
      [0.05, 0.05, 0.05],
      [90, 0, 1, 0],
      [0, 1, 0, 0]
    );
  }

  if (eyeX >= -15) {
    drawObject(
      gl,
      benchs[0],
      [pathX + 80, 0, 3],
      [0.05, 0.05, 0.05],
      [90, 0, 1, 0],
      [0, 1, 0, 0]
    );

    drawObject(
      gl,
      benchs[2],
      [pathX + 90, 0, -3],
      [0.05, 0.05, 0.05],
      [-90, 0, 1, 0],
      [0, 1, 0, 0]
    );
  }

  // horizontal line
  if (eyeX >= -20) {
    drawSheet(
      gl,
      sheet,
      [0, 0.01, 0],
      [3.5, 0, WALL_MAX_X + 40],
      [90, 1, 0, 0],
      [0, 1, 0, 0]
    );

    if (eyeZ <= -5) {
      drawObject(
        gl,
        benchs[0],
        [3, 0, pathX + 40],
        [0.05, 0.05, 0.05],
        [180, 0, 1, 0], // Facing the path from other side
        [0, 1, 0, 0]
      );

      drawObject(
        gl,
        benchs[2],
        [-3, 0, pathX + 60],
        [0.05, 0.05, 0.05],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      );
    }

    if (eyeZ >= 5) {
      drawObject(
        gl,
        benchs[1],
        [3, 0, 15],
        [0.05, 0.05, 0.05],
        [180, 0, 1, 0],
        [0, 1, 0, 0]
      );

      drawObject(
        gl,
        benchs[0],
        [-3, 0, 30],
        [0.05, 0.05, 0.05],
        [0, 0, 1, 0],
        [0, 1, 0, 0]
      );
    }
  }
}
function drawFence(gl, fenceShapes, moving = [0, 0, 0], scaling = [1, 1, 1]) {
  var wallPiller = fenceShapes[0];
  var sheetPiller = fenceShapes[1];

  // Apply base transformation to all fence components
  const baseX = moving[0];
  const baseY = moving[1];
  const baseZ = moving[2];
  const scaleX = scaling[0];
  const scaleY = scaling[1];
  const scaleZ = scaling[2];

  // Calculate fence positions based on wall boundaries
  const FENCE_OFFSET = 29.5; // Distance from wall edge to fence (200 - 170.5)
  const ENTRANCE_DEPTH = 10; // How far the entrance extends
  const DOOR_WIDTH = 6; // Width of door opening (3 units on each side)

  const frontFenceX = WALL_MIN_X + FENCE_OFFSET;
  const backFenceX = WALL_MAX_X - FENCE_OFFSET;
  const leftFenceZ = WALL_MIN_Z + FENCE_OFFSET;
  const rightFenceZ = WALL_MAX_Z - FENCE_OFFSET;

  const fenceLength = WALL_MAX_Z - WALL_MIN_Z - 2 * FENCE_OFFSET;
  const fenceWidth = WALL_MAX_X - WALL_MIN_X - 2 * FENCE_OFFSET;
  const halfFenceLength = (fenceLength - DOOR_WIDTH) / 2;

  // FRONT WALL (X = frontFenceX) - door opening at Z=0
  // Back corner pillar
  drawCube(
    gl,
    wallPiller,
    [
      baseX + frontFenceX * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + leftFenceZ * scaleZ,
    ],
    [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // pillar before door
  drawCube(
    gl,
    wallPiller,
    [baseX + frontFenceX * scaleX, baseY + 0.01 * scaleY, baseZ + -3 * scaleZ],
    [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom (left section)
  drawCube(
    gl,
    wallPiller,
    [
      baseX + frontFenceX * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + (leftFenceZ + halfFenceLength / 2) * scaleZ,
    ],
    [0.3 * scaleX, 1 * scaleY, (halfFenceLength / 2 - 0.5) * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill (left section)
  drawSheet(
    gl,
    sheetPiller,
    [
      baseX + frontFenceX * scaleX,
      baseY + 3.5 * scaleY,
      baseZ + (leftFenceZ + halfFenceLength / 2) * scaleZ,
    ],
    [1 * scaleX, 5 * scaleY, (halfFenceLength - 1) * scaleZ],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // horizontal bar top (left section)
  drawCube(
    gl,
    wallPiller,
    [
      baseX + frontFenceX * scaleX,
      baseY + 6 * scaleY,
      baseZ + (leftFenceZ + halfFenceLength / 2) * scaleZ,
    ],
    [0.3 * scaleX, 1 * scaleY, (halfFenceLength / 2 - 0.5) * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // pillar after door
  drawCube(
    gl,
    wallPiller,
    [baseX + frontFenceX * scaleX, baseY + 0.01 * scaleY, baseZ + 3 * scaleZ],
    [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // front corner pillar
  drawCube(
    gl,
    wallPiller,
    [
      baseX + frontFenceX * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + rightFenceZ * scaleZ,
    ],
    [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom (right section)
  drawCube(
    gl,
    wallPiller,
    [
      baseX + frontFenceX * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + (rightFenceZ - halfFenceLength / 2) * scaleZ,
    ],
    [0.3 * scaleX, 1 * scaleY, (halfFenceLength / 2 - 0.5) * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill (right section)
  drawSheet(
    gl,
    sheetPiller,
    [
      baseX + frontFenceX * scaleX,
      baseY + 3.5 * scaleY,
      baseZ + (rightFenceZ - halfFenceLength / 2) * scaleZ,
    ],
    [1 * scaleX, 5 * scaleY, (halfFenceLength - 1) * scaleZ],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // horizontal bar top (right section)
  drawCube(
    gl,
    wallPiller,
    [
      baseX + frontFenceX * scaleX,
      baseY + 6 * scaleY,
      baseZ + (rightFenceZ - halfFenceLength / 2) * scaleZ,
    ],
    [0.3 * scaleX, 1 * scaleY, (halfFenceLength / 2 - 0.5) * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Entrance
  const entranceX = frontFenceX - ENTRANCE_DEPTH;

  // pillar in front of pillar before door
  drawCube(
    gl,
    wallPiller,
    [baseX + entranceX * scaleX, baseY + 0.01 * scaleY, baseZ + -3 * scaleZ],
    [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom
  drawCube(
    gl,
    wallPiller,
    [
      baseX + (frontFenceX - ENTRANCE_DEPTH / 2) * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + 3 * scaleZ,
    ],
    [(ENTRANCE_DEPTH / 2 - 0.3) * scaleX, 1 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetPiller,
    [
      baseX + (frontFenceX - ENTRANCE_DEPTH / 2) * scaleX,
      baseY + 3.5 * scaleY,
      baseZ + 3 * scaleZ,
    ],
    [(ENTRANCE_DEPTH - 0.6) * scaleX, 5 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar top
  drawCube(
    gl,
    wallPiller,
    [
      baseX + (frontFenceX - ENTRANCE_DEPTH / 2) * scaleX,
      baseY + 6 * scaleY,
      baseZ + 3 * scaleZ,
    ],
    [(ENTRANCE_DEPTH / 2 - 0.3) * scaleX, 1 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // pillar in front of pillar after door
  drawCube(
    gl,
    wallPiller,
    [baseX + entranceX * scaleX, baseY + 0.01 * scaleY, baseZ + 3 * scaleZ],
    [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom
  drawCube(
    gl,
    wallPiller,
    [
      baseX + (frontFenceX - ENTRANCE_DEPTH / 2) * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + -3 * scaleZ,
    ],
    [(ENTRANCE_DEPTH / 2 - 0.3) * scaleX, 1 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetPiller,
    [
      baseX + (frontFenceX - ENTRANCE_DEPTH / 2) * scaleX,
      baseY + 3.5 * scaleY,
      baseZ + -3 * scaleZ,
    ],
    [(ENTRANCE_DEPTH - 0.6) * scaleX, 5 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar top
  drawCube(
    gl,
    wallPiller,
    [
      baseX + (frontFenceX - ENTRANCE_DEPTH / 2) * scaleX,
      baseY + 6 * scaleY,
      baseZ + -3 * scaleZ,
    ],
    [(ENTRANCE_DEPTH / 2 - 0.3) * scaleX, 1 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // BACK WALL (X = backFenceX) - solid
  // back corner pillar
  drawCube(
    gl,
    wallPiller,
    [
      baseX + backFenceX * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + leftFenceZ * scaleZ,
    ],
    [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // front corner pillar
  drawCube(
    gl,
    wallPiller,
    [
      baseX + backFenceX * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + rightFenceZ * scaleZ,
    ],
    [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom
  drawCube(
    gl,
    wallPiller,
    [baseX + backFenceX * scaleX, baseY + 0.01 * scaleY, baseZ + 0 * scaleZ],
    [0.3 * scaleX, 1 * scaleY, (fenceLength / 2) * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetPiller,
    [baseX + backFenceX * scaleX, baseY + 3.5 * scaleY, baseZ + 0 * scaleZ],
    [1 * scaleX, 5 * scaleY, fenceLength * scaleZ],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // horizontal bar top
  drawCube(
    gl,
    wallPiller,
    [baseX + backFenceX * scaleX, baseY + 6 * scaleY, baseZ + 0 * scaleZ],
    [0.3 * scaleX, 1 * scaleY, (fenceLength / 2) * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // RIGHT WALL (Z = rightFenceZ)
  // horizontal bar bottom
  drawCube(
    gl,
    wallPiller,
    [baseX + 0 * scaleX, baseY + 0.01 * scaleY, baseZ + rightFenceZ * scaleZ],
    [(fenceWidth / 2) * scaleX, 1 * scaleY, 0.3 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetPiller,
    [baseX + 0 * scaleX, baseY + 3.5 * scaleY, baseZ + rightFenceZ * scaleZ],
    [fenceWidth * scaleX, 5 * scaleY, 0.3 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar top
  drawCube(
    gl,
    wallPiller,
    [baseX + 0 * scaleX, baseY + 6 * scaleY, baseZ + rightFenceZ * scaleZ],
    [(fenceWidth / 2) * scaleX, 1 * scaleY, 0.3 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // LEFT WALL (Z = leftFenceZ)
  // horizontal bar bottom
  drawCube(
    gl,
    wallPiller,
    [baseX + 0 * scaleX, baseY + 0.01 * scaleY, baseZ + leftFenceZ * scaleZ],
    [(fenceWidth / 2) * scaleX, 1 * scaleY, 0.3 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetPiller,
    [baseX + 0 * scaleX, baseY + 3.5 * scaleY, baseZ + leftFenceZ * scaleZ],
    [fenceWidth * scaleX, 5 * scaleY, 0.3 * scaleZ],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // horizontal bar top
  drawCube(
    gl,
    wallPiller,
    [baseX + 0 * scaleX, baseY + 6 * scaleY, baseZ + leftFenceZ * scaleZ],
    [(fenceWidth / 2) * scaleX, 1 * scaleY, 0.3 * scaleZ],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
}

function drawTicketStand(gl, cubes) {
  var wallP = cubes[0];
  var sheetP = cubes[1];

  // Position outside the fence entrance
  const FENCE_OFFSET = 29.5;
  const ENTRANCE_DEPTH = 10;
  const frontFenceX = WALL_MIN_X + FENCE_OFFSET;
  const entranceX = frontFenceX - ENTRANCE_DEPTH;

  const standX = entranceX - 8;
  const standZ = 8; // Centered with entrance
  const boxSize = 5.5; // Size of the square

  mangrovePillers = createCube(gl, [0.53, 0.29, 0.15]);
  cherryRoof = createCube(gl, [0.89, 0.5, 0.62]);
  cherry = createSheet(gl, [0.89, 0.5, 0.62]);
  glassColor = createSheet(gl, [0.7, 0.85, 0.9]);

  //PILLERS
  // Front left pillar
  drawCube(
    gl,
    mangrovePillers,
    [standX - boxSize / 2 + 0.5, 0, standZ - boxSize / 2],
    [0.25, 6, 0.15],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Front right pillar
  drawCube(
    gl,
    mangrovePillers,
    [standX - boxSize / 2 + 0.5, 0, standZ + boxSize / 2],
    [0.25, 6, 0.15],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Back left pillar
  drawCube(
    gl,
    mangrovePillers,
    [standX + boxSize / 2 - 0.5, 0, standZ - boxSize / 2],
    [0.25, 6, 0.15],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Back right pillar
  drawCube(
    gl,
    mangrovePillers,
    [standX + boxSize / 2 - 0.5, 0, standZ + boxSize / 2],
    [0.25, 6, 0.15],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // PLANKS
  // Front plank
  drawSheet(
    gl,
    cherry,
    [standX - boxSize / 2 + 0.5, 0.15, standZ],
    [0.05, 3, boxSize],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // Back plank
  drawSheet(
    gl,
    cherry,
    [standX + boxSize / 2 - 0.5, 0.15, standZ],
    [0.05, 3, boxSize],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // Left plank
  drawSheet(
    gl,
    cherry,
    [standX, 0.15, standZ - boxSize / 2],
    [boxSize - 1, 3, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Left plank
  drawSheet(
    gl,
    cherry,
    [standX, 0.15, standZ + boxSize / 2],
    [boxSize - 1, 3, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // GLASS
  // Front glass
  drawSheet(
    gl,
    glassColor,
    [standX - boxSize / 2 + 0.5, 4.25, standZ],
    [0.05, 2.5, boxSize],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // Back glass
  drawSheet(
    gl,
    glassColor,
    [standX + boxSize / 2 - 0.5, 4.25, standZ],
    [0.05, 2.5, boxSize],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // Left glass
  drawSheet(
    gl,
    glassColor,
    [standX, 4.25, standZ - boxSize / 2],
    [boxSize - 1, 2.5, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Right glass
  drawSheet(
    gl,
    glassColor,
    [standX, 4.25, standZ + boxSize / 2],
    [boxSize - 1, 2.5, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Roof
  drawCube(
    gl,
    cherryRoof,
    [standX, 6, standZ],
    [boxSize / 2 + 0.5, 1, boxSize / 2 + 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
}
