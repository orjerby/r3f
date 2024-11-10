import { extend, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, DynamicDrawUsage, Points } from "three";
import { AnimatedGalaxyMaterial } from "./materials/AnimatedGalaxyMaterial";

extend({ AnimatedGalaxyMaterial });

export default function AnimatedGalaxy() {
  const points = useRef<Points>(null);
  const material = useRef<AnimatedGalaxyMaterial>(null);

  const parameters = useControls({
    count: { value: 200000, min: 100, max: 1000000, step: 100 },
    size: { value: 30, min: 1, max: 100 },
    radius: { value: 5, min: 0.01, max: 20, step: 0.01 },
    branches: { value: 3, min: 2, max: 20, step: 1 },
    randomness: { value: 0.5, min: 0, max: 2, step: 0.001 },
    randomnessPower: { value: 3, min: 1, max: 10, step: 0.001 },
    insideColor: "#ad6d59",
    outsideColor: "#4e639a",
  });

  // Generate positions and colors
  const { colors, positions, scales, randomness } = useMemo(() => {
    points.current?.geometry?.dispose();

    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const scales = new Float32Array(parameters.count);
    const randomness = new Float32Array(parameters.count * 3);

    const insideColor = new Color(parameters.insideColor);
    const outsideColor = new Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      // Position
      const radius = Math.random() * parameters.radius;

      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      positions[i3] = Math.cos(branchAngle) * radius;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = Math.sin(branchAngle) * radius;

      // Randomness
      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      randomness[i3] = randomX;
      randomness[i3 + 1] = randomY;
      randomness[i3 + 2] = randomZ;

      // Color
      const mixedColor = new Color(insideColor).lerp(
        new Color(outsideColor),
        radius / parameters.radius
      );

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Scale
      scales[i] = Math.random();
    }

    return { positions, colors, scales, randomness };
  }, [
    parameters.count,
    parameters.radius,
    parameters.branches,
    parameters.randomness,
    parameters.randomnessPower,
    parameters.insideColor,
    parameters.outsideColor,
  ]);

  const viewport = useThree(({ viewport }) => viewport);

  // useFrame(() => {
  // const attr = pointsRef.current?.geometry.attributes;
  // if (attr) {
  //   attr.position.needsUpdate = true;
  //   attr.color.needsUpdate = true;
  // }
  // });

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          usage={DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          usage={DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length / 1}
          array={scales}
          itemSize={1}
          usage={DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={randomness.length / 3}
          array={randomness}
          itemSize={3}
          usage={DynamicDrawUsage}
        />
      </bufferGeometry>
      <animatedGalaxyMaterial
        ref={material}
        depthWrite={false}
        blending={AdditiveBlending}
        vertexColors
        uSize={parameters.size * viewport.dpr}
      />
    </points>
  );
}
