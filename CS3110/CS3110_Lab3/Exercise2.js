// Exercise2.js

// Vertex shader program
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "uniform mat4 u_xformMatrix;\n" +
  "void main() {\n" +
  "  gl_Position = u_xformMatrix * a_Position;\n" +
  "  gl_PointSize = 10.0;\n" +
  "}\n";

// Fragment shader program
var FSHADER_SOURCE =
  "precision mediump float;\n" +
  "void main() {\n" +
  "  gl_FragColor =  vec4(gl_FragCoord.x/400.0, 0.0, gl_FragCoord.y/400.0, 1.0);\n" +
  "}\n";

// All in Rad
// radstep determines the density of the vertices
// currentRad starting rad
// Level is N turns
var radStep = 0.1;
var currentRad = 0.0;
var level = 2;

// All in degree
// rotationAngle is starting rotion angle in degree
// angleStep is how much you will rotate per sec aka speed
var rotationAngle = 0.0;
var angleStep = 40.0;

function main() {
  var canvas = document.getElementById("webgl");
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL context");
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to initialize shaders");
    return;
  }

  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  var u_xformMatrix = gl.getUniformLocation(gl.program, "u_xformMatrix");
  if (a_Position < 0 || !u_xformMatrix) {
    console.log("Failed to get shader variable locations");
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Generate your starting shape and init buffer
  var vertices = generatePoints(currentRad, level, 0.0, 0.02, radStep);
  var n = initVertexBuffers(gl, vertices, a_Position);

  // For keyboard input: focus
  canvas.tabIndex = 0;
  canvas.focus();

  // Keyboard controls for spiral turns
  var animating = false;
  var animationId = null;

  // Draw starting shape
  draw(gl, n, u_xformMatrix);
  // Get keyboard input
  canvas.onkeydown = function (ev) {
    if (ev.key === "ArrowUp") {
      // Arrow up, add more turns to spiral
      level = Math.min(level + 1, 7);
      vertices = generatePoints(currentRad, level, 0.0, 0.02, radStep);
      n = initVertexBuffers(gl, vertices, a_Position, u_xformMatrix);
      draw(gl, n, u_xformMatrix);
    } else if (ev.key === "ArrowDown") {
      // Arrow down, remove turns from spiral
      level = Math.max(level - 1, 2);
      vertices = generatePoints(currentRad, level, 0.0, 0.02, radStep);
      n = initVertexBuffers(gl, vertices, a_Position);
      draw(gl, n, u_xformMatrix);
    } else if (ev.key === "z") {
      // Press z to start or stop animation
      animating = !animating;
      if (animating) {
        tick(); // Start animation
      } else {
        cancelAnimationFrame(animationId); // Stopping animation needs the id of the animation frame
      }
    }
  };

  // Function to call animate
  var tick = function () {
    rotationAngle = animate(rotationAngle); // get the current angle based off the time
    draw(gl, n, u_xformMatrix); // draw spiral
    animationId = requestAnimationFrame(tick);
  };
}

// Generate spiral points using polar coordinates
function generatePoints(currentAngle, N_turns, a, b, radStep) {
  var vertices = [];
  var angle = currentAngle;
  var endAngle = N_turns * 2 * Math.PI; // how many full turns
  var r;
  var x_coord;
  var y_coord;
  while (angle <= endAngle) {
    r = a + b * angle; // spiral equation: radius grows with angle
    x_coord = r * Math.cos(angle);
    y_coord = -1 * r * Math.sin(angle); // flip y to match screen coords
    vertices.push(x_coord);
    vertices.push(y_coord);
    angle += radStep; // step through angles
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

// Apply rotation to the spiral
function rotate(gl, u_xformMatrix) {
  var xformMatrix = new Matrix4();
  xformMatrix.setIdentity();
  xformMatrix.rotate(rotationAngle, 0, 1, 0); // rotate around y axis
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);
}

// Draw the spiral with rotation
function draw(gl, n, u_xformMatrix) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  rotate(gl, u_xformMatrix);
  gl.drawArrays(gl.LINE_STRIP, 0, n); // draw as connected line segments
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
