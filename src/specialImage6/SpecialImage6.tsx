import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ShaderMaterial, Vector2 } from "three";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

export default function SpecialImage6() {
  const material = useRef<ShaderMaterial>(null!);

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    material.current.uniforms.uMouse.value = event.uv;
  };

  useFrame(({ clock }) => {
    material.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <>
      <mesh onPointerMove={handlePointerMove}>
        <planeGeometry args={[3, 3]} />
        <shaderMaterial
          ref={material}
          uniforms={{
            uTime: { value: 1.0 },
            uMouse: { value: new Vector2() },
          }}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
      </mesh>
    </>
  );
}
