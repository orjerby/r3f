varying mat4 vModelMatrix;
varying mat4 vModelViewMatrix;
varying mat4 vProjectionMatrix;
varying mat4 vViewMatrix;
varying mat3 vNormalMatrix;
varying vec3 vCameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

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