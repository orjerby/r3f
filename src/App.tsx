import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Vector3 } from "three";
import "./App.css";
import Experience from "./Experience";

function App() {
  return (
    <>
      <Leva />
      <Canvas
        camera={{
          fov: 25,
          near: 0.1,
          far: 100,
          position: new Vector3(7, 7, 7),
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
