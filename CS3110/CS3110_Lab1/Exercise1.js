// Exercise1.js

// Vertex shader program
var VSHADER_SOURCE =
 'attribute vec4 a_Position;\n' +
 'void main() {\n' +
  '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' +                    // Set the point size
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' + 
  'uniform vec4 u_FragColor;\n' + // uniform variable
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' + // Set the point color
  '}\n';

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
  // Get the storage location of a_Position
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a point
  drawSmile(gl, a_Position, u_FragColor);
}
var g_points = [
  //left eye
  -0.50, 0.20,    // top-left
  -0.45, 0.20,    // top-right
  -0.50, 0.15,   // bottom-left
  -0.45, 0.15,   // bottom-right

  //right eye
  0.50, 0.20,    // top-right
  0.45, 0.20,    // top-left
  0.50, 0.15,    // bottom-right
  0.45, 0.15,   // bottom-left

  //smile
  -0.45,  0.00,
  -0.40, -0.05,
  -0.35, -0.05,
  -0.30, -0.05,
  -0.25, -0.05,
  -0.20, -0.05,
  -0.15, -0.05,
  -0.10, -0.05,
  -0.05, -0.05,
  0.00,  -0.05,
  0.05,  -0.05,
  0.10,  -0.05,
  0.15,  -0.05,
  0.20,  -0.05,
  0.25,  -0.05,
  0.30,  -0.05,
  0.35,  -0.05,
  0.40,  -0.05,
  0.45,   0.00,
];

function drawSmile(gl, a_Position, u_FragColor) {
  // Write the positions of vertices to a vertex shader
  var len = g_points.length;

  // Draw points
  for(var i = 0; i < len; i+=2){

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, Math.random(), Math.random(), Math.random(), 1.0);

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}