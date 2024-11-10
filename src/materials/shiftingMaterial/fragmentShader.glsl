#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uPreviousMouse;
uniform float uVerticalPixelCount;
uniform sampler2D uTexture;
uniform float uAspectRatio;

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
  // Adjust UV coordinates and mouse for aspect ratio
  vec2 uvAdjusted = vec2(vUv.x * uAspectRatio, vUv.y);
  vec2 mouseAdjusted = vec2(uMouse.x * uAspectRatio, uMouse.y);
  vec2 previousMouseAdjusted = vec2(uPreviousMouse.x * uAspectRatio, uPreviousMouse.y);

  // Define grid size and calculate pixel size in one step
  vec2 gridSize = vec2(uVerticalPixelCount);
  vec2 gridUV = floor(uvAdjusted * gridSize) / gridSize;

  // Calculate pixel center in the grid
  vec2 pixelSize = 1.0 / gridSize;
  vec2 centerOfPixel = gridUV + pixelSize * 0.5;

  // Compute direction from previous mouse position and current mouse
  vec2 mouseDirection = mouseAdjusted - previousMouseAdjusted;
  vec2 pixelDirectionToMouse = centerOfPixel - mouseAdjusted;

  // Calculate distance and distortion strength using smoothstep
  float pixelDistanceToMouse = length(pixelDirectionToMouse);
  float distortionStrength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

  // Apply UV offset based on distortion strength and mouse direction
  vec2 uv = vUv + distortionStrength * mouseDirection;

  // Output the texture color using adjusted UV coordinates
  gl_FragColor = texture2D(uTexture, uv);
}