import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { Gltf, Html, OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import { Form, Table } from 'antd';
import Box from './Modal/Box';
import Reactor from './Modal/Reactor';
import CameraController from './Modal/CameraController';
import Mixer from './Modal/Mixer';
import { DataTable_mixer, DataTable_Reactor } from './Component/DataTable';





const positionTarget = {
  default: [[80, 120, 60], [0, 0, 0]], // 0: cameraPosition, 1: orbitTarget
  reactor: [[-20, 20, -20], [-50, 20, -20]],
  mixer: [[10, 5, -50], [10, 5, -70]]
};



export default function ThreeScene() {
  const [s_isShowing_reactor, set_s_isShowing_reactor] = useState(false);  // Panel_ractor顯示與否
  const [s_isShowing_mixer, set_s_isShowing_mixer] = useState(false);  // Panel_mixer顯示與否
  const [s_islocking, set_s_islocking] = useState(false);
  const [s_selectedObj, set_s_selectedObj] = useState(undefined);
  const [s_cameraPosition, set_s_cameraPosition] = useState(
    new THREE.Vector3(...positionTarget.default[0])
  );
  const [s_orbitTarget, set_s_orbitTarget] = useState(
    new THREE.Vector3(...positionTarget.default[1])
  );


  const handlePanelShowing = (type) => {
    set_s_islocking(prevState => !prevState);
    set_s_selectedObj(prev => prev === type ? undefined : type);
    type === "reactor" && set_s_isShowing_reactor(prev => !prev);
    type === "mixer" && set_s_isShowing_mixer(prev => !prev);
  };

  useEffect(() => {
    console.log("s_islocking:", s_islocking);
    if (s_islocking && s_selectedObj) {
      set_s_cameraPosition(new THREE.Vector3(...positionTarget[s_selectedObj][0]));
      set_s_orbitTarget(new THREE.Vector3(...positionTarget[s_selectedObj][1]));
    }
    else {
      set_s_cameraPosition(new THREE.Vector3(...positionTarget.default[0]));
      set_s_orbitTarget(new THREE.Vector3(...positionTarget.default[1]));
    }
  }, [s_islocking, s_selectedObj])

  return (
    <div className="w-full h-screen bg-black">
      <Canvas >
        {/*光源*/}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 100, 10]} />
        {/*建築*/}
        <Box type="wall_marble" position={[10, 30.5, -89.5]} args={[200, 60, 1]} />
        <Box type="wall_marble" position={[-89.5, 30.5, 10]} args={[1, 60, 200]} />
        <Box type="floor_1" position={[10, 0, 10]} args={[200, 1, 200]} />
        {/*3D物件*/}
        <Reactor position={[-50, -4, -20]} scale={[5.5, 5.5, 5.5]} rotation={[0, Math.PI * 1.5, 0]} onClick={() => handlePanelShowing("reactor")} />
        <Mixer position={[0, 0.55, -70]} scale={[4, 4, 4]} rotation={[0, -Math.PI / 2, 0]} onClick={() => handlePanelShowing("mixer")} />
        {/*相機*/}
        <CameraController
          cameraPosition={s_cameraPosition}
          orbitTarget={s_orbitTarget}
          s_islocking={s_islocking}
        />
        {/*2D介面*/}
        {s_isShowing_reactor && <DataTable_Reactor />}
        {s_isShowing_mixer && <DataTable_mixer />}
        {/*坐標軸*/}
        <primitive object={new THREE.AxesHelper(1000)} />
      </Canvas>
    </div>
  );
}
