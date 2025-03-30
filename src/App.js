import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import * as THREE from "three";

function Box({ position }) {
  const colorMap = useLoader(THREE.TextureLoader, "/image/textures/ground/Marble015_2K-JPG_Color.jpg");
  const normalMap = useLoader(THREE.TextureLoader, "/image/textures/ground/Marble015_2K-JPG_NormalGL.jpg");
  const roughnessMap = useLoader(THREE.TextureLoader, "/image/textures/ground/Marble015_2K-JPG_Roughness.jpg");

  

  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        map={colorMap} // 主顏色
        normalMap={normalMap} // 法線貼圖
        roughnessMap={roughnessMap} // 粗糙度貼圖
        roughness={0.5} // 粗糙度的全局設置
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
    build("ground", 20);
    build("wall_xy", 10);
    build("wall_yz", 10);
  }, [])

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [10, 20, 40] }} className="w-full h-full">
        <ambientLight intensity={1.5} /> {/*環境光: 影響畫布明暗*/}
        <directionalLight position={[10, 40, 10]} /> {/*平行光: 如同太陽光，根據光源座標影響陰影方向*/}
        {s_buiding.ground.map((position, i) =>
          <Box key={i} position={position} />
        )}
        {s_buiding.wall_xy.map((position, i) =>
          <Box key={i} position={position} />
        )}
        {s_buiding.wall_yz.map((position, i) =>
          <Box key={i} position={position} />
        )}
        <OrbitControls target={[2.5, 0, 2.5]} /> {/*控制相機在球軌道上的位置*/}
        <primitive object={new THREE.AxesHelper(50)} /> {/*primitive: 在React元件中直接使用Three.js實例*/}
      </Canvas>
    </div>


  );
}
