// Vertex shader with texture support
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    attribute vec4 a_Normal;
    attribute vec2 a_TexCoord;

    uniform mat4 u_ModelViewMatrix;  // Model view matrix
    uniform mat4 u_xformMatrix;      // Transform matrix
    uniform mat4 u_NormalMatrix;     // Transformation matrix of normal

    uniform vec3 u_LightPosition;    // Light direction
    uniform vec3 u_LightColor;       // Light color
    uniform vec3 u_AmbientLight;      // Ambient light color

    varying vec4 v_Color;
    varying vec2 v_TexCoord;
    
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

        vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;
        vec3 ambient = u_AmbientLight * a_Color.rgb;
        v_Color = vec4(diffuse + ambient, a_Color.a);
        
        v_TexCoord = a_TexCoord;
    }`;

// Fragment shader with texture support
var FSHADER_SOURCE = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform sampler2D u_Sampler;
    uniform bool u_UseTexture;
    
    varying vec4 v_Color;
    varying vec2 v_TexCoord;
    
    void main() {
        if (u_UseTexture) {
            vec4 texColor = texture2D(u_Sampler, v_TexCoord);
            gl_FragColor = texColor * v_Color;
        } else {
            gl_FragColor = v_Color;
        }
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
  u_AmbientLight,
  u_UseTexture,
  u_Sampler;

const WALL_MIN_X = -90;
const WALL_MAX_X = 90;
const WALL_MIN_Z = -90;
const WALL_MAX_Z = 90;

var near = 0.1;
var fov = 110;
var far = (WALL_MAX_Z + 5) * 2;

var horizontalAngle = 0;
var verticalAngle = 0;
var camRadius = 3.0;

var eyeX = 0;
eyeY = 3;
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
  u_UseTexture = gl.getUniformLocation(gl.program, 'u_UseTexture');
  u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');

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

  const floorSheet = createSheet(gl, [1, 0, 0], 'pictures/bricks.jpg');
  const wallSheet = createSheet(gl, [1, 1, 1], 'pictures/fence.jpg');

  const wallPiller = createCube(gl, [0.78, 0.75, 0.7]);

  const benchOak = createObject(gl, benchObj, [0.28, 0.17, 0.1]);
  const benchBamBoo = createObject(gl, benchObj, [0.85, 0.82, 0.42]);
  const benchSpruce = createObject(gl, benchObj, [0.44, 0.28, 0.15]);

  const lamp = createLamp(gl, [0.3, 0.3, 0.3]);

  const planes = [floor, right, left, back, front];
  const fenceShapes = [wallPiller, wallSheet];
  const benchs = [benchOak, benchBamBoo, benchSpruce];

  drawPlanes(gl, planes);
  // Main area fenced
  drawFence(gl, fenceShapes);
  drawPath(gl, floorSheet, benchs, lamp);
  drawTicketStand(gl, fenceShapes);

  function keyDown(ev) {
    // Camera Rotation
    if (ev.keyCode === 39) {
      //Turn Right
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
    } else if (ev.key.toLowerCase() === '1') {
      // TP to the jungle
      eyeX = -35;
      eyeZ = -30;
    } else if (ev.key.toLowerCase() === '2') {
      // TP to the desert
      eyeX = -35;
      eyeZ = 30;
    } else if (ev.key.toLowerCase() === '3') {
      // TP to the water
      eyeX = 35;
      eyeZ = -30;
    } else if (ev.key.toLowerCase() === '4') {
      // TP to the artic
      eyeX = 33;
      eyeZ = 25;
      eyeY = 3;
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
      createArtic(gl, fenceShapes);
    }
  }

  document.onkeydown = function (ev) {
    keyDown(ev);
  };
}

function createArtic(gl, fenceShapes) {
  drawFence(
    gl,
    fenceShapes,
    [WALL_MAX_X - 60, 0, WALL_MAX_Z - 60],
    [0.25, 1, 0.25],
    false
  );

  var snow = createSheet(gl, [1.0, 1.0, 1.0]);
  //right sheet
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 60, 3.5, WALL_MAX_Z - 45],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // left sheet
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 60, 3.5, WALL_MAX_Z - 75],
    [30.0, 7.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  // back sheet
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 45, 3.5, WALL_MAX_Z - 60],
    [1.0, 7.0, 30.0],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  // front 1 left
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 75, 3.5, WALL_MAX_Z - 68],
    [1.0, 7.0, 14.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );
  // front 2 right
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 75, 3.5, WALL_MAX_Z - 52],
    [1.0, 7.0, 14.5],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  //floor
  drawSheet(
    gl,
    snow,
    [WALL_MAX_X - 60, 0.02, 30],
    [30.0, 1, 30.0],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawPolarBear(
    gl,
    [5.0, 0.0, 0.0],
    [1.0, 1.0, 1.0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  drawPenguin(gl, WALL_MAX_X - 60, WALL_MAX_Z - 55, 2);

  igloo = createSphere(gl, [1.0, 1.0, 1.0]);
  drawSphere(
    gl,
    igloo,
    [WALL_MAX_X - 50, 2, WALL_MAX_Z - 51],
    [5, 5, 5],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  );

  iglooOpening = createCylinder(gl, [1.0, 1.0, 1.0]);
  drawCylinder(
    gl,
    iglooOpening,
    [WALL_MAX_X - 50, 1.4, WALL_MAX_Z - 51],
    [0.5, 1.5, 2],
    [90, 0, 0, 1],
    [0, 1, 0, 0]
  );

  iglooDoor = createCircle(gl, [0, 0, 0]);
  drawCircle(
    gl,
    iglooDoor,
    [WALL_MAX_X - 55, 1.4, WALL_MAX_Z - 51],
    [2.5, 1.5, 2],
    [90, 0, 1, 0],
    [0, 1, 0, 0]
  );

  pond = createCircle(gl, [0, 0, 1]);
  drawCircle(
    gl,
    pond,
    [WALL_MAX_X - 65, 0.03, WALL_MAX_Z - 51],
    [2.5, 1, 2.3],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );

  fish1 = createObject(gl, fishObj, [1.0, 0.0, 0.0]);
  fish2 = createObject(gl, fishObj, [0.2, 0.0, 1.0]);

  drawObject(
    gl,
    fish1,
    [WALL_MAX_X - 65, 0.3, WALL_MAX_Z - 55],
    [1, 1, 1],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawObject(
    gl,
    fish2,
    [WALL_MAX_X - 65.3, 0.3, WALL_MAX_Z - 55],
    [1, 1, 1],
    [90, 1, 0, 0],
    [0, 1, 0, 0]
  );
  drawObject(
    gl,
    fish2,
    [WALL_MAX_X - 64.3, 0.3, WALL_MAX_Z - 55],
    [1, 1, 1],
    [90, 1, 0, 0],
    [50, 0, 0, 1]
  );
}
