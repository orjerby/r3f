import { useGLTF, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { DoubleSide, PlaneGeometry, RepeatWrapping } from "three";
import { CoffeeSmokeMaterial } from "./materials/CoffeeSmokeMaterial";

extend({ CoffeeSmokeMaterial });

export default function CoffeeSmoke() {
  const model = useGLTF("journey/coffee.glb");
  const perlinTexture = useTexture("journey/perlin.png");
  perlinTexture.wrapS = RepeatWrapping;
  perlinTexture.wrapT = RepeatWrapping;
  const material = useRef<CoffeeSmokeMaterial>(null);
  const geometry = useRef<PlaneGeometry>(null);

  useEffect(() => {
    geometry.current?.translate(0, 0.5, 0);
    geometry.current?.scale(1.5, 6, 1.5);
  }, [geometry]);

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <>
      <primitive object={model.scene} />

      <mesh position-y={1.83}>
        <planeGeometry ref={geometry} args={[1, 1, 16, 64]} />
        <coffeeSmokeMaterial
          ref={material}
          depthWrite={false}
          side={DoubleSide}
          transparent
          uPerlinTexture={perlinTexture}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("journey/coffee.glb");
useTexture.preload("journey/perlin.png");
