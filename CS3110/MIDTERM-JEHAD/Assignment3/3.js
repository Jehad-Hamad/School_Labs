// TexturedQuad.js (c) 2012 matsuda and kanda
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

var currentAngle = 0.0; // Starting angle
var angleStep = 90.0; // Degrees per second

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the vertex information
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Set texture

  canvas.tabIndex = 0;
  canvas.focus();

  // Keyboard controls for recursion level
  var animating = false;
  var animationId = null;

  var tick = function () {
    currentAngle = animate(currentAngle);
    initTextures(gl, n, 0.0, 0.0, true, false, 'y');
    initTextures(gl, n, 0.5, 0.0, true, false, 'y');
    initTextures(gl, n, 1.0, 0.0, true, false, 'y');
    initTextures(gl, n, 1.5, 0.0, true, false, 'y');

    initTextures(gl, n, 0.0, -1.5, true, false, 'x');
    initTextures(gl, n, 0.5, -1.5, true, false, 'x');
    initTextures(gl, n, 1.0, -1.5, true, false, 'x');
    initTextures(gl, n, 1.5, -1.5, true, false, 'x');
    animationId = requestAnimationFrame(tick);
  };
  tick();
}

function initVertexBuffers(gl) {
  var verticesTexCoords = new Float32Array([
    // Vertex coordinates, texture coordinate
    -1.0, 1.0, 0.0, 1.0, -1.0, 0.5, 0.0, 0.0, -0.5, 1.0, 1.0, 1.0, -0.5, 0.5,
    1.0, 0.0,
  ]);
  var n = 4; // The number of vertices

  // Create the buffer object
  var vertexTexCoordBuffer = gl.createBuffer();
  if (!vertexTexCoordBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

  var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
  //Get the storage location of a_Position, assign and enable buffer
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
  gl.enableVertexAttribArray(a_Position); // Enable the assignment of the buffer object

  // Get the storage location of a_TexCoord
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if (a_TexCoord < 0) {
    console.log('Failed to get the storage location of a_TexCoord');
    return -1;
  }
  // Assign the buffer object to a_TexCoord variable
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  gl.enableVertexAttribArray(a_TexCoord); // Enable the assignment of the buffer object

  return n;
}

function initTextures(gl, n, TX, TY, rotaion, translation, direction) {
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
    loadTexture(
      gl,
      n,
      texture,
      u_Sampler,
      image,
      TX,
      TY,
      rotaion,
      translation,
      direction
    );
  };
  // Tell the browser to load an image
  image.src = 'pictures/J1.jpg';

  return true;
}

function loadTexture(
  gl,
  n,
  texture,
  u_Sampler,
  image,
  TX,
  TY,
  rotation,
  translation,
  direction
) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler, 0);

  var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
  if (u_Translation < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  if (translation) {
    for (var i = 0; i < 5; i++) {
      var ticker = 0.5;
      rotate(gl, TX, TY, rotation, translation, direction, ticker);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
      ticker -= 0.1;
    }
  } else {
    rotate(gl, TX, TY, rotation, translation, direction);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
  }
}

function rotate(gl, tx, ty, rotation, translation, direction, ticker) {
  var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  var xformMatrix = new Matrix4();
  xformMatrix.setIdentity();
  if (rotation) {
    if (direction == 'x') {
      xformMatrix.setRotate(currentAngle, 1, 0, 0);
    } else if (direction == 'y') {
      xformMatrix.setRotate(currentAngle, 0, 1, 0);
    }
    xformMatrix.translate(tx, ty, 0);
  }

  if (!u_xformMatrix) {
    console.log('Failed to get the storage location of u_xformMatrix');
    return;
  }
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);
}

var g_last = Date.now();
function animate(angle) {
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  var newAngle = angle + (angleStep * elapsed) / 1000.0;
  return newAngle % 360;
}

function move(gl, TY, direction, limit) {
  var ticker = 0.1;
  if (direction == 'up') {
    TY -= ticker;
  }
  return TY;
}
