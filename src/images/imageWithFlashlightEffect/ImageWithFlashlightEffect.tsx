import { useTexture } from "@react-three/drei";
import { MeshProps, ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import FlashlightMaterial, {
  FlashlightMaterialElement,
} from "../../materials/flashlightMaterial/FlashlightMaterial";

type ImageWithFlashlightEffectProps = {
  image: string;
  maxWidth?: number;
  radius?: number;
  meshProps?: MeshProps;
};

export default function ImageWithFlashlightEffect({
  image,
  maxWidth = 2,
  radius = 0.25,
  meshProps,
}: ImageWithFlashlightEffectProps) {
  const texture = useTexture(image);
  const mesh = useRef<Mesh>(null);
  const flashlightMaterial = useRef<FlashlightMaterialElement>(null);

  useEffect(() => {
    if (flashlightMaterial.current) {
      const { width, height } = texture.image;

      const aspectRatio = width / height;
      const displayWidth = maxWidth;
      const displayHeight = maxWidth / aspectRatio;

      mesh.current?.scale.copy(new Vector3(displayWidth, displayHeight, 1));

      flashlightMaterial.current.uTexture = texture;
      flashlightMaterial.current.uRadius = radius;
      flashlightMaterial.current.uAspectRatio =
        texture.image.width / texture.image.height;
    }
  }, [texture, maxWidth, radius]);

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (event.uv && flashlightMaterial.current) {
      flashlightMaterial.current.uMouse = event.uv;
    }
  };

  return (
    <>
      <mesh ref={mesh} {...meshProps} onPointerMove={handlePointerMove}>
        <planeGeometry />
        <FlashlightMaterial ref={flashlightMaterial} />
      </mesh>
    </>
  );
}
