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
  'uniform vec4 u_FragColor;\n' +
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';

// rotation speeds (degrees per second)
var secondStep = -6.0;
var minuteStep = -0.1;

var currentAngleSec = 0.0; // seconds hand
var currentAngleMin = 0.0; // minutes hand
var g_lastSec = Date.now();
var g_lastMin = Date.now();

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
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  if (a_Position < 0 || !u_FragColor || !u_xformMatrix) {
    console.log('Failed to get shader variable locations');
    return;
  }

  // Arrow shape (shaft + triangle head)
  var vertices = new Float32Array([
    // line (shaft)
    0.0, 0.0, 0.0, 0.5,

    // arrow head (triangle)
    0.0, 0.5, -0.05, 0.4, 0.05, 0.4,
  ]);
  var n = initVertexBuffers(gl, vertices, a_Position);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Start animation
  requestAnimationFrame(function tick() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Update both hands independently
    currentAngleSec = animate(currentAngleSec, secondStep, 'sec');
    currentAngleMin = animate(currentAngleMin, minuteStep, 'min');

    // Draw second hand (green)
    drawShapes(gl, u_FragColor, u_xformMatrix, currentAngleSec, 1.0, 'green');

    // Draw minute hand (red)
    drawShapes(gl, u_FragColor, u_xformMatrix, currentAngleMin, 0.7, 'red');

    requestAnimationFrame(tick);
  });
}

// Create and fill a vertex buffer
function initVertexBuffers(gl, points, a_Position) {
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) return -1;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return points.length / 2;
}

// Apply rotation and scaling
function rotateScale(gl, size, baseAngle, u_xformMatrix) {
  var xformMatrix = new Matrix4();
  xformMatrix.setRotate(baseAngle, 0, 0, 1);
  xformMatrix.scale(1, size, 1);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);
}

// Draw one arrow
function drawShapes(gl, u_FragColor, u_xformMatrix, baseAngle, size, color) {
  rotateScale(gl, size, baseAngle, u_xformMatrix);

  if (color === 'red') gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
  else if (color === 'green') gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0);

  gl.drawArrays(gl.LINES, 0, 2);
  gl.drawArrays(gl.TRIANGLES, 2, 3);
}

// Rotation animation control
function animate(angle, step, type) {
  var now = Date.now();
  var elapsed;

  if (type === 'sec') {
    elapsed = now - g_lastSec;
    g_lastSec = now;
  } else {
    elapsed = now - g_lastMin;
    g_lastMin = now;
  }

  var newAngle = angle + (step * elapsed) / 1000.0;
  return newAngle % 360;
}
