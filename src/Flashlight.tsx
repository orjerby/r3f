import { Clone, useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { Group, Object3DEventMap, Vector3 } from "three";

export default forwardRef<Group<Object3DEventMap>, any>(function Flashlight(
  props,
  ref
) {
  const model = useGLTF("models/flashlight/scene.gltf");
  console.log(model);

  return (
    <>
      <Clone
        ref={ref}
        object={model.scene}
        scale={0.5}
        position={new Vector3(0.62, 0, 3.2)}
        // rotation={new Euler(0, 1.75, 0)}
      ></Clone>
      {/* <primitive object={model.scene} /> */}
    </>
  );
});

useGLTF.preload("models/flashlight/scene.gltf");
