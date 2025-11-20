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

let eyeX = 0; eyeY = 1; eyeZ = 6;
let atX = 0, atY = 0, atZ = 0;
let upX = 0, upY = 1, upZ = 0;

let near = 1;
let fov = 45;
let far =  15
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

    let camAngle = 1.5;
    let camRadius = 5;   // distance from object

    eyeX = Math.cos(camAngle) * camRadius;
    eyeZ = Math.sin(camAngle) * camRadius;
    
    viewMatrix.setLookAt(
        eyeX, eyeY, eyeZ,       
        atX, atY, atZ,        
        upX, upY, upZ
    );

    projMatrix = new Matrix4();
    projMatrix.setPerspective(fov, canvas.width / canvas.height, near, far);

    modelMatrix = new Matrix4();
    modelMatrix.setRotate(0, 0, 1, 0);

    modelViewMatrix = projMatrix.multiply(viewMatrix).multiply(modelMatrix);

    gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const floor = createPlane(gl, "floor",    [0.54, 0.60, 0.36]);
    const right = createPlane(gl, "wallRight",[0.53, 0.81, 0.92]);     
    const left  = createPlane(gl, "wallLeft", [0.53, 0.81, 0.92]);     
    const back  = createPlane(gl, "wallBack", [0.53, 0.81, 0.92]);   
    const front  = createPlane(gl, "wallFront", [0.53, 0.81, 0.92]);       
    
    const planes = [floor, right, left, back, front]

    const greenSphere =    createSphere(gl, [.54, 0.9, 0.36]);
    const blueBodySphere = createSphere(gl, [0.0, 0.4, 0.8]);
    const redSphere =      createSphere(gl, [1.0, 0.0, 0.0]);
    const yellowSphere =   createSphere(gl, [1.0, 1.0, 0.1]);
    const whiteSphere =    createSphere(gl, [1.0, 1.0, 1.0]);
    const blackSphere =    createSphere(gl, [0.0, 0.0, 0.0]);
    const natchoSphere =   createSphere(gl, [1.0, 0.65, 0.17]);
    const spheres = [greenSphere, blueBodySphere, redSphere, yellowSphere, whiteSphere, blackSphere, natchoSphere]

    const armCylinder = createCylinder(gl, [1.0, 0.0, 0.0]);
    const mallotCylinder = createCylinder(gl, [0.55, 0.27, 0.07]);
    const whiteCylinder = createCylinder(gl, [1.0, 1.0, 1.0]);
    const cylinders = [armCylinder, mallotCylinder, whiteCylinder]

    const mallotCircle = createCircle(gl, [1.0, 0.0, 0.00]);
    const circles = [mallotCircle]

    const yellowTriangle = createTriangle(gl, [1.0, 1.0, 0.0]);
    const redTriangle = createTriangle(gl, [1.0, 0.0, 0.0]);
    const triangles = [yellowTriangle, redTriangle]

    const star = createStar(gl, [ 1.0, 1.0, 0.0]);
    const stars = [star]

    const pyramid = createPyramid(gl, [1.0, 1.0, 0.0]);
    const pyramids = [pyramid]
    
    const redlLine = createLine(gl, [1.0, 0.0, 0.0]);
    const blueLine = createLine(gl, [0.0, 0.0, 1.0]);
    const lines = [redlLine, blueLine]

    var x = 0; var z = 0;
    var up_down = 0;

    drawPlanes(gl, planes)
    drawSpheres(gl, spheres[0], 10)
    drawPenguin(gl, spheres, cylinders, pyramids, circles, triangles, stars, x, z)
    drawLines(gl, lines, x, z)

    function keyDown(ev) {

        // CAMERA
        if (ev.keyCode === 39) {      // RIGHT → orbit clockwise (left key)
            camAngle -= 0.05;
            eyeX = Math.cos(camAngle) * camRadius;
            eyeZ = Math.sin(camAngle) * camRadius;
        }
        else if (ev.keyCode === 37) { // LEFT → orbit counter-clockwise (right key)
            camAngle += 0.05;
            eyeX = Math.cos(camAngle) * camRadius;
            eyeZ = Math.sin(camAngle) * camRadius;
        }
        else if (ev.keyCode === 38) {  // UP (up key)
            up_down += 0.05;
            eyeY = Math.max(0.5, Math.sin(up_down) * camRadius);
        }
        else if (ev.keyCode === 40) { // DOWN (down key)
            up_down -= 0.05;
            eyeY = Math.max(0.5, Math.sin(up_down) * camRadius);
        } 
        // MOVING
        else if(ev.key.toLowerCase() == 'w'){ // FORWARD (w)
            z +=0.2;
            z = Math.min(7, z)
        } 
        else if(ev.key.toLowerCase() == 's'){ // BACKWARD (s)
            z -=0.2;
            z = Math.max(-7, z)
        } 
        else if(ev.key.toLowerCase() == 'd'){ //RIGHT SIDE (d)
            x +=0.2;
            x= Math.min(7, x)
        } 
        else if(ev.key.toLowerCase() == 'a'){ // LEFT SIDE (a)
            x -=0.2;
            x = Math.max(-7, x)
        }
        // FOV, NEAR, FAR
        else if(ev.keyCode == '189'){ // FOV Smaller (=)
            fov +=5;
            fov = Math.min(100, fov)
        } 
        else if(ev.keyCode == '187'){ // FOV Bigger (-)
            fov -=5;
            fov = Math.max(45, fov)
        }
        else if(ev.keyCode == '77'){ // near Further (m)
            near -=0.1;
        } 
        else if(ev.keyCode == '78'){ // near Closer (n)
            near +=0.1;
        }
        else if(ev.keyCode == '70'){ // far Closer (f)
            far -=0.5;
            far = Math.max(5, far)

        } 
        else if(ev.keyCode == '71'){ // far Further (g)
            far +=0.5;
            far = Math.min(15, far)
        }  

        viewMatrix.setLookAt(
            eyeX, eyeY, eyeZ,       
            atX, atY, atZ,        
            upX, upY, upZ
        );

        projMatrix.setPerspective(fov, canvas.width / canvas.height, near, far);

        modelMatrix.setRotate(0, 0, 1, 0);

        modelViewMatrix = projMatrix.multiply(viewMatrix).multiply(modelMatrix);

        gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);

        drawPlanes(gl, planes)
        drawSpheres(gl, spheres[0], 10)
        drawPenguin(gl, spheres, cylinders, pyramids, circles, triangles, stars, x, z)
        drawLines(gl, lines, x, z)
    }  
    
    document.onkeydown = function(ev){ keyDown(ev)}
    

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

        case "wallFront":
            vertices = new Float32Array([
                ...vertex[4],
                ...vertex[5],
                ...vertex[6],
                ...vertex[7]

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

    const latSteps = 21;      // vertical divisions
    const lonSteps = 21;      // horizontal divisions

    const vertices = [];
    const colors = [];
    const indices = [];

    for (let i = 0; i <= latSteps; i++) {
        const theta = i * Math.PI / latSteps; // latitude angle
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);

        for (let j = 0; j <= lonSteps; j++) {
            const phi = j * 2 * Math.PI / lonSteps; // longitude angle
            const sinP = Math.sin(phi);
            const cosP = Math.cos(phi);

            const x =  sinT * cosP;
            const y =  cosT;
            const z =  sinT * sinP;

            vertices.push(x, y, z);
            colors.push(...color); // same color per vertex
        }
    }

    // build triangles
    for (let i = 0; i < latSteps; i++) {
        for (let j = 0; j < lonSteps; j++) {
            const a = i * (lonSteps + 1) + j; // Current
            const b = a + lonSteps + 1; // next row

            indices.push(a, b, a + 1); //first tri
            indices.push(a + 1, b, b + 1); // second tri
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
    var steps = 20; // circle 

    for (var i = 0; i <= steps; i++){
        var angle = (i/steps) * 2 * Math.PI; // angle around circle

        var x = Math.cos(angle);
        var z = Math.sin(angle);

        // bottom ring
        vertices.push(x, 0, z);
        colors.push(...color);

        // top ring
        vertices.push(x, height, z);
        colors.push(...color);

    }

    // connect side faces
    for (var i = 0; i < steps; i++) {
        var b0 = 2 * i;         // bottom i
        var t0 = b0 + 1;        // top i
        var b1 = 2 * (i + 1);   // bottom next
        var t1 = b1 + 1;        // top next

        indices.push(b0, b1, t0);    // Triangle 1
        indices.push(t0, b1, t1);    // Triangle 2
    }

    return initBuffers(
        gl,
        new Float32Array(vertices),
        new Float32Array(colors),
        new Uint16Array(indices)
    );
}

// Function to create Pyramid give just color
function createPyramid(gl, color) {

    // Points
    const vertices = [
        // Base
        -0.5, 0, -0.5,
        0.5, 0, -0.5,
        0.0, 0, 0.5,

        // Apex
         0.0, 1.0,  0.0
    ];

    // Indices
    const indices = [
        //base
        0, 1, 2,
        0, 1, 3,
        1, 2, 3,
        0, 2, 3,
    ];

    // Unpack color
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

// Function to create Circle give just color
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

// Function to create Triangle give just color
function createTriangle(gl, color){

    // Points
    const vertices = [
       -0.5, 0.0, 0.0,
        0.0, 0.5, 0.0,
        0.5, 0.0, 0.0
    ];

    // Push back color
    const colors = [];
    for (var i = 0; i < vertices.length; i++){
        colors.push(...color);
    }

    return initBuffers(
        gl,
        new Float32Array(vertices),
        new Float32Array(colors),
        null
    );
}

// Function to create star give just color
function createStar(gl, color) {

    // Points
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

    // Unpack Color
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

function createLine(gl, color){
    const vertices = [
        2.0, 0.5, 2,
        -2.0, 0.5, 2
    ]

    // Unpack Color
    const colors = [];
    for (let i = 0; i < 2; i++) {
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

// Function to draw sphere and move it and scale it and rotate it
function drawSphere(gl, sphere, moving, scaling, rotating1, rotating2) {
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).rotate(...rotating1).rotate(...rotating2).scale(...scaling); 

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, sphere)
    gl.drawElements(gl.TRIANGLES, sphere.indicesCount, gl.UNSIGNED_SHORT, 0);
}

// Function to draw cylinder and move it and scale it and rotate it
function drawCylinder(gl, cylinder, moving, scaling, rotating1, rotating2) {
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1).rotate(...rotating2)

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, cylinder)
    gl.drawElements(gl.TRIANGLES, cylinder.indicesCount, gl.UNSIGNED_SHORT, 0);
}

// Function to draw pyramid and move it and scale it and rotate it
function drawPyramid(gl, pyramid, moving, scaling, rotating1, rotating2) {
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1).rotate(...rotating2);

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, pyramid);
    gl.drawElements(gl.TRIANGLES, pyramid.indicesCount, gl.UNSIGNED_SHORT, 0);
}

// Function to draw circle and move it and scale it and rotate it
function drawCircle(gl, circle, moving, scaling, rotating1) {
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1)

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, circle)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, circle.vertexCount);
}

// Function to draw triangle and move it and scale it and rotate it
function drawTriangle(gl, triangle, moving, scaling, rotating1, rotating2) {
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1).rotate(...rotating2)

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, triangle)
    gl.drawArrays(gl.TRIANGLES, 0, triangle.vertexCount);
}

// Function to draw star and move it and scale it and rotate it
function drawStar(gl, star, moving, scaling, rotating1) {
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1)

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, star)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, star.vertexCount);
}

function drawLine(gl, line, moving, scaling, rotating1){
    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling).rotate(...rotating1);

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, line)
    gl.drawArrays(gl.LINES, 0, line.vertexCount);
}

function drawLines(gl, lines, x, z){
    drawLine(gl, lines[0], [0.0 + x, 0.0, -1.7 + z], [10.0, 1.2, 1.0], [0, 1, 0, 0]);
    drawLine(gl, lines[1], [-2.0 + x, 0.0, 0.0 + z], [1.0,  1.2, 10.0], [90, 0, 1, 0]);
}
// Function that draws spheres going parallel to each other
function drawSpheres(gl, sphere, amount){
    var j = -6.5;
    for(var i = 1; i <= amount; i++){
        drawSphere(gl, sphere, [-3, 0.3, j], [0.3, 0.3, 0.3], [0, 1, 0, 0], [0, 1, 0, 0])
        drawSphere(gl, sphere, [ 3, 0.3, j], [0.3, 0.3, 0.3], [0, 1, 0, 0], [0, 1, 0, 0])
        j += 1.5;
    }
}

// Function that draws walls all together
function drawPlanes(gl, planes){
    for(var i = 0; i < planes.length; i ++){
        drawPlane(gl, planes[i])
    }
}

// Function that draws entire penguin
function drawPenguin(gl, spheres, cylinders, pyramids, circles, triangles, stars, x, z){

    // PENGUIN
    // Body
    drawSphere(gl, spheres[1], [0 + x, 0.63, .2+z], [0.4, 0.4, 0.4], [0, 1, 0, 0], [0, 1, 0, 0]); 

    // White scarf and coat
    drawSphere(gl, spheres[2], [0.0+x, 0.6, 0.0+z,], [0.5, 0.5, 0.5], [0, 1, 0, 0], [0, 1, 0, 0]); 
    drawSphere(gl, spheres[4], [0.15+x, 0.60, 0.09+z], [0.13, 0.5, 0.4], [0, 0, 0, 1], [40, 0, 1, 0]); 
    drawSphere(gl, spheres[4], [-0.15+x, 0.60, 0.09+z], [0.13, 0.5, 0.4], [0, 0, 0, 1], [-40, 0, 1, 0]); 
    drawSphere(gl, spheres[4], [-0.011+x, 1.0, 0.04+z], [0.2, 0.17, 0.35], [0, 0, 0, 1], [90, 0, 1, 0]); 

    // Head
    drawSphere(gl, spheres[1], [0+x, 1.2, .2+z], [0.3, 0.3, 0.3], [0, 1, 0, 0], [0, 1, 0, 0]);

    // Beak
    drawPyramid(gl, pyramids[0], [0.0+x, 1.07, 0.5+z], [0.15, 0.06, 0.23], [0, 1, 0, 0], [0, 0, 1, 0]);  // Top beak
    drawPyramid(gl, pyramids[0], [0.0+x, 1.07, 0.5+z], [0.15, 0.1, 0.23], [0, 1, 0, 0], [180, 0, 0, 1]); // Bottom beak

    // Eyes
    drawSphere(gl, spheres[4], [-0.15+x, 1.2, 0.4+z], [0.05, 0.1, 0.1], [0, 1, 0, 0], [0, 1, 0, 0]); // Left sclara 
    drawSphere(gl, spheres[4], [0.15+x, 1.2, 0.4+z],  [0.05, 0.1, 0.1], [0, 1, 0, 0], [0, 1, 0, 0]); // Right sclara
    drawSphere(gl, spheres[5], [-0.15+x, 1.2, 0.403+z], [0.05, 0.09, 0.1], [0, 1, 0, 0], [0, 1, 0, 0]); // Left pupil
    drawSphere(gl, spheres[5], [0.15+x, 1.2, 0.403+z],  [0.05, 0.09, 0.1], [0, 1, 0, 0], [0, 1, 0, 0]); // Right pupil
    drawSphere(gl, spheres[4], [-0.15+x, 1.2, 0.476+z], [0.03, 0.03, 0.03], [0, 1, 0, 0], [0, 1, 0, 0]) // Left iris
    drawSphere(gl, spheres[4], [0.15+x, 1.2, 0.476+z],  [0.03, 0.03, 0.03], [0, 1, 0, 0], [0, 1, 0, 0]) // right iris

    // Hat
    drawSphere(gl, spheres[2],     [0+x, 1.4, .2+z],      [ 0.2, 0.2, 0.2], [0, 1, 0, 0], [0, 1, 0, 0]) 
    drawSphere(gl, spheres[3],  [0+x, 1.35, .2+z],     [0.3, 0.1, 0.3], [0, 1, 0, 0], [0, 1, 0, 0])
    drawSphere(gl, spheres[3],  [0.0+x, 1.35, 0.45+z],[0.1, 0.1, 0.1], [0, 1, 0, 0], [0, 1, 0, 0])
    drawSphere(gl, spheres[4],   [0+x, 1.6, 0.1+z],   [0.1, 0.1, 0.1], [0, 1, 0, 0], [0, 1, 0, 0])

    // Arms
    drawCylinder(gl, cylinders[0], [-0.23+x, 0.9, -0.2+z], [0.1, 0.1, 0.1],   [100, 1, 0, 0], [20, 0, 0, 1]);  // Left arm coat
    drawCylinder(gl, cylinders[0], [0.23+x, 0.9, -0.2+z],  [0.1, 0.1, 0.1],   [100, 1, 0, 0], [-20, 0, 0, 1]); // Right arm coat

    // Hand
    drawSphere(gl, spheres[4], [-0.6+x, 0.725, 0.8+z],  [0.11, 0.11, 0.11], [0, 1, 0, 0], [0, 1, 0, 0])    // Left Puff coat
    drawSphere(gl, spheres[4], [0.6+x, 0.725, 0.8+z],  [0.11, 0.11, 0.11], [0, 1, 0, 0], [0, 1, 0, 0])     // Right Puff coat
    drawSphere(gl, spheres[6], [-0.62+x, 0.71, 0.85+z],  [0.12, 0.12, 0.12], [0, 1, 0, 0], [0, 1, 0, 0])  // Left hand
    drawSphere(gl, spheres[6], [0.62+x, 0.71, 0.85+z],  [0.12, 0.12, 0.12], [0, 1, 0, 0], [0, 1, 0, 0])   // Right hand

    // Mallot
    drawCylinder(gl, cylinders[1], [-0.75+x, 0.4, 0.95+z],  [0.1, 0.1, 0.1],   [0, 1, 0, 0], [0, 0, 0, 1])     // Handle 
    drawCylinder(gl, cylinders[1], [-0.77+x, 1.36, 0.55+z],  [0.2, 0.2, 0.07],   [90, 1, 0, 0], [0, 0, 0, 1]); // Hammer
    drawCylinder(gl, cylinders[2], [-0.77+x, 1.36, 1.3+z],  [0.2, 0.2, 0.01],   [90, 1, 0, 0], [0, 0, 0, 1]);   // White front circle
    drawCylinder(gl, cylinders[2], [-0.77+x, 1.36, 0.45+z],  [0.2, 0.2, 0.01],   [90, 1, 0, 0], [0, 0, 0, 1]);  // White back circle
    drawCircle(gl, circles[0], [-.77+x, 1.36, 1.42+z], [0.2, 0.2, 0.1], [0, 1, 0, 0])                          // Mallot front circle
    drawCircle(gl, circles[0], [-.77+x, 1.36, 0.44+z], [0.2, 0.2, 0.1], [0, 1, 0, 0])                          // Mallot back circle
    drawStar(gl, stars[0], [-0.77+x, 1.37, 1.43+z], [0.2, 0.2, 0.1], [0, 1, 0, 0])                                   // Front star
    drawStar(gl, stars[0], [-0.77+x, 1.37, .43+z], [0.2, 0.2, 0.1], [0, 1, 0, 0])                                    // Back star
    
    // Feet
    drawSphere(gl, spheres[6], [-0.2+x, 0.2, 0.25+z], [0.2, 0.2, 0.2], [0, 1, 0, 0], [0, 1, 0, 0]) // Left foot
    drawSphere(gl, spheres[6], [0.2+x, 0.2, 0.25+z],  [0.2, 0.2, 0.2], [0, 1, 0, 0], [0, 1, 0, 0]) // Right foot

    // Belt    
    drawTriangle(gl, triangles[1], [-0.31+x, 0.48, 0.4+z], [0.15, 0.15, 1], [14, 1, 0, 0], [-14, 0, 1, 0])
    drawTriangle(gl, triangles[0], [-0.24+x, 0.58, 0.52+z], [0.25, 0.2, 1], [180, 1, 0, 0], [15,0, 1, 0])
    drawTriangle(gl, triangles[1],  [-0.10+x, 0.46, 0.57+z], [0.25, 0.2, 1], [0, 1, 0, 0], [-4, 0, 1, 0])
    drawTriangle(gl, triangles[0], [0.04+x, 0.58, 0.6+z], [0.25, 0.2, 1], [180, 1, 0, 0], [-2, 0, 1, 0])
    drawTriangle(gl, triangles[1],  [0.18+x, 0.46, 0.55+z], [0.25, 0.2, 1], [0, 1, 0, 0], [7.5, 0, 1, 0])
    drawTriangle(gl, triangles[0], [0.27+x, 0.58, 0.50+z], [0.15, 0.2, 1], [180, 1, 0, 0], [-6, 0, 1, 0])
}
