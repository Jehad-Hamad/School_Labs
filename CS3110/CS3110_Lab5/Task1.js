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
        1, 2.5, 17,   
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

    const floor = createPlane(gl, "floor", [.54, 0.60, 0.36,]);
    const right = createPlane(gl, "wallRight",[1.0, 0.0, 0.0]);     // Red
    const left  = createPlane(gl, "wallLeft",[0.0, 0.0, 1.0]);     // True Blue 0.53, 0.81, 0.92
    const back  = createPlane(gl, "wallBack",[1, 1, 0.4]);        // Yellow

    const planes = [floor, right, left, back]
    drawPlanes(gl, planes)

    const sphere = createSphere(gl, [.54, 0.9, 0.36]);
    drawSpheres(gl, sphere, 10)
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
function drawSphere(gl, sphere, moving, scaling) {

    var xformMatrix = new Matrix4();
    xformMatrix.setTranslate(...moving).scale(...scaling)

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    initObject(gl, sphere)
    gl.drawElements(gl.TRIANGLES, sphere.indicesCount, gl.UNSIGNED_SHORT, 0);
}

// Function that draws my spheres going parallel to each other
function drawSpheres(gl, sphere, amount){
    var j = -6.5;
    for(var i = 1; i <= amount; i++){
        drawSphere(gl, sphere, [-3, 0.3, j], [0.3, 0.3, 0.3])
        drawSphere(gl, sphere, [ 3, 0.3, j], [0.3, 0.3, 0.3])
        j += 1.5;
    }
}

// Function that draws my walls all together
function drawPlanes(gl, planes){
    for(var i = 0; i < planes.length; i ++){
        drawPlane(gl, planes[i])
    }
}