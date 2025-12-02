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

function drawLamp(gl, lamp, moving, scaling, rotating1, rotating2) {
  //base
  drawCube(
    gl,
    lamp[0],
    [moving[0], moving[1], moving[2]],
    [scaling[0], scaling[1], scaling[2]],
    [rotating1[0], rotating1[1], rotating1[2], rotating1[3]],
    [rotating2[0], rotating2[1], rotating2[2], rotating2[3]]
  );

  //post
  drawCube(
    gl,
    lamp[0],
    [moving[0], moving[1], moving[2]],
    [scaling[0] * 0.5, scaling[1] * 6, scaling[2] * 0.5],
    [rotating1[0], rotating1[1], rotating1[2], rotating1[3]],
    [rotating2[0], rotating2[1], rotating2[2], rotating2[3]]
  );

  //baselight
  drawCube(
    gl,
    lamp[0],
    [moving[0], moving[1] + scaling[1] * 6, moving[2]],
    [scaling[0], scaling[1], scaling[2]],
    [rotating1[0], rotating1[1], rotating1[2], rotating1[3]],
    [rotating2[0], rotating2[1], rotating2[2], rotating2[3]]
  );

  // panes
  //front
  drawSheet(
    gl,
    lamp[1],
    [moving[0] + scaling[0] * -1, moving[1] + scaling[1] * 7.5, moving[2]],
    [scaling[0], scaling[1], scaling[2] * 2],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  //back
  drawSheet(
    gl,
    lamp[1],
    [moving[0] + scaling[0] * 1, moving[1] + scaling[1] * 7.5, moving[2]],
    [scaling[0], scaling[1], scaling[2] * 2],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  //right
  drawSheet(
    gl,
    lamp[1],
    [moving[0], moving[1] + scaling[1] * 7.5, moving[2] + scaling[2] * 1],
    [scaling[0] * 2, scaling[1], scaling[2]],
    [90, 0, 0, 1],
    [0, 1, 0, 0]
  );

  //left
  drawSheet(
    gl,
    lamp[1],
    [moving[0], moving[1] + scaling[1] * 7.5, moving[2] + scaling[2] * -1],
    [scaling[0] * 2, scaling[1], scaling[2]],
    [90, 0, 0, 1],
    [0, 1, 0, 0]
  );

  //roof
  drawCube(
    gl,
    lamp[0],
    [moving[0], moving[1] + scaling[1] * 8, moving[2]],
    [scaling[0], scaling[1] * 0.5, scaling[2]],
    [rotating1[0], rotating1[1], rotating1[2], rotating1[3]],
    [rotating2[0], rotating2[1], rotating2[2], rotating2[3]]
  );
}

function drawPath(gl, sheet, benchs, lamp) {
  // STARTING PATH Leading to big enclosure
  var pathX = WALL_MIN_X + 15;

  if (eyeX < WALL_MIN_X + 40 && eyeZ > -5 && eyeZ < 25) {
    // Break starting path into segments (30 units total, 10 per segment)
    for (let i = 0; i < 3; i++) {
      drawSheet(
        gl,
        sheet,
        [pathX + i * 10, 0.01, 0],
        [10, 0, 3.5],
        [90, 1, 0, 0],
        [0, 1, 0, 0]
      );
    }

    drawObject(
      gl,
      benchs[0],
      [pathX - 10, 0, -3],
      [0.05, 0.05, 0.05],
      [-90, 0, 1, 0],
      [0, 1, 0, 0]
    );

    drawLamp(
      gl,
      lamp,
      [pathX - 10, 0.0, 4.0],
      [0.5, 1.0, 0.7],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );

    drawLamp(
      gl,
      lamp,
      [pathX, 0.0, -4.0],
      [0.5, 1.0, 0.7],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // vertical line - break into segments
  // Only render when not in a room (when eyeZ is between -5 and 5)
  if (eyeZ > -5 && eyeZ < 5) {
    var verticalLength = WALL_MAX_X + 40;
    var numVerticalSegments = Math.ceil(verticalLength / 10);

    for (let i = 0; i < numVerticalSegments; i++) {
      var segmentLength = Math.min(10, verticalLength - i * 10);
      drawSheet(
        gl,
        sheet,
        [-(WALL_MAX_X + 40) / 2 + i * 10, 0.01, 0],
        [segmentLength, 0, 3.5],
        [90, 1, 0, 0],
        [0, 1, 0, 0]
      );
    }
  }

  // Only render these benches/lamps when in the left area and not in rooms
  if (eyeX <= -15 && eyeZ > -5 && eyeZ < 5) {
    drawObject(
      gl,
      benchs[1],
      [pathX + 20, 0, -3],
      [0.05, 0.05, 0.05],
      [-90, 0, 1, 0],
      [0, 1, 0, 0]
    );

    drawLamp(
      gl,
      lamp,
      [pathX + 30, 0.0, 3.0],
      [0.5, 1.0, 0.7],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );

    drawObject(
      gl,
      benchs[2],
      [pathX + 40, 0, 3.0],
      [0.05, 0.05, 0.05],
      [90, 0, 1, 0],
      [0, 1, 0, 0]
    );

    drawLamp(
      gl,
      lamp,
      [pathX + 50, 0.0, -3.0],
      [0.5, 1.0, 0.7],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Only render these benches/lamps when in the right area and not in rooms
  if (eyeX >= -15 && eyeZ > -5 && eyeZ < 5) {
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

    // Lamp near second bench
    drawLamp(
      gl,
      lamp,
      [pathX + 95, 0.0, 3.5],
      [0.5, 1.0, 0.7],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // horizontal line - break into segments
  // Only render when not in starting area and not in rooms (when eyeX is between -5 and 5)
  if (eyeX >= -20 && eyeX > -5 && eyeX < 5) {
    var horizontalLength = WALL_MAX_X + 40;
    var numHorizontalSegments = Math.ceil(horizontalLength / 10);

    for (let i = 0; i < numHorizontalSegments; i++) {
      var segmentLength = Math.min(10, horizontalLength - i * 10);
      drawSheet(
        gl,
        sheet,
        [0, 0.01, -(WALL_MAX_X + 40) / 2 + i * 10],
        [3.5, 0, segmentLength],
        [90, 1, 0, 0],
        [0, 1, 0, 0]
      );
    }
  }

  // Only render these benches/lamps when in the top area and not in rooms
  if (eyeX >= -20 && eyeZ <= -5 && eyeX > -5 && eyeX < 5) {
    drawObject(
      gl,
      benchs[0],
      [3, 0, pathX + 40],
      [0.05, 0.05, 0.05],
      [180, 0, 1, 0],
      [0, 1, 0, 0]
    );

    // Lamp on horizontal path
    drawLamp(
      gl,
      lamp,
      [-4.0, 0.0, pathX + 35],
      [0.5, 1.0, 0.7],
      [0, 1, 0, 0],
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

    // Another lamp
    drawLamp(
      gl,
      lamp,
      [4.0, 0.0, pathX + 55],
      [0.5, 1.0, 0.7],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Only render these benches/lamps when in the bottom area and not in rooms
  if (eyeX >= -20 && eyeZ >= 5 && eyeX > -5 && eyeX < 5) {
    drawObject(
      gl,
      benchs[1],
      [3, 0, 15],
      [0.05, 0.05, 0.05],
      [180, 0, 1, 0],
      [0, 1, 0, 0]
    );

    // Lamp near entrance
    drawLamp(
      gl,
      lamp,
      [-4.0, 0.0, 10],
      [0.5, 1.0, 0.7],
      [0, 1, 0, 0],
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

    // Lamp in middle area
    drawLamp(
      gl,
      lamp,
      [4.0, 0.0, 25],
      [0.5, 1.0, 0.7],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }
}

function drawFence(
  gl,
  fenceShapes,
  moving = [0, 0, 0],
  scaling = [1, 1, 1],
  door = true,
  flipFrontBack = false
) {
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
  const FENCE_OFFSET = 29.5;
  const ENTRANCE_DEPTH = 10;
  const DOOR_WIDTH = door ? 6 : 23; // Wider opening when no door entrance

  // Swap front and back if flag is set
  const frontFenceX = flipFrontBack
    ? WALL_MAX_X - FENCE_OFFSET
    : WALL_MIN_X + FENCE_OFFSET;
  const backFenceX = flipFrontBack
    ? WALL_MIN_X + FENCE_OFFSET
    : WALL_MAX_X - FENCE_OFFSET;
  const leftFenceZ = WALL_MIN_Z + FENCE_OFFSET;
  const rightFenceZ = WALL_MAX_Z - FENCE_OFFSET;

  const fenceLength = WALL_MAX_Z - WALL_MIN_Z - 2 * FENCE_OFFSET;
  const fenceWidth = WALL_MAX_X - WALL_MIN_X - 2 * FENCE_OFFSET;
  const halfFenceLength = (fenceLength - DOOR_WIDTH) / 2;

  // Calculate door pillar positions based on door width
  const doorPillarOffset = DOOR_WIDTH / 2;

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
    [
      baseX + frontFenceX * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + -doorPillarOffset * scaleZ,
    ],
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
    [
      baseX + frontFenceX * scaleX,
      baseY + 0.01 * scaleY,
      baseZ + doorPillarOffset * scaleZ,
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

  if (door == true) {
    // Entrance - adjust direction based on flip
    const entranceX = flipFrontBack
      ? frontFenceX + ENTRANCE_DEPTH
      : frontFenceX - ENTRANCE_DEPTH;

    // pillar in front of pillar before door
    drawCube(
      gl,
      wallPiller,
      [
        baseX + entranceX * scaleX,
        baseY + 0.01 * scaleY,
        baseZ + -doorPillarOffset * scaleZ,
      ],
      [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );

    // horizontal bar bottom
    drawCube(
      gl,
      wallPiller,
      [
        baseX +
          (flipFrontBack
            ? frontFenceX + ENTRANCE_DEPTH / 2
            : frontFenceX - ENTRANCE_DEPTH / 2) *
            scaleX,
        baseY + 0.01 * scaleY,
        baseZ + doorPillarOffset * scaleZ,
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
        baseX +
          (flipFrontBack
            ? frontFenceX + ENTRANCE_DEPTH / 2
            : frontFenceX - ENTRANCE_DEPTH / 2) *
            scaleX,
        baseY + 3.5 * scaleY,
        baseZ + doorPillarOffset * scaleZ,
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
        baseX +
          (flipFrontBack
            ? frontFenceX + ENTRANCE_DEPTH / 2
            : frontFenceX - ENTRANCE_DEPTH / 2) *
            scaleX,
        baseY + 6 * scaleY,
        baseZ + doorPillarOffset * scaleZ,
      ],
      [(ENTRANCE_DEPTH / 2 - 0.3) * scaleX, 1 * scaleY, 0.5 * scaleZ],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );

    // pillar in front of pillar after door
    drawCube(
      gl,
      wallPiller,
      [
        baseX + entranceX * scaleX,
        baseY + 0.01 * scaleY,
        baseZ + doorPillarOffset * scaleZ,
      ],
      [0.3 * scaleX, 7 * scaleY, 0.5 * scaleZ],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );

    // horizontal bar bottom
    drawCube(
      gl,
      wallPiller,
      [
        baseX +
          (flipFrontBack
            ? frontFenceX + ENTRANCE_DEPTH / 2
            : frontFenceX - ENTRANCE_DEPTH / 2) *
            scaleX,
        baseY + 0.01 * scaleY,
        baseZ + -doorPillarOffset * scaleZ,
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
        baseX +
          (flipFrontBack
            ? frontFenceX + ENTRANCE_DEPTH / 2
            : frontFenceX - ENTRANCE_DEPTH / 2) *
            scaleX,
        baseY + 3.5 * scaleY,
        baseZ + -doorPillarOffset * scaleZ,
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
        baseX +
          (flipFrontBack
            ? frontFenceX + ENTRANCE_DEPTH / 2
            : frontFenceX - ENTRANCE_DEPTH / 2) *
            scaleX,
        baseY + 6 * scaleY,
        baseZ + -doorPillarOffset * scaleZ,
      ],
      [(ENTRANCE_DEPTH / 2 - 0.3) * scaleX, 1 * scaleY, 0.5 * scaleZ],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

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

function drawPolarBear(gl, moving, scaling, rotating1, rotating2) {
  const polarbear = createObject(gl, polarbearkObj, [0.91, 0.85, 0.66]);
  drawObject(
    gl,
    polarbear,
    [WALL_MAX_X - 65, 0, WALL_MAX_Z - 65],
    [1.0, 1.0, 1.0],
    [180, 0, 1, 0],
    [0, 1, 0, 0]
  );
  const blackSphere = createSphere(gl, [0.0, 0.0, 0.0]);
  //left eye
  drawSphere(
    gl,
    blackSphere,
    [WALL_MAX_X - 67.2, 2.6, WALL_MAX_Z - 64.9],
    [0.05, 0.05, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
  //right eye
  drawSphere(
    gl,
    blackSphere,
    [WALL_MAX_X - 67.2, 2.6, WALL_MAX_Z - 65.1],
    [0.05, 0.05, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
  //nose
  drawSphere(
    gl,
    blackSphere,
    [WALL_MAX_X - 67.4, 2.2, WALL_MAX_Z - 65],
    [0.12, 0.12, 0.12],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
}

function drawPenguin(gl, x, z, scale) {
  const greenSphere = createSphere(gl, [0.54, 0.9, 0.36]);
  const blueBodySphere = createSphere(gl, [0.0, 0.4, 0.8]);
  const redSphere = createSphere(gl, [1.0, 0.0, 0.0]);
  const yellowSphere = createSphere(gl, [1.0, 1.0, 0.1]);
  const whiteSphere = createSphere(gl, [1.0, 1.0, 1.0]);
  const blackSphere = createSphere(gl, [0.0, 0.0, 0.0]);
  const natchoSphere = createSphere(gl, [1.0, 0.65, 0.17]);
  const spheres = [
    greenSphere,
    blueBodySphere,
    redSphere,
    yellowSphere,
    whiteSphere,
    blackSphere,
    natchoSphere,
  ];

  const armCylinder = createCylinder(gl, [1.0, 0.0, 0.0]);
  const mallotCylinder = createCylinder(gl, [0.55, 0.27, 0.07]);
  const whiteCylinder = createCylinder(gl, [1.0, 1.0, 1.0]);
  const cylinders = [armCylinder, mallotCylinder, whiteCylinder];

  const mallotCircle = createCircle(gl, [1.0, 0.0, 0.0]);
  const circles = [mallotCircle];

  const yellowTriangle = createTriangle(gl, [1.0, 1.0, 0.0], [0, 0, -1]);
  const redTriangle = createTriangle(gl, [1.0, 0.0, 0.0]);
  const triangles = [yellowTriangle, redTriangle];

  const star = createStar(gl, [1.0, 1.0, 0.0]);
  const stars = [star];

  const pyramid = createPyramid(gl, [1.0, 1.0, 0.0]);
  const pyramids = [pyramid];

  // PENGUIN
  // Body
  drawSphere(
    gl,
    spheres[1],
    [0 + x, 0.63 * scale, 0.2 + z],
    [0.4 * scale, 0.4 * scale, 0.4 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // White scarf and coat
  drawSphere(
    gl,
    spheres[2],
    [0.0 + x, 0.6 * scale, 0.0 + z],
    [0.5 * scale, 0.5 * scale, 0.5 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawSphere(
    gl,
    spheres[4],
    [0.15 * scale + x, 0.6 * scale, 0.09 * scale + z],
    [0.13 * scale, 0.5 * scale, 0.4 * scale],
    [0, 0, 0, 1],
    [40, 0, 1, 0]
  );
  drawSphere(
    gl,
    spheres[4],
    [-0.15 * scale + x, 0.6 * scale, 0.09 * scale + z],
    [0.13 * scale, 0.5 * scale, 0.4 * scale],
    [0, 0, 0, 1],
    [-40, 0, 1, 0]
  );
  drawSphere(
    gl,
    spheres[4],
    [-0.011 * scale + x, 1.0 * scale, 0.04 * scale + z],
    [0.2 * scale, 0.17 * scale, 0.35 * scale],
    [0, 0, 0, 1],
    [90, 0, 1, 0]
  );

  // Head
  drawSphere(
    gl,
    spheres[1],
    [0 + x, 1.2 * scale, 0.2 + z],
    [0.3 * scale, 0.3 * scale, 0.3 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Beak
  drawPyramid(
    gl,
    pyramids[0],
    [0.0 + x, 1.07 * scale, 0.5 * scale + z],
    [0.15 * scale, 0.06 * scale, 0.23 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  ); // Top beak
  drawPyramid(
    gl,
    pyramids[0],
    [0.0 + x, 1.07 * scale, 0.5 * scale + z],
    [0.15 * scale, 0.1 * scale, 0.23 * scale],
    [0, 1, 0, 0],
    [180, 0, 0, 1]
  ); // Bottom beak

  // Eyes
  drawSphere(
    gl,
    spheres[4],
    [-0.15 * scale + x, 1.2 * scale, 0.4 * scale + z],
    [0.05 * scale, 0.1 * scale, 0.1 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Left sclara
  drawSphere(
    gl,
    spheres[4],
    [0.15 * scale + x, 1.2 * scale, 0.4 * scale + z],
    [0.05 * scale, 0.1 * scale, 0.1 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Right sclara
  drawSphere(
    gl,
    spheres[5],
    [-0.15 * scale + x, 1.2 * scale, 0.403 * scale + z],
    [0.05 * scale, 0.09 * scale, 0.1 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Left pupil
  drawSphere(
    gl,
    spheres[5],
    [0.15 * scale + x, 1.2 * scale, 0.403 * scale + z],
    [0.05 * scale, 0.09 * scale, 0.1 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Right pupil
  drawSphere(
    gl,
    spheres[4],
    [-0.15 * scale + x, 1.2 * scale, 0.476 * scale + z],
    [0.03 * scale, 0.03 * scale, 0.03 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Left iris
  drawSphere(
    gl,
    spheres[4],
    [0.15 * scale + x, 1.2 * scale, 0.476 * scale + z],
    [0.03 * scale, 0.03 * scale, 0.03 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // right iris

  // Hat
  drawSphere(
    gl,
    spheres[2],
    [0 + x, 1.4 * scale, 0.2 + z],
    [0.2 * scale, 0.2 * scale, 0.2 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawSphere(
    gl,
    spheres[3],
    [0 + x, 1.35 * scale, 0.2 + z],
    [0.3 * scale, 0.1 * scale, 0.3 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawSphere(
    gl,
    spheres[3],
    [0.0 + x, 1.35 * scale, 0.45 * scale + z],
    [0.1 * scale, 0.1 * scale, 0.1 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawSphere(
    gl,
    spheres[4],
    [0 + x, 1.6 * scale, 0.1 * scale + z],
    [0.1 * scale, 0.1 * scale, 0.1 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Arms
  drawCylinder(
    gl,
    cylinders[0],
    [-0.23 * scale + x, 0.9 * scale, -0.2 * scale + z],
    [0.1 * scale, 0.1 * scale, 0.1 * scale],
    [100, 1, 0, 0],
    [20, 0, 0, 1]
  ); // Left arm coat
  drawCylinder(
    gl,
    cylinders[0],
    [0.23 * scale + x, 0.9 * scale, -0.2 * scale + z],
    [0.1 * scale, 0.1 * scale, 0.1 * scale],
    [100, 1, 0, 0],
    [-20, 0, 0, 1]
  ); // Right arm coat

  // Hand
  drawSphere(
    gl,
    spheres[4],
    [-0.6 * scale + x, 0.725 * scale, 0.8 * scale + z],
    [0.11 * scale, 0.11 * scale, 0.11 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Left Puff coat
  drawSphere(
    gl,
    spheres[4],
    [0.6 * scale + x, 0.725 * scale, 0.8 * scale + z],
    [0.11 * scale, 0.11 * scale, 0.11 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Right Puff coat
  drawSphere(
    gl,
    spheres[6],
    [-0.62 * scale + x, 0.71 * scale, 0.85 * scale + z],
    [0.12 * scale, 0.12 * scale, 0.12 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Left hand
  drawSphere(
    gl,
    spheres[6],
    [0.62 * scale + x, 0.71 * scale, 0.85 * scale + z],
    [0.12 * scale, 0.12 * scale, 0.12 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Right hand

  // Mallot
  drawCylinder(
    gl,
    cylinders[1],
    [-0.75 * scale + x, 0.4 * scale, 0.95 * scale + z],
    [0.1 * scale, 0.1 * scale, 0.1 * scale],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
  ); // Handle
  drawCylinder(
    gl,
    cylinders[1],
    [-0.77 * scale + x, 1.36 * scale, 0.55 * scale + z],
    [0.2 * scale, 0.2 * scale, 0.07 * scale],
    [90, 1, 0, 0],
    [0, 0, 0, 1]
  ); // Hammer
  drawCylinder(
    gl,
    cylinders[2],
    [-0.77 * scale + x, 1.36 * scale, 1.3 * scale + z],
    [0.2 * scale, 0.2 * scale, 0.01 * scale],
    [90, 1, 0, 0],
    [0, 0, 0, 1]
  ); // White front circle
  drawCylinder(
    gl,
    cylinders[2],
    [-0.77 * scale + x, 1.36 * scale, 0.45 * scale + z],
    [0.2 * scale, 0.2 * scale, 0.01 * scale],
    [90, 1, 0, 0],
    [0, 0, 0, 1]
  ); // White back circle
  drawCircle(
    gl,
    circles[0],
    [-0.77 * scale + x, 1.36 * scale, 1.42 * scale + z],
    [0.2 * scale, 0.2 * scale, 0.1 * scale],
    [0, 1, 0, 0]
  ); // Mallot front circle
  drawCircle(
    gl,
    circles[0],
    [-0.77 * scale + x, 1.36 * scale, 0.44 * scale + z],
    [0.2 * scale, 0.2 * scale, 0.1 * scale],
    [0, 1, 0, 0]
  ); // Mallot back circle
  drawStar(
    gl,
    stars[0],
    [-0.77 * scale + x, 1.37 * scale, 1.43 * scale + z],
    [0.2 * scale, 0.2 * scale, 0.1 * scale],
    [0, 1, 0, 0]
  ); // Front star
  drawStar(
    gl,
    stars[0],
    [-0.77 * scale + x, 1.37 * scale, 0.43 * scale + z],
    [0.2 * scale, 0.2 * scale, 0.1 * scale],
    [0, 1, 0, 0]
  ); // Back star

  // Feet
  drawSphere(
    gl,
    spheres[6],
    [-0.2 * scale + x, 0.2 * scale, 0.25 * scale + z],
    [0.2 * scale, 0.2 * scale, 0.2 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Left foot
  drawSphere(
    gl,
    spheres[6],
    [0.2 * scale + x, 0.2 * scale, 0.25 * scale + z],
    [0.2 * scale, 0.2 * scale, 0.2 * scale],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ); // Right foot

  // Belt
  drawTriangle(
    gl,
    triangles[1],
    [-0.31 * scale + x, 0.48 * scale, 0.4 * scale + z],
    [0.15 * scale, 0.15 * scale, 1],
    [14, 1, 0, 0],
    [-14, 0, 1, 0]
  );
  drawTriangle(
    gl,
    triangles[0],
    [-0.24 * scale + x, 0.58 * scale, 0.52 * scale + z],
    [0.25 * scale, 0.2 * scale, 1],
    [180, 1, 0, 0],
    [15, 0, 1, 0]
  );
  drawTriangle(
    gl,
    triangles[1],
    [-0.1 * scale + x, 0.46 * scale, 0.57 * scale + z],
    [0.25 * scale, 0.2 * scale, 1],
    [0, 1, 0, 0],
    [-4, 0, 1, 0]
  );
  drawTriangle(
    gl,
    triangles[0],
    [0.04 * scale + x, 0.58 * scale, 0.6 * scale + z],
    [0.25 * scale, 0.2 * scale, 1],
    [180, 1, 0, 0],
    [-2, 0, 1, 0]
  );
  drawTriangle(
    gl,
    triangles[1],
    [0.18 * scale + x, 0.46 * scale, 0.55 * scale + z],
    [0.25 * scale, 0.2 * scale, 1],
    [0, 1, 0, 0],
    [7.5, 0, 1, 0]
  );
  drawTriangle(
    gl,
    triangles[0],
    [0.27 * scale + x, 0.58 * scale, 0.5 * scale + z],
    [0.15 * scale, 0.2 * scale, 1],
    [180, 1, 0, 0],
    [-6, 0, 1, 0]
  );
}

function createArtic(gl, fenceShapes) {
  drawFence(
    gl,
    fenceShapes,
    [WALL_MAX_X - 60, 0, WALL_MAX_Z - 60],
    [0.25, 1, 0.25],
    false,
    false
  );

  var snow = createSheet(gl, [1.0, 1.0, 1.0]);
  //right sheet
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 60, 3.5, WALL_MAX_Z - 45],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // left sheet
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 60, 3.5, WALL_MAX_Z - 75],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // back sheet
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 45, 3.5, WALL_MAX_Z - 60],
    [1.0, 7.0, 30.0],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // front 1 left
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 75, 3.5, WALL_MAX_Z - 69],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );
  // front 2 right
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 75, 3.5, WALL_MAX_Z - 51],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  //floor
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 60, 0.02, WALL_MAX_Z - 60],
    [30.0, 1, 30.0],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawPolarBear(
    gl,
    [5.0, 0.0, 0.0],
    [1.0, 1.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawPenguin(gl, WALL_MAX_X - 60, WALL_MAX_Z - 55, 2);

  igloo = createSphere(gl, [1.0, 1.0, 1.0]);
  drawSphere(
    gl,
    igloo,
    [WALL_MAX_X - 50, 2, WALL_MAX_Z - 51],
    [5, 5, 5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  iglooOpening = createCylinder(gl, [1.0, 1.0, 1.0]);
  drawCylinder(
    gl,
    iglooOpening,
    [WALL_MAX_X - 50, 1.4, WALL_MAX_Z - 51],
    [0.5, 1.5, 2],
    [90, 0, 0, 1],
    [0, 1, 0, 0]
  );

  iglooDoor = createCircle(gl, [0, 0, 0]);
  drawCircle(
    gl,
    iglooDoor,
    [WALL_MAX_X - 55, 1.4, WALL_MAX_Z - 51],
    [2.5, 1.5, 2],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  pond = createCircle(gl, [0, 0, 1]);
  drawCircle(
    gl,
    pond,
    [WALL_MAX_X - 65, 0.03, WALL_MAX_Z - 51],
    [2.5, 1, 2.3],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  fish1 = createObject(gl, fishObj, [1.0, 0.0, 0.0]);
  fish2 = createObject(gl, fishObj, [0.2, 0.0, 1.0]);

  drawObject(
    gl,
    fish1,
    [WALL_MAX_X - 65, 0.3, WALL_MAX_Z - 55],
    [1, 1, 1],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawObject(
    gl,
    fish2,
    [WALL_MAX_X - 65.3, 0.3, WALL_MAX_Z - 55],
    [1, 1, 1],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawObject(
    gl,
    fish2,
    [WALL_MAX_X - 64.3, 0.3, WALL_MAX_Z - 55],
    [1, 1, 1],
    [90, 1, 0, 0],
    [50, 0, 0, 1]
  );
}

function createJungle(gl, fenceShapes) {
  drawFence(
    gl,
    fenceShapes,
    [WALL_MIN_X + 60, 0, WALL_MIN_Z + 60],
    [0.25, 1, 0.25],
    false,
    true
  );

  var greenGrass = createSheet(gl, [0.2, 0.8, 0.2]);

  //right sheet
  drawSheet(
    gl,
    greenGrass,
    [WALL_MIN_X + 60, 3.5, WALL_MIN_Z + 45],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // left sheet
  drawSheet(
    gl,
    greenGrass,
    [WALL_MIN_X + 60, 3.5, WALL_MIN_Z + 75],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // back sheet
  drawSheet(
    gl,
    greenGrass,
    [WALL_MIN_X + 45, 3.5, WALL_MIN_Z + 60],
    [1.0, 7.0, 30.0],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // front 1 left
  drawSheet(
    gl,
    greenGrass,
    [WALL_MIN_X + 75, 3.5, WALL_MIN_Z + 69],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // front 2 right
  drawSheet(
    gl,
    greenGrass,
    [WALL_MIN_X + 75, 3.5, WALL_MIN_Z + 51],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  //floor
  drawSheet(
    gl,
    greenGrass,
    [WALL_MIN_X + 60, 0.02, WALL_MIN_Z + 60],
    [30.0, 1, 30.0],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
}

function createDesert(gl, fenceShapes) {
  drawFence(
    gl,
    fenceShapes,
    [WALL_MIN_X + 60, 0, WALL_MAX_Z - 60],
    [0.25, 1, 0.25],
    false,
    true
  );

  var sand = createSheet(gl, [0.93, 0.82, 0.6]);

  //right sheet
  drawSheet(
    gl,
    sand,
    [WALL_MIN_X + 60, 3.5, WALL_MAX_Z - 45],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // left sheet
  drawSheet(
    gl,
    sand,
    [WALL_MIN_X + 60, 3.5, WALL_MAX_Z - 75],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // back sheet
  drawSheet(
    gl,
    sand,
    [WALL_MIN_X + 45, 3.5, WALL_MAX_Z - 60],
    [1.0, 7.0, 30.0],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // front 1 left
  drawSheet(
    gl,
    sand,
    [WALL_MIN_X + 75, 3.5, WALL_MAX_Z - 69],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // front 2 right
  drawSheet(
    gl,
    sand,
    [WALL_MIN_X + 75, 3.5, WALL_MAX_Z - 51],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  //floor
  drawSheet(
    gl,
    sand,
    [WALL_MIN_X + 60, 0.02, WALL_MAX_Z - 60],
    [30.0, 1, 30.0],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  camel = createObject(gl, camelObj, [0.757, 0.604, 0.42]);
  drawObject(
    gl,
    camel,
    [WALL_MIN_X + 55, 0.02, WALL_MAX_Z - 50],
    [0.004, 0.004, 0.004],
    [270, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    camel,
    [WALL_MIN_X + 65, 0.02, WALL_MAX_Z - 50],
    [0.004, 0.004, 0.004],
    [320, 0, 1, 0],
    [0, 1, 0, 0]
  );

  const cactus = createCactus(gl);

  drawCactus(
    gl,
    cactus,
    [WALL_MIN_X + 65, 0, WALL_MAX_Z - 65],
    [1.0, 1.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawCactus(
    gl,
    cactus,
    [WALL_MIN_X + 70, 0, WALL_MAX_Z - 52],
    [1.0, 1.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawCactus(
    gl,
    cactus,
    [WALL_MIN_X + 60, 0, WALL_MAX_Z - 52],
    [1.0, 1.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  pyramid = createPyramid(gl, [0.757, 0.604, 0.42]);
  drawPyramid(
    gl,
    pyramid,
    [WALL_MIN_X + 55, 1, WALL_MAX_Z - 65],
    [9.0, 8.0, 9.0],
    [10, 0, 1, 0],
    [0, 1, 0, 0]
  );
}

function drawCactus(gl, cactus, moving, scaling, rotating1, rotating2) {
  const cactusGreen = cactus[0];
  const darkGreen = cactus[1];

  // Main trunk
  drawCylinder(
    gl,
    cactusGreen,
    [moving[0], moving[1], moving[2]],
    [scaling[0] * 0.5, scaling[1] * 0.3, scaling[2] * 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Main trunk cap
  drawSphere(
    gl,
    darkGreen,
    [moving[0], moving[1] + 3.3, moving[2]],
    [scaling[0] * 0.52, scaling[1] * 0.52, scaling[2] * 0.52],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Spikes on main trunk - front
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      darkGreen,
      [moving[0] + scaling[0] * 0.5, moving[1] + 0.8 + i * 0.6, moving[2]],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Spikes on main trunk - back
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      darkGreen,
      [moving[0] - scaling[0] * 0.5, moving[1] + 0.8 + i * 0.6, moving[2]],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Left arm
  drawCylinder(
    gl,
    cactusGreen,
    [moving[0], moving[1] + 1, moving[2]],
    [scaling[0] * 0.3, scaling[1] * 0.3, scaling[2] * 0.2],
    [90, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Left trunk cap
  drawSphere(
    gl,
    darkGreen,
    [moving[0], moving[1] + 1, moving[2] + 2],
    [scaling[0] * 0.42, scaling[1] * 0.42, scaling[2] * 0.42],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Spikes on left trunk top
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      darkGreen,
      [moving[0], moving[1] + 1.2, moving[2] + i - 0.5],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Spikes on left trunk back
  for (let i = 0; i < 2; i++) {
    drawSphere(
      gl,
      darkGreen,
      [moving[0] - 0.2, moving[1] + 1, moving[2] + i + 0.5],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Spikes on left trunk front
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      darkGreen,
      [moving[0] + 0.2, moving[1] + 1.2, moving[2] + i],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Right arm
  drawCylinder(
    gl,
    cactusGreen,
    [moving[0], moving[1] + 1.7, moving[2]],
    [scaling[0] * 0.3, scaling[1] * 0.3, scaling[2] * 0.2],
    [270, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Right trunk cap
  drawSphere(
    gl,
    darkGreen,
    [moving[0], moving[1] + 1.7, moving[2] - 2],
    [scaling[0] * 0.42, scaling[1] * 0.42, scaling[2] * 0.42],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Spikes on right trunk top
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      darkGreen,
      [moving[0], moving[1] + 2, moving[2] - i + 0.5],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Spikes on right trunk bottom
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      darkGreen,
      [moving[0], moving[1] + 1.4, moving[2] - i],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Spikes on right trunk back
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      darkGreen,
      [moving[0] - 0.3, moving[1] + 1.7, moving[2] - i],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Spikes on right trunk front
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      darkGreen,
      [moving[0] + 0.3, moving[1] + 1.7, moving[2] - i],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }
}

function createWater(gl, fenceShapes) {
  drawFence(
    gl,
    fenceShapes,
    [WALL_MAX_X - 60, 0, WALL_MIN_Z + 60],
    [0.25, 1, 0.25],
    false,
    false
  );

  var waterBlue = createSheet(gl, [0.25, 0.55, 0.85]);

  //right sheet
  drawSheet(
    gl,
    waterBlue,
    [WALL_MAX_X - 60, 3.5, WALL_MIN_Z + 45],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // left sheet
  drawSheet(
    gl,
    waterBlue,
    [WALL_MAX_X - 60, 3.5, WALL_MIN_Z + 75],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // back sheet
  drawSheet(
    gl,
    waterBlue,
    [WALL_MAX_X - 45, 3.5, WALL_MIN_Z + 60],
    [1.0, 7.0, 30.0],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // front 1 left
  drawSheet(
    gl,
    waterBlue,
    [WALL_MAX_X - 75, 3.5, WALL_MIN_Z + 69],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // front 2 right
  drawSheet(
    gl,
    waterBlue,
    [WALL_MAX_X - 75, 3.5, WALL_MIN_Z + 51],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  //floor
  drawSheet(
    gl,
    waterBlue,
    [WALL_MAX_X - 60, 0.02, WALL_MIN_Z + 60],
    [30.0, 1, 30.0],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
}
