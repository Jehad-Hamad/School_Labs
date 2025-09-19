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
    if (!initShaders(gl2, VSHADER_SOURCE, FSHADER_SOURCE)) {
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
    
    // Specify the color for clearing <canvas>
    gl1.clearColor(0.0, 0.0, 0.0, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);

    // Specify the color for clearing <canvas>
    gl2.clearColor(0.0, 0.0, 0.0, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);

    // Draw
    draw(gl1, a_Position1, g_points[0]); // draw square
    draw(gl2, a_Position2, g_points[1]); // draw triangle
}

var g_points = [
    // draw square
    [
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
        0.00,  -0.15,
        
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

// Function to draw
function draw(gl, a_Position, array){
    // Get length of array
    var len = array.length;

    // Loop to draw points
    for(var i = 0; i < len; i+=2){

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, array[i], array[i+1], 0.0);

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1)
    }
}