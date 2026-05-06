// Exercise2.js

// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform vec4 u_Translation;\n' +
  'attribute vec4 a_Color;\n' + // attribute a_Color
  'varying vec4 v_Color;\n' + // varying variable
  'void main() {\n' +
  '  gl_Position = a_Position + u_Translation;\n' +
  '  gl_PointSize = 10.0;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'varying vec4 v_Color;\n' + // varying variable
  'void main() {\n' +
  '  gl_FragColor =  v_Color;\n' +
  '}\n';

var points = [
  -1.0, 1.0, 
  -1.0, 0.5, 
  -0.5, 1.0, 
  -0.5, 0.5];

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

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (a_Position < 0 || !a_Color) {
    console.log('Failed to get shader variable locations');
    return;
  }

  var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
  if (u_Translation < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);


  // init buffer for points and color
  drawAll(gl, a_Position, u_Translation, a_Color, 0.0, 0.0, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 0.5, 0.0, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 1.0, 0.0, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 1.5, 0.0, gl.TRIANGLE_STRIP);

  drawAll(gl, a_Position, u_Translation, a_Color, 0.0, -0.5, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 0.5, -0.5, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 1.0, -0.5, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 1.5, -0.5, gl.TRIANGLE_STRIP);

  drawAll(gl, a_Position, u_Translation, a_Color, 0.0, -1.0, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 0.5, -1.0, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 1.0, -1.0, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 1.5, -1.0, gl.TRIANGLE_STRIP);

  drawAll(gl, a_Position, u_Translation, a_Color, 0.0, -1.5, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 0.5, -1.5, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 1.0, -1.5, gl.TRIANGLE_STRIP);
  drawAll(gl, a_Position, u_Translation, a_Color, 1.5, -1.5, gl.TRIANGLE_STRIP);
}

// Create and fill a vertex buffer
function initVertexBuffers(gl, points, a_Position, a_Color) {
  // buffer for shape points
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) return -1;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // buffer for color
  var loop = points.length;
  var color = [];

  // assign random colors
  for (var i = 0; i < loop; i++) {
    color.push(Math.random(), Math.random(), Math.random());
  }

  var colorBuffer = gl.createBuffer();
  if (!colorBuffer) return -1;
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Color);

  // size
  return points.length / 2;
}

function drawAll(gl, a_Position, u_Translation, a_Color, TX, TY, shape) {
  var n = initVertexBuffers(gl, points, a_Position, a_Color);
  gl.uniform4f(u_Translation, TX, TY, 0.0, 0.0);
  gl.drawArrays(shape, 0, n);
}
