import { useTexture } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import ChromaticAberrationMaterial, {
  ChromaticAberrationMaterialElement,
} from "../../materials/chromaticAberrationMaterial/ChromaticAberrationMaterial";

type ImageWithChromaticAberrationEffectProps = {
  image: string;
  maxWidth?: number;
  meshProps?: MeshProps;
};

export default function ImageWithChromaticAberrationEffect({
  image,
  maxWidth = 2,
  meshProps,
}: ImageWithChromaticAberrationEffectProps) {
  const texture = useTexture(image);
  const mesh = useRef<Mesh>(null);
  const chromaticAberrationMaterial =
    useRef<ChromaticAberrationMaterialElement>(null);

  useEffect(() => {
    if (chromaticAberrationMaterial.current) {
      const { width, height } = texture.image;

      const aspectRatio = width / height;
      const displayWidth = maxWidth;
      const displayHeight = maxWidth / aspectRatio;

      mesh.current?.scale.copy(new Vector3(displayWidth, displayHeight, 1));

      chromaticAberrationMaterial.current.uTexture = texture;
      chromaticAberrationMaterial.current.uAspectRatio =
        texture.image.width / texture.image.height;
    }
  }, [texture, maxWidth]);

  useFrame(({ clock }) => {
    if (chromaticAberrationMaterial.current) {
      chromaticAberrationMaterial.current.uniforms.uTime.value =
        clock.getElapsedTime();
    }
  });

  return (
    <>
      <mesh ref={mesh} {...meshProps}>
        <planeGeometry />
        <ChromaticAberrationMaterial ref={chromaticAberrationMaterial} />
      </mesh>
    </>
  );
}
