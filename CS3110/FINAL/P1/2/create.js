// Function to create Pyramid (square base) give just color
function createPyramid(gl, color, textureUrls = null) {
  // Define vertices for a square-based pyramid
  const vertices = [
    // Base (square on y = 0)
    -0.5, 0.0, -0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, 0.5,

    // Front face (apex + 2 base vertices)
    0.0, 1.0, 0.0, -0.5, 0.0, 0.5, 0.5, 0.0, 0.5,

    // Right face
    0.0, 1.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5,

    // Back face
    0.0, 1.0, 0.0, 0.5, 0.0, -0.5, -0.5, 0.0, -0.5,

    // Left face
    0.0, 1.0, 0.0, -0.5, 0.0, -0.5, -0.5, 0.0, 0.5,
  ];

  // Calculate normals for each face
  const normals = [
    // Base (pointing down)
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,

    // Front face (calculate normal for slanted face)
    0, 0.447, 0.894, 0, 0.447, 0.894, 0, 0.447, 0.894,

    // Right face
    0.894, 0.447, 0, 0.894, 0.447, 0, 0.894, 0.447, 0,

    // Back face
    0, 0.447, -0.894, 0, 0.447, -0.894, 0, 0.447, -0.894,

    // Left face
    -0.894, 0.447, 0, -0.894, 0.447, 0, -0.894, 0.447, 0,
  ];

  const texCoords = [
    // Base
    0, 0, 1, 0, 1, 1, 0, 1,
    // Each triangular face
    0.5, 1, 0, 0, 1, 0, 0.5, 1, 0, 0, 1, 0, 0.5, 1, 0, 0, 1, 0, 0.5, 1, 0, 0, 1,
    0,
  ];

  // Indices for base (2 triangles) and 4 side faces (4 triangles)
  const indices = [
    // Base
    0, 2, 1, 0, 3, 2,
    // Front face
    4, 5, 6,
    // Right face
    7, 8, 9,
    // Back face
    10, 11, 12,
    // Left face
    13, 14, 15,
  ];

  // Unpack color
  const colors = [];
  for (var i = 0; i < vertices.length / 3; i++) {
    colors.push(...color);
  }

  // Just like how i did the cube for the parctice final they had last year
  // Handle multiple textures
  let textures = null;
  if (textureUrls) {
    if (Array.isArray(textureUrls) && textureUrls.length === 4) {
      // 4 textures for the 4 side faces: [front, right, back, left]
      // Base will use solid color (no texture)
      textures = textureUrls.map(url => loadTexture(gl, url));
    } else if (typeof textureUrls === 'string') {
      // Single texture for all faces
      textures = loadTexture(gl, textureUrls);
    }
  }

  const buffers = initBuffers(
    gl,
    new Float32Array(vertices),
    new Float32Array(colors),
    new Float32Array(normals),
    new Uint16Array(indices),
    new Float32Array(texCoords),
    null
  );

  // Add textures to the returned object
  buffers.textures = textures;
  buffers.useTexture = textures !== null;

  return buffers;
}

// Function to create Sheet (flat rectangular plane) give just color
function createSheet(gl, color, textureUrl = null) {
  const vertices = [
    -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
  ];

  var normal = [0, 1, 0];
  const normals = [...normal, ...normal, ...normal, ...normal];

  const texCoords = [0, 0, 1, 0, 1, 1, 0, 1];

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
    null,
    new Float32Array(texCoords),
    textureUrl
  );
}

// Function to initialize buffers for the first time
function initBuffers(
  gl,
  vertices,
  colors,
  normals,
  indices,
  texCoords,
  textureUrl
) {
  // VOA buffer
  gl.vaoExt = gl.getExtension('OES_vertex_array_object'); // Looked up how to use
  const VOA = gl.vaoExt.createVertexArrayOES();
  gl.vaoExt.bindVertexArrayOES(VOA);

  // Create Buffers
  const vertexBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indicesBuffer = gl.createBuffer();
  const texCoordBuffer = gl.createBuffer();

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

  // Bind and buffer the normal array to the normal buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
  const a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Normal);

  // Bind and buffer texture coordinates
  const a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if (texCoords) {
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_TexCoord);
  }

  // Vertex count and indices count
  var vertexCount = vertices.length / 3;
  var indicesCount = 0;

  // If you have indices bind that buffer
  if (indices != null) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    indicesCount = indices.length;
  }

  if (gl.vaoExt) {
    gl.vaoExt.bindVertexArrayOES(null);
  }

  // Load texture if provided
  let texture = null;
  if (textureUrl) {
    texture = loadTexture(gl, textureUrl);
  }

  return {
    VOA,
    vertexBuffer,
    colorBuffer,
    normalBuffer,
    indicesBuffer,
    texCoordBuffer,
    vertexCount,
    indicesCount,
    a_Position,
    a_Color,
    a_Normal,
    a_TexCoord,
    texture,
    useTexture: textureUrl !== null,
  };
}

// Function to initialize buffers for the object so I can draw later rather than calling initBuffers()
function initObject(gl, object, faceIndex = null) {
  // faceIndex is used when drawing individual faces with different textures
  // Bind the objects vertex buffer to the webgl buffer
  if (object.VOA) {
    gl.vaoExt.bindVertexArrayOES(object.VOA);
  } else {
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

    // Bind texture coordinates
    if (object.texCoordBuffer) {
      gl.bindBuffer(gl.ARRAY_BUFFER, object.texCoordBuffer);
      gl.vertexAttribPointer(object.a_TexCoord, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(object.a_TexCoord);
    }

    // Bind the objects indicesBuffer to the webgl buffer
    if (object.indicesBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.indicesBuffer);
    }
  }

  // Set texture if available
  if (object.useTexture && faceIndex !== null) {
    // Check if we have multiple textures (array)
    if (Array.isArray(object.textures)) {
      // Use specific texture for this face
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, object.textures[faceIndex]);
      gl.uniform1i(u_Sampler, 0);
      gl.uniform1i(u_UseTexture, 1);
    } else {
      gl.uniform1i(u_UseTexture, 0);
    }
  } else {
    gl.uniform1i(u_UseTexture, 0);
  }
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  const image = new Image();

  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };

  image.src = url;
  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}
