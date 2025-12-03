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

function drawTicketStand(gl, shapes) {
  const FENCE_OFFSET = 29.5;
  const ENTRANCE_DEPTH = 10;
  const frontFenceX = WALL_MIN_X + FENCE_OFFSET;
  const entranceX = frontFenceX - ENTRANCE_DEPTH;

  const standX = entranceX - 8;
  const standZ = 8;
  const boxSize = 5.5;

  // PILLERS
  drawCube(
    gl,
    shapes.mangrovePillers,
    [standX - boxSize / 2 + 0.5, 0, standZ - boxSize / 2],
    [0.25, 6, 0.15],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawCube(
    gl,
    shapes.mangrovePillers,
    [standX - boxSize / 2 + 0.5, 0, standZ + boxSize / 2],
    [0.25, 6, 0.15],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawCube(
    gl,
    shapes.mangrovePillers,
    [standX + boxSize / 2 - 0.5, 0, standZ - boxSize / 2],
    [0.25, 6, 0.15],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawCube(
    gl,
    shapes.mangrovePillers,
    [standX + boxSize / 2 - 0.5, 0, standZ + boxSize / 2],
    [0.25, 6, 0.15],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // PLANKS
  drawSheet(
    gl,
    shapes.cherrySheet,
    [standX - boxSize / 2 + 0.5, 0.15, standZ],
    [0.05, 3, boxSize],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  drawSheet(
    gl,
    shapes.cherrySheet,
    [standX + boxSize / 2 - 0.5, 0.15, standZ],
    [0.05, 3, boxSize],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  drawSheet(
    gl,
    shapes.cherrySheet,
    [standX, 0.15, standZ - boxSize / 2],
    [boxSize - 1, 3, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawSheet(
    gl,
    shapes.cherrySheet,
    [standX, 0.15, standZ + boxSize / 2],
    [boxSize - 1, 3, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // GLASS
  drawSheet(
    gl,
    shapes.glassSheet,
    [standX - boxSize / 2 + 0.5, 4.25, standZ],
    [0.05, 2.5, boxSize],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  drawSheet(
    gl,
    shapes.glassSheet,
    [standX + boxSize / 2 - 0.5, 4.25, standZ],
    [0.05, 2.5, boxSize],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  drawSheet(
    gl,
    shapes.glassSheet,
    [standX, 4.25, standZ - boxSize / 2],
    [boxSize - 1, 2.5, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawSheet(
    gl,
    shapes.glassSheet,
    [standX, 4.25, standZ + boxSize / 2],
    [boxSize - 1, 2.5, 0.05],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Roof
  drawCube(
    gl,
    shapes.cherryRoof,
    [standX, 6, standZ],
    [boxSize / 2 + 0.5, 1, boxSize / 2 + 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
}

function drawPenguin(gl, shapes, x, y, z, scale) {
  // Body - Black
  drawSphere(
    gl,
    shapes.blackSphere,
    [x, y + 0.63 * scale, z],
    [0.25 * scale, 0.55 * scale, 0.45 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Body - White belly
  drawSphere(
    gl,
    shapes.whiteSphere,
    [x - 0.17 * scale, y + 0.57 * scale, z],
    [0.1 * scale, 0.4 * scale, 0.3 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Head - Black
  drawSphere(
    gl,
    shapes.blackSphere,
    [x, y + 1.25 * scale, z],
    [0.32 * scale, 0.32 * scale, 0.32 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Left Eye - White part
  drawSphere(
    gl,
    shapes.whiteSphere,
    [x - 0.22 * scale, y + 1.3 * scale, z - 0.12 * scale],
    [0.08 * scale, 0.08 * scale, 0.08 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Left Eye - Black pupil
  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.28 * scale, y + 1.3 * scale, z - 0.12 * scale],
    [0.04 * scale, 0.04 * scale, 0.04 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Right Eye - White part
  drawSphere(
    gl,
    shapes.whiteSphere,
    [x - 0.22 * scale, y + 1.3 * scale, z + 0.12 * scale],
    [0.08 * scale, 0.08 * scale, 0.08 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Right Eye - Black pupil
  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.28 * scale, y + 1.3 * scale, z + 0.12 * scale],
    [0.04 * scale, 0.04 * scale, 0.04 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Beak - Orange
  drawPyramid(
    gl,
    shapes.orangePyramid,
    [x - 0.28 * scale, y + 1.2 * scale, z],
    [0.15 * scale, 0.06 * scale, 0.12 * scale],
    [0, 0, 1, 0],
    [180, 0, 1, 0]
  );

  // Left Wing - Black
  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.3 * scale, y + 0.3 + 0.6 * scale, z - 0.4 * scale],
    [0.12 * scale, 0.4 * scale, 0.12 * scale],
    [60, 0, 0, 1],
    [0, 1, 0, 0]
  );

  // Right Wing - Black
  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.3 * scale, y + 0.3 + 0.6 * scale, z + 0.4 * scale],
    [0.12 * scale, 0.4 * scale, 0.12 * scale],
    [60, 0, 0, 1],
    [0, 1, 0, 0]
  );

  // Left Foot - Orange
  drawSphere(
    gl,
    shapes.orangeSphere,
    [x - 0.15 * scale, y + 0.08 * scale, z - 0.15 * scale],
    [0.25 * scale, 0.06 * scale, 0.14 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Right Foot - Orange
  drawSphere(
    gl,
    shapes.orangeSphere,
    [x - 0.15 * scale, y + 0.08 * scale, z + 0.15 * scale],
    [0.25 * scale, 0.06 * scale, 0.14 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );
}

function drawPolarBear(gl, shapes, moving, scaling, rotating1, rotating2) {
  drawObject(gl, shapes.polarBear, moving, scaling, rotating1, rotating2);

  // Left eye
  drawSphere(
    gl,
    shapes.blackSphere,
    [
      moving[0] - 2.2 * scaling[0],
      moving[1] + 2.6 * scaling[1],
      moving[2] + 0.1 * scaling[2],
    ],
    [0.05 * scaling[0], 0.05 * scaling[1], 0.05 * scaling[2]],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Right eye
  drawSphere(
    gl,
    shapes.blackSphere,
    [
      moving[0] - 2.2 * scaling[0],
      moving[1] + 2.6 * scaling[1],
      moving[2] - 0.1 * scaling[2],
    ],
    [0.05 * scaling[0], 0.05 * scaling[1], 0.05 * scaling[2]],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Nose
  drawSphere(
    gl,
    shapes.blackSphere,
    [moving[0] - 2.4 * scaling[0], moving[1] + 2.2 * scaling[1], moving[2]],
    [0.12 * scaling[0], 0.12 * scaling[1], 0.12 * scaling[2]],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
}

function drawSnowman(gl, shapes, x, y, z, scale) {
  // Bottom sphere (largest)
  drawSphere(
    gl,
    shapes.whiteSphere,
    [x, y + 0.5 * scale, z],
    [0.5 * scale, 0.5 * scale, 0.5 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Middle sphere
  drawSphere(
    gl,
    shapes.whiteSphere,
    [x, y + 1.2 * scale, z],
    [0.38 * scale, 0.38 * scale, 0.38 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Top sphere (head)
  drawSphere(
    gl,
    shapes.whiteSphere,
    [x, y + 1.85 * scale, z],
    [0.28 * scale, 0.28 * scale, 0.28 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Left eye
  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.22 * scale, y + 1.95 * scale, z - 0.1 * scale],
    [0.04 * scale, 0.04 * scale, 0.04 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Right eye
  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.22 * scale, y + 1.95 * scale, z + 0.1 * scale],
    [0.04 * scale, 0.04 * scale, 0.04 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Nose (carrot) - orange
  drawPyramid(
    gl,
    shapes.orangePyramid,
    [x - 0.35 * scale, y + 1.85 * scale, z],
    [0.15 * scale, 0.05 * scale, 0.05 * scale],
    [0, 0, 1, 0],
    [90, 0, 0, 1]
  );

  // Mouth - 5 black dots in a smile
  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.22 * scale, y + 1.75 * scale, z - 0.12 * scale],
    [0.025 * scale, 0.025 * scale, 0.025 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.25 * scale, y + 1.72 * scale, z - 0.06 * scale],
    [0.025 * scale, 0.025 * scale, 0.025 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.26 * scale, y + 1.71 * scale, z],
    [0.025 * scale, 0.025 * scale, 0.025 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.25 * scale, y + 1.72 * scale, z + 0.06 * scale],
    [0.025 * scale, 0.025 * scale, 0.025 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.22 * scale, y + 1.75 * scale, z + 0.12 * scale],
    [0.025 * scale, 0.025 * scale, 0.025 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Buttons on middle sphere - 3 black dots
  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.35 * scale, y + 1.35 * scale, z],
    [0.04 * scale, 0.04 * scale, 0.04 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.37 * scale, y + 1.2 * scale, z],
    [0.04 * scale, 0.04 * scale, 0.04 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.35 * scale, y + 1.05 * scale, z],
    [0.04 * scale, 0.04 * scale, 0.04 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Buttons on bottom sphere - 2 black dots
  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.47 * scale, y + 0.65 * scale, z],
    [0.04 * scale, 0.04 * scale, 0.04 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );

  drawSphere(
    gl,
    shapes.blackSphere,
    [x - 0.48 * scale, y + 0.45 * scale, z],
    [0.04 * scale, 0.04 * scale, 0.04 * scale],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  );
}

function drawCactus(gl, shapes, moving, scaling, rotating1, rotating2) {
  // Main trunk
  drawCylinder(
    gl,
    shapes.cactusGreen,
    [moving[0], moving[1], moving[2]],
    [scaling[0] * 0.5, scaling[1] * 0.3, scaling[2] * 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Main trunk cap
  drawSphere(
    gl,
    shapes.cactusDarkGreen,
    [moving[0], moving[1] + 3.3, moving[2]],
    [scaling[0] * 0.52, scaling[1] * 0.52, scaling[2] * 0.52],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Spikes on main trunk - front
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      shapes.cactusDarkGreen,
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
      shapes.cactusDarkGreen,
      [moving[0] - scaling[0] * 0.5, moving[1] + 0.8 + i * 0.6, moving[2]],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Left arm
  drawCylinder(
    gl,
    shapes.cactusGreen,
    [moving[0], moving[1] + 1, moving[2]],
    [scaling[0] * 0.3, scaling[1] * 0.3, scaling[2] * 0.2],
    [90, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Left trunk cap
  drawSphere(
    gl,
    shapes.cactusDarkGreen,
    [moving[0], moving[1] + 1, moving[2] + 2],
    [scaling[0] * 0.42, scaling[1] * 0.42, scaling[2] * 0.42],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Spikes on left trunk top
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      shapes.cactusDarkGreen,
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
      shapes.cactusDarkGreen,
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
      shapes.cactusDarkGreen,
      [moving[0] + 0.2, moving[1] + 1.2, moving[2] + i],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }

  // Right arm
  drawCylinder(
    gl,
    shapes.cactusGreen,
    [moving[0], moving[1] + 1.7, moving[2]],
    [scaling[0] * 0.3, scaling[1] * 0.3, scaling[2] * 0.2],
    [270, 1, 0, 0],
    [0, 0, 1, 0]
  );

  // Right trunk cap
  drawSphere(
    gl,
    shapes.cactusDarkGreen,
    [moving[0], moving[1] + 1.7, moving[2] - 2],
    [scaling[0] * 0.42, scaling[1] * 0.42, scaling[2] * 0.42],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Spikes on right trunk top
  for (let i = 0; i < 3; i++) {
    drawSphere(
      gl,
      shapes.cactusDarkGreen,
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
      shapes.cactusDarkGreen,
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
      shapes.cactusDarkGreen,
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
      shapes.cactusDarkGreen,
      [moving[0] + 0.3, moving[1] + 1.7, moving[2] - i],
      [scaling[0] * 0.15, scaling[1] * 0.15, scaling[2] * 0.15],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    );
  }
}

function createArtic(gl, fenceShapes, shapes) {
  drawFence(
    gl,
    fenceShapes,
    [WALL_MAX_X - 60, 0, WALL_MAX_Z - 60],
    [0.25, 1, 0.25],
    false,
    false
  );

  // Right sheet
  drawSheet(
    gl,
    shapes.snowSheet,
    [WALL_MAX_X - 60, 3.5, WALL_MAX_Z - 45],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Left sheet
  drawSheet(
    gl,
    shapes.snowSheet,
    [WALL_MAX_X - 60, 3.5, WALL_MAX_Z - 75],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Back sheet
  drawSheet(
    gl,
    shapes.snowSheet,
    [WALL_MAX_X - 45, 3.5, WALL_MAX_Z - 60],
    [1.0, 7.0, 30.0],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Front 1 left
  drawSheet(
    gl,
    shapes.snowSheet,
    [WALL_MAX_X - 75, 3.5, WALL_MAX_Z - 69],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Front 2 right
  drawSheet(
    gl,
    shapes.snowSheet,
    [WALL_MAX_X - 75, 3.5, WALL_MAX_Z - 51],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Floor
  drawSheet(
    gl,
    shapes.snowFloor,
    [WALL_MAX_X - 60, 0.02, WALL_MAX_Z - 60],
    [30.0, 1, 30.0],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Polar bear
  drawPolarBear(
    gl,
    shapes,
    [WALL_MAX_X - 65, 0, WALL_MAX_Z - 65],
    [1.0, 1.0, 1.0],
    [180, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Children
  drawPolarBear(
    gl,
    shapes,
    [WALL_MAX_X - 63, 0, WALL_MAX_Z - 63],
    [0.5, 0.5, 0.5],
    [180, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawPolarBear(
    gl,
    shapes,
    [WALL_MAX_X - 65.5, 0, WALL_MAX_Z - 67],
    [0.5, 0.5, 0.5],
    [180, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Penguin
  drawPenguin(gl, shapes, WALL_MAX_X - 60, 0, WALL_MAX_Z - 55, 2);

  // Snowman
  drawSnowman(gl, shapes, WALL_MAX_X - 55, 0, WALL_MAX_Z - 65, 2);

  // Igloo
  drawSphere(
    gl,
    shapes.iglooSphere,
    [WALL_MAX_X - 50, 2, WALL_MAX_Z - 51],
    [5, 5, 5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawCylinder(
    gl,
    shapes.iglooCylinder,
    [WALL_MAX_X - 50, 1.4, WALL_MAX_Z - 51],
    [0.5, 1.5, 2],
    [90, 0, 0, 1],
    [0, 1, 0, 0]
  );

  drawCircle(
    gl,
    shapes.iglooCircle,
    [WALL_MAX_X - 55, 1.4, WALL_MAX_Z - 51],
    [2.5, 1.5, 2],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Pond
  drawCircle(
    gl,
    shapes.pondCircle,
    [WALL_MAX_X - 65, 0.1, WALL_MAX_Z - 51],
    [2.5, 1, 2.3],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Fish
  drawObject(
    gl,
    shapes.fish1,
    [WALL_MAX_X - 65, 0.3, WALL_MAX_Z - 55],
    [1, 1, 1],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.fish2,
    [WALL_MAX_X - 65.3, 0.3, WALL_MAX_Z - 55],
    [1, 1, 1],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.fish2,
    [WALL_MAX_X - 64.3, 0.3, WALL_MAX_Z - 55],
    [1, 1, 1],
    [90, 1, 0, 0],
    [50, 0, 0, 1]
  );

  // Snow Rocks
  drawObject(
    gl,
    shapes.snowRock1,
    [WALL_MAX_X - 48, 0, WALL_MAX_Z - 68],
    [7.0, 5.0, 6.0],
    [0, 1, 0, 0],
    [30, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.snowRock2,
    [WALL_MAX_X - 72, 0, WALL_MAX_Z - 55],
    [6.0, 4.0, 5.0],
    [0, 1, 0, 0],
    [60, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.snowRock3,
    [WALL_MAX_X - 70, 0, WALL_MAX_Z - 70],
    [5.0, 4.0, 5.0],
    [0, 1, 0, 0],
    [150, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.snowRock1,
    [WALL_MAX_X - 48, 0, WALL_MAX_Z - 48],
    [8.0, 6.0, 7.0],
    [0, 1, 0, 0],
    [90, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.snowRock2,
    [WALL_MAX_X - 58, 0, WALL_MAX_Z - 72],
    [4.0, 3.0, 4.0],
    [0, 1, 0, 0],
    [220, 0, 1, 0]
  );

  // Snow pile
  drawObject(
    gl,
    shapes.snowPile,
    [WALL_MAX_X - 68, 1, WALL_MAX_Z - 48],
    [6.0, 6.0, 6.0],
    [0, 0, 1, 0],
    [45, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.snowPile,
    [WALL_MAX_X - 62, 0.5, WALL_MAX_Z - 72],
    [4.0, 4.0, 4.0],
    [0, 0, 1, 0],
    [90, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.snowPile,
    [WALL_MAX_X - 52, 0.5, WALL_MAX_Z - 62],
    [3.5, 3.5, 3.5],
    [0, 0, 1, 0],
    [120, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.snowPile,
    [WALL_MAX_X - 68, 0.5, WALL_MAX_Z - 62],
    [4.5, 4.5, 4.5],
    [0, 0, 1, 0],
    [200, 0, 1, 0]
  );
}

function createJungle(gl, fenceShapes, shapes) {
  drawFence(
    gl,
    fenceShapes,
    [WALL_MIN_X + 60, 0, WALL_MIN_Z + 60],
    [0.25, 1, 0.25],
    false,
    true
  );

  // Right sheet
  drawSheet(
    gl,
    shapes.greenSheet,
    [WALL_MIN_X + 60, 3.5, WALL_MIN_Z + 45],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Left sheet
  drawSheet(
    gl,
    shapes.greenSheet,
    [WALL_MIN_X + 60, 3.5, WALL_MIN_Z + 75],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Back sheet
  drawSheet(
    gl,
    shapes.greenSheet,
    [WALL_MIN_X + 45, 3.5, WALL_MIN_Z + 60],
    [1.0, 7.0, 30.0],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Front 1 left
  drawSheet(
    gl,
    shapes.greenSheet,
    [WALL_MIN_X + 75, 3.5, WALL_MIN_Z + 69],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Front 2 right
  drawSheet(
    gl,
    shapes.greenSheet,
    [WALL_MIN_X + 75, 3.5, WALL_MIN_Z + 51],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Floor
  drawSheet(
    gl,
    shapes.greenSheet,
    [WALL_MIN_X + 60, 0.02, WALL_MIN_Z + 60],
    [30.0, 1, 30.0],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
}

function createDesert(gl, fenceShapes, shapes) {
  drawFence(
    gl,
    fenceShapes,
    [WALL_MIN_X + 60, 0, WALL_MAX_Z - 60],
    [0.25, 1, 0.25],
    false,
    true
  );

  // Right sheet
  drawSheet(
    gl,
    shapes.sandSheet,
    [WALL_MIN_X + 60, 3.5, WALL_MAX_Z - 45],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Left sheet
  drawSheet(
    gl,
    shapes.sandSheet,
    [WALL_MIN_X + 60, 3.5, WALL_MAX_Z - 75],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Back sheet
  drawSheet(
    gl,
    shapes.sandSheet,
    [WALL_MIN_X + 45, 3.5, WALL_MAX_Z - 60],
    [1.0, 7.0, 30.0],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Front 1 left
  drawSheet(
    gl,
    shapes.sandSheet,
    [WALL_MIN_X + 75, 3.5, WALL_MAX_Z - 69],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Front 2 right
  drawSheet(
    gl,
    shapes.sandSheet,
    [WALL_MIN_X + 75, 3.5, WALL_MAX_Z - 51],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Floor
  drawSheet(
    gl,
    shapes.sandFloor,
    [WALL_MIN_X + 60, 0.02, WALL_MAX_Z - 60],
    [30.0, 1, 30.0],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Camels
  drawObject(
    gl,
    shapes.camel,
    [WALL_MIN_X + 55, 0.02, WALL_MAX_Z - 50],
    [0.004, 0.004, 0.004],
    [270, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.camel,
    [WALL_MIN_X + 65, 0.02, WALL_MAX_Z - 50],
    [0.004, 0.004, 0.004],
    [320, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Cacti
  drawCactus(
    gl,
    shapes,
    [WALL_MIN_X + 65, 0, WALL_MAX_Z - 65],
    [1.0, 1.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawCactus(
    gl,
    shapes,
    [WALL_MIN_X + 60, 0, WALL_MAX_Z - 52],
    [1.0, 1.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Pyramid
  drawPyramid(
    gl,
    shapes.desertPyramid,
    [WALL_MIN_X + 55, 0, WALL_MAX_Z - 65],
    [9.0, 8.0, 9.0],
    [10, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Desert Rocks
  drawObject(
    gl,
    shapes.desertRock1,
    [WALL_MIN_X + 48, 0, WALL_MAX_Z - 55],
    [8.0, 6.0, 7.0],
    [0, 1, 0, 0],
    [25, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.desertRock2,
    [WALL_MIN_X + 72, 0, WALL_MAX_Z - 62],
    [6.0, 5.0, 6.0],
    [0, 1, 0, 0],
    [45, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.desertRock3,
    [WALL_MIN_X + 50, 0, WALL_MAX_Z - 48],
    [5.0, 4.0, 5.0],
    [0, 1, 0, 0],
    [120, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.desertRock1,
    [WALL_MIN_X + 68, 0, WALL_MAX_Z - 72],
    [7.0, 5.0, 6.0],
    [0, 1, 0, 0],
    [80, 0, 1, 0]
  );

  drawObject(
    gl,
    shapes.desertRock2,
    [WALL_MIN_X + 52, 0, WALL_MAX_Z - 68],
    [4.0, 3.0, 4.0],
    [0, 1, 0, 0],
    [200, 0, 1, 0]
  );

  // Urns
  drawObject(
    gl,
    shapes.urn2,
    [WALL_MIN_X + 57, 0.65, WALL_MAX_Z - 70],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.urn1,
    [WALL_MIN_X + 57.5, 0.65, WALL_MAX_Z - 71],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.urn,
    [WALL_MIN_X + 58, 0.65, WALL_MAX_Z - 70],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.urn1,
    [WALL_MIN_X + 54, 0.65, WALL_MAX_Z - 62],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.urn2,
    [WALL_MIN_X + 55, 0.65, WALL_MAX_Z - 60.5],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.urn,
    [WALL_MIN_X + 56.5, 0.65, WALL_MAX_Z - 62],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Sand dunes
  drawObject(
    gl,
    shapes.sandDune,
    [WALL_MIN_X + 70, 1, WALL_MAX_Z - 70],
    [7.0, 7.0, 7.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.sandDune,
    [WALL_MIN_X + 50, 1, WALL_MAX_Z - 57],
    [7.0, 7.0, 7.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.sandDune,
    [WALL_MIN_X + 70, 1, WALL_MAX_Z - 50],
    [7.0, 7.0, 7.0],
    [30, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Dead bushes
  drawObject(
    gl,
    shapes.deadBush,
    [WALL_MIN_X + 70, 0, WALL_MAX_Z - 70],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.deadBush,
    [WALL_MIN_X + 60, 0, WALL_MAX_Z - 60],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.deadBush1,
    [WALL_MIN_X + 60, 0, WALL_MAX_Z - 57],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.deadBush1,
    [WALL_MIN_X + 66, 0, WALL_MAX_Z - 50],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );

  drawObject(
    gl,
    shapes.deadBush1,
    [WALL_MIN_X + 73, 0, WALL_MAX_Z - 50],
    [1.0, 1.0, 1.0],
    [0, 0, 1, 0],
    [0, 1, 0, 0]
  );
}

function createWater(gl, fenceShapes, shapes) {
  drawFence(
    gl,
    fenceShapes,
    [WALL_MAX_X - 60, 0, WALL_MIN_Z + 60],
    [0.25, 1, 0.25],
    false,
    false
  );

  // Right sheet
  drawSheet(
    gl,
    shapes.waterSheet,
    [WALL_MAX_X - 60, 3.5, WALL_MIN_Z + 45],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Left sheet
  drawSheet(
    gl,
    shapes.waterSheet,
    [WALL_MAX_X - 60, 3.5, WALL_MIN_Z + 75],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Back sheet
  drawSheet(
    gl,
    shapes.waterSheet,
    [WALL_MAX_X - 45, 3.5, WALL_MIN_Z + 60],
    [1.0, 7.0, 30.0],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Front 1 left
  drawSheet(
    gl,
    shapes.waterSheet,
    [WALL_MAX_X - 75, 3.5, WALL_MIN_Z + 69],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Front 2 right
  drawSheet(
    gl,
    shapes.waterSheet,
    [WALL_MAX_X - 75, 3.5, WALL_MIN_Z + 51],
    [1.0, 7.0, 11.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // Floor
  drawSheet(
    gl,
    shapes.waterSheet,
    [WALL_MAX_X - 60, 0.02, WALL_MIN_Z + 60],
    [30.0, 1, 30.0],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
}
