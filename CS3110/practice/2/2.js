// Exercise2.js

// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' + // attribute a_Color
  'varying vec4 v_Color;\n' + // varying variable
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
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

function main() {
  // Retrieve <canvas> element
  var canvas1 = document.getElementById('webgl1');
  var canvas2 = document.getElementById('webgl2');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas1);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  var gl2 = getWebGLContext(canvas2);
  if (!gl2) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  if (!initShaders(gl2, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (a_Position < 0 || !a_Color) {
    console.log('Failed to get shader variable locations');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Specify the color for clearing <canvas>
  gl2.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear <canvas>
  gl2.clear(gl.COLOR_BUFFER_BIT);
  //points for shape

  var points = [
    -0.5, 0.5, -0.5, 0.3, -0.3, 0.5, -0.3, 0.3, -0.1, 0.15, 0.1, 0.0,
  ];
  var loop = points.length;
  var color = [];
  // assign random colors
  for (var i = 0; i < loop; i++) {
    color.push(Math.random(), Math.random(), Math.random());
  }
  // init buffer for points and color
  var n = initVertexBuffers(gl, points, color, a_Position, a_Color);

  draw(gl, n, points);

  var points_hearts = [
    0.0, 0.0, -0.25, 0.25, 0.25, 0.25, -0.25, 0.45, 0.25, 0.45, -0.15, 0.55,
    0.15, 0.55, 0.0, 0.45,
  ];

  var color_hearts = [];
  for (var i = 0; i < points_hearts.length / 2; i++) {
    color_hearts.push(1.0, 0.0, 0.0); // red for each vertex
  }
  // init buffer for points and color
  var n = initVertexBuffers(
    gl2,
    points_hearts,
    color_hearts,
    a_Position,
    a_Color
  );
  draw(gl2, n, gl.PONITS);
  draw(gl2, n, gl.TRIANGLE_STRIP);
}

// Create and fill a vertex buffer
function initVertexBuffers(gl, points, color, a_Position, a_Color) {
  // buffer for shape points
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) return -1;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // buffer for color
  var colorBuffer = gl.createBuffer();
  if (!colorBuffer) return -1;
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Color);

  // size
  return points.length / 2;
}

// draw
function draw(gl, n, shape) {
  gl.drawArrays(shape, 0, n);
}
