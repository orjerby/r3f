import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { forwardRef } from "react";
import { ShaderMaterial, Vector2 } from "three";
import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

type Uniforms = {
  uTime: number;
  uMouse: Vector2;
};

export type TestMaterialElement = ShaderMaterial & Uniforms;

const TestMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uMouse: new Vector2(-0.5, -0.5),
  },
  vertexShader,
  fragmentShader
);

type TestMaterialProps = ReactThreeFiber.Object3DNode<
  TestMaterialElement,
  typeof TestMaterialImpl
>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    testMaterial: TestMaterialProps;
  }
}

extend({ TestMaterial: TestMaterialImpl });

export default forwardRef<TestMaterialElement, TestMaterialProps>(
  function TestMaterial(props, ref) {
    return <testMaterial ref={ref} {...props} />;
  }
);
