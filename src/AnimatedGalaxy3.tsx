import { Point, Points } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, Vector3 } from "three";

export default function AnimatedGalaxy3() {
  const pointsRef = useRef<any>(null);
  const size = 0.005;

  const parameters = useControls({
    count: { value: 500, min: 100, max: 1000000, step: 100 },
    radius: { value: 5, min: 0.01, max: 20, step: 0.01 },
    branches: { value: 3, min: 2, max: 20, step: 1 },
    randomness: { value: 0.5, min: 0, max: 2, step: 0.001 },
    randomnessPower: { value: 3, min: 1, max: 10, step: 0.001 },
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  });

  const points = useMemo(() => {
    return Array.from({ length: parameters.count }).map((_, i) => {
      const pRadius = Math.random() * parameters.radius;
      const bAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
      const rndX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        parameters.radius;
      const rndY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        parameters.radius;
      const rndZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        parameters.radius;
      const position = new Vector3(
        Math.cos(bAngle) * pRadius + rndX,
        rndY,
        Math.sin(bAngle) * pRadius + rndZ
      );
      const color = new Color(parameters.insideColor).lerp(
        new Color(parameters.outsideColor),
        pRadius / parameters.radius
      );

      const scale = Math.random();

      return <Point key={i} position={position} color={color} size={scale} />;
    });
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
    <Points ref={pointsRef}>
      <pointsMaterial
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
        vertexColors
      />
      {points}
    </Points>
  );
}
