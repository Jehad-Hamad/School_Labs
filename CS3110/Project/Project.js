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

const WALL_MIN_X = -90;
const WALL_MAX_X = 90;
const WALL_MIN_Z = -90;
const WALL_MAX_Z = 90;

var near = 0.1;
var fov = 110;
var far = (WALL_MAX_Z + 5) * 2;

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
  eyeX = WALL_MIN_X;
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
  const right = createPlane(gl, 'wallRight', [0.565, 0.835, 1.0]);
  const left = createPlane(gl, 'wallLeft', [0.565, 0.835, 1.0]);
  const back = createPlane(gl, 'wallBack', [0.565, 0.835, 1.0]);
  const front = createPlane(gl, 'wallFront', [0.565, 0.835, 1.0]);
  const planes = [floor, right, left, back, front];

  const floorSheet = createSheet(gl, [1, 0, 0]);
  const wallSheet = createSheet(gl, [0.5, 0, 0.8]);

  const wallPiller = createCube(gl, [0.78, 0.75, 0.7]);

  const fenceShapes = [wallPiller, wallSheet];

  const benchOak = createObject(gl, benchObj, [0.28, 0.17, 0.1]);
  const benchBamBoo = createObject(gl, benchObj, [0.85, 0.82, 0.42]);
  const benchSpruce = createObject(gl, benchObj, [0.44, 0.28, 0.15]);
  const benchs = [benchOak, benchBamBoo, benchSpruce];

  const lamp = createLamp(gl, [0.3, 0.3, 0.3]);

  drawPlanes(gl, planes);
  // Main area fenced
  drawFence(gl, fenceShapes);
  drawPath(gl, floorSheet, benchs, lamp);
  drawTicketStand(gl, fenceShapes);
  function keyDown(ev) {
    // Camera Rotation
    if (ev.keyCode === 39) {
      //Tturn Right
      horizontalAngle += 0.1;
    } else if (ev.keyCode === 37) {
      // Turn Left
      horizontalAngle -= 0.1;
    } else if (ev.keyCode === 38) {
      // Look Up
      verticalAngle += 0.1;
      verticalAngle = Math.min(1.5, verticalAngle);
    } else if (ev.keyCode === 40) {
      // Look Down
      verticalAngle -= 0.1;
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
      // eyeY = Math.max(3, eyeY);
    }
    console.log(eyeX, eyeZ);

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

    // Always draw my planes
    drawPlanes(gl, planes);
    drawPath(gl, floorSheet, benchs, lamp);
    drawFence(gl, fenceShapes);

    if (eyeX < WALL_MIN_X + 40 && eyeZ > -5 && eyeZ < 25) {
      drawTicketStand(gl, fenceShapes);
    }
    // Jungle front left
    if (eyeX > -77 && eyeX < -20 && eyeZ > -60 && eyeZ <= 0) {
      drawFence(
        gl,
        fenceShapes,
        [WALL_MIN_X + 60, 0, WALL_MIN_Z + 60],
        [0.25, 1, 0.25]
      );
    }

    // desert front right
    if (eyeX > -75 && eyeX < -20 && eyeZ >= 0 && eyeZ < 60) {
      drawFence(
        gl,
        fenceShapes,
        [WALL_MIN_X + 60, 0, WALL_MAX_Z - 60],
        [0.25, 1, 0.25]
      );
    }

    // water back left
    if (eyeX > -20 && eyeX < 100 && eyeZ > -60 && eyeZ <= 0) {
      drawFence(
        gl,
        fenceShapes,
        [WALL_MAX_X - 60, 0, WALL_MIN_Z + 60],
        [0.25, 1, 0.25]
      );
    }

    // winter back right
    if (eyeX > -20 && eyeX < 100 && eyeZ >= 0 && eyeZ < 60) {
      drawFence(
        gl,
        fenceShapes,
        [WALL_MAX_X - 60, 0, WALL_MAX_Z - 60],
        [0.25, 1, 0.25]
      );
    }
  }

  document.onkeydown = function (ev) {
    keyDown(ev);
  };
}
