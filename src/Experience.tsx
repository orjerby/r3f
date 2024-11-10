import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import { Vector3 } from "three";
import Fireworks from "./Fireworks";
import { TestMaterialElement } from "./materials/testMaterial/testMaterial";

export default function Experience() {
  const testMaterial = useRef<TestMaterialElement>(null);

  // const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
  //   if (testMaterial.current) {
  //     testMaterial.current.uMouse = event.uv ?? new Vector2(0.5, 0.5);
  //   }
  // };

  useFrame(({ clock }) => {
    if (testMaterial.current) {
      testMaterial.current.uTime = clock.getElapsedTime();
    }
  });

  // Define positions (could be dynamic or hardcoded)

  // useEffect(() => {
  //   console.log(432);
  //   if (texture) {
  //     const imageAspect = texture.image.width / texture.image.height;
  //     setAspect(imageAspect);
  //   }
  // }, [texture]);

  // const cube = useRef<Mesh>(null!);

  const { perfVisible } = useControls({
    perfVisible: true,
  });

  // const { position } = useControls({
  //   position: {
  //     value: { x: 0, y: 0 },
  //   },
  // });

  // const group = useRef<Group>(null);

  // useFrame(({ camera, clock }, delta) => {
  //   // const angle = clock.elapsedTime;
  //   // camera.position.x = Math.sin(angle) * 8;
  //   // camera.position.z = Math.cos(angle) * 8;
  //   // camera.lookAt(0, 0, 0);

  //   if (cube.current) {
  //     cube.current.rotation.y += delta;
  //   }
  // });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}

      <OrbitControls makeDefault target={new Vector3(0, 0, 0)} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={1.5} />
      {/* <SpotLight
        ref={spotLight}
        position={new Vector3(0.5, 0, 2.5)}
        angle={0.45}
        distance={5}
        attenuation={5}
        color={"white"}
      /> */}

      <color args={["black"]} attach="background" />

      {/* <EffectComposer> */}
      {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        /> */}

      {/* <Glitch /> */}

      {/* <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} /> */}

      {/* <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} /> */}

      {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}

      {/* <Drunk ref={drunk} /> */}
      {/* </EffectComposer> */}

      {/* <group ref={group}> */}
      {/* <mesh position={[position.x, position.y, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh> */}

      {/* <mesh position-z={-0.29} position-y={0.05} scale-y={1.5}>
        <sphereGeometry />
        <meshBasicMaterial color={[5, 2, 1]} />
      </mesh> */}
      {/* <TransformControls object={cube} /> */}
      {/* </group> */}

      {/* <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh> */}

      {/* <CustomObject /> */}

      {/* <Html>
        <p>fdsfds</p>
      </Html> */}

      {/* <SpecialImage /> */}
      {/* <Suspense> */}
      {/* <JasonVoorheesMask /> */}
      {/* <MosquitoInAmber scale={0.02} /> */}
      {/* <Flashlight ref={flashlight} /> */}
      {/* </Suspense> */}

      {/* <Html>
        <h1>I'm Or Jerby</h1>
      </Html> */}

      {/* <Suspense fallback={<Loader />}> */}
      {/* <ImageWithChromaticAberrationEffect
          image="hero.jpg"
          meshProps={{ position: new Vector3(-2, 0, 0) }}
        />
        <ImageWithFlashlightEffect
          image="hero.jpg"
          meshProps={{ position: new Vector3(0, 0, 0) }}
        />
        <ImageWithShiftingEffect
          image="hero.jpg"
          meshProps={{ position: new Vector3(2, 0, 0) }}
        /> */}
      {/* <ImageWithTestEffect image="hero.jpg" /> */}
      {/* <SpecialImage6 /> */}
      {/* </Suspense> */}

      {/* <mesh onPointerMove={handlePointerMove}>
        <planeGeometry args={[3, 3]} />
        <TestMaterial ref={testMaterial} />
      </mesh> */}

      {/* <RagingSea /> */}

      {/* <AnimatedGalaxy /> */}

      {/* <CoffeeSmoke /> */}

      {/* <Holographic /> */}

      <Fireworks />
    </>
  );
}

// const Loader = () => {
//   return <>Loading...</>;
// };
