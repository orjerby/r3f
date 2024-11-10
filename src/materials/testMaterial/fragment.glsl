// defines
#define PI 3.14159265359
#define TWO_PI 6.28318530718

// uniforms
uniform float uTime;
uniform vec2 uMouse;

// varrings
varying mat4 vModelMatrix;
varying mat4 vModelViewMatrix;
varying mat4 vProjectionMatrix;
varying mat4 vViewMatrix;
varying mat3 vNormalMatrix;
varying vec3 vCameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

float plot(vec2 uv, float pct) {
  return smoothstep(pct - 0.01, pct, uv.y) -
    smoothstep(pct, pct + 0.01, uv.y);
}

float rectangleShape(vec2 uv, float l, float r, float t, float b) {
  float left = step(l, uv.x);
  float right = step(r, 1.0 - uv.x);
  float top = step(t, 1.0 - uv.y);
  float bottom = step(b, uv.y);
  return float(left * bottom * right * top);

  // vec2 bl = floor(uv * 10.0); // bottom-left
  // vec2 tr = floor((1.0 - uv) * 10.0); // top-right
  // return float(bl.x * bl.y * tr.x * tr.y);
}

vec3 rectangle(vec2 uv, float l, float r, float t, float b, vec3 color, bool outline) {
  float shape = rectangleShape(uv, l, r, t, b);

  if (outline) {
    color -= shape;
  } else {
    color *= shape;
  }

  return color;
}

float circleShape(vec2 uv, float radius) {
  return step(radius, distance(uv, vec2(0.5)) * 2.0);
}

vec3 circle(vec2 uv, float radius, vec3 color, bool outline) {
  float shape = circleShape(uv, radius);

  if (outline) {
    color -= shape;
  } else {
    color *= shape;
  }

  return color;
}

// void main() {
//   // gl_FragColor = vec4(abs(sin(uTime)), 1.0, 0.0, 1.0);

//   // float y = smoothstep(0.0, 1.0, vUv.x);

//   // vec3 color = vec3(y);

//   // float pct = plot(vUv, y);
//   // color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0);

//   // vec3 color = rectangle(vUv, 0.1, 0.1, 0.1, 0.1, vec3(0.529, 0.973, 0.988), true);
//   vec3 color = circle(vUv, 0.5, vec3(1.0, 0.0, 0.0), true);

//   gl_FragColor = vec4(color, 1.0);
// }

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
  return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec2 fade(vec2 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec4 permute(vec4 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 *
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main() {
  // // Pattern 3
  // float strength = vUv.x;

  // // Pattern 4
  // float strength = vUv.y;

  // // Pattern 5
  // float strength = 1.0 - vUv.y;

  // // Pattern 6
  // float strength = vUv.y * 10.0;

  // // Pattern 7
  // float strength = mod(vUv.y * 10.0, 1.0);

  // // Pattern 8
  // float strength = mod(vUv.y * 10.0, 1.0);
  // strength = step(0.5, strength);

  // // Pattern 9
  // float strength = mod(vUv.y * 10.0, 1.0);
  // strength = step(0.8, strength);

  // // Pattern 10
  // float strength = mod(vUv.x * 10.0, 1.0);
  // strength = step(0.8, strength);

  // // Pattern 11
  // float strengthX = step(0.8, mod(vUv.x * 10.0, 1.0));
  // float strengthY = step(0.8, mod(vUv.y * 10.0, 1.0));
  // float strength = strengthX + strengthY;

  // // Pattern 12
  // float strengthX = step(0.8, mod(vUv.x * 10.0, 1.0));
  // float strengthY = step(0.8, mod(vUv.y * 10.0, 1.0));
  // float strength = strengthX * strengthY;

  // // Pattern 13
  // float strengthX = step(0.4, mod(vUv.x * 10.0, 1.0));
  // float strengthY = step(0.8, mod(vUv.y * 10.0, 1.0));
  // float strength = strengthX * strengthY;

  // // Pattern 14
  // float strengthX = step(0.4, mod(vUv.x * 10.0, 1.0));
  // strengthX *= step(0.8, mod(vUv.y * 10.0, 1.0));

  // float strengthY = step(0.8, mod(vUv.x * 10.0, 1.0));
  // strengthY *= step(0.4, mod(vUv.y * 10.0, 1.0));

  // float strength = strengthX + strengthY;

  // // Pattern 15
  // float strengthX = step(0.4, mod(vUv.x * 10.0, 1.0));
  // strengthX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

  // float strengthY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
  // strengthY *= step(0.4, mod(vUv.y * 10.0, 1.0));

  // float strength = strengthX + strengthY;

  // // Pattern 16
  // float strength = abs(vUv.x - 0.5);

  // // Pattern 17
  // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // // Pattern 18
  // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // // Pattern 19
  // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  // // Pattern 20
  // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  // float strength = square1 * square2;

  // // Pattern 21
  // float strength = floor(vUv.x * 10.0) / 10.0;

  // // Pattern 22
  // float strengthX = floor(vUv.x * 10.0) / 10.0;
  // float strengthY = floor(vUv.y * 10.0) / 10.0;
  // float strength = strengthX * strengthY;

  // // Pattern 23
  // float strength = random(vUv);

  // // Pattern 24
  // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
  // float strength = random(gridUv);

  // // Pattern 25
  // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0 + vUv.x * 5.0) / 10.0);
  // float strength = random(gridUv);

  // // Pattern 26
  // float strength = length(vUv);

  // // Pattern 27
  // float strength = distance(vUv, vec2(0.5));

  // // Pattern 28
  // float strength = 1.0 - distance(vUv, vec2(0.5));

  // // Pattern 29
  // float strength = 0.015 / distance(vUv, vec2(0.5));

  // // Pattern 30
  // float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));

  // // Pattern 31
  // float strengthX = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
  // float strengthY = 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
  // float strength = strengthX * strengthY;

  // // Pattern 32
  // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
  // float strengthX = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
  // float strengthY = 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
  // float strength = strengthX * strengthY;

  // // Pattern 33
  // float strength = step(0.25, distance(vUv, vec2(0.5)));

  // // Pattern 34
  // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);

  // // Pattern 35
  // float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

  // // Pattern 36
  // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

  // // Pattern 37
  // vec2 wavedUv = vec2(vUv.x, vUv.y + sin(vUv.x * 30.0) * 0.1);
  // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

  // // Pattern 38
  // vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 30.0) * 0.1, vUv.y + sin(vUv.x * 30.0) * 0.1);
  // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

  // // Pattern 39
  // vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 100.0) * 0.1, vUv.y + sin(vUv.x * 100.0) * 0.1);
  // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

  // // Pattern 40
  // float strength = atan(vUv.x, vUv.y);

  // // Pattern 41
  // float strength = atan(vUv.x - 0.5, vUv.y - 0.5);

  // // Pattern 42
  // float strength = atan(vUv.x - 0.5, vUv.y - 0.5) / TWO_PI + 0.5;

  // // Pattern 43
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / TWO_PI + 0.5;
  // float strength = mod(angle * 20.0, 1.0);

  // // Pattern 44
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / TWO_PI + 0.5;
  // float strength = sin(angle * 100.0);

  // // Pattern 45
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / TWO_PI + 0.5;
  // float sinusoid = sin(angle * 100.0);
  // float radius = 0.25 + sinusoid * 0.02;
  // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

  // // Pattern 46
  // float strength = cnoise(vUv * 10.0);

  // // Pattern 47
  // float strength = step(0.01, cnoise(vUv * 10.0));

  // // Pattern 48
  // float strength = 1.0 - abs(cnoise(vUv * 10.0));

  // // Pattern 49
  // float strength = sin(cnoise(vUv * 10.0) * 20.0);

  // // Pattern 50
  float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));

  // Clamp the strength
  strength = clamp(strength, 0.0, 1.0);

  // // Colored version
  vec3 blackColor = vec3(0.0);
  vec3 uvColor = vec3(vUv, 1.0);
  vec3 mixedColor = mix(blackColor, uvColor, strength);
  gl_FragColor = vec4(mixedColor, 1.0);

  // Black and white version
  // gl_FragColor = vec4(vec3(strength), 1.0);
}
