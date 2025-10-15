// Exercise3.js

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
  "uniform vec4 u_FragColor;\n" +
  "void main() {\n" +
  "  gl_FragColor = u_FragColor;\n" +
  "}\n";

var angleStep = 90.0; // Degrees per second
var level = 0; // Recursion level for Sierpinski triangle
var currentAngle = 0.0; // Starting angle
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
  var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  var u_xformMatrix = gl.getUniformLocation(gl.program, "u_xformMatrix");
  if (a_Position < 0 || !u_FragColor || !u_xformMatrix) {
    console.log("Failed to get shader variable locations");
    return;
  }

  // Define triangle points and init buffer
  var vertices = new Float32Array([-0.8, -0.6, 0.8, -0.6, 0.0, 0.6]);
  var n = initVertexBuffers(gl, vertices, a_Position);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // For keyboard input: focus
  canvas.tabIndex = 0;
  canvas.focus();

  // Keyboard controls for recursion level
  var animating = false;
  var animationId = null;

  // Draw initial triangle
  DrawSierpinskiTriangle(
    vertices,
    level,
    gl,
    u_FragColor,
    u_xformMatrix,
    a_Position
  );

  // Get keyboard input
  canvas.onkeydown = function (ev) {
    if (ev.key === "ArrowUp") {
      // Arrow up, increase recursion level
      level = Math.min(level + 1, 4);
      gl.clear(gl.COLOR_BUFFER_BIT);
      DrawSierpinskiTriangle(
        vertices,
        level,
        gl,
        u_FragColor,
        u_xformMatrix,
        a_Position
      );
    } else if (ev.key === "ArrowDown") {
      // Arrow down, decrease recursion level
      level = Math.max(level - 1, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      DrawSierpinskiTriangle(
        vertices,
        level,
        gl,
        u_FragColor,
        u_xformMatrix,
        a_Position
      );
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
    currentAngle = animate(currentAngle); // get the current angle based off the time
    gl.clear(gl.COLOR_BUFFER_BIT);
    DrawSierpinskiTriangle(
      vertices,
      level,
      gl,
      u_FragColor,
      u_xformMatrix,
      a_Position
    );
    animationId = requestAnimationFrame(tick);
  };
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

// Apply rotation to the triangle
function rotate(gl, u_xformMatrix) {
  var xformMatrix = new Matrix4();
  xformMatrix.setIdentity();
  xformMatrix.rotate(currentAngle, 1, 0, 0); // rotate around x axis
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);
}

// Draw a single triangle with color based on position
function drawTriangle(gl, n, points, u_FragColor, u_xformMatrix) {
  rotate(gl, u_xformMatrix);
  // Calculate center of triangle for color
  var cx = points[0] + points[2] + points[4] / 3;
  var cy = points[1] + points[3] + points[5] / 3;

  // Color based on triangle position
  var red = (1 - cx) / 2;
  var green = (1 + cx) / 2;
  var blue = 1 + cy;
  gl.uniform4f(u_FragColor, red, green, blue, 1.0);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

// Recursive function to draw Sierpinski triangle
function DrawSierpinskiTriangle(
  points,
  level,
  gl,
  u_FragColor,
  u_xformMatrix,
  a_Position
) {
  if (level === 0) {
    // Base case: draw the triangle
    var n = initVertexBuffers(gl, points, a_Position);
    drawTriangle(gl, n, points, u_FragColor, u_xformMatrix);
    return;
  }

  // Calculate midpoints of each side
  var ABx_mid = (points[0] + points[2]) / 2;
  var ABy_mid = (points[1] + points[3]) / 2;
  var BCx_mid = (points[2] + points[4]) / 2;
  var BCy_mid = (points[3] + points[5]) / 2;
  var CAx_mid = (points[4] + points[0]) / 2;
  var CAy_mid = (points[5] + points[1]) / 2;

  // Create three sub-triangles using midpoints
  var points1 = [points[0], points[1], ABx_mid, ABy_mid, CAx_mid, CAy_mid];
  var points2 = [ABx_mid, ABy_mid, points[2], points[3], BCx_mid, BCy_mid];
  var points3 = [CAx_mid, CAy_mid, BCx_mid, BCy_mid, points[4], points[5]];

  // Recursively draw each sub-triangle
  DrawSierpinskiTriangle(
    points1,
    level - 1,
    gl,
    u_FragColor,
    u_xformMatrix,
    a_Position
  );
  DrawSierpinskiTriangle(
    points2,
    level - 1,
    gl,
    u_FragColor,
    u_xformMatrix,
    a_Position
  );
  DrawSierpinskiTriangle(
    points3,
    level - 1,
    gl,
    u_FragColor,
    u_xformMatrix,
    a_Position
  );
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
