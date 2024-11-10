import { useTexture } from "@react-three/drei";
import { MeshProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh, Vector2, Vector3 } from "three";
import ShiftingMaterial, {
  ShiftingMaterialElement,
} from "../../materials/shiftingMaterial/ShiftingMaterial";

type ImageWithShiftingEffectProps = {
  image: string;
  maxWidth?: number;
  verticalPixelCount?: number;
  meshProps?: MeshProps;
};

export default function ImageWithShiftingEffect({
  image,
  maxWidth = 2,
  verticalPixelCount = 20,
  meshProps,
}: ImageWithShiftingEffectProps) {
  const texture = useTexture(image);
  const mesh = useRef<Mesh>(null);
  const shiftingMaterial = useRef<ShiftingMaterialElement>(null);
  const mousePosition = new Vector2(0.5, 0.5);
  const prevPosition = new Vector2(0.5, 0.5);
  const targetMousePosition = new Vector2(0.5, 0.5);

  useEffect(() => {
    if (shiftingMaterial.current) {
      const { width, height } = texture.image;

      const aspectRatio = width / height;
      const displayWidth = maxWidth;
      const displayHeight = maxWidth / aspectRatio;

      mesh.current?.scale.copy(new Vector3(displayWidth, displayHeight, 1));

      shiftingMaterial.current.uVerticalPixelCount = verticalPixelCount;
      shiftingMaterial.current.uTexture = texture;
      shiftingMaterial.current.uAspectRatio =
        texture.image.width / texture.image.height;
    }
  }, [texture, maxWidth, verticalPixelCount]);

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    const uv = event.uv ?? new Vector2(0.5, 0.5);
    targetMousePosition.copy(uv);
    mousePosition.copy(uv);
    prevPosition.copy(targetMousePosition);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const uv = event.uv ?? new Vector2(0.5, 0.5);
    prevPosition.copy(targetMousePosition);
    targetMousePosition.copy(uv);
  };

  useFrame(() => {
    if (shiftingMaterial.current) {
      mousePosition.setX(
        mousePosition.x + (targetMousePosition.x - mousePosition.x) * 0.1
      );

      mousePosition.setY(
        mousePosition.y + (targetMousePosition.y - mousePosition.y) * 0.1
      );

      shiftingMaterial.current.uMouse.copy(mousePosition);
      shiftingMaterial.current.uPreviousMouse.copy(prevPosition);
    }
  });

  return (
    <>
      <mesh
        ref={mesh}
        {...meshProps}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry />
        <ShiftingMaterial ref={shiftingMaterial} />
      </mesh>
    </>
  );
}
