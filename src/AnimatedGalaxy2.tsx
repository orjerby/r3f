import { Points } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color } from "three";
import { AnimatedGalaxyMaterial } from "./materials/AnimatedGalaxyMaterial";

extend({ AnimatedGalaxyMaterial });

export default function AnimatedGalaxy() {
  const pointsRef = useRef<any>(null);

  const parameters = useControls({
    count: { value: 200000, min: 100, max: 1000000, step: 100 },
    radius: { value: 5, min: 0.01, max: 20, step: 0.01 },
    branches: { value: 3, min: 2, max: 20, step: 1 },
    randomness: { value: 0.5, min: 0, max: 2, step: 0.001 },
    randomnessPower: { value: 3, min: 1, max: 10, step: 0.001 },
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  });

  // Generate positions and colors
  const { colors, positions, scales } = useMemo(() => {
    pointsRef.current?.geometry?.dispose();

    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const scales = new Float32Array(parameters.count);

    const insideColor = new Color(parameters.insideColor);
    const outsideColor = new Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      // Position
      const radius = Math.random() * parameters.radius;

      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

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

      positions[i3] = Math.cos(branchAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ;

      // Color
      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Scale
      scales[i] = Math.random();
    }

    return { positions, colors, scales };
  }, [
    parameters.count,
    parameters.radius,
    parameters.branches,
    parameters.randomness,
    parameters.randomnessPower,
    parameters.insideColor,
    parameters.outsideColor,
  ]);

  return (
    <Points
      ref={pointsRef}
      colors={colors}
      positions={positions}
      sizes={scales}
    >
      <animatedGalaxyMaterial
        depthWrite={false}
        blending={AdditiveBlending}
        vertexColors
      />
    </Points>
  );
}
