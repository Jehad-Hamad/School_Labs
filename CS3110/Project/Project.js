// Vertex shader
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    attribute vec4 a_Normal;         // Normal

    uniform mat4 u_ModelViewMatrix;  // Model view matrix
    uniform mat4 u_xformMatrix;      // Transform matrix
    uniform mat4 u_NormalMatrix;     // Transformation matrix of normal

    uniform vec3 u_LightPosition;    // Light direction
    uniform vec3 u_LightColor;       // Light color
    uniform vec3 u_AmbientLight;      // Ambient light color

    varying vec4 v_Color;
    void main() {
        gl_Position = u_ModelViewMatrix * u_xformMatrix * a_Position;

        // Recalculate the normal based on the model matrix and make its length 1.
        vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));

        // Calculate world coordinate of vertex
        vec4 vertexPosition = u_xformMatrix * a_Position;

        // Calculate light direction FROM vertex TO light
        vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));

        // Calculate diffuse lighting
        float nDotL = max(dot(lightDirection, normal), 0.0);

        // Use light color in calculation
        vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;  // Calculate the color due to diffuse reflection
        vec3 ambient = u_AmbientLight * a_Color.rgb;        // Calculate the color due to ambient reflection
        v_Color = vec4(diffuse + ambient, a_Color.a);       // Add the surface colors due to diffuse reflection and ambient reflection
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

var viewMatrix,
  modelMatrix,
  projMatrix,
  modelViewMatrix,
  u_ModelViewMatrix,
  u_xformMatrix,
  u_NormalMatrix,
  u_LightPosition,
  u_LightColor,
  u_AmbientLight;

var near = 0.1;
var fov = 110;
var far = 500;

var horizontalAngle = 0;

var verticalAngle = 0;
// var verticalAngle = 30;
var camRadius = 3.0;

var eyeX = 0;
eyeY = 3;
// eyeY = 80;
eyeZ = 0;
var atX = 0,
  atY = 0,
  atZ = 0;
var upX = 0,
  upY = 1,
  upZ = 0;

function main() {
  const canvas = document.getElementById('webgl');
  const gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) return;

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // LIGHTING
  u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
  u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');

  // Set light color (white light)
  gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
  // Set light diecrtion in world coords
  gl.uniform3f(u_LightPosition, 0.0, 15.0, 0.0);
  // Set the ambient light
  gl.uniform3f(u_AmbientLight, 0.6, 0.6, 0.6);

  u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix');
  u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');

  viewMatrix = new Matrix4();
  eyeX = -200;
  //eyeX = -170;
  eyeZ = Math.sin(horizontalAngle) * camRadius;

  atX = eyeX + Math.cos(horizontalAngle);
  atZ = eyeZ + Math.sin(horizontalAngle);
  atY = eyeY + Math.sin(verticalAngle);

  viewMatrix.setLookAt(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ);

  projMatrix = new Matrix4();
  projMatrix.setPerspective(fov, canvas.width / canvas.height, near, far);

  modelMatrix = new Matrix4();
  modelMatrix.setRotate(0, 0, 1, 0);

  modelViewMatrix = projMatrix.multiply(viewMatrix).multiply(modelMatrix);

  gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const floor = createPlane(gl, 'floor', [0, 0.6, 0.36]);
  const right = createPlane(gl, 'wallRight', [0.53, 0, 0.92]);
  const left = createPlane(gl, 'wallLeft', [0.53, 0.81, 0]);
  const back = createPlane(gl, 'wallBack', [0.53, 0.81, 0.92]);
  const front = createPlane(gl, 'wallFront', [0.53, 0, 0]);
  const planes = [floor, right, left, back, front];
  drawPlanes(gl, planes);

  const floorSheet = createSheet(gl, [1, 0, 0]);
  drawPath(gl, [floorSheet]);

  const wallP = createCube(gl, [0.78, 0.75, 0.7]);
  const sheetWall = createSheet(gl, [0.5, 0, 0.8]);
  const cubes = [wallP, sheetWall];
  drawFence(gl, cubes);
  function keyDown(ev) {
    // Camera Rotation
    if (ev.keyCode === 39) {
      //Tturn Right
      horizontalAngle += 0.07;
    } else if (ev.keyCode === 37) {
      // Turn Left
      horizontalAngle -= 0.07;
    } else if (ev.keyCode === 38) {
      // Look Up
      verticalAngle += 0.07;
      verticalAngle = Math.min(1.5, verticalAngle);
    } else if (ev.keyCode === 40) {
      // Look Down
      verticalAngle -= 0.07;
      verticalAngle = Math.max(-1.5, verticalAngle);
    }
    // Camera Moving
    else if (ev.key.toLowerCase() === 'w') {
      // Move Forward
      eyeX += Math.cos(horizontalAngle) * camRadius;
      eyeZ += Math.sin(horizontalAngle) * camRadius;
    } else if (ev.key.toLowerCase() === 's') {
      // Move Backward
      eyeX -= Math.cos(horizontalAngle) * camRadius;
      eyeZ -= Math.sin(horizontalAngle) * camRadius;
    } else if (ev.key.toLowerCase() === 'a') {
      // Strafe Left
      eyeX += Math.cos(horizontalAngle - Math.PI / 2) * camRadius;
      eyeZ += Math.sin(horizontalAngle - Math.PI / 2) * camRadius;
    } else if (ev.key.toLowerCase() === 'd') {
      // Strafe Right
      eyeX += Math.cos(horizontalAngle + Math.PI / 2) * camRadius;
      eyeZ += Math.sin(horizontalAngle + Math.PI / 2) * camRadius;
    } else if (ev.key.toLowerCase() === 'q') {
      // Fly Up
      eyeY += 1.0;
      eyeY = Math.min(30, eyeY);
    } else if (ev.key.toLowerCase() === 'e') {
      // Fly Down
      eyeY -= 1.0;
      eyeY = Math.max(3, eyeY);
    }

    // changes look at.
    atX = eyeX + Math.cos(horizontalAngle);
    atZ = eyeZ + Math.sin(horizontalAngle);
    atY = eyeY + Math.sin(verticalAngle);

    viewMatrix.setLookAt(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ);

    projMatrix.setPerspective(fov, canvas.width / canvas.height, near, far);
    modelMatrix.setRotate(0, 0, 1, 0);
    modelViewMatrix = projMatrix.multiply(viewMatrix).multiply(modelMatrix);
    gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    drawPlanes(gl, planes);
    drawPath(gl, [floorSheet]);
    drawFence(gl, cubes);
  }

  document.onkeydown = function (ev) {
    keyDown(ev);
  };
}

// Function to create my plane aka my wall i just just need to give it a type and color
function createPlane(gl, wall, color) {
  const vertex = [
    [-200.0, 0.0, -200.0], // v0
    [200.0, 0.0, -200.0], // v1
    [200.0, 30.0, -200.0], // v2
    [-200.0, 30.0, -200.0], // v3

    [-200.0, 0.0, 200.0], // v4
    [200.0, 0.0, 200.0], // v5
    [200.0, 30.0, 200.0], // v6
    [-200.0, 30.0, 200.0], // v7
  ];

  var vertices, normals;

  // Switch statement for different types of planes
  switch (wall) {
    case 'floor':
      vertices = new Float32Array([
        ...vertex[0],
        ...vertex[4],
        ...vertex[5],
        ...vertex[1],
      ]);

      // Normal Goes up
      normals = new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]);
      break;

    case 'wallRight':
      vertices = new Float32Array([
        ...vertex[1],
        ...vertex[5],
        ...vertex[6],
        ...vertex[2],
      ]);

      // Normal Goes to the left
      normals = new Float32Array([-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0]);
      break;

    case 'wallLeft':
      vertices = new Float32Array([
        ...vertex[4],
        ...vertex[0],
        ...vertex[3],
        ...vertex[7],
      ]);

      // Normal Goes to the right
      normals = new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]);
      break;

    case 'wallBack':
      vertices = new Float32Array([
        ...vertex[0],
        ...vertex[1],
        ...vertex[2],
        ...vertex[3],
      ]);

      // Normal Goes to the forward
      normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
      break;

    case 'wallFront':
      vertices = new Float32Array([
        ...vertex[4],
        ...vertex[5],
        ...vertex[6],
        ...vertex[7],
      ]);
      // Normal Goes to the backward
      normals = new Float32Array([0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1]);

      break;

    default:
      console.log(wall + ' ISSUE');
      vertices = new Float32Array([]);
      normals = new Float32Array([]);
  }

  // Unpack the color for the vertice's
  const colors = new Float32Array([...color, ...color, ...color, ...color]);

  // Bind and Buffer data
  return initBuffers(gl, vertices, colors, normals, null);
}

// Function to create Sphere just give color
function createSphere(gl, color) {
  const latSteps = 21; // vertical divisions
  const lonSteps = 21; // horizontal divisions

  const vertices = [];
  const normals = [];
  const colors = [];
  const indices = [];

  for (var i = 0; i <= latSteps; i++) {
    const theta = (i * Math.PI) / latSteps; // latitude angle
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);

    for (var j = 0; j <= lonSteps; j++) {
      const phi = (j * 2 * Math.PI) / lonSteps; // longitude angle
      const sinP = Math.sin(phi);
      const cosP = Math.cos(phi);

      const x = sinT * cosP;
      const y = cosT;
      const z = sinT * sinP;

      vertices.push(x, y, z);
      normals.push(x, y, z);
      colors.push(...color); // same color per vertex
    }
  }

  // build triangles
  for (var i = 0; i < latSteps; i++) {
    for (var j = 0; j < lonSteps; j++) {
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
    new Float32Array(normals),
    new Uint16Array(indices)
  );
}

// Function to create Cylinder give just color
function createCylinder(gl, color) {
  const vertices = [];
  const normals = [];
  const colors = [];
  const indices = [];

  var height = 11;
  var steps = 20; // circle

  for (var i = 0; i <= steps; i++) {
    var angle = (i / steps) * 2 * Math.PI; // angle around circle

    var x = Math.cos(angle);
    var z = Math.sin(angle);

    // bottom ring
    vertices.push(x, 0, z);
    normals.push(x, 0, z);
    colors.push(...color);

    // top ring
    vertices.push(x, height, z);
    normals.push(x, 0, z);
    colors.push(...color);
  }

  // connect side faces
  for (var i = 0; i < steps; i++) {
    var b0 = 2 * i; // bottom i
    var t0 = b0 + 1; // top i
    var b1 = 2 * (i + 1); // bottom next
    var t1 = b1 + 1; // top next

    indices.push(b0, b1, t0); // Triangle 1
    indices.push(t0, b1, t1); // Triangle 2
  }

  return initBuffers(
    gl,
    new Float32Array(vertices),
    new Float32Array(colors),
    new Float32Array(normals),
    new Uint16Array(indices)
  );
}

// Function to create Pyramid give just color
function createPyramid(gl, color) {
  // Points
  const vertices = [
    // Base
    -0.5, 0, -0.5, 0.5, 0, -0.5, 0.0, 0, 0.5,

    // Apex
    0.0, 1.0, 0.0,
  ];

  const normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];

  // Indices
  const indices = [
    //base
    0, 1, 2, 0, 1, 3, 1, 2, 3, 0, 2, 3,
  ];

  // Unpack color
  const colors = [];
  for (var i = 0; i < vertices.length / 3; i++) {
    colors.push(...color);
  }

  return initBuffers(
    gl,
    new Float32Array(vertices),
    new Float32Array(colors),
    new Float32Array(normals),
    new Uint16Array(indices)
  );
}

function createCube(gl, color) {
  // Vertices for all 8 corners of the cube
  const vertices = [
    1, 0, 1, 1, 0, -1, -1, 0, -1, -1, 0, 1,

    1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1,
  ];

  const normals = [
    // Bottom
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    // Top
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    // Front
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // Back
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    // Right
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    // Left
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
  ];

  // Indices defining triangles for all 6 faces
  // Each face needs 2 triangles = 6 indices
  const indices = [
    // Bottom face
    0, 1, 2, 0, 2, 3,

    // Top face
    4, 7, 6, 4, 6, 5,

    // Front face
    0, 4, 5, 0, 5, 1,

    // Back face
    3, 2, 6, 3, 6, 7,

    // Right face
    1, 5, 6, 1, 6, 2,

    // Left face
    0, 3, 7, 0, 7, 4,
  ];

  // Unpack color for each vertex
  const colors = [];
  for (var i = 0; i < vertices.length / 3; i++) {
    colors.push(...color);
  }

  return initBuffers(
    gl,
    new Float32Array(vertices),
    new Float32Array(colors),
    new Float32Array(normals),
    new Uint16Array(indices)
  );
}

// Function to create Circle give just color
function createCircle(gl, color) {
  const vertices = [];
  const colors = [];
  const normals = [];

  const centerX = 0;
  const centerY = 0;
  const radius = 1;
  const vertexCount = 20;

  for (var i = 0; i <= vertexCount; i++) {
    var angle = (i / vertexCount) * 2 * Math.PI;

    vertices.push(centerX + radius * Math.cos(angle));
    vertices.push(centerY + radius * Math.sin(angle));
    vertices.push(0);

    normals.push(0, 0, 1);
    colors.push(...color);
  }
  return initBuffers(
    gl,
    new Float32Array(vertices),
    new Float32Array(colors),
    new Float32Array(normals),
    null
  );
}

// Function to create Triangle give just color
function createTriangle(gl, color, normal = [0, 0, 1]) {
  // Points
  const vertices = [-0.5, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0];

  const normals = [...normal, ...normal, ...normal];

  // Push back color
  const colors = [];
  for (var i = 0; i < vertices.length; i++) {
    colors.push(...color);
  }

  return initBuffers(
    gl,
    new Float32Array(vertices),
    new Float32Array(colors),
    new Float32Array(normals),
    null
  );
}

// Function to create Sheet (flat rectangular plane) give just color
function createSheet(gl, color) {
  const vertices = [
    -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
  ];

  var normal = [0, 1, 0];
  const normals = [...normal, ...normal, ...normal, ...normal];

  // Push back color
  const colors = [];
  for (var i = 0; i < vertices.length / 3; i++) {
    colors.push(...color);
  }

  return initBuffers(
    gl,
    new Float32Array(vertices),
    new Float32Array(colors),
    new Float32Array(normals),
    null
  );
}

// Function to create star give just color
function createStar(gl, color) {
  // Points
  const vertices = [
    0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.22, 0.31, 0.0, 0.95, 0.31, 0.0, 0.36, -0.12,
    0.0, 0.59, -0.81, 0.0, 0.0, -0.38, 0.0, -0.59, -0.81, 0.0, -0.36, -0.12,
    0.0, -0.95, 0.31, 0.0, -0.22, 0.31, 0.0, 0.0, 1.0, 0.0,
  ];

  const normals = [];
  for (var i = 0; i < vertices.length / 3; i++) {
    normals.push(0, 0, 1);
  }

  // Unpack Color
  const colors = [];
  for (var i = 0; i < vertices.length / 3; i++) {
    colors.push(...color);
  }

  return initBuffers(
    gl,
    new Float32Array(vertices),
    new Float32Array(colors),
    new Float32Array(normals),
    null
  );
}

function createLine(gl, color) {
  const vertices = [2.0, 0.5, 2, -2.0, 0.5, 2];

  const normals = [0, 1, 0, 0, 1, 0];

  // Unpack Color
  const colors = [];
  for (var i = 0; i < 2; i++) {
    colors.push(...color);
  }

  return initBuffers(
    gl,
    new Float32Array(vertices),
    new Float32Array(colors),
    new Float32Array(normals),
    null
  );
}

// Function to initialize buffers for the first time
function initBuffers(gl, vertices, colors, normals, indices) {
  // Create Buffers
  const vertexBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
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

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
  const a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Normal);

  // Vertex count and indices count
  var vertexCount = vertices.length / 3;
  var indicesCount = 0;

  // If you have indices bind that buffer
  if (indices != null) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    indicesCount = indices.length;
  }

  return {
    vertexBuffer,
    colorBuffer,
    normalBuffer,
    indicesBuffer,
    vertexCount,
    indicesCount,
    a_Position,
    a_Color,
    a_Normal,
  };
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

  gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
  gl.vertexAttribPointer(object.a_Normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(object.a_Normal);

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

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, plane);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, plane.vertexCount);
}

// Function to draw sphere and move it and scale it and rotate it
function drawSphere(gl, sphere, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .rotate(...rotating1)
    .rotate(...rotating2)
    .scale(...scaling);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, sphere);
  gl.drawElements(gl.TRIANGLES, sphere.indicesCount, gl.UNSIGNED_SHORT, 0);
}

// Function to draw cylinder and move it and scale it and rotate it
function drawCylinder(gl, cylinder, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, cylinder);
  gl.drawElements(gl.TRIANGLES, cylinder.indicesCount, gl.UNSIGNED_SHORT, 0);
}

// Function to draw pyramid and move it and scale it and rotate it
function drawPyramid(gl, pyramid, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, pyramid);
  gl.drawElements(gl.TRIANGLES, pyramid.indicesCount, gl.UNSIGNED_SHORT, 0);
}

// Function to draw circle and move it and scale it and rotate it
function drawCircle(gl, circle, moving, scaling, rotating1) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, circle);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, circle.vertexCount);
}

// Function to draw triangle and move it and scale it and rotate it
function drawTriangle(gl, triangle, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, triangle);
  gl.drawArrays(gl.TRIANGLES, 0, triangle.vertexCount);
}

// Function to draw sheet and move it and scale it and rotate it
function drawSheet(gl, sheet, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, sheet);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, sheet.vertexCount);
}

// Function to draw star and move it and scale it and rotate it
function drawStar(gl, star, moving, scaling, rotating1) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, star);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, star.vertexCount);
}

function drawLine(gl, line, moving, scaling, rotating1) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, line);
  gl.drawArrays(gl.LINES, 0, line.vertexCount);
}

function drawCube(gl, cube, moving, scaling, rotating1, rotating2) {
  var xformMatrix = new Matrix4();
  xformMatrix
    .setTranslate(...moving)
    .scale(...scaling)
    .rotate(...rotating1)
    .rotate(...rotating2);
  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

  var normalMatrix = new Matrix4();
  normalMatrix.setInverseOf(xformMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

  initObject(gl, cube);
  gl.drawElements(gl.TRIANGLES, cube.indicesCount, gl.UNSIGNED_SHORT, 0);
}

// Function that draws walls all together
function drawPlanes(gl, planes) {
  for (var i = 0; i < planes.length; i++) {
    drawPlane(gl, planes[i]);
  }
}

function drawPath(gl, sheets) {
  // STARTING PATH
  drawSheet(
    gl,
    sheets[0],
    [-195, 0.01, 0],
    [10, 0, 3.5],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawSheet(
    gl,
    sheets[0],
    [-185, 0.01, 0],
    [10, 0, 3.5],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawSheet(
    gl,
    sheets[0],
    [-175, 0.01, 0],
    [10, 0, 3.5],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
}

function drawFence(gl, cubes) {
  var wallP = cubes[0];
  var sheetP = cubes[1];

  // FRONT WALL (X = -170.5) - door opening at Z=0
  // Back corner pillar
  drawCube(
    gl,
    wallP,
    [-170.5, 0.01, -190],
    [0.3, 7, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // pillar before door
  drawCube(
    gl,
    wallP,
    [-170.5, 0.01, -3],
    [0.3, 7, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom
  drawCube(
    gl,
    wallP,
    [-170.5, 0.01, -96],
    [0.3, 1, 93.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  /// sheet fill will be fences
  drawSheet(
    gl,
    sheetP,
    [-170.5, 3.5, -96],
    [1, 5, 187],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // horizontal bar top
  drawCube(
    gl,
    wallP,
    [-170.5, 6, -96],
    [0.3, 1, 93.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // pillar after door
  drawCube(
    gl,
    wallP,
    [-170.5, 0.01, 3],
    [0.3, 7, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // front corner pillar
  drawCube(
    gl,
    wallP,
    [-170.5, 0.01, 190],
    [0.3, 7, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom
  drawCube(
    gl,
    wallP,
    [-170.5, 0.01, 96],
    [0.3, 1, 93.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill will be fences
  drawSheet(
    gl,
    sheetP,
    [-170.5, 3.5, 96],
    [1, 5, 187],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // horizontal bar top
  drawCube(
    gl,
    wallP,
    [-170.5, 6, 96],
    [0.3, 1, 93.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // Enternce
  // pillar in front of piller before door
  drawCube(
    gl,
    wallP,
    [-180.5, 0.01, -3],
    [0.3, 7, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom
  drawCube(
    gl,
    wallP,
    [-175.5, 0.01, 3],
    [4.7, 1, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetP,
    [-175.5, 3.5, 3],
    [9.7, 5, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar top
  drawCube(
    gl,
    wallP,
    [-175.5, 6, 3],
    [4.7, 1, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // pillar in front of piller after door
  drawCube(
    gl,
    wallP,
    [-180.5, 0.01, 3],
    [0.3, 7, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom
  drawCube(
    gl,
    wallP,
    [-175.5, 0.01, -3],
    [4.7, 1, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetP,
    [-175.5, 3.5, -3],
    [9.7, 5, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  /// horizontal bar top
  drawCube(
    gl,
    wallP,
    [-175.5, 6, -3],
    [4.7, 1, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // BACK WALL (X = 170.5) - solid
  // back corner pillar
  drawCube(
    gl,
    wallP,
    [170.5, 0.01, -190],
    [0.3, 7, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // front corner pillar
  drawCube(
    gl,
    wallP,
    [170.5, 0.01, 190],
    [0.3, 7, 0.5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar bottom
  drawCube(
    gl,
    wallP,
    [170.5, 0.01, 0],
    [0.3, 1, 190],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetP,
    [170.5, 3.5, 0],
    [1, 5, 380],
    [90, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // horizontal bar top
  drawCube(gl, wallP, [170.5, 6, 0], [0.3, 1, 190], [0, 1, 0, 0], [0, 1, 0, 0]);

  // RIGHT WALL (Z = 190)
  // horizontal bar bottom
  drawCube(
    gl,
    wallP,
    [0, 0.01, 190],
    [170.5, 1, 0.3],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetP,
    [0, 3.5, 190],
    [341, 5, 0.3],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // horizontal bar top
  drawCube(gl, wallP, [0, 6, 190], [170.5, 1, 0.3], [0, 1, 0, 0], [0, 1, 0, 0]);

  // LEFT WALL (Z = -190)
  // horizontal bar bottom
  drawCube(
    gl,
    wallP,
    [0, 0.01, -190],
    [170.5, 1, 0.3],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // sheet fill
  drawSheet(
    gl,
    sheetP,
    [0, 3.5, -190],
    [341.5, 5, 0.3],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  );

  // horizontal bar top
  drawCube(
    gl,
    wallP,
    [0, 6, -190],
    [170.5, 1, 0.3],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );
}
