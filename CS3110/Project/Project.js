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
        vec4 vertexPosition = u_xformMatrix * a_Position;
        gl_Position = u_ModelViewMatrix * vertexPosition;

        // Recalculate the normal based on the model matrix and make its length 1.
        vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));

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
  // Set light direction in world coords
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

  // Planes
  const floor = createPlane(gl, 'floor', [0, 0.6, 0.36]);
  const right = createPlane(gl, 'wallRight', [0.565, 0.835, 1.0]);
  const left = createPlane(gl, 'wallLeft', [0.565, 0.835, 1.0]);
  const back = createPlane(gl, 'wallBack', [0.565, 0.835, 1.0]);
  const front = createPlane(gl, 'wallFront', [0.565, 0.835, 1.0]);
  const planes = [floor, right, left, back, front];

  // Path and fence
  const floorSheet = createSheet(gl, [1, 0, 0], 'pictures/bricks.jpg');
  const wallSheet = createSheet(gl, [1, 1, 1], 'pictures/fence.jpg');
  const wallPiller = createCube(gl, [0.78, 0.75, 0.7]);
  const fenceShapes = [wallPiller, wallSheet];

  // Benches
  const benchOak = createObject(gl, benchObj, [0.28, 0.17, 0.1]);
  const benchBamBoo = createObject(gl, benchObj, [0.85, 0.82, 0.42]);
  const benchSpruce = createObject(gl, benchObj, [0.44, 0.28, 0.15]);
  const benchs = [benchOak, benchBamBoo, benchSpruce];

  // Lamp
  const lamp = createLamp(gl, [0.3, 0.3, 0.3]);

  // Shared shapes object
  const shapes = {
    // Basic spheres
    whiteSphere: createSphere(gl, [1.0, 1.0, 1.0]),
    blackSphere: createSphere(gl, [0.0, 0.0, 0.0]),
    orangeSphere: createSphere(gl, [1.0, 0.65, 0.17]),

    // Pyramids
    orangePyramid: createPyramid(gl, [1.0, 0.65, 0.17]),
    desertPyramid: createPyramid(gl, [0.757, 0.604, 0.42]),

    // Polar bear
    polarBear: createObject(gl, polarbearkObj, [0.91, 0.85, 0.66]),

    // Penguin
    penguin: createObject(
      gl,
      penguinObj,
      [1, 1, 1],
      'pictures/MAT_Penguin_baseColor.png'
    ),

    // Cactus
    cactusGreen: createCylinder(gl, [0.13, 0.55, 0.13]),
    cactusDarkGreen: createSphere(gl, [0.0, 0.39, 0.0]),

    // Igloo
    iglooSphere: createSphere(gl, [1.0, 1.0, 1.0], 'pictures/bricks.jpg'),
    iglooCylinder: createCylinder(gl, [1.0, 1.0, 1.0], 'pictures/bricks.jpg'),
    iglooCircle: createCircle(gl, [0.0, 0.0, 0.0]),

    // Pond
    pondCircle: createCircle(gl, [1.0, 1.0, 1.0], 'pictures/ice.jpg'),

    // Rocks
    desertRock1: createObject(
      gl,
      rockObj,
      [0.76, 0.69, 0.57],
      'pictures/limeStone.jpg'
    ), // Sandy tan
    desertRock2: createObject(
      gl,
      rockObj,
      [0.65, 0.55, 0.45],
      'pictures/normalRock.jpg'
    ), // Darker brown
    desertRock3: createObject(
      gl,
      rockObj,
      [0.82, 0.75, 0.62],
      'pictures/limeStone.jpg'
    ), // Light sandstone

    snowRock1: createObject(
      gl,
      rockObj,
      [0.8, 0.8, 0.85],
      'pictures/snowRock.jpg'
    ),
    // Grey - Blue
    snowRock2: createObject(
      gl,
      rockObj,
      [0.5, 0.5, 0.55],
      'pictures/snowRock.jpg'
    ), // Darker gray
    snowRock3: createObject(
      gl,
      rockObj,
      [0.7, 0.7, 0.75],
      'pictures/snowRock.jpg'
    ), // Light gray

    // Fish
    fish1: createObject(gl, fishObj, [0.96, 0.51, 0.19]), // Orange clownfish
    fish2: createObject(gl, fishObj, [0.0, 0.5, 0.7]), // Blue fish

    // Pyramid
    desertPyramid: createPyramid(gl, [1, 0.75, 0.55], 'pictures/bricks.jpg'), // Golden sandstone

    // Camel
    camel: createObject(gl, camelObj, [0.651, 0.478, 0.239]),

    // Urns
    urn: createObject(
      gl,
      urnObj,
      [0.227, 0.184, 0.157],
      `pictures/urn_text.png`
    ),
    urn1: createObject(
      gl,
      urnObj,
      [0.545, 0.306, 0.196],
      `pictures/urn_text.png`
    ),
    urn2: createObject(
      gl,
      urnObj,
      [0.353, 0.243, 0.169],
      `pictures/urn_text.png`
    ),

    // Sand dunes and files
    sandDune: createObject(gl, sandobj, [0.757, 0.604, 0.42]),
    snowPile: createObject(gl, sandobj, [1.0, 1.0, 1.0]),

    // Dead bushes
    deadBush: createObject(gl, deadBushObj, [0.604, 0.482, 0.29]),
    deadBush1: createObject(gl, deadBushObj, [0.353, 0.271, 0.157]),

    // Sheets for biomes
    snowSheet: createSheet(gl, [1.0, 1.0, 1.0]),
    greenSheet: createSheet(gl, [0.0, 0.176, 0.016]),
    waterSheet: createSheet(gl, [0.25, 0.55, 0.85]),
    sandSheet: createSheet(gl, [0.93, 0.82, 0.6]),
    snowFloor: createSheet(gl, [1, 1, 1], 'pictures/snow.jpg'),
    sandFloor: createSheet(gl, [1, 1, 1], 'pictures/sand.jpg'),

    // Ticket stand
    mangrovePillers: createCube(gl, [0.53, 0.29, 0.15]),
    cherryRoof: createCube(gl, [0.89, 0.5, 0.62]),
    cherrySheet: createSheet(gl, [0.89, 0.5, 0.62]),
    glassSheet: createSheet(gl, [0.7, 0.85, 0.9]),

    // Sign
    ticketSign: createSign(gl, [0.89, 0.5, 0.62], 'pictures/TICKETS.jpg'),
    articSign: createSign(gl, [0.78, 0.75, 0.7], 'pictures/ARTIC.jpg'),
    jungleSign: createSign(gl, [0.78, 0.75, 0.7], 'pictures/JUNGLE.jpg'),
    desertSign: createSign(gl, [0.78, 0.75, 0.7], 'pictures/DESERT.jpg'),
    waterSign: createSign(gl, [0.78, 0.75, 0.7], 'pictures/WATER.jpg'),

    // Jungle animals and objects
    elephant: createObject(gl, elephantObj, [0.6, 0.6, 0.6]),
    femaleLion: createObject(gl, femaleLionObj, [0.6, 0.6, 0.0]),
    tiger: createObject(
      gl,
      tigerObj,
      [1.0, 1.0, 1.0],
      'pictures/Material_001_baseColor.png'
    ),
    lion: createObject(gl, lionObj, [1.0, 1.0, 1.0], `pictures/image0.png`),

    // Jungle bushes
    bush1: createObject(gl, bush1Obj, [0.0, 0.5, 0.0]),
    bush2: createObject(gl, bush2Obj, [0.13, 0.55, 0.13]),
    bush3: createObject(gl, bush3Obj, [0.0, 0.39, 0.0]),

    // Jungle rocks
    jungleRock1: createObject(
      gl,
      rockObj,
      [0.4, 0.35, 0.25],
      'pictures/normalRock.jpg'
    ),
    jungleRock2: createObject(
      gl,
      rockObj,
      [0.45, 0.4, 0.3],
      'pictures/normalRock.jpg'
    ),
    jungleRock3: createObject(
      gl,
      rockObj,
      [0.35, 0.3, 0.2],
      'pictures/normalRock.jpg'
    ),

    // Aquatic biome animals
    shark: createObject(
      gl,
      sharkObj,
      [0.5, 0.5, 0.6],
      'pictures/sharktext.png'
    ),
    whale: createObject(gl, whaleObj, [0.3, 0.35, 0.5]),
    squid: createObject(gl, squidObj, [0.5, 0.0, 0.5]),
    cave: createObject(gl, caveObj, [0.4, 0.35, 0.3]),

    // Aquatic fish
    tropicalFish1: createObject(gl, fishObj, [0.96, 0.51, 0.19]), // Orange clownfish
    tropicalFish2: createObject(gl, fishObj, [0.0, 0.5, 0.7]), // Blue fish
    tropicalFish3: createObject(
      gl,
      fish2Obj,
      [1.0, 1.0, 1.0],
      'pictures/fish2Objext.png'
    ),

    // Aquatic plants
    waterPlant: createObject(
      gl,
      waterPLantObj,
      [0.1, 0.5, 0.2],
      'pictures/waterplantText.jpg'
    ),
    waterPlant2: createObject(gl, waterPLantObj, [0.0, 0.6, 0.3]),
    waterPlant3: createObject(gl, waterPLantObj, [0.15, 0.45, 0.25]),

    // Coral
    coral1: createObject(
      gl,
      coral1Obj,
      [1.0, 0.4, 0.5],
      'pictures/Coral1ObjText.jpg'
    ),
    coral2: createObject(
      gl,
      coral2Obj,
      [1.0, 0.6, 0.3],
      'pictures/coral2ObjText.png'
    ),
    coral3: createObject(
      gl,
      coral1Obj,
      [0.9, 0.3, 0.4],
      'pictures/Coral1ObjText.jpg'
    ),
    coral4: createObject(
      gl,
      coral2Obj,
      [1.0, 0.5, 0.6],
      'pictures/coral2ObjText.png'
    ),

    // Aquatic rocks
    aquaticRock1: createObject(
      gl,
      rockObj,
      [0.4, 0.45, 0.5],
      'pictures/normalRock.jpg'
    ),
    aquaticRock2: createObject(
      gl,
      rockObj,
      [0.35, 0.4, 0.45],
      'pictures/normalRock.jpg'
    ),
    aquaticRock3: createObject(
      gl,
      rockObj,
      [0.5, 0.5, 0.55],
      'pictures/normalRock.jpg'
    ),

    // Aquatic floor
    sandyFloor: createSheet(gl, [1, 1, 1], 'pictures/sand.jpg'),
  };

  drawPlanes(gl, planes);
  drawFence(gl, fenceShapes);
  drawPath(gl, floorSheet, benchs, lamp);
  drawTicketStand(gl, shapes);

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
      eyeX = -35;
      eyeZ = 30;
      eyeY = 10;
    } else if (ev.key.toLowerCase() === '3') {
      // TP to the water
      eyeX = 35;
      eyeZ = -30;
    } else if (ev.key.toLowerCase() === '4') {
      eyeX = 24;
      eyeZ = 34;
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

    drawPlanes(gl, planes);
    drawPath(gl, floorSheet, benchs, lamp);
    drawFence(gl, fenceShapes);

    if (eyeX < WALL_MIN_X + 40 && eyeZ > -5 && eyeZ < 25) {
      drawTicketStand(gl, shapes);
    }

    if (eyeX > WALL_MIN_X && eyeX < 0 && eyeZ > WALL_MIN_Z && eyeZ < 0) {
      createJungle(gl, fenceShapes, shapes);
    }

    if (eyeX > WALL_MIN_X && eyeX < 0 && eyeZ > 0 && eyeZ < WALL_MAX_Z) {
      createDesert(gl, fenceShapes, shapes);
    }

    if (eyeX > 0 && eyeX < WALL_MAX_X && eyeZ > WALL_MIN_Z && eyeZ < 0) {
      createWater(gl, fenceShapes, shapes);
    }

    if (eyeX > 0 && eyeX < WALL_MAX_X && eyeZ > 0 && eyeZ < WALL_MAX_Z) {
      createArtic(gl, fenceShapes, shapes);
    }
  }

  document.onkeydown = function (ev) {
    keyDown(ev);
  };
}
