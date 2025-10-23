// Exercise3.js

// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +
  'uniform mat4 u_xformMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_xformMatrix * a_Position;\n' +
  ' v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';

var all_triangles = [];
var level = 0; // Recursion level for Sierpinski triangle
var currentAngle = 0.0; // Starting angle
var angleStep = 90.0; // Degrees per second

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get WebGL context');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }

  var verticesTexCoords = new Float32Array([
    -0.8, -0.8, -1.0, 0.0, 
    0.8, -0.8, 2.0, 0.0, 
    0.0, 0.8, 0.0, 3.0,
  ]);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  canvas.tabIndex = 0;
  canvas.focus();

  // Keyboard controls for recursion level
  var animating = false;
  var animationId = null;

  DrawSierpinskiTriangle(gl, verticesTexCoords, level, 0);

  canvas.onkeydown = function (event) {
    if (event.key === 'ArrowUp') {
      level = Math.min(level + 1, 2);
      DrawSierpinskiTriangle(gl, verticesTexCoords, level, 0);
    } else if (event.key === 'ArrowDown') {
      level = Math.max(level - 1, 0);
      DrawSierpinskiTriangle(gl, verticesTexCoords, level, 0);
    } else if (event.key === 'z') {
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
    DrawSierpinskiTriangle(gl, verticesTexCoords, level, 0);
    animationId = requestAnimationFrame(tick);
  };
}

function initVertexBuffers(gl, verticesTexCoords) {
  // Create a buffer object
  var vertexTexCoordBuffer = gl.createBuffer();
  if (!vertexTexCoordBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Write the positions of vertices to a vertex shader
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(verticesTexCoords),
    gl.STATIC_DRAW
  );

  var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
  gl.enableVertexAttribArray(a_Position);

  // Get the storage location of a_TexCoord
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if (a_TexCoord < 0) {
    console.log('Failed to get the storage location of a_TexCoord');
    return -1;
  }
  // Assign the buffer object to a_TexCoord variable
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  // Enable the generic vertex attribute array
  gl.enableVertexAttribArray(a_TexCoord);

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return verticesTexCoords.length / 4;
}

function initTextures(gl, n) {
  var texture = gl.createTexture(); // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // Get the storage location of u_Sampler
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;
  }
  var image = new Image(); // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  image.onload = function () {
    loadTexture(gl, n, texture, u_Sampler, image);
  };
  // Tell the browser to load an image
  image.src = 'pictures/J1.jpg';
  return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Activate texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Set the texture parameter
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.clear(gl.COLOR_BUFFER_BIT);

  for (var i = 0; i < n; i++) {
    var points = all_triangles[i][0];
    var triangleType = all_triangles[i][1];
    var numVertices = initVertexBuffers(gl, points);

    if (triangleType === 0) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else if (triangleType === 1) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    } else if (triangleType === 2) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }

    // Set the image to texture
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    // Set the texture unit 0 to the sampler
    gl.uniform1i(u_Sampler, 0);
    rotate(gl);
    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
  }
}

// Apply rotation to the triangle
function rotate(gl) {
  var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  var xformMatrix = new Matrix4();
  xformMatrix.setIdentity();
  xformMatrix.rotate(currentAngle, 0, 1, 0); // rotate around y axis
  if (!u_xformMatrix) {
    console.log('Failed to get the storage location of u_xformMatrix');
    return;
  }
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);
}

function collectPoints(points, level, type) {
  if (level === 0) {
    all_triangles.push([points, type]);
    return;
  }

  var ABx = (points[0] + points[4]) / 2;
  var ABy = (points[1] + points[5]) / 2;
  var BCx = (points[4] + points[8]) / 2;
  var BCy = (points[5] + points[9]) / 2;
  var CAx = (points[8] + points[0]) / 2;
  var CAy = (points[9] + points[1]) / 2;


    //Sub-triangles var
  var points1 = new Float32Array([
    points[0], points[1], -1.0, 0.0,
    ABx,        ABy,      2.0, 0.0,
    CAx,        CAy,      0.5, 2.0
  ]);

  var points2 = new Float32Array([
    ABx,        ABy,       -1.0, 0.0,
    points[4],  points[5], 2.0, 0.0, 
    BCx,        BCy,       0.5, 2.0
  ]);

  var points3 = new Float32Array([
    CAx, CAy,             -1.0, 0.0,
    BCx, BCy,             2.0, 0.0, 
    points[8], points[9], 0.5, 2.0
  ]);

  collectPoints(points1, level - 1, 0);
  collectPoints(points2, level - 1, 1);
  collectPoints(points3, level - 1, 2);
}

function DrawSierpinskiTriangle(gl, verticesTexCoords, level, type) {
  all_triangles = [];
  collectPoints(verticesTexCoords, level, type);
  initTextures(gl, all_triangles.length);
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
