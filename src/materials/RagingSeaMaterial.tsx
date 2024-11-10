import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial, Vector2 } from "three";
import fragmentShader from "../shaders/ragingSea/fragment.glsl";
import vertexShader from "../shaders/ragingSea/vertex.glsl";

type Uniforms = {
  uTime: number;
  uBigWavesElevation: number;
  uBigWavesFrequency: Vector2;
  uBigWavesSpeed: number;
  uSmallWavesElevation: number;
  uSmallWavesFrequency: number;
  uSmallWavesSpeed: number;
  uSmallWavesIterations: number;
  uDepthColor: Color;
  uSurfaceColor: Color;
  uColorOffset: number;
  uColorMultiplier: number;
};

export type RagingSeaMaterial = ShaderMaterial & Uniforms;

export const RagingSeaMaterial = shaderMaterial(
  {
    uTime: 0,
    uBigWavesElevation: 0.2,
    uBigWavesFrequency: new Vector2(4, 1.5),
    uBigWavesSpeed: 0.75,
    uSmallWavesElevation: 0.15,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.2,
    uSmallWavesIterations: 4,
    uDepthColor: new Color("#186691"),
    uSurfaceColor: new Color("#9bd8ff"),
    uColorOffset: 0.08,
    uColorMultiplier: 5,
  },
  vertexShader,
  fragmentShader
);

type RagingSeaMaterialProps = ReactThreeFiber.Object3DNode<
  RagingSeaMaterial,
  typeof RagingSeaMaterial
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    ragingSeaMaterial: RagingSeaMaterialProps;
  }
}
