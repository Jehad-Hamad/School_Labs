// Vertex shader
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_ModelViewMatrix;
    uniform mat4 u_xformMatrix;
    varying vec4 v_Color;
    void main() {
        gl_Position = u_ModelViewMatrix * u_xformMatrix * a_Position;
        v_Color = a_Color;
    }`;

// Fragment shader
var FSHADER_SOURCE = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec4 v_Color;
    void main() {
        gl_FragColor = v_Color;
    }`;

let viewMatrix, modelMatrix, projMatrix, modelViewMatrix, u_ModelViewMatrix, u_xformMatrix;

function main() {
    const canvas = document.getElementById('webgl');
    const gl = getWebGLContext(canvas);
    if (!gl) return;

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) return;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix');
    u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');

    viewMatrix = new Matrix4();
    viewMatrix.setLookAt(
        //-6.0, 3.5, 1,
        //6.0, 3.5, 1,
         0, 1, 6,       
        //0, 1, -6,
        //0, 10, 1,
   
        0, 0, 0,        
        0, 1, 0
    );

    projMatrix = new Matrix4();
    projMatrix.setPerspective(45, canvas.width / canvas.height, 0.1, 100);

    modelMatrix = new Matrix4();
    modelMatrix.setRotate(0, 0, 1, 0);

    modelViewMatrix = projMatrix.multiply(viewMatrix).multiply(modelMatrix);

    gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const floor = createPlane(gl, "floor",    [0.54, 0.60, 0.36]);
    const right = createPlane(gl, "wallRight",[0.53, 0.81, 0.92]);     
    const left  = createPlane(gl, "wallLeft", [0.53, 0.81, 0.92]);     
    const back  = createPlane(gl, "wallBack", [0.53, 0.81, 0.92]);       
    const planes = [floor, right, left, back]
    drawPlanes(gl, planes)

    const greenSphere =    createSphere(gl, [.54, 0.9, 0.36]);
    const blueBodySphere = createSphere(gl, [0.0, 0.4, 0.8]);
    const redSphere =      createSphere(gl, [1.0, 0.0, 0.0]);
    const yellowSphere =   createSphere(gl, [1.0, 1.0, 0.1]);
    const whiteSphere =    createSphere(gl, [1.0, 1.0, 1.0]);
    const blackSphere =    createSphere(gl, [0.0, 0.0, 0.0]);
    const natchoSphere =   createSphere(gl, [1.0, 0.65, 0.17]);

    const armCylinder = createCylinder(gl, [1.0, 0.0, 0.0]);
    const mallotCylinder = createCylinder(gl, [0.55, 0.27, 0.07]);
    const whiteCylinder = createCylinder(gl, [1.0, 1.0, 1.0]);

    const mallotCircle = createCircle(gl, [1.0, 0.0, 0.00]);

    const yellowTriangle = createTriangle(gl, [1.0, 1.0, 0.0]);
    const redTriangle = createTriangle(gl, [1.0, 0.0, 0.0]);

    const star = createStar(gl, [ 1.0, 1.0, 0.0]);

    const pyramid = createPyramid(gl, [1.0, 1.0, 0.0]);

    drawSpheres(gl, greenSphere, 10)

    // PENGUIN
    // Body
    drawSphere(gl, blueBodySphere, [0, 0.63, .2], [0.4, 0.4, 0.4], [0, 1, 0, 0], [0, 1, 0, 0]); 

    // White scarf and coat
    drawSphere(gl, redSphere, [0.0, 0.6, 0.0,], [0.5, 0.5, 0.5], [0, 1, 0, 0], [0, 1, 0, 0]); 
    drawSphere(gl, whiteSphere, [0.15, 0.60, 0.09], [0.13, 0.5, 0.4], [0, 0, 0, 1], [40, 0, 1, 0]); 
    drawSphere(gl, whiteSphere, [-0.15, 0.60, 0.09], [0.13, 0.5, 0.4], [0, 0, 0, 1], [-40, 0, 1, 0]); 
    drawSphere(gl, whiteSphere, [-0.011, 1.0, 0.04], [0.2, 0.17, 0.35], [0, 0, 0, 1], [90, 0, 1, 0]); 

    // Head
    drawSphere(gl, blueBodySphere, [0, 1.2, .2], [0.3, 0.3, 0.3], [0, 1, 0, 0], [0, 1, 0, 0]);

    // Beak
    drawPyramid(gl, pyramid, [0.0, 1.07, 0.5], [0.15, 0.06, 0.23], [0, 1, 0, 0], [0, 0, 1, 0]);  // Top beak
    drawPyramid(gl, pyramid, [0.0, 1.07, 0.5], [0.15, 0.1, 0.23], [0, 1, 0, 0], [180, 0, 0, 1]); // Bottom beak

    // Eyes
    drawSphere(gl, whiteSphere, [-0.15, 1.2, 0.4], [0.05, 0.1, 0.1], [0, 1, 0, 0], [0, 1, 0, 0]); // Left sclara 
    drawSphere(gl, whiteSphere, [0.15, 1.2, 0.4],  [0.05, 0.1, 0.1], [0, 1, 0, 0], [0, 1, 0, 0]); // Right sclara
    drawSphere(gl, blackSphere, [-0.15, 1.2, 0.403], [0.05, 0.09, 0.1], [0, 1, 0, 0], [0, 1, 0, 0]); // Left pupil
    drawSphere(gl, blackSphere, [0.15, 1.2, 0.403],  [0.05, 0.09, 0.1], [0, 1, 0, 0], [0, 1, 0, 0]); // Right pupil
    drawSphere(gl, whiteSphere, [-0.15, 1.2, 0.476], [0.03, 0.03, 0.03], [0, 1, 0, 0], [0, 1, 0, 0]) // Left iris
    drawSphere(gl, whiteSphere, [0.15, 1.2, 0.476],  [0.03, 0.03, 0.03], [0, 1, 0, 0], [0, 1, 0, 0]) // right iris

    // Hat
    drawSphere(gl, redSphere,     [0, 1.4, .2],      [ 0.2, 0.2, 0.2], [0, 1, 0, 0], [0, 1, 0, 0]) 
    drawSphere(gl, yellowSphere,  [0, 1.35, .2],     [0.3, 0.1, 0.3], [0, 1, 0, 0], [0, 1, 0, 0])
    drawSphere(gl, yellowSphere,  [0.0, 1.35, 0.45],[0.1, 0.1, 0.1], [0, 1, 0, 0], [0, 1, 0, 0])
    drawSphere(gl, whiteSphere,   [0, 1.6, 0.1],   [0.1, 0.1, 0.1], [0, 1, 0, 0], [0, 1, 0, 0])

    // Arms
    drawCylinder(gl, armCylinder, [-0.23, 0.9, -0.2], [0.1, 0.1, 0.1],   [100, 1, 0, 0], [20, 0, 0, 1]);  // Left arm coat
    drawCylinder(gl, armCylinder, [0.23, 0.9, -0.2],  [0.1, 0.1, 0.1],   [100, 1, 0, 0], [-20, 0, 0, 1]); // Right arm coat

    // Hand
    drawSphere(gl, whiteSphere, [-0.6, 0.725, 0.8],  [0.11, 0.11, 0.11], [0, 1, 0, 0], [0, 1, 0, 0])    // Left Puff coat
    drawSphere(gl, whiteSphere, [0.6, 0.725, 0.8],  [0.11, 0.11, 0.11], [0, 1, 0, 0], [0, 1, 0, 0])     // Right Puff coat
    drawSphere(gl, natchoSphere, [-0.62, 0.71, 0.85],  [0.12, 0.12, 0.12], [0, 1, 0, 0], [0, 1, 0, 0])  // Left hand
    drawSphere(gl, natchoSphere, [0.62, 0.71, 0.85],  [0.12, 0.12, 0.12], [0, 1, 0, 0], [0, 1, 0, 0])   // Right hand

    // Mallot
    drawCylinder(gl, mallotCylinder, [-0.75, 0.4, 0.95],  [0.1, 0.1, 0.1],   [0, 1, 0, 0], [0, 0, 0, 1])     // Handle 
    drawCylinder(gl, mallotCylinder, [-0.77, 1.36, 0.55],  [0.2, 0.2, 0.07],   [90, 1, 0, 0], [0, 0, 0, 1]); // Hammer
    drawCylinder(gl, whiteCylinder, [-0.77, 1.36, 1.3],  [0.2, 0.2, 0.01],   [90, 1, 0, 0], [0, 0, 0, 1]);   // White front circle
    drawCylinder(gl, whiteCylinder, [-0.77, 1.36, 0.45],  [0.2, 0.2, 0.01],   [90, 1, 0, 0], [0, 0, 0, 1]);  // White back circle
    drawCircle(gl, mallotCircle, [-.77, 1.36, 1.42], [0.2, 0.2, 0.1], [0, 1, 0, 0])                          // Mallot front circle
    drawCircle(gl, mallotCircle, [-.77, 1.36, 0.44], [0.2, 0.2, 0.1], [0, 1, 0, 0])                          // Mallot back circle
    drawStar(gl, star, [-0.77, 1.37, 1.43], [0.2, 0.2, 0.1], [0, 1, 0, 0])                                   // Front star
    drawStar(gl, star, [-0.77, 1.37, .43], [0.2, 0.2, 0.1], [0, 1, 0, 0])                                    // Back star
    
    // Feet
    drawSphere(gl, natchoSphere, [-0.2, 0.2, 0.25], [0.2, 0.2, 0.2], [0, 1, 0, 0], [0, 1, 0, 0]) // Left foot
    drawSphere(gl, natchoSphere, [0.2, 0.2, 0.25],  [0.2, 0.2, 0.2], [0, 1, 0, 0], [0, 1, 0, 0]) // Right foot

    // Belt    
    drawTriangle(gl, redTriangle, [-0.31, 0.48, 0.4], [0.15, 0.15, 1], [14, 1, 0, 0], [-14, 0, 1, 0])
    drawTriangle(gl, yellowTriangle, [-0.24, 0.58, 0.52], [0.25, 0.2, 1], [180, 1, 0, 0], [15,0, 1, 0])
    drawTriangle(gl, redTriangle,  [-0.10, 0.46, 0.57], [0.25, 0.2, 1], [0, 1, 0, 0], [-4, 0, 1, 0])
    drawTriangle(gl, yellowTriangle, [0.04, 0.58, 0.6], [0.25, 0.2, 1], [180, 1, 0, 0], [-2, 0, 1, 0])
    drawTriangle(gl, redTriangle,  [0.18, 0.46, 0.55], [0.25, 0.2, 1], [0, 1, 0, 0], [7.5, 0, 1, 0])
    drawTriangle(gl, yellowTriangle, [0.27, 0.58, 0.50], [0.15, 0.2, 1], [180, 1, 0, 0], [-6, 0, 1, 0])
}

// Function to create my plane aka my wall i just just need to give it a type and color
function createPlane(gl, wall, color) {

    // Eight points for all walls
    const vertex = [
        [-7.0,  0.0, -7.0], // v0
        [ 7.0,  0.0, -7.0], // v1
        [ 7.0,  7.0, -7.0], // v2
        [-7.0,  7.0, -7.0], // v3

        [-7.0,  0.0,  7.0], // v4
        [ 7.0,  0.0,  7.0], // v5
        [ 7.0,  7.0,  7.0], // v6
        [-7.0,  7.0,  7.0], // v7
    ];

    let vertices;

    // Switch statement for different types of planes
    switch(wall){

        case "floor":
            vertices = new Float32Array([
            ...vertex[0],
            ...vertex[4],
            ...vertex[5],
            ...vertex[1]
        ]);
        break;

        case "wallRight":
            vertices = new Float32Array([
                ...vertex[1],
                ...vertex[5],
                ...vertex[6],
                ...vertex[2]
            ]);
            break;

        case "wallLeft":
            vertices = new Float32Array([
                ...vertex[4],
                ...vertex[0],
                ...vertex[3],
                ...vertex[7]
            ]);
            break;

        case "wallBack":
            vertices = new Float32Array([
                ...vertex[0],
                ...vertex[1],
                ...vertex[2],
                ...vertex[3]
            ]);
            break;

        default:
            console.log(wall + " ISSUE")
            vertices = new Float32Array([]);
    }

    // Unpack the color for the vertice's
    const colors = new Float32Array([
        ...color, ...color, ...color, ...color
    ]);

    // Bind and Buffer data
    return initBuffers(gl, vertices, colors, null);
}

// Function to create Sphere just give color
function createSphere(gl, color) {

    const latSteps = 21;
    const lonSteps = 21;

    const vertices = [];
    const colors = [];
    const indices = [];

    for (let i = 0; i <= latSteps; i++) {
        const theta = i * Math.PI / latSteps;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);

        for (let j = 0; j <= lonSteps; j++) {
            const phi = j * 2 * Math.PI / lonSteps;
            const sinP = Math.sin(phi);
            const cosP = Math.cos(phi);

            const x =  sinT * cosP;
            const y =  cosT;
            const z =  sinT * sinP;

            vertices.push(x, y, z);
            colors.push(...color);
        }
    }

    for (let i = 0; i < latSteps; i++) {
        for (let j = 0; j < lonSteps; j++) {
            const a = i * (lonSteps + 1) + j;
            const b = a + lonSteps + 1;

            indices.push(a, b, a + 1);
            indices.push(a + 1, b, b + 1);
        }
    }

    return initBuffers(
        gl,
        new Float32Array(vertices),
        new Float32Array(colors),
        new Uint16Array(indices)
    );
}

// Function to create Cylinder give just color
function createCylinder(gl, color){

    const vertices = [];
    const colors = [];
    const indices = [];

    var height = 11;
    var steps = 20;

    for (var i = 0; i <= steps; i++){
        var angle = (i/steps) * 2 * Math.PI;

        var x = Math.cos(angle);
        var z = Math.sin(angle);

        // bottom vertex
        vertices.push(x, 0, z);
        colors.push(...color);

        // top vertex
        vertices.push(x, height, z);
        colors.push(...color);

    }

    for (var i = 0; i < steps; i++) {
        var b0 = 2 * i;         // bottom i
        var t0 = b0 + 1;        // top i
        var b1 = 2 * (i + 1);   // bottom next
        var t1 = b1 + 1;        // top next

        // Triangle 1
        indices.push(b0, b1, t0);
        // Triangle 2
        indices.push(t0, b1, t1);
    }

    return initBuffers(
        gl,
        new Float32Array(vertices),
        new Float32Array(colors),
        new Uint16Array(indices)
    );
}

function createPyramid(gl, color) {

    const vertices = [
        // Base
        -0.5, 0, -0.5,
        0.5, 0, -0.5,
        0.0, 0, 0.5,

        // Apex
         0.0, 1.0,  0.0
    ];

    const indices = [
        //base
        0, 1, 2,

        0, 1, 3,
        1, 2, 3,
        0, 2, 3,
    ];

    const colors = [];
    for (let i = 0; i < vertices.length / 3; i++) {
        colors.push(...color);
    }

    return initBuffers(
        gl,
        new Float32Array(vertices),
        new Float32Array(colors),
        new Uint16Array(indices)
    );
}

// Function to create Circle
function createCircle(gl, color){

    const vertices = [];
    const colors = [];

    const centerX = 0;
    const centerY = 0; 
    const radius = 1;
    const vertexCount = 20;


    for (var i = 0; i <= vertexCount; i++){
        var angle = i/vertexCount * 2 * Math.PI;

        vertices.push(centerX + radius * Math.cos(angle));
        vertices.push(centerY + radius * Math.sin(angle));
        vertices.push(0);

        colors.push(...color);
        colors.push(...color);
    }
    return initBuffers(
        gl,
        new Float32Array(vertices),
        new Float32Array(colors),
        null
    );
}

function createTriangle(gl, color){
    const vertices = [

       -0.5, 0.0, 0.0,
        0.0, 0.5, 0.0,
        0.5, 0.0, 0.0
    ];
    const colors = [];

    for (var i = 0; i <= vertices.length; i++){
        colors.push(...color);
    }
    return initBuffers(
        gl,
        new Float32Array(vertices),
        new Float32Array(colors),
        null
    );
}

function createStar(gl, color) {

    const vertices = [
        0.00,  0.00, 0.00,
        0.00,  1.00, 0.00,
        0.22,  0.31, 0.00,
        0.95,  0.31, 0.00,
        0.36, -0.12, 0.00,
        0.59, -0.81, 0.00,
        0.00, -0.38, 0.00,
       -0.59, -0.81, 0.00,
       -0.36, -0.12, 0.00,
       -0.95,  0.31, 0.00,
       -0.22,  0.31, 0.00,
        0.00,  1.00, 0.00
    ];

    const colors = [];
    for (let i = 0; i < vertices.length / 3; i++) {
        colors.push(...color);
    }

    return initBuffers(
        gl,
        new Float32Array(vertices),
        new Float32Array(colors),
        null
    );
}

// Function to initialize buffers for the first time 
function initBuffers(gl, vertices, colors, indices) {

    // Create Buffers 
    const vertexBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    const indicesBuffer = gl.createBuffer();

    // Bind and buffer the vertices array to the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    // Bind and buffer the colors array to the color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Color);

    // Vertex count and indices count
    var vertexCount = vertices.length / 3;
    var indicesCount = 0

    // If you have indices bind that buffer
    if (indices != null) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        indicesCount = indices.length
    }

  
    return { vertexBuffer, colorBuffer, indicesBuffer, vertexCount, indicesCount, a_Position, a_Color };
}

// Function to initialize buffers for the object so I can draw later rather than calling initBuffers()
function initObject(gl, object) {
    // Bind the objects vertex buffer to the webgl buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, object.vertexBuffer);
    gl.vertexAttribPointer(object.a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(object.a_Position);

    // Bind the objects color buffer to the webgl buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
    gl.vertexAttribPointer(object.a_Color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(object.a_Color);

    // Bind the objects indicesBuffer to the webgl buffer
    if (object.indicesBuffer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.indicesBuffer);
    }
}


// Function to draw the flat Plane for floors and walls
function drawPlane(gl, plane) {

    var xformMatrix = new Matrix4();
    xformMatrix.setIdentity();
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, plane)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, plane.vertexCount);
}

// Function to draw one sphere and move it and scale it
function drawSphere(gl, sphere, moving, scaling, rotating1, rotating2) {

    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).rotate(...rotating1).rotate(...rotating2).scale(...scaling); 

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, sphere)
    gl.drawElements(gl.TRIANGLES, sphere.indicesCount, gl.UNSIGNED_SHORT, 0);
}

// Function to draw one sphere and move it and scale it
function drawCylinder(gl, cylinder, moving, scaling, rotating1, rotating2) {

    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1).rotate(...rotating2)

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, cylinder)
    gl.drawElements(gl.TRIANGLES, cylinder.indicesCount, gl.UNSIGNED_SHORT, 0);
}

function drawPyramid(gl, pyramid, moving, scaling, rotating1, rotating2) {

    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1).rotate(...rotating2);

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, pyramid);
    gl.drawElements(gl.TRIANGLES, pyramid.indicesCount, gl.UNSIGNED_SHORT, 0);
}


function drawCircle(gl, circle, moving, scaling, rotating1) {
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1)

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, circle)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, circle.vertexCount);
}

function drawTriangle(gl, triangle, moving, scaling, rotating1, rotating2) {
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1).rotate(...rotating2)

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, triangle)
    gl.drawArrays(gl.TRIANGLES, 0, triangle.vertexCount);
}

function drawStar(gl, star, moving, scaling, rotating1) {
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1)

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, star)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, star.vertexCount);
}

// Function that draws my spheres going parallel to each other
function drawSpheres(gl, sphere, amount){
    var j = -6.5;
    for(var i = 1; i <= amount; i++){
        drawSphere(gl, sphere, [-3, 0.3, j], [0.3, 0.3, 0.3], [0, 1, 0, 0], [0, 1, 0, 0])
        drawSphere(gl, sphere, [ 3, 0.3, j], [0.3, 0.3, 0.3], [0, 1, 0, 0], [0, 1, 0, 0])
        j += 1.5;
    }
}

// Function that draws my walls all together
function drawPlanes(gl, planes){
    for(var i = 0; i < planes.length; i ++){
        drawPlane(gl, planes[i])
    }
}