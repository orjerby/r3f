import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { forwardRef } from "react";
import { ShaderMaterial, Texture, Vector2 } from "three";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

type Uniforms = {
  uMouse: Vector2;
  uPreviousMouse: Vector2;
  uVerticalPixelCount: number;
  uTexture: Texture;
  uAspectRatio: number;
};

export type ShiftingMaterialElement = ShaderMaterial & Uniforms;

const ShiftingMaterialImpl = shaderMaterial(
  {
    uMouse: new Vector2(-0.5, -0.5),
    uPreviousMouse: new Vector2(-0.5, -0.5),
    uVerticalPixelCount: 20,
    uTexture: new Texture(),
    uAspectRatio: 1,
  },
  vertexShader,
  fragmentShader
);

type ShiftingMaterialProps = ReactThreeFiber.Object3DNode<
  ShiftingMaterialElement,
  typeof ShiftingMaterialImpl
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    shiftingMaterial: ShiftingMaterialProps;
  }
}

extend({ ShiftingMaterial: ShiftingMaterialImpl });

export default forwardRef<ShiftingMaterialElement, ShiftingMaterialProps>(
  function ShiftingMaterial(props, ref) {
    return <shiftingMaterial ref={ref} {...props} />;
  }
);
