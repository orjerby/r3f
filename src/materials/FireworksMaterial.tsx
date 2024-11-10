import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial, Texture, Vector2 } from "three";
import fragmentShader from "../shaders/fireworks/fragment.glsl";
import vertexShader from "../shaders/fireworks/vertex.glsl";

type Uniforms = {
  uSize: number;
  uResolution: Vector2;
  uTexture: Texture;
  uColor: Color;
  uProgress: number;
};

export type FireworksMaterial = ShaderMaterial & Uniforms;

export const FireworksMaterial = shaderMaterial(
  {
    uSize: 0.5,
    uResolution: new Vector2(),
    uTexture: null,
    uColor: new Color("#8affff"),
    uProgress: 0,
  },
  vertexShader,
  fragmentShader
);

type FireworksMaterialProps = ReactThreeFiber.Object3DNode<
  FireworksMaterial,
  typeof FireworksMaterial
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    fireworksMaterial: FireworksMaterialProps;
  }
}
