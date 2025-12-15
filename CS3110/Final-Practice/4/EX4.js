// Vertex shader with lighting
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    attribute vec4 a_Normal;
    attribute vec2 a_TexCoord;

    uniform mat4 u_ModelViewMatrix;  // Model view matrix
    uniform mat4 u_xformMatrix;      // Transform matrix
    uniform mat4 u_NormalMatrix;     // Transformation matrix of normal

    uniform vec3 u_LightPosition;    // Light position
    uniform vec3 u_LightColor;       // Light color
    uniform vec3 u_AmbientLight;     // Ambient light color
    uniform vec3 u_ViewPosition;     // Camera/eye position for specular
    uniform float u_Shininess;       // Specular shininess exponent

    varying vec4 v_Color;
    varying vec2 v_TexCoord;

    void main() {
        vec4 vertexPosition = u_xformMatrix * a_Position;
        gl_Position = u_ModelViewMatrix * vertexPosition;

        // Recalculate the normal based on the model matrix
        vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));

        // Calculate light direction FROM vertex TO light
        vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));

        // Calculate diffuse lighting
        float nDotL = max(dot(lightDirection, normal), 0.0);
        vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;
        vec3 ambient = u_AmbientLight * a_Color.rgb;

        // Calculate specular lighting
        vec3 viewDirection = normalize(u_ViewPosition - vec3(vertexPosition));
        vec3 reflectDirection = reflect(-lightDirection, normal);
        float spec = pow(max(dot(viewDirection, reflectDirection), 0.0), u_Shininess);
        vec3 specular = u_LightColor * spec;

        v_Color = vec4(ambient + diffuse + specular, a_Color.a);

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

// Global matrices and uniforms
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
  u_ViewPosition,
  u_Shininess,
  u_UseTexture,
  u_Sampler;

// Camera settings
var near = 0.1;
var fov = 110;
var far = 100;

var horizontalAngle = -Math.PI / 2; // Start looking towards origin
var verticalAngle = 0;
var camRadius = 3.0;

var eyeX = 0,
  eyeY = 5,
  eyeZ = 10;
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

  // Setup lighting uniforms
  u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
  u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
  u_ViewPosition = gl.getUniformLocation(gl.program, 'u_ViewPosition');
  u_Shininess = gl.getUniformLocation(gl.program, 'u_Shininess');
  u_UseTexture = gl.getUniformLocation(gl.program, 'u_UseTexture');
  u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');

  // Set light properties
  gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
  gl.uniform3f(u_LightPosition, 1.0, 10.0, 1.0);
  gl.uniform3f(u_AmbientLight, 0.5, 0.5, 0.5);
  gl.uniform1f(u_Shininess, 32.0);

  u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix');
  u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');

  // Setup camera
  viewMatrix = new Matrix4();
  // Calculate initial look-at based on angles
  atX = eyeX + Math.cos(horizontalAngle);
  atZ = eyeZ + Math.sin(horizontalAngle);
  atY = eyeY + Math.sin(verticalAngle);
  viewMatrix.setLookAt(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ);
  gl.uniform3f(u_ViewPosition, eyeX, eyeY, eyeZ);

  projMatrix = new Matrix4();
  projMatrix.setPerspective(fov, canvas.width / canvas.height, near, far);

  modelMatrix = new Matrix4();
  modelMatrix.setRotate(0, 0, 1, 0);

  modelViewMatrix = projMatrix.multiply(viewMatrix).multiply(modelMatrix);
  gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);

  // Create example shapes with different colors
  // Option 1: Single texture for all faces (works as before)
  // const Cube = createCube(gl, [1.0, 1.0, 1.0], 'resources/blueflower2.jpg');

  // Option 2: Different texture for each face [front, back, top, bottom, right, left]
  const Cube = createCube(
    gl,
    [1.0, 1.0, 1.0],
    [
      'resources/blueflower2.jpg', // Front
      'resources/blueflower.jpg', // Back
      'resources/pinkflower.jpg', // Top
      'resources/redflower.jpg', // Bottom
      'resources/yellowflower.jpg', // Right
      'resources/orange.jpg', // Left
    ]
  );

  const floor = createSheet(gl, [0.5, 0.5, 0.5]);

  var speed = 1;
  var size = 1;

  const shapes = {
    // Cube
    cubeTx: 0,
    cubeTy: 4,
    cubeTz: 0,

    cubeTxDir: 1,
    cubeTyDir: 1,
    cubeTzDir: 1,

    cubeSx: size,
    cubeSy: size,
    cubeSz: size,

    cubeSxDir: 1,
    cubeSyDir: 1,
    cubeSzDir: 1,

    cubeRx: 0,
    cubeRy: 0,
    cubeRz: 0,
  };

  function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Floor (unchanged)
    drawSheet(gl, floor, [0, -1, 0], [10, 1, 10], [90, 1, 0, 0], [0, 0, 1, 0]);

    // Cube
    drawCube(
      gl,
      Cube,
      [shapes.cubeTx, shapes.cubeTy, shapes.cubeTz],
      [shapes.cubeSx, shapes.cubeSy, shapes.cubeSz],
      [shapes.cubeRx, 1, 0, 0],
      [shapes.cubeRy, 0, 1, 0],
      [shapes.cubeRz, 0, 0, 1]
    );
  }

  function scaling(shape, smallestSize, biggestSize, speed, axis) {
    const scaleKey = `${shape}S${axis}`; // cubeSx
    const dirKey = `${shape}S${axis}Dir`; // cubeSxDir

    if (shapes[scaleKey] >= biggestSize) {
      shapes[scaleKey] = biggestSize;
      shapes[dirKey] *= -1;
    }

    if (shapes[scaleKey] <= smallestSize) {
      shapes[scaleKey] = smallestSize;
      shapes[dirKey] *= -1;
    }

    shapes[scaleKey] += speed * shapes[dirKey];
  }

  function rotating(shape, speed, axis) {
    const rotatingKey = `${shape}R${axis}`; // cubeRx
    shapes[rotatingKey] += speed;
  }

  function translating(shape, min, max, speed, axis) {
    const posKey = `${shape}T${axis}`; // cubeTx
    const dirKey = `${shape}T${axis}Dir`; // cubeTxDir

    if (shapes[posKey] >= max) {
      shapes[posKey] = max;
      shapes[dirKey] *= -1;
    }

    if (shapes[posKey] <= min) {
      shapes[posKey] = min;
      shapes[dirKey] *= -1;
    }

    shapes[posKey] += speed * shapes[dirKey];
  }

  function animate() {
    rotating('cube', speed, 'x');
    render();
    requestAnimationFrame(animate);
  }
  animate();

  // Keyboard controls
  function keyDown(ev) {
    // Camera Rotation
    if (ev.keyCode === 39) {
      // Turn Right
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
    } else if (ev.key.toLowerCase() === 'e') {
      // Fly Down
      eyeY -= 1.0;
    }
    // SHAPE CONTROLS
    else if (ev.key.toLowerCase() === 'z') {
      speed += 0.5;
      speed = Math.min(6, speed);
    } else if (ev.key.toLowerCase() === 'x') {
      speed -= 0.5;
      speed = Math.max(0, speed);
    } else if (ev.key.toLowerCase() === 'c') {
      size += 0.5;
      size = Math.min(6, size);
      shapes.cubeSx = size;
      shapes.cubeSy = size;
      shapes.cubeSz = size;
    } else if (ev.key.toLowerCase() === 'v') {
      size -= 0.5;
      size = Math.max(0, size);
      shapes.cubeSx = size;
      shapes.cubeSy = size;
      shapes.cubeSz = size;
    }
    // Update look at
    atX = eyeX + Math.cos(horizontalAngle);
    atZ = eyeZ + Math.sin(horizontalAngle);
    atY = eyeY + Math.sin(verticalAngle);

    viewMatrix.setLookAt(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ);
    gl.uniform3f(u_ViewPosition, eyeX, eyeY, eyeZ);

    projMatrix.setPerspective(fov, canvas.width / canvas.height, near, far);
    modelMatrix.setRotate(0, 0, 1, 0);
    modelViewMatrix = projMatrix.multiply(viewMatrix).multiply(modelMatrix);
    gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);
  }

  document.onkeydown = function (ev) {
    keyDown(ev);
  };
}
