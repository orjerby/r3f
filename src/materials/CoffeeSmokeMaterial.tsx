import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { ShaderMaterial, Texture } from "three";
import fragmentShader from "../shaders/coffeeSmoke/fragment.glsl";
import vertexShader from "../shaders/coffeeSmoke/vertex.glsl";

type Uniforms = {
  uTime: number;
  uPerlinTexture: Texture;
};

export type CoffeeSmokeMaterial = ShaderMaterial & Uniforms;

export const CoffeeSmokeMaterial = shaderMaterial(
  {
    uTime: 0,
    uPerlinTexture: null,
  },
  vertexShader,
  fragmentShader
);

type CoffeeSmokeMaterialProps = ReactThreeFiber.Object3DNode<
  CoffeeSmokeMaterial,
  typeof CoffeeSmokeMaterial
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    coffeeSmokeMaterial: CoffeeSmokeMaterialProps;
  }
}
