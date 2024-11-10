import { extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Euler, Vector2 } from "three";
import { RagingSeaMaterial } from "./materials/RagingSeaMaterial";

extend({ RagingSeaMaterial });

export default function RagingSea() {
  const material = useRef<RagingSeaMaterial>(null);

  const {
    bigWavesElevation,
    bigWavesFrequencyX,
    bigWavesFrequencyY,
    bigWavesSpeed,
    smallWavesElevation,
    smallWavesFrequency,
    smallWavesSpeed,
    smallWavesIterations,
    depthColor,
    surfaceColor,
    colorOffset,
    colorMultiplier,
  } = useControls({
    bigWavesElevation: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.001,
    },
    bigWavesFrequencyX: {
      value: 4,
      min: 0,
      max: 10,
      step: 0.001,
    },
    bigWavesFrequencyY: {
      value: 1.5,
      min: 0,
      max: 10,
      step: 0.001,
    },
    bigWavesSpeed: {
      value: 0.75,
      min: 0,
      max: 1,
      step: 0.001,
    },
    smallWavesElevation: {
      value: 0.15,
      min: 0,
      max: 1,
      step: 0.001,
    },
    smallWavesFrequency: {
      value: 3,
      min: 0,
      max: 30,
      step: 0.001,
    },
    smallWavesSpeed: {
      value: 0.2,
      min: 0,
      max: 4,
      step: 0.001,
    },
    smallWavesIterations: {
      value: 4,
      min: 0,
      max: 5,
      step: 1,
    },
    depthColor: "#186691",
    surfaceColor: "#9bd8ff",
    colorOffset: {
      value: 0.08,
      min: 0,
      max: 1,
      step: 0.001,
    },
    colorMultiplier: {
      value: 5,
      min: 0,
      max: 10,
      step: 0.001,
    },
  });

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={new Euler(Math.PI * -0.5)}>
      <planeGeometry args={[2, 2, 256, 256]} />
      <ragingSeaMaterial
        ref={material}
        uBigWavesElevation={bigWavesElevation}
        uBigWavesFrequency={new Vector2(bigWavesFrequencyX, bigWavesFrequencyY)}
        uBigWavesSpeed={bigWavesSpeed}
        uSmallWavesElevation={smallWavesElevation}
        uSmallWavesFrequency={smallWavesFrequency}
        uSmallWavesSpeed={smallWavesSpeed}
        uSmallWavesIterations={smallWavesIterations}
        uDepthColor={depthColor}
        uSurfaceColor={surfaceColor}
        uColorOffset={colorOffset}
        uColorMultiplier={colorMultiplier}
      />
    </mesh>
  );
}
