#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uPreviousMouse;
uniform sampler2D uTexture;

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
  // Chromatic aberration strength
  float aberration = 0.02 * sin(uTime * 2.0); 

  // Calculate offsets for each color channel
  vec2 redOffset = vUv + aberration * vec2(1.0, 0.0);
  vec2 greenOffset = vUv;
  vec2 blueOffset = vUv - aberration * vec2(1.0, 0.0);

  // Sample texture with each offset
  vec4 red = texture2D(uTexture, redOffset);
  vec4 green = texture2D(uTexture, greenOffset);
  vec4 blue = texture2D(uTexture, blueOffset);

  // Combine the channels
  vec4 color = vec4(red.r, green.g, blue.b, 1.0);

  gl_FragColor = color;
}