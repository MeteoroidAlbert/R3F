import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from "three";

function AGV() {
  const {scene} = useGLTF("/modal/AGV/scene.gltf");
  scene.scale.set(0.01, 0.01, 0.01);
  scene.position.set(10, 0.5, 16);
  return <primitive object={scene}/>
}

function Shelf_1 () {
  const {scene} = useGLTF("/modal/shelf/shelf_1/scene.gltf");
  scene.scale.set(2.5, 2.5, 2.5);
  scene.position.set(8, 0.5, 3)
  return <primitive object={scene}/>;
}

function Box({ type }) {
  // const colorMap = useLoader(THREE.TextureLoader, "/image/textures/ground/Marble015_2K-JPG_Color.jpg");
  // const normalMap = useLoader(THREE.TextureLoader, "/image/textures/ground/Marble015_2K-JPG_NormalGL.jpg");
  // const roughnessMap = useLoader(THREE.TextureLoader, "/image/textures/ground/Marble015_2K-JPG_Roughness.jpg");

  const floorMap = useLoader(THREE.TextureLoader, "/image/textures/floor/Travertine009_4K-JPG_Color.jpg");
  const wallMap = useLoader(THREE.TextureLoader, "/image/textures/wall/Concrete017_4K-JPG_Color.jpg");
  let position;
  let args;
  if (type === "floor") {
    position = [10, 0, 10];
    args = [20, 1, 20];
  }
  if (type === "wall_xy") {
    position = [10, 6 , 0.5]
    args = [20, 11, 1];
  }
  if (type === "wall_yz") {
    position = [0.5, 6, 10]
    args = [1, 11, 20]
  }

  return (
    <mesh position={position} >
      <boxGeometry args={args} />
      <meshStandardMaterial 
        map={ type === "floor" ? floorMap : wallMap} // 主顏色
      />
    </mesh>
  );
}



export default function ThreeScene() {
  // 建築物地面、牆體
  const [s_buiding, set_s_building] = useState({
    ground: [],
    wall_xy: [],
    wall_yz: []
  });

  // 構建地面、牆體
  function build(type, size) {
    const positions = [];
    if (type === "ground") {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          positions.push([x, 0, y]);
        }
      }
    }
    else {
      for (let x = 0; x < size * 2; x++) {
        for (let y = 0; y < size; y++) {
          type === "wall_xy" && positions.push([x, y, 0]);
          type === "wall_yz" && positions.push([0, y, x]);
        }
      }
    }

    set_s_building(prevState => ({
      ...prevState,
      [type]: positions
    }))

  }

  useEffect(() => {
    // build("ground", 20);
    // build("wall_xy", 10);
    // build("wall_yz", 10);
  }, [])

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [10, 80, 40] }} className="w-full h-full">
        <ambientLight intensity={1.5} /> {/*環境光: 影響畫布明暗*/}
        <directionalLight position={[10, 40, 10]} /> {/*平行光: 如同太陽光，根據光源座標影響陰影方向*/}
        {/* {s_buiding.ground.map((position, i) =>
          <Box key={i} position={position} type="floor"/>
        )}
        {s_buiding.wall_xy.map((position, i) =>
          <Box key={i} position={position} type="wall"/>
        )}
        {s_buiding.wall_yz.map((position, i) =>
          <Box key={i} position={position} type="wall" />
        )} */}
        <Box type="floor"/>
        <Box type="wall_xy"/>
        <Box type="wall_yz"/>
        <AGV/>
        <Shelf_1/>
        <OrbitControls target={[2.5, 0, 2.5]} /> {/*控制相機在球軌道上的位置*/}
        <primitive object={new THREE.AxesHelper(50)} /> {/*primitive: 在React元件中直接使用Three.js實例*/}
      </Canvas>
    </div>


  );
}
