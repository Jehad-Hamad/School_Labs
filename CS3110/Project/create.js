function createPlane(gl, wall, color) {
  const vertex = [
    [WALL_MIN_X, 0.0, WALL_MIN_Z], // v0
    [WALL_MAX_X, 0.0, WALL_MIN_Z], // v1
    [WALL_MAX_X, 30.0, WALL_MIN_Z], // v2
    [WALL_MIN_X, 30.0, WALL_MIN_Z], // v3

    [WALL_MIN_X, 0.0, WALL_MAX_Z], // v4
    [WALL_MAX_X, 0.0, WALL_MAX_Z], // v5
    [WALL_MAX_X, 30.0, WALL_MAX_Z], // v6
    [WALL_MIN_X, 30.0, WALL_MAX_Z], // v7
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
// Function to create tree from OBJ data
function createObject(gl, objText, color) {
  const objData = parseOBJ(objText);

  // Create colors array (same color for all vertices)
  const colors = [];
  for (let i = 0; i < objData.vertices.length / 3; i++) {
    colors.push(...color);
  }

  return initBuffers(
    gl,
    objData.vertices,
    new Float32Array(colors),
    objData.normals,
    objData.indices
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

// Function to parse OBJ file
function parseOBJ(objText) {
  const vertices = [];
  const normals = [];
  const texCoords = [];
  const faces = [];

  const lines = objText.split('\n');

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('v ')) {
      // Vertex position
      const parts = line.split(/\s+/);
      vertices.push(
        parseFloat(parts[1]),
        parseFloat(parts[2]),
        parseFloat(parts[3])
      );
    } else if (line.startsWith('vn ')) {
      // Vertex normal
      const parts = line.split(/\s+/);
      normals.push(
        parseFloat(parts[1]),
        parseFloat(parts[2]),
        parseFloat(parts[3])
      );
    } else if (line.startsWith('vt ')) {
      // Texture coordinate
      const parts = line.split(/\s+/);
      texCoords.push(parseFloat(parts[1]), parseFloat(parts[2]));
    } else if (line.startsWith('f ')) {
      // Face
      const parts = line.split(/\s+/).slice(1);
      faces.push(parts);
    }
  }

  // Convert faces to indexed vertices
  const finalVertices = [];
  const finalNormals = [];
  const finalColors = [];
  const indices = [];

  let vertexIndex = 0;

  for (const face of faces) {
    // Each face should have 3 vertices for a triangle
    for (let i = 0; i < 3; i++) {
      const parts = face[i].split('/');
      const vIdx = parseInt(parts[0]) - 1; // OBJ indices start at 1
      const vtIdx = parts[1] ? parseInt(parts[1]) - 1 : -1;
      const vnIdx = parts[2] ? parseInt(parts[2]) - 1 : -1;

      // Add vertex position
      finalVertices.push(
        vertices[vIdx * 3],
        vertices[vIdx * 3 + 1],
        vertices[vIdx * 3 + 2]
      );

      // Add normal
      if (vnIdx >= 0) {
        finalNormals.push(
          normals[vnIdx * 3],
          normals[vnIdx * 3 + 1],
          normals[vnIdx * 3 + 2]
        );
      } else {
        finalNormals.push(0, 1, 0); // Default normal
      }

      indices.push(vertexIndex++);
    }
  }

  return {
    vertices: new Float32Array(finalVertices),
    normals: new Float32Array(finalNormals),
    indices: new Uint16Array(indices),
  };
}
