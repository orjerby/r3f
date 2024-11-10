uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

#include ../includes/rotate2D

void main() {
  vec3 newPosition = position;

  // Twist
  float twistPerlin = texture2D(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.005)).r;
  float angle = twistPerlin * 10.0;
  newPosition.xz = rotate2D(newPosition.xz, angle);

  // Wind
  float windOffsetX = texture2D(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.25;
  float windOffsetZ = texture2D(uPerlinTexture, vec2(0.75, uTime * 0.01)).r - 0.25;
  vec2 windOffset = vec2(windOffsetX, windOffsetZ);
  windOffset *= pow(uv.y, 2.0) * 10.0;
  newPosition.xz += windOffset;

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vUv = uv;
}