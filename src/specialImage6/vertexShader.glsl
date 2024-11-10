// uniforms

// attributes

// varrings
varying vec3 vPosition; // position of each vertex
varying mat4 vModelMatrix; // apply transformations relative to the mesh
varying mat4 vViewMatrix; // apply transformations relative to the camera
varying mat4 vModelViewMatrix; // modelMatrix and viewMatrix combined
varying mat4 vProjectionMatrix; // transform the coordinates into the clip space coordinates
varying mat3 vNormalMatrix;
varying vec3 vCameraPosition;
varying vec3 vNormal;
varying vec2 vUv; // x, y coordinates of vertex, between 0 and 1

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vModelMatrix = modelMatrix;
  vModelViewMatrix = modelViewMatrix;
  vProjectionMatrix = projectionMatrix;
  vViewMatrix = viewMatrix;
  vNormalMatrix = normalMatrix;
  vCameraPosition = cameraPosition;
  vPosition = position;
  vNormal = normal;
  vUv = uv;
}