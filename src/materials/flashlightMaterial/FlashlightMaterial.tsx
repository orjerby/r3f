import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { forwardRef } from "react";
import { ShaderMaterial, Texture, Vector2 } from "three";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

type Uniforms = {
  uMouse: Vector2;
  uRadius: number;
  uTexture: Texture;
  uAspectRatio: number;
};

export type FlashlightMaterialElement = ShaderMaterial & Uniforms;

const FlashlightMaterialImpl = shaderMaterial(
  {
    uMouse: new Vector2(-0.5, -0.5),
    uRadius: 0.25,
    uTexture: new Texture(),
    uAspectRatio: 1,
  },
  vertexShader,
  fragmentShader
);

type FlashlightMaterialProps = ReactThreeFiber.Object3DNode<
  FlashlightMaterialElement,
  typeof FlashlightMaterialImpl
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    flashlightMaterial: FlashlightMaterialProps;
  }
}

extend({ FlashlightMaterial: FlashlightMaterialImpl });

export default forwardRef<FlashlightMaterialElement, FlashlightMaterialProps>(
  function FlashlightMaterial(props, ref) {
    return <flashlightMaterial ref={ref} {...props} />;
  }
);
