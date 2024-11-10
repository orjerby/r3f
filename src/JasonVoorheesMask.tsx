import { Clone, useGLTF } from "@react-three/drei";

export default function JasonVoorheesMask() {
  const model = useGLTF("models/jason_voorhees_mask/scene.gltf");
  console.log(model);

  return (
    <>
      <Clone object={model.scene}></Clone>
      {/* <primitive object={model.scene} /> */}
    </>
  );
}

useGLTF.preload("models/jason_voorhees_mask/scene.gltf");
