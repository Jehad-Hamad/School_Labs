// Exercise1.js

// Vertex shader program
var VSHADER_SOURCE =
 'attribute vec4 a_Position;\n' +
 'uniform vec4 u_Translation;\n' +
 'void main() {\n' +
  '  gl_Position = a_Position + u_Translation;\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 5.0;\n' +                    // Set the point size
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
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

  // Get the storage location of u_Translation
  var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
  if (u_Translation < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }
  
  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // For all but TRIANGLE_STRIP
  var points = [  
  -0.2, 0.80, //V0
  -0.3, 0.60, //V1
  -0.2, 0.40, //V2
   0.1, 0.35, //V3
   0.2, 0.60, //V4
   0.1, 0.75, //V5
 ];

  // Only TRIANGLE_STRIP
  var points_TRIANGLE_STRIP = [
  -0.3, 0.60, //V1
  -0.2, 0.40, //V2
  -0.2, 0.80, //V0
   0.1, 0.35, //V3
   0.1, 0.75, //V5
   0.2, 0.60, //V4
 ];

  // Get the length for both arrays
  var amount_of_vertices = points.length / 2;
  var amount_of_vertices2 = points.length / 2;

  // Draw the POINTS shape
  draw(gl, points, a_Position, u_Translation, 0.0, 0.0, gl.POINTS, amount_of_vertices);

  // Draw the LINES, LINE_STRIP and LINE_LOOP shape
  draw(gl, points, a_Position, u_Translation, -0.6, -0.65, gl.LINES, amount_of_vertices);
  draw(gl, points, a_Position, u_Translation, 0.0, -0.65, gl.LINE_STRIP, amount_of_vertices);
  draw(gl, points, a_Position, u_Translation, 0.6, -0.65, gl.LINE_LOOP, amount_of_vertices);

  // Draw the TRIANGLES, TRIANGLE_STRIP and TRIANGLE_FAN shape
  draw(gl, points, a_Position, u_Translation, -0.6, -1.2, gl.TRIANGLES, amount_of_vertices);
  draw(gl, points_TRIANGLE_STRIP, a_Position, u_Translation, 0, -1.2, gl.TRIANGLE_STRIP, amount_of_vertices2);
  draw(gl, points, a_Position, u_Translation, 0.6, -1.2, gl.TRIANGLE_FAN, amount_of_vertices);

}


// Load buffer learned from textbook
function initVertextBuffers(gl, points, a_Position) {

  // Create new buffer object
  var vertexBuffer = gl.createBuffer();
  if(!vertexBuffer){
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Write data to buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

  // Asign the buffer object to a_pos varible
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
}

// This is the function to draw
// Need gl, array of points, a_position to load the buffer
// Need u_Translation, TX, TY so you translate in x and y direction 
// Need shape and ampunt of vertex so you can draw what you want
function draw(gl, array, a_Position, u_Translation, TX, TY, shape, amount_of_vertices){

  // Bind, write, assign and enable buffer for the array
  initVertextBuffers(gl, array, a_Position);

  // Assign u_Translation with TX and TY so you can translate in the x and y direction 
  gl.uniform4f(u_Translation, TX, TY, 0.0, 0.0);

  // Draw the shape for the array plus the translation 
  gl.drawArrays(shape, 0, amount_of_vertices);

}