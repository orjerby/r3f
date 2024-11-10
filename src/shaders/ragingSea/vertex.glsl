uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;
uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;

varying float vElevation;

#include ../includes/cnoise

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevationX = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed);
  float elevationY = sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed);
  float elevation = elevationX * elevationY * uBigWavesElevation;

  for (float i = 1.0; i < uSmallWavesIterations; i++) {
    elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
  }

  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vElevation = elevation;
}