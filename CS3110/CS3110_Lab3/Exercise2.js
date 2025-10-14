// Exercise1.js

// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_xformMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_xformMatrix * a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'void main() {\n' +
  '  gl_FragColor =  vec4(gl_FragCoord.x/450.0, gl_FragCoord.y/400.0, 0.0, 1.0);\n' +
  '}\n';

var radStep = 0.1; // RAD per second
var currentRad = 0.0;
var level = 2;

var rotationAngle = 0.0;
var angleStep = 40.0;

function main() {
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get WebGL context');
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  if (a_Position < 0 || !u_xformMatrix) {
    console.log('Failed to get shader variable locations');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // a square
  var vertices = generatePoints(currentRad, level, 0.0, 0.02, radStep);
  var n = initVertexBuffers(gl, vertices, a_Position);

  canvas.tabIndex = 0;
  canvas.focus();

  var animating = false;
  var animationId = null;

  draw(gl, n, u_xformMatrix);
  canvas.onkeydown = function (ev) {
    if (ev.key === 'ArrowUp') {
      level = Math.min(level + 1, 7);
      vertices = generatePoints(currentRad, level, 0.0, 0.02, radStep);
      n = initVertexBuffers(gl, vertices, a_Position, u_xformMatrix);
      draw(gl, n, u_xformMatrix);
    } else if (ev.key === 'ArrowDown') {
      level = Math.max(level - 1, 2);
      vertices = generatePoints(currentRad, level, 0.0, 0.02, radStep);
      n = initVertexBuffers(gl, vertices, a_Position);
      draw(gl, n, u_xformMatrix);
    } else if (ev.key === 'z') {
      animating = !animating;
      if (animating) {
        tick();
      } else {
        cancelAnimationFrame(animationId);
      }
    }
  };

  var tick = function () {
    rotationAngle = animate(rotationAngle);
    draw(gl, n, u_xformMatrix);
    animationId = requestAnimationFrame(tick);
  };
}

function generatePoints(currentAngle, N_turns, a, b, radStep) {
  var vertices = [];
  var angle = currentAngle;
  var endAngle = N_turns * 2 * Math.PI;
  var r;
  var x_coord;
  var y_coord;
  while (angle <= endAngle) {
    r = a + b * angle;
    x_coord = r * Math.cos(angle);
    y_coord = -1 * r * Math.sin(angle);
    vertices.push(x_coord);
    vertices.push(y_coord);
    angle += radStep;
  }
  return vertices;
}
// Create and fill a vertex buffer
function initVertexBuffers(gl, points, a_Position) {
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) return -1;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return points.length / 2;
}
// Apply rotation and scaling
function rotate(gl, u_xformMatrix) {
  var xformMatrix = new Matrix4();
  xformMatrix.setIdentity();
  xformMatrix.rotate(rotationAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);
}
function draw(gl, n, u_xformMatrix) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  rotate(gl, u_xformMatrix);
  gl.drawArrays(gl.LINE_STRIP, 0, n);
}
var g_last = Date.now();

function animate(angle) {
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  var newAngle = angle + (angleStep * elapsed) / 1000.0;
  return newAngle % 360;
}
