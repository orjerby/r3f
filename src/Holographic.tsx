import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, Color, DoubleSide, Mesh } from "three";
import { HolographicMaterial } from "./materials/HolographicMaterial";

export default function Holographic() {
  const suzanne = useGLTF("journey/suzanne.glb");
  const torusKnot = useRef<Mesh>(null);
  const sphere = useRef<Mesh>(null);

  const { color } = useControls({
    color: "#70c1ff",
  });

  const material = useMemo(
    () =>
      new HolographicMaterial({
        transparent: true,
        side: DoubleSide,
        depthWrite: false,
        blending: AdditiveBlending,
      }) as HolographicMaterial,
    []
  );

  useEffect(() => {
    material.uColor = new Color(color);
  }, [color, material]);

  useEffect(() => {
    suzanne.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).material = material;
      }
    });
  }, [suzanne.scene, material]);

  useFrame(({ clock }) => {
    if (material) {
      material.uTime = clock.elapsedTime;
    }

    suzanne.scene.rotation.x = -clock.elapsedTime * 0.1;
    suzanne.scene.rotation.y = clock.elapsedTime * 0.2;

    if (torusKnot.current) {
      torusKnot.current.rotation.x = -clock.elapsedTime * 0.1;
      torusKnot.current.rotation.y = clock.elapsedTime * 0.2;
    }

    if (sphere.current) {
      sphere.current.rotation.x = -clock.elapsedTime * 0.1;
      sphere.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  return (
    <>
      <mesh ref={torusKnot} material={material} position-x={3}>
        <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
      </mesh>

      <mesh ref={sphere} material={material} position-x={-3}>
        <sphereGeometry />
      </mesh>

      <primitive material={material} object={suzanne.scene} />
    </>
  );
}

useGLTF.preload("journey/suzanne.glb");
