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
