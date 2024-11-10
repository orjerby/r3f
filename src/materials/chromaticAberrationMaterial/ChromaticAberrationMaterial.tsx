import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { forwardRef } from "react";
import { ShaderMaterial, Texture } from "three";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

type Uniforms = {
  uTime: number;
  uTexture: Texture;
  uAspectRatio: number;
};

export type ChromaticAberrationMaterialElement = ShaderMaterial & Uniforms;

const ChromaticAberrationMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uTexture: new Texture(),
    uAspectRatio: 1,
  },
  vertexShader,
  fragmentShader
);

type ChromaticAberrationMaterialProps = ReactThreeFiber.Object3DNode<
  ChromaticAberrationMaterialElement,
  typeof ChromaticAberrationMaterialImpl
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    chromaticAberrationMaterial: ChromaticAberrationMaterialProps;
  }
}

extend({ ChromaticAberrationMaterial: ChromaticAberrationMaterialImpl });

export default forwardRef<
  ChromaticAberrationMaterialElement,
  ChromaticAberrationMaterialProps
>(function ChromaticAberrationMaterial(props, ref) {
  return <chromaticAberrationMaterial ref={ref} {...props} />;
});
