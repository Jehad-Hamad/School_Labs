function drawPyramid(gl, pyramid, moving, scaling, r1, r2, r3) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .rotate(...r1)
    .rotate(...r2)
    .rotate(...r3)
    .scale(...scaling);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  // Draw each face with its own texture if available
  if (Array.isArray(pyramid.textures)) {
    // Draw base without texture (solid color) - base uses indices 0-5 (2 triangles = 6 indices)
    initObject(gl, pyramid, null);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    // Draw 4 triangular side faces with textures (each has 3 indices)
    for (let i = 0; i < 4; i++) {
      initObject(gl, pyramid, i);
      // Cube was easy to find offset. This not so much
      gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, (6 + i * 3) * 2);
    }
  } else {
    initObject(gl, pyramid);
    gl.drawElements(gl.TRIANGLES, pyramid.indicesCount, gl.UNSIGNED_SHORT, 0);
  }
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
