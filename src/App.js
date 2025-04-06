import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState, } from 'react';
import * as THREE from "three";
import { Box, HoleBox } from './Modal/Box';
import Reactor1 from './Modal/Reactor1';
import Reactor2 from './Modal/Reactor2';
import ThirdPersonController from './Modal/camera/ThirdPersonController';
import Mixer from './Modal/Mixer';
import Pallet from './Modal/Pallet';
import { DataTableMixer, DataTableReactor } from './Component/DataTable';
import PalletTruck from './Modal/PalletTruck';
import CautionTape from './Modal/CautionTape';
import FireExtinguisher from './Modal/FireExtinguisher';
import Scales from './Modal/Scale';
import { Button, Space, Table } from 'antd';
import FirstPersonControls  from './Modal/camera/FirstPersonControls';
import { DragControls, KeyboardControls, PointerLockControls } from '@react-three/drei';
import { useThreeContext } from './Context/threeContext';
import { Physics } from '@react-three/rapier';
import { Player } from './Modal/camera/Player';

const tableColumns_mixer = [
  {
    title: "TEST1",
    dataIndex: "test1",
    width: 120,
  },
  {
    title: "TEST2",
    dataIndex: "test2",
    width: 120,
  },
  {
    title: "TEST3",
    dataIndex: "test3",
    width: 120,
  },
  {
    title: "TEST4",
    dataIndex: "test4",
    width: 120,
  },
  {
    title: "TEST5",
    dataIndex: "test5",
    width: 120,
  }
]

const fakeData_mixer = [
  {
    test1: "1",
    test2: "2",
    test3: "3",
    test4: "4",
    test5: "5",
  }
]



const positionTarget = {
  default: [[80, 120, 60], []], // 0: cameraPosition, 1: orbitTarget
  reactor: [[0, 20, -20], [-20, 20, -20]],
  mixer: [[60, 5, -50], [60, 5, -70]]
};

export default function ThreeScene() {
  const [s_isShowing_reactor, set_s_isShowing_reactor] = useState(false);  // Panel_ractor顯示與否
  const [s_isShowing_mixer, set_s_isShowing_mixer] = useState(false);      // Panel_mixer顯示與否
  const [s_islocking, set_s_islocking] = useState(false);                  // 視角鎖定與否
  const [s_selectedObj, set_s_selectedObj] = useState(undefined);          // 黨前選擇的3D物件
  const [s_cameraPosition, set_s_cameraPosition] = useState(               // 相機位置與目標
    new THREE.Vector3(...positionTarget.default[0])
  );
  const [s_orbitTarget, set_s_orbitTarget] = useState(
    new THREE.Vector3(...positionTarget.default[1])
  );
  const { s_cameraType, set_s_cameraType } = useThreeContext();              // 相機類型


  const handlePanelShowing = (type) => {
    set_s_islocking(prevState => !prevState);
    set_s_selectedObj(prev => prev === type ? undefined : type);
    type === "reactor" && set_s_isShowing_reactor(prev => !prev);
    type === "mixer" && setTimeout(() => set_s_isShowing_mixer(prev => !prev), 500)
  };

  useEffect(() => {
    if (s_islocking && s_selectedObj) {
      set_s_cameraPosition(new THREE.Vector3(...positionTarget[s_selectedObj][0]));
      set_s_orbitTarget(new THREE.Vector3(...positionTarget[s_selectedObj][1]));
    }
    else {
      set_s_cameraPosition(new THREE.Vector3(...positionTarget.default[0]));
      set_s_orbitTarget(new THREE.Vector3(...positionTarget.default[1]));
    }
  }, [s_islocking, s_selectedObj]);



  return (
    <div className="relative w-full h-screen bg-black">
      <Space className="absolute top-0 right-0 z-[100] p-2 bg-white border border-solid rounded-md m-2">
        <Button
          onClick={() => {
            set_s_cameraType("first");
          }}
          className={`${s_cameraType === "first" ? "bg-cyan-500 text-white" : null}`}
        >
          第一人稱
        </Button>
        <Button
          onClick={() => {
            set_s_cameraType("third");
          }}
          className={`${s_cameraType === "third" ? "bg-cyan-500 text-white" : null}`}
        >
          第三人稱
        </Button>
        <Button
          onClick={() => {
            set_s_cameraType("drag");
          }}
          className={`${s_cameraType === "drag" ? "bg-cyan-500 text-white" : null}`}
        >
          拖拽模式
        </Button>
      </Space>
      <KeyboardControls map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
      ]}>
        <Canvas className="bg-[#b0c4de]">
          <Suspense>
            <Physics gravity={[0, -30, 0]}>
              {/*光源*/}
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 100, 10]} />
              {/*建築*/}
              <Box type="wall_marble" position={[10, 45.5, -89.5]} args={[200, 90, 1]} />
              <HoleBox type="wall_marble" position={[-89.5, 45.5, 10]} args={[1, 90, 200]} />
              <Box type="floor_1" position={[10, 0, 10]} args={[200, 1, 200]} />
              <Box type="wall_marble" position={[55, 45.5, 35]} args={[15, 90, 15]} />
              {/*3D物件*/}
              <Reactor1 position={[-50, -6, -20]} scale={[8, 8, 8]} rotation={[0, Math.PI * 1.5, 0]} onClick={() => handlePanelShowing("reactor")} />
              <Reactor2 key="reactor2-1" position={[0, 28.5, -60]} />
              <Reactor2 key="reactor2-2" position={[30, 28.5, -60]} />
              <Mixer position={[50, 0.55, -70]} scale={[5.5, 5.5, 5.5]} rotation={[0, -Math.PI / 2, 0]} onClick={() => handlePanelShowing("mixer")} />
              <Pallet position={[0, 0, 100]} scale={[12, 12, 12]} />
              <PalletTruck position={[26.5, 0, 50]} scale={[12, 12, 12]} rotation={[0, Math.PI, 0]} />
              <FireExtinguisher position={[65, 5.5, 33]} scale={[5, 5, 5]} rotation={[0, Math.PI / 2, 0]} />
              <FireExtinguisher position={[65, 5.5, 38]} scale={[5, 5, 5]} rotation={[0, Math.PI / 2, 0]} />
              <Scales position={[55, 2, 18]} scale={[1.5, 1.5, 1.5]} rotation={[0, -Math.PI / 2, 0]} />

              {/*x軸警示線*/}
              {Array.from({ length: 22 }).map((x, i) => <CautionTape position={[-90 + 3 * i, 1, 43]} rotation={[0, Math.PI / 4, 0]} />)}
              {Array.from({ length: 28 }).map((x, i) => <CautionTape position={[-24 + 3 * i, 1, -50]} rotation={[0, Math.PI / 4, 0]} />)}
              {Array.from({ length: 11 }).map((x, i) => <CautionTape position={[28 + 3 * i, 1, 8]} rotation={[0, Math.PI / 4, 0]} />)}
              {Array.from({ length: 11 }).map((x, i) => <CautionTape position={[28 + 3 * i, 1, 42]} rotation={[0, Math.PI / 4, 0]} />)}
              {/*z軸警示線*/}
              {Array.from({ length: 31 }).map((x, i) => <CautionTape position={[-24.3, 1, -51 + 3 * i]} rotation={[0, -Math.PI / 4, 0]} />)}
              {Array.from({ length: 13 }).map((x, i) => <CautionTape position={[60, 1, -90 + 3 * i]} rotation={[0, -Math.PI / 4, 0]} />)}
              {Array.from({ length: 6 }).map((x, i) => <CautionTape position={[61.5, 1, 23 - 3 * i]} rotation={[0, -Math.PI / 4, 0]} />)}
              {Array.from({ length: 11 }).map((x, i) => <CautionTape position={[28.5, 1.1, 38 - 3 * i]} rotation={[0, -Math.PI / 4, 0]} />)}
              {/*相機*/}
              {s_cameraType === "third" && (
                <ThirdPersonController
                  cameraPosition={s_cameraPosition}
                  orbitTarget={s_orbitTarget}
                  s_islocking={s_islocking}
                />
              )}

              {s_cameraType === "first" && (
                  <Player/>
              )}
              {/*2D介面*/}
              {s_isShowing_reactor && <DataTableReactor />}
              {/* {s_isShowing_mixer && <DataTableMixer />} */}
              {/*坐標軸*/}
              <primitive object={new THREE.AxesHelper(1000)} />
            </Physics>
            {s_cameraType === "first" && (
                  <PointerLockControls/>
              )}
          </Suspense>
        </Canvas>
      </KeyboardControls>
      {s_isShowing_mixer && (
        <div className="absolute top-[35%] left-[50%] z-[100] bg-white p-2  overflow-x-auto">
          <Table columns={tableColumns_mixer} dataSource={fakeData_mixer} />
        </div>
      )}
    </div>
  );
}
