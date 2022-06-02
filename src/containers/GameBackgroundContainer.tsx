import { Cloud, Environment, Sky } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
//@ts-ignore
import { patchShaders } from "gl-noise/build/glNoise.m";

import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, PointsMaterial, Vector3 } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { IContainerProps } from "../interfaces";

function ShaderTest() {
  const materialRef = useRef(null);
  const positions = useMemo(
    () => new Float32Array(Array.from({ length: 1000 }, () => Math.random())),
    [length]
  );
  useFrame(
    ({ clock }) =>
      (materialRef.current.uniforms.u_time.value = clock.elapsedTime)
  );

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach='position'
          // attachObject={["attributes", "position"]}
          count={positions.length}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={PointsMaterial}
        color={new Color("orange")}
        size={1.05}
        opacity={0.5}
        uniforms={{ u_time: { value: 0 } }}
        vertexShader={patchShaders(`
        uniform float u_time; 
        void main() {
          vec3 n = gln_curl(position + u_time * 0.005);
          csm_Position = n * 2.0;
        }
        `)}
        blending={AdditiveBlending}
      />
    </points>
  );
}

export default function (props: IContainerProps) {
  const cameraProps = {
    position: new Vector3(0, 0, 1),
    near: 0.1,
    far: 100,
    fov: 80,
    aspect: props.width / props.height,
  };
  const styles = {
    paddingTop: 2 * props.displayOptions.fontSize + "px",
    paddingLeft: 2 * props.displayOptions.fontSize + "px",
  };
  console.log(styles)
  return (
    <div className='Game_Background_Container' style={styles}>
      <Canvas camera={{ ...cameraProps }} >
        <Environment preset='apartment' />
        <Sky />
        <ShaderTest />
        <Clouds />
      </Canvas>
    </div>
  );
}

function Clouds() {
  return (
    <group>
      <Cloud
        depthTest={false}
        position={[-10, -6, -10]}
        speed={0.2}
        opacity={0.4}
      />
      <Cloud
        depthTest={false}
        position={[10, 6, -15]}
        speed={0.2}
        opacity={0.25}
      />
      <Cloud
        depthTest={false}
        position={[0, 10, 0]}
        speed={0.2}
        opacity={0.2}
      />
      <Cloud
        depthTest={false}
        position={[0, -10, 0]}
        speed={0.2}
        opacity={0.2}
      />
      <Cloud
        depthTest={false}
        position={[-10, -6, 15]}
        speed={0.2}
        opacity={0.3}
      />
      <Cloud
        depthTest={false}
        position={[10, 6, 10]}
        speed={0.2}
        opacity={0.25}
      />
    </group>
  );
}
