#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform float uTime;
uniform vec2 uMouse;
uniform float uRadius;
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

float circleShape(vec2 uv, float radius) {
  return step(radius, distance(uv, vec2(0.5)) * 2.0);
}

vec3 drawCircle(vec2 uv, float radius, vec3 color, bool outline) {
  float shape = circleShape(uv, radius);
  return outline ? color - shape : color * shape;
}

void main() {
  // Adjust UV coordinates to keep circle a circle
  vec2 uv = vec2(vUv.x * uAspectRatio, vUv.y);
  vec2 mouse = vec2(uMouse.x * uAspectRatio, uMouse.y);

  // Draw the circle with proper aspect ratio
  vec3 circle = drawCircle(uv - mouse + 0.5, uRadius, vec3(1.0), true);
  circle += 0.1;

  // Sample the texture
  vec4 textureColor = vec4(texture2D(uTexture, vUv));

  // Combine the circle effect with the texture
  gl_FragColor = vec4(textureColor.rgb * circle, textureColor.a);
}