import { useTexture } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useState } from "react";
import {
  AdditiveBlending,
  Color,
  DynamicDrawUsage,
  Spherical,
  Texture,
  Vector2,
  Vector3,
} from "three";
import { FireworksMaterial } from "./materials/FireworksMaterial";

extend({ FireworksMaterial });

type Firework = {
  id: number;
  attributePositions: Float32Array;
  attributeSize: Float32Array;
  attributeTimeMultipliers: Float32Array;
  position: Vector3;
  size: number;
  color: Color;
  texture: Texture;
  materialRef: FireworksMaterial | null;
};

export default function Fireworks() {
  const textures = useTexture([
    "journey/particles/1.png",
    "journey/particles/2.png",
    "journey/particles/3.png",
    "journey/particles/4.png",
    "journey/particles/5.png",
    "journey/particles/6.png",
    "journey/particles/7.png",
    "journey/particles/8.png",
  ]);

  const {
    size: { width, height },
    gl: { getPixelRatio, domElement },
  } = useThree();

  const [fireworks, setFireworks] = useState<Firework[]>([]);

  const createFirework = (
    count: number,
    position: Vector3,
    size: number,
    texture: Texture,
    radius: number,
    color: Color
  ) => {
    const positionsArray = new Float32Array(count * 3);
    const sizesArray = new Float32Array(count);
    const timeMultipliersArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const spherical = new Spherical(
        radius * (0.75 + Math.random() * 0.25),
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2
      );
      const pos = new Vector3().setFromSpherical(spherical);

      positionsArray[i3] = pos.x;
      positionsArray[i3 + 1] = pos.y;
      positionsArray[i3 + 2] = pos.z;

      sizesArray[i] = Math.random();

      timeMultipliersArray[i] = 1 + Math.random();
    }

    const firework = {
      id: Math.random(),
      attributePositions: positionsArray,
      attributeSize: sizesArray,
      attributeTimeMultipliers: timeMultipliersArray,
      position,
      size,
      color,
      texture,
      materialRef: null,
    };

    setFireworks((prev) => [...prev, firework]);
  };

  const createRandomFirework = () => {
    const count = Math.round(400 + Math.random() * 1000);
    const position = new Vector3(
      (Math.random() - 0.5) * 2,
      Math.random(),
      (Math.random() - 0.5) * 2
    );
    const size = 0.1 + Math.random() * 0.1;
    const texture = textures[Math.floor(Math.random() * textures.length)];
    const radius = 0.5 + Math.random();
    const color = new Color();
    color.setHSL(Math.random(), 1, 0.7);

    createFirework(count, position, size, texture, radius, color);
  };

  const startFireworkAnimation = (firework: Firework) => {
    if (firework.materialRef) {
      gsap.to(firework.materialRef, {
        uProgress: 1,
        duration: 3,
        ease: "linear",
        onComplete: () => {
          setFireworks((prev) => prev.filter((f) => f.id !== firework.id));
        },
      });
    }
  };

  useEffect(() => {
    createRandomFirework();

    domElement.addEventListener("click", createRandomFirework);
    return () => domElement.removeEventListener("click", createRandomFirework);
  }, [domElement]);

  return (
    <>
      {/* <Sky
        turbidity={10}
        rayleigh={3}
        mieCoefficient={0.005}
        mieDirectionalG={0.95}
        inclination={10}
        azimuth={180}
        sunPosition={
          new Vector3(1, MathUtils.degToRad(90 - 10), MathUtils.degToRad(180))
        }
      /> */}
      {fireworks.map((firework) => (
        <points key={firework.id} position={firework.position}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={firework.attributePositions.length / 3}
              array={firework.attributePositions}
              itemSize={3}
              usage={DynamicDrawUsage}
            />
            <bufferAttribute
              attach="attributes-size"
              count={firework.attributeSize.length / 1}
              array={firework.attributeSize}
              itemSize={1}
              usage={DynamicDrawUsage}
            />
            <bufferAttribute
              attach="attributes-aTimeMultiplier"
              count={firework.attributeTimeMultipliers.length / 1}
              array={firework.attributeTimeMultipliers}
              itemSize={1}
              usage={DynamicDrawUsage}
            />
          </bufferGeometry>
          <fireworksMaterial
            ref={(ref) => {
              if (ref && !firework.materialRef) {
                firework.materialRef = ref;
                startFireworkAnimation(firework); // Trigger animation once ref is set
              }
            }}
            uResolution={
              new Vector2(width * getPixelRatio(), height * getPixelRatio())
            }
            uSize={firework.size}
            uTexture={firework.texture}
            uColor={firework.color}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>
      ))}
    </>
  );
}
