
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

var FSHADER_SOURCE2 =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

function main(){
    // Retrieve <canvas> element
    var canvas1 = document.getElementById('webgl1');
    var canvas2 = document.getElementById('webgl2');

    // Get the rendering context for WebGL
    var gl1 = getWebGLContext(canvas1);
    if (!gl1) {
    console.log('Failed to get the rendering context for WebGL');
    return;
    }
    var gl2 = getWebGLContext(canvas2);
    if (!gl2) {
    console.log('Failed to get the rendering context for WebGL');
    return;
    }

    // Initialize shaders
    if (!initShaders(gl1, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
    }
    if (!initShaders(gl2, VSHADER_SOURCE, FSHADER_SOURCE2)) {
    console.log('Failed to intialize shaders.');
    return;
    }

    // Get the storage location of a_Position
    var a_Position1 = gl1.getAttribLocation(gl1.program, 'a_Position');
    if (a_Position1 < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
    }
    var a_Position2 = gl2.getAttribLocation(gl2.program, 'a_Position');
    if (a_Position2 < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
    }

    // Get the storage location of u_FragColor2 
    u_FragColor1 = gl1.getUniformLocation(gl1.program, 'u_FragColor')
    if (u_FragColor1 < 0) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
    }

    // function for the first canvas to change color
    canvas1.onmousedown = function(ev){ clickChangeColor(ev, gl1, canvas1, a_Position1, u_FragColor1); };
    // Specify the color for clearing <canvas>
    gl1.clearColor(0.0, 0.0, 0.0, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);

    // function for the second canvas to draw lines
    canvas2.onmousedown = function(ev){ drawLine(ev, gl2, canvas2, a_Position2); };
    // Specify the color for clearing <canvas>
    gl2.clearColor(0.0, 0.0, 0.0, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);

  }

var count = 1;
var g_points1 = []; // The array for the position of a mouse press for first canvas
var g_points2 = []; // The array for the position of a mouse press for second canvas

  // change color function for first canvas every click
function clickChangeColor(ev, gl1, canvas1, a_Position1, u_FragColor1) {

  // get x and y position
  var x = ev.clientX;
  var y = ev.clientY;
  var rect1 = ev.target.getBoundingClientRect();

  // Convert to WebGL coordinates
  x = ((x - rect1.left) - canvas1.width/2) / (canvas1.width/2);
  y = (canvas1.height/2 - (y - rect1.top)) / (canvas1.height/2);

  // Save new point
  g_points1.push([x, y]);

  // Clear canvas
  gl1.clear(gl1.COLOR_BUFFER_BIT);

  // Pick color based on count
  if (count % 3 === 1) {
    gl1.uniform4f(u_FragColor1, 1.0, 0.0, 0.0, 1.0); // red
  } else if (count % 3 === 2) {
    gl1.uniform4f(u_FragColor1, 0.0, 1.0, 0.0, 1.0); // green
  } else {
    gl1.uniform4f(u_FragColor1, 0.0, 0.0, 1.0, 1.0); // blue
  }
  count++;

  var len = g_points1.length;
  // Draw all points in the chosen color
  for (var i = 0; i < len; i++) {
    var xy = g_points1[i];
    gl1.vertexAttrib3f(a_Position1, xy[0], xy[1], 0.0);
    gl1.drawArrays(gl1.POINTS, 0, 1);
  }
}


function drawLine(ev, gl2, canvas2, a_Position2) {

  // get x and y position
  var x = ev.clientX;
  var y = ev.clientY;
  var rect1 = ev.target.getBoundingClientRect();

  // Convert to WebGL coordinates
  x = ((x - rect1.left) - canvas2.width/2) / (canvas2.width/2);
  y = (canvas2.height/2 - (y - rect1.top)) / (canvas2.height/2);

  // Save new point and create points array to make buffer
  g_points2.push(x, y);
  let points = new Float32Array(g_points2);
  initVertextBuffers(gl2, points, a_Position2);

  // Clear canvas
  gl2.clear(gl2.COLOR_BUFFER_BIT);

  var len = g_points2.length;

  // draw line and points
  // dont need loop because i use buffer now
    gl2.drawArrays(gl2.LINES, 0, len/2);
    gl2.drawArrays(gl2.POINTS, 0, len/2);
}

// load buffer learned from textbook
function initVertextBuffers(gl2, points, a_Position2) {

  //create new buffer object
  var vertexBuffer = gl2.createBuffer();
  if(!vertexBuffer){
    console.log('Failed to create the buffer object')
    return -1;
  }

  //bind the buffer object to target
  gl2.bindBuffer(gl2.ARRAY_BUFFER, vertexBuffer);

  //write data to buffer
  gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(points), gl2.STATIC_DRAW);

  // asign the buffer object to a_pos varible
  gl2.vertexAttribPointer(a_Position2, 2, gl2.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl2.enableVertexAttribArray(a_Position2);
 
}