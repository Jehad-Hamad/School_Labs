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

var angleStep = 45.0; // degrees per second
var level = 0; // nesting level
var currentAngle = 0.0;

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

  // a square
  var vertices = new Float32Array([-0.9, 0.9, 0.9, 0.9, 0.9, -0.9, -0.9, -0.9]);
  var n = initVertextBuffers(gl, vertices, a_Position);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  canvas.tabIndex = 0;
  canvas.focus();

  // Keyboard controls for nesting level
  var animating = false;
  var animationId = null;

  drawShapes(gl, n, u_FragColor, u_xformMatrix, currentAngle);
  canvas.onkeydown = function (ev) {
    if (ev.key === 'ArrowUp') {
      level = Math.min(level + 1, 7);
      drawShapes(gl, n, u_FragColor, u_xformMatrix, currentAngle);
    } else if (ev.key === 'ArrowDown') {
      level = Math.max(level - 1, 1);
      drawShapes(gl, n, u_FragColor, u_xformMatrix, currentAngle);
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
    currentAngle = animate(currentAngle);
    drawShapes(gl, n, u_FragColor, u_xformMatrix, currentAngle);
    animationId = requestAnimationFrame(tick);
  };
}

// Create and fill a vertex buffer
function initVertextBuffers(gl, points, a_Position) {
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) return -1;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return points.length / 2;
}

// Apply rotation and scaling
function rotateScale(gl, step, baseAngle, u_xformMatrix) {
  var angle = baseAngle + 45 * (step - 1);
  var scale = Math.pow(1 / Math.SQRT2, step - 1);

  var xformMatrix = new Matrix4();
  xformMatrix.setRotate(angle, 0, 0, 1);
  xformMatrix.scale(scale, scale, 1);

  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);
}

// Draw nested squares and diamonds
function drawShapes(gl, n, u_FragColor, u_xformMatrix, baseAngle) {
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (var i = 1; i <= level * 2; i++) {
    rotateScale(gl, i, baseAngle, u_xformMatrix);
    if (i % 2 === 1) {
      gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0); // red
    } else {
      gl.uniform4f(u_FragColor, 0.0, 0.0, 1.0, 1.0); // blue
    }
    gl.drawArrays(gl.LINE_LOOP, 0, n);
  }
}

// Rotation animation control
var g_last = Date.now();
function animate(angle) {
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  var newAngle = angle + (angleStep * elapsed) / 1000.0;
  return newAngle % 360;
}
