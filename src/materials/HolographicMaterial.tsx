import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";
import fragmentShader from "../shaders/Holographic/fragment.glsl";
import vertexShader from "../shaders/Holographic/vertex.glsl";

type Uniforms = {
  uTime: number;
  uColor: Color;
};

export type HolographicMaterial = ShaderMaterial & Uniforms;

export const HolographicMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color("#70c1ff"),
  },
  vertexShader,
  fragmentShader
);

type HolographicMaterialProps = ReactThreeFiber.Object3DNode<
  HolographicMaterial,
  typeof HolographicMaterial
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    holographicMaterial: HolographicMaterialProps;
  }
}
