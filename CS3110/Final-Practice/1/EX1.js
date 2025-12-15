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
  gl.uniform3f(u_LightPosition, 5.0, 10.0, 5.0);
  gl.uniform3f(u_AmbientLight, 0.3, 0.3, 0.3);
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
  const redCube = createCube(gl, [1.0, 0.0, 0.0]);
  const greenSphere = createSphere(gl, [0.0, 1.0, 0.0]);
  const blueCylinder = createCylinder(gl, [0.0, 0.0, 1.0]);
  const yellowPyramid = createPyramid(gl, [1.0, 1.0, 0.0]);
  const floor = createSheet(gl, [0.5, 0.5, 0.5]);

  function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Draw floor
    drawSheet(gl, floor, [0, -1, 0], [10, 1, 10], [90, 1, 0, 0], [0, 0, 1, 0]);

    // Draw cube
    drawCube(
      gl,
      redCube,
      [-3, 0, 0],
      [1, 1, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1]
    );

    // Draw sphere
    drawSphere(
      gl,
      greenSphere,
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1]
    );

    // Draw pyramid
    drawPyramid(
      gl,
      yellowPyramid,
      [3, 0, 0],
      [1.5, 1.5, 1.5],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1]
    );

    requestAnimationFrame(render);
  }

  render();

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

    console.log(eyeX, eyeY, eyeZ);
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
