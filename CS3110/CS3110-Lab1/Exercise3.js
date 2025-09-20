// Exercise2.js

// Vertex shader program
var VSHADER_SOURCE =
 'attribute vec4 a_Position;\n' +
 'void main() {\n' +
  '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' +                    // Set the point size
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

var FSHADER_SOURCE2 =
  'precision mediump float;\n' + 
  'uniform vec4 u_FragColor;\n' + // uniform variable
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' + // Set the point color
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
    u_FragColor2 = gl2.getUniformLocation(gl2.program, 'u_FragColor')
    if (u_FragColor2 < 0) {
    console.log('Failed to get the storage location of u_FragColor2');
    return;
    }

    // Specify the color for clearing <canvas>
    gl1.clearColor(0.0, 0.0, 0.0, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);

    // Specify the color for clearing <canvas>
    gl2.clearColor(0.0, 0.0, 0.0, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);

    // Draw
    drawSolid(gl1, a_Position1, g_points[0]); // draw solid
    drawGrad(gl2, a_Position2, u_FragColor2, g_points[1]); // draw gradient
}

var g_points = [
    [
    // draw square
        // TOP BORDER
        -0.50, 0.20,
        -0.45, 0.20,
        -0.40, 0.20,
        -0.35, 0.20,
        -0.30, 0.20,
        -0.25, 0.20,
        -0.20, 0.20,
        -0.15, 0.20,
        -0.10, 0.20,
        -0.05, 0.20,
        0.00,  0.20,

        // RIGHT BORDER
        -0.50, 0.15,
        -0.50, 0.10,
        -0.50, 0.05,
        -0.50, 0.00,
        -0.50, -0.05,
        -0.50, -0.10,
        -0.50, -0.15,

        // BOTTOM BORDER
        -0.45, -0.15,
        -0.40, -0.15,
        -0.35, -0.15,
        -0.30, -0.15,
        -0.25, -0.15,
        -0.20, -0.15,
        -0.15, -0.15,
        -0.10, -0.15,
        -0.05, -0.15,
        
        // LEFT BORDER
        0.00,  -0.15,
        0.00,  -0.10,
        0.00,  -0.05,
        0.00,   0.00,
        0.00,   0.05,
        0.00,   0.10,
        0.00,   0.15
    ],
      // draw triangle
    [
         // tip
         0.00, 0.20,

         // left slant
        -0.05, 0.15,
        -0.10, 0.10,
        -0.15, 0.05,
        -0.20, 0.00,

        // base
        -0.15, 0.00,
        -0.10, 0.00,
        -0.05, 0.00,
         0.00, 0.00,
         0.15, 0.00,
         0.10, 0.00,
         0.05, 0.00,
        
        // right slant
         0.05, 0.15,
         0.10, 0.10,
         0.15, 0.05,
         0.20, 0.00,
    ],
];

// Function to draw with solid
function drawSolid(gl1, a_Position1, g_points){
    // Get length of array
    var len = g_points.length;

    // Loop to draw points
    for(var i = 0; i < len; i+=2){

    // Pass the position of a point to a_Position variable
    gl1.vertexAttrib3f(a_Position1, g_points[i], g_points[i+1], 0.0);

    // Draw
    gl1.drawArrays(gl1.POINTS, 0, 1)
    }
}

// Function to draw with gradient
function drawGrad(gl2, a_Position2, u_FragColor2, g_points){
    // Get length of array
    var len = g_points.length;

    // Loop to draw points
    for(var i = 0; i < len; i+=2){
    let t = i / len;
    // Pass the position of a point to a_Position variable
    gl2.vertexAttrib3f(a_Position2, g_points[i], g_points[i+1], 0.0);
    gl2.uniform4f(u_FragColor2, t, t - 1, 0.0, 1.0);

    // Draw
    gl2.drawArrays(gl2.POINTS, 0, 1)
    }
}