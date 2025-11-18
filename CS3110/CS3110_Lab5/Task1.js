// Vertex shader
var VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_ModelViewMatrix;
varying vec4 v_Color;
void main() {
  gl_Position = u_ModelViewMatrix * a_Position;
  v_Color = a_Color;
}
`;

// Fragment shader
var FSHADER_SOURCE = `
#ifdef GL_ES
precision mediump float;
#endif
varying vec4 v_Color;
void main() {
  gl_FragColor = v_Color;
}
`;

let viewMatrix, modelMatrix, modelViewMatrix, u_ModelViewMatrix;

// Start ABOVE the world (so we can look straight down)
let g_eyeX = 0.2,
  g_eyeY = .25, // height
  g_eyeZ = 0.25;

main();

function main() {
  const canvas = document.getElementById('webgl');
  const gl = getWebGLContext(canvas);
  if (!gl) return;

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) return;

  const sheetPoints = [
    -1.0, 0.0, -1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0,

    -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, 1.0,
  ];

  const green = [0.0, 1.0, 0.0];

  const n = initVertexBuffers(gl, sheetPoints, green);
  if (n < 0) return;

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix');

  viewMatrix = new Matrix4();
  modelMatrix = new Matrix4();
  modelMatrix.setRotate(0, 0, 1, 0);

  document.onkeydown = ev => {
    keydown(ev, gl, n);
  };

  updateMatrix();
  draw(gl, n);
}

function keydown(ev, gl, n) {
  const step = 0.1;

  switch (ev.key.toLowerCase()) {
    case 'a': // left (-X)
      g_eyeX -= step;
      break;

    case 'd': // right (+X)
      g_eyeX += step;
      break;

    case 'w': // forward (toward -Z)
      g_eyeZ -= step;
      break;

    case 's': // backward (toward +Z)
      g_eyeZ += step;
      break;

    case 'q': // UP (+Y)
      g_eyeY += step;
      break;

    case 'e': // DOWN (-Y)
      g_eyeY -= step;
      break;

    default:
      return;
  }

  updateMatrix();
  draw(gl, n);
}

// ---- CAMERA LOOKING STRAIGHT DOWN ----
function updateMatrix() {
  // Look straight DOWN.
  // Target is directly below the camera.
  viewMatrix.setLookAt(
    g_eyeX,
    g_eyeY,
    g_eyeZ, // camera position

    g_eyeX,
    0.0,
    g_eyeZ, // straight down
    
    0,
    0,
    1 // Z-axis UP
  );

  modelViewMatrix = new Matrix4(viewMatrix).multiply(modelMatrix);
}

// ---- Render ----
function draw(gl, n) {
  gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

// ---- Flexible buffer ----
function initVertexBuffers(gl, points, color) {
  if (points.length % 3 !== 0) return -1;

  const n = points.length / 3;
  const verticesColors = new Float32Array(n * 6);

  for (let i = 0; i < n; i++) {
    const pi = i * 3;
    const vi = i * 6;

    verticesColors[vi] = points[pi];
    verticesColors[vi + 1] = points[pi + 1];
    verticesColors[vi + 2] = points[pi + 2];

    verticesColors[vi + 3] = color[0];
    verticesColors[vi + 4] = color[1];
    verticesColors[vi + 5] = color[2];
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  const FSIZE = verticesColors.BYTES_PER_ELEMENT;

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  const a_Color = gl.getAttribLocation(gl.program, 'a_Color');

  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);

  return n;
}
