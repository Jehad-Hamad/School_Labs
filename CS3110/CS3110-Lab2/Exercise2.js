// Exercise2.js

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
  'precision mediump float;\n' + 
  'uniform vec4 u_FragColor; \n' +
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

  // Get the storage location of u_Translation
  var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
  if (u_Translation < 0) {
    console.log('Failed to get the storage location of u_Translation');
    return;
  }

  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (u_FragColor < 0) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
  
  // Specify the color for clearing <canvas>
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Array for border
  var BORDER = [
    // Right border
    [1.0, 1.0,
     1.0, -1.0,
     0.95, 1.0,
     0.95, -1.0,
    ],
    // Left border
    [-1.0, 1.0,
     -1.0, -1.0,
     -0.95, 1.0,
     -0.95, -1.0,
    ],
    // Top border
    [-1.0, 1.0,
     -1.0, 0.975,
     1.0, 0.975,
     1.0, 1.0
    ],
    //Bottom border
     [1.0, -1.0,
     1.0, -0.975,
     -1.0, -0.975,
     -1.0, -1.0
    ]
  ]
  // Just to draw the border
  draw(gl, BORDER[0], a_Position, u_FragColor, 0.0, 0.0, 0.0, u_Translation, 0.0, 0.0, gl.TRIANGLE_STRIP, 4)
  draw(gl, BORDER[1], a_Position, u_FragColor, 0.0, 0.0, 0.0, u_Translation, 0.0, 0.0, gl.TRIANGLE_STRIP, 4)
  draw(gl, BORDER[2], a_Position, u_FragColor, 0.0, 0.0, 0.0, u_Translation, 0.0, 0.0, gl.TRIANGLE_STRIP, 4)
  draw(gl, BORDER[3], a_Position, u_FragColor, 0.0, 0.0, 0.0, u_Translation, 0.0, 0.0, gl.TRIANGLE_STRIP, 4)

  // Array for Z
  var Z = [
    -0.75, 0.75,
    -0.25, 0.75,
    -0.75, 0.45,
    -0.25, 0.45,
  ]
  // Just to draw the Z
  draw(gl, Z, a_Position, u_FragColor, 1.0, 0.0, 0.0, u_Translation, 0.0, 0.0, gl.LINE_STRIP, 4)

  // Array for line 4 times
  var LINE4X = [
    0.75, 0.75,
    0.15, 0.75,
  ]
  // Just to draw the line 4 times
  draw(gl, LINE4X, a_Position, u_FragColor, 0.0, 0.0, 1.0, u_Translation, 0.0, 0.0, gl.LINES, 2)
  draw(gl, LINE4X, a_Position, u_FragColor, 0.0, 0.0, 1.0, u_Translation, 0.0, -0.05, gl.LINES, 2)
  draw(gl, LINE4X, a_Position, u_FragColor, 0.0, 0.0, 1.0, u_Translation, 0.0, -0.1, gl.LINES, 2)
  draw(gl, LINE4X, a_Position, u_FragColor, 0.0, 0.0, 1.0, u_Translation, 0.0, -0.15, gl.LINES, 2)

  // Array for triangle 2 times
  var TRIANGLE2X = [
    0.3, 0.6,
    0.4, 0.45,
    0.2, 0.45,
  ]
  // Just to draw the triangle 2 times
  draw(gl, TRIANGLE2X, a_Position, u_FragColor, 1.0, 1.0, 0.0, u_Translation, 0.0, 0.0, gl.TRIANGLES, 3)
  draw(gl, TRIANGLE2X, a_Position, u_FragColor, 1.0, 1.0, 0.0, u_Translation, 0.3, 0.0, gl.TRIANGLES, 3)

  // Array for the BOOKMARK
  var BOOKMARK = [
    0.75, 0.0,
    0.75, -0.4,
    0.15, 0.0,
    0.15, -0.4
  ]
  // Just to draw the BOOKMARK
  draw(gl, BOOKMARK, a_Position, u_FragColor, 0.0, 1.0, 0.0, u_Translation, 0.0, 0.0, gl.TRIANGLE_FAN, 4)

  var CIRCLE = makeCircleVertices(-0.5, -0.25, 0.3, 100);
  console.log(CIRCLE)
  draw(gl, CIRCLE, a_Position, u_FragColor, 0.0, 0.0, 0.0, u_Translation, 0.0, 0.0, gl.TRIANGLE_FAN, 100)
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
function draw(gl, array, a_Position, u_FragColor, r, g, b, u_Translation, TX, TY, shape, amount_of_vertices){

  // Bind, write, assign and enable buffer for the array
  initVertextBuffers(gl, array, a_Position);

  // Assign u_FragColor with r, g and b change colors
  gl.uniform4f(u_FragColor, r, g, b, 1.0);

  // Assign u_Translation with TX and TY so you can translate in the x and y direction 
  gl.uniform4f(u_Translation, TX, TY, 0.0, 0.0);

  // Draw the shape for the array plus the translation 
  gl.drawArrays(shape, 0, amount_of_vertices);
}

function makeCircleVertices(centerX, centerY, radius, vertexCount){
  var CIRCLEDATA = [];
  for (var i = 0; i <= vertexCount; i++){
    var angle = i/vertexCount * 2 * Math.PI;
    CIRCLEDATA.push(centerX + radius * Math.cos(angle));
    CIRCLEDATA.push(centerY + radius * Math.sin(angle));
  }
  return CIRCLEDATA
}
