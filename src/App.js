import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
import { CloseOutlined } from '@ant-design/icons';
import { GizmoHelper, GizmoViewport, KeyboardControls, PointerLockControls, View } from '@react-three/drei';
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
  Reactor1: [[0, 20, -20], [-20, 20, -20]],
  Mixer: [[60, 5, -50], [60, 5, -70]]
};

export default function ThreeScene() {
  const [s_isShowing_reactor, set_s_isShowing_reactor] = useState(false);  // Panel_ractor顯示與否
  const [s_isShowing_mixer, set_s_isShowing_mixer] = useState(false);      // Panel_mixer顯示與否
  const [s_islocking, set_s_islocking] = useState(false);                  // 視角鎖定與否
  const [s_cameraPosition, set_s_cameraPosition] = useState(               // 相機位置與目標
    new THREE.Vector3(...positionTarget.default[0])
  );
  const [s_orbitTarget, set_s_orbitTarget] = useState(
    new THREE.Vector3(...positionTarget.default[1])
  );

  const [s_showData, set_s_showData] = useState(false);
  const [s_data, set_s_data] = useState(undefined);  // 存取後端資料

  const {
    s_cameraType, set_s_cameraType,
    s_isDialogueShowing, s_interactObj,
    s_selectedObj_view2, set_s_selectedObj_view2,
    s_visible_view2, set_s_visible_view2,
    Component_view2, setComponent_view2,
    s_selectedObj_view3, set_s_selectedObj_view3,
    s_visible_view3, set_s_visible_view3,
    Component_view3, setComponent_view3,
  } = useThreeContext();



  const ref = useRef();
  const ws = useRef(null);
  let wsURL = "ws://localhost:5000";

  const connectToWs = () => {
    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
      console.log("WebSocket is already connected or connecting.");
      return;
    };

    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      ws.current = new WebSocket(wsURL);   //與目的地建立websocket連線

      ws.current.addEventListener("message", handleMessage);   //監聽對象:ws (即與url指向的伺服器的websocket連線);監聽事件:伺服器向客戶端發送message
      ws.current.addEventListener("close", () => {
        setTimeout(() => {
          console.log('Disconnected. Trying to reconnect.');
          connectToWs();
        }, 1000);
      });
    }
  }

  const handleMessage = (e) => {
    const messageData = JSON.parse(e.data);
    console.log({ e, messageData });

    if (messageData.type === "test") {
      set_s_data(messageData.value);
    }
  }

  


  const handlePanelShowing = (type) => {
    set_s_islocking(prevState => !prevState);
    set_s_selectedObj_view2(prev => prev === type ? undefined : type);
    type === "Reactor1" && set_s_isShowing_reactor(prev => !prev);
    type === "Mixer" && setTimeout(() => set_s_isShowing_mixer(prev => !prev), 500)
  };


  useEffect(() => {
    connectToWs();
  }, [])

  // 調整相機目標、位置
  useEffect(() => {
    if (s_islocking && s_selectedObj_view2) {
      set_s_cameraPosition(new THREE.Vector3(...positionTarget[s_selectedObj_view2][0]));
      set_s_orbitTarget(new THREE.Vector3(...positionTarget[s_selectedObj_view2][1]));
    }
    else {
      set_s_cameraPosition(new THREE.Vector3(...positionTarget.default[0]));
      set_s_orbitTarget(new THREE.Vector3(...positionTarget.default[1]));
    }
  }, [s_islocking, s_selectedObj_view2]);




  useEffect(() => {
    console.log(s_cameraType, s_interactObj, s_isDialogueShowing);
    const handleKeyDown = (event) => {
      if (event.key === "F" || event.key === "f") {
        console.log("F已被按下")
        if (s_isDialogueShowing && s_interactObj === "reactor1" && s_cameraType === "first") {
          console.log("條件滿足")
          set_s_showData(true);
          set_s_cameraType("other");
        }
        else {
          console.log("條件未滿足:", s_isDialogueShowing, s_interactObj, s_cameraType)
        }
      }
      if (!s_interactObj) {
        set_s_showData(false);
      }
    };

    // 添加事件監聽器
    document.addEventListener('keydown', handleKeyDown);

    // 清理事件監聽器
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [s_cameraType, s_interactObj, s_isDialogueShowing]);


  useEffect(() => {
    setComponent_view2(undefined)
  }, [s_cameraType])





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
      <div ref={ref} className="relative w-full h-screen">
        <View key="view1" index={1} className="absolute w-full h-full">
          <KeyboardControls map={[
            { name: "forward", keys: ["ArrowUp", "w", "W"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "jump", keys: ["Space"] },
          ]}>
            <Physics gravity={[0, -30, 0]}>
              {/*光源*/}
              <ambientLight intensity={1.5} />
              <directionalLight
                castShadow
                position={[10, 100, 10]}
              />
              {/*建築*/}
              <Box type="wall_marble" position={[10, 45.5, -89.5]} args={[200, 90, 1]} />
              <HoleBox type="wall_marble" position={[-89.5, 45.5, 10]} args={[1, 90, 200]} />
              <Box type="floor_1" position={[10, 0, 10]} args={[200, 1, 200]} />
              <Box type="wall_marble" position={[55, 45.5, 35]} args={[15, 90, 15]} />
              {/*3D物件*/}
              <Reactor1
                position={[-50, -6, -20]}
                scale={[8, 8, 8]}
                rotation={[0, Math.PI * 1.5, 0]}
                onClick={() => handlePanelShowing("Reactor1")}
              />
              <Reactor2 key="reactor2-1" position={[0, 28.5, -60]} onClick={() => set_s_selectedObj_view2("Reactor2")} s_data={s_data}/>
              <Reactor2 key="reactor2-2" position={[30, 28.5, -60]} onClick={() => set_s_selectedObj_view2("Reactor2")} s_data={s_data}/>
              <Mixer position={[50, 0.55, -70]} rotation={[0, -Math.PI / 2, 0]} onClick={() => handlePanelShowing("Mixer")} />
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
                  set_s_orbitTarget={set_s_orbitTarget}
                />
              )}

              {s_cameraType === "first" && (
                <>
                  <PointerLockControls />
                  <Player />
                </>
              )}

              {/*2D介面*/}
              {s_isShowing_reactor && <DataTableReactor />}
              {s_isShowing_mixer && <DataTableMixer />}
              {/*坐標軸*/}
              <primitive object={new THREE.AxesHelper(1000)} />
              <GizmoHelper
                alignment="bottom-right" // 在畫布上的位置
                margin={[80, 80]} // 距離畫布邊緣
              >
                <GizmoViewport
                  axisColors={['red', 'green', 'blue']}
                  labelColor="white"
                />
              </GizmoHelper>
            </Physics>
          </KeyboardControls>
        </View>

        {(Component_view2 && s_cameraType === "third") && (
          <View key="view2" index={2} className={`absolute top-0 left-0 w-[40%] h-full transition-transform duration-500 ease-in-out ${s_visible_view2 ? "translate-x-0" : "-translate-x-full"}`}>

            <Physics gravity={[0, -30, 0]}>
              <color attach="background" args={['#d6edf3']} />
              <Component_view2 clickable_view1={false} clickable_view2={true} position={[0, 0, 0]} s_data={s_data} />
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 100, 10]} />
              <ThirdPersonController
                cameraPosition={new THREE.Vector3(25, 25, 25)}
                orbitTarget={new THREE.Vector3(0, 1, 0)}
              />
            </Physics>

          </View>
        )}

        {(Component_view3 && s_cameraType === "third") && (
          <View key="view3" index={3} className={`absolute top-16 right-5 w-[40%] h-[40%] transition-transform duration-500 ease-in-out ${s_visible_view3 ? "translate-y-0" : "-translate-y-full"}`}>

            <Physics gravity={[0, -30, 0]}>
              <color attach="background" args={['#eef39d']} />
              <Component_view3 clickable_view1={false} position={[0, 0, 0]} />
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 100, 10]} />
              <ThirdPersonController
                cameraPosition={new THREE.Vector3(5, 5, 5)}
                orbitTarget={new THREE.Vector3(0, 1, 0)}
              />
            </Physics>

          </View>
        )}



        <Canvas eventSource={ref} className="bg-[#b0c4de]" shadows>
          <View.Port />
        </Canvas>
      </div>
      {/*DOM節點*/}
      {/* {s_isShowing_mixer && (
        <div className="absolute top-[35%] left-[50%] z-[100] bg-white p-2  overflow-x-auto">
          <Table columns={tableColumns_mixer} dataSource={fakeData_mixer} />
        </div>
      )} */}
      {s_isDialogueShowing && (
        <div className="absolute top-[5%] left-[5%] z-[100] bg-white p-2">
          <p>F 開啟面板</p>

        </div>
      )}
      {/* {s_showData && (
        <div className="absolute top-[35%] left-[50%] z-[100] bg-white p-2  overflow-x-auto">
          <Table columns={tableColumns_mixer} dataSource={fakeData_mixer} />
        </div>
      )} */}
      {s_visible_view2 && (
        <CloseOutlined
          className={`absolute top-2 left-2 z-[100] transition-transform duration-1000 ease-in-out ${s_visible_view2 ? "translate-x-0" : "-translate-x-full"}`}
          onClick={() => {
            setComponent_view2(undefined);
            set_s_selectedObj_view2(undefined);
            set_s_islocking(false);
            set_s_isShowing_reactor(false);
            set_s_isShowing_mixer(false);
          }}
        />
      )}
      {s_visible_view3 && (
        <CloseOutlined
          className={`absolute top-[72px] right-7 z-[100] transition-transform duration-1000 ease-in-out ${s_visible_view3 ? "translate-y-0" : "-translate-y-full"}`}
          onClick={() => {
            setComponent_view3(undefined);
            set_s_selectedObj_view3(undefined);
          }}
        />
      )}

    </div>
  );
}
