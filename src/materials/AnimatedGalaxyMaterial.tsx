import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import fragmentShader from "../shaders/animatedGalaxy/fragment.glsl";
import vertexShader from "../shaders/animatedGalaxy/vertex.glsl";

type Uniforms = {
  uTime: number;
  uSize: number;
};

export type AnimatedGalaxyMaterial = ShaderMaterial & Uniforms;

export const AnimatedGalaxyMaterial = shaderMaterial(
  {
    uTime: 0,
    uSize: 2,
  },
  vertexShader,
  fragmentShader
);

type AnimatedGalaxyMaterialProps = ReactThreeFiber.Object3DNode<
  AnimatedGalaxyMaterial,
  typeof AnimatedGalaxyMaterial
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    animatedGalaxyMaterial: AnimatedGalaxyMaterialProps;
  }
}
