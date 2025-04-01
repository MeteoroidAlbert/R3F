import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from "three";
import { Form, Table } from 'antd';


const tableColumns = [
  {
      title: "良率黃燈警報(%)",
      dataIndex: "warnyield",
      align: "right",
      width: 130
  },
  {
      title: "良率紅燈警報(%)",
      dataIndex: "alertyield",
      align: "right",
      width: 130
  },
  {
      title: "產速報警(%)",
      dataIndex: "alertspeed",
      align: "right",
      width: 120
  },
  {
      title: "逾停警報(SEC)",
      dataIndex: "alertstop",
      align: "right",
      width: 120
  },
  {
      title: "投料耗損率(%)",
      dataIndex: "lossR",
      align: "right",
      width: 120,
  },
  {
      title: "良率損耗率(%)",
      dataIndex: "yieldR",
      align: "right",
      width: 120,
  },
  {
      title: "生產準備時間(LT)",
      dataIndex: "pdtLT",
      align: "right",
      width: 180,
  },
  {
      title: "作業緩衝時間(WT)",
      dataIndex: "pdtWT",
      align: "right",
      width: 180,
  },
  {
      title: "投料單重",
      dataIndex: "feedinwt",
      align: "right",
      width: 120,
  },
  {
      title: "產出單重",
      dataIndex: "outputwt",
      align: "right",
      width: 120,
  },
  {
      title: "投入計量單位",
      dataIndex: "feedUOMUID",
      width: 120,
  },
  {
      title: "投入量",
      dataIndex: "feedin",
      align: "right",
      width: 120,
  },
  {
      title: "產出計量單位",
      dataIndex: "outputUOMUID",
      width: 120,
  },
  {
      title: "產出量",
      dataIndex: "output",
      align: "right",
      width: 120,
  },
  {
      title: "註記",
      dataIndex: "note",
      width: 120,
      ellipsis: true,
  },
  
];

const fakeData = [
  {
    warnyield: 90,
    alertyield: 80,
    alertspeed: 90,
    alertstop: 120,
    lossR: 15,
    yieldR: 5,
    pdtLT: 60,
    feedinwt: 51,
    feedUOMUID: "kg",
    feedin: 1000,
    outputwt: 100,
    outputUOMUID: "kg",
    output: 900,
  }
]

function DataTable () {
  return (
    <Html position={[12, 25, 24]} transform occlude>
      <div className="bg-white p-2  overflow-x-auto">
        <Table columns={tableColumns} dataSource={fakeData}/>
      </div>
    </Html>
  )
}



function Reactor ({onClick}) {
  const {scene} = useGLTF("/modal/reactor/scene.gltf");
  return <primitive object={scene} position={[8.1, -0.4, 6]} scale={[5, 5, 5]} rotation={[0, Math.PI, 0]} onClick={onClick}/>
}

function Box({ type }) {
  const floorMap = useLoader(THREE.TextureLoader, "/image/textures/floor/Travertine009_4K-JPG_Color.jpg");
  const wallMap = useLoader(THREE.TextureLoader, "/image/textures/wall/Concrete017_4K-JPG_Color.jpg");
  let position;
  let args;
  if (type === "floor") {
    position = [10, 0, 10];
    args = [200, 1, 200];
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

const positionTarget = {
  default: [[80, 120, 60], [0, 0, 0]], // 0: cameraPosition, 1: orbitTarget
  reactor: [[12, 20, 40], [12, 20, 0]]
};

function CameraController({ cameraPosition, orbitTarget, s_islocking }) {
  const { camera } = useThree();
  const orbitControlsRef = useRef();
  const [s_isAnimated, set_s_isAnimated] = useState(false) // 控制是否啟用相機轉移時的動畫

  useEffect(() => {
    set_s_isAnimated(true);
  }, [cameraPosition, orbitTarget]);


  useFrame(() => {
    if (!s_isAnimated) return; 

    camera.position.lerp(cameraPosition, 0.05); // 平滑插值: 每幀畫面使相機向目標位置推進5%
    orbitControlsRef.current.target.lerp(orbitTarget, 0.05); // 使相機看向目標位置推進5%
    orbitControlsRef.current.update();

    // 當相機到達指定位置必須停止動畫
    if (camera.position.distanceTo(cameraPosition) < 0.1 && orbitControlsRef.current.target.distanceTo(orbitTarget) < 0.1) {
      camera.position.copy(cameraPosition);
      orbitControlsRef.current.target.copy(orbitTarget);
      set_s_isAnimated(false); 
    }
  });

  return <OrbitControls ref={orbitControlsRef} enableRotate={!s_islocking}/>;
}

export default function ThreeScene() {
  const [s_isPanelShowing, set_s_isPanelShowing] = useState(false);  // Panel顯示與否
  const [s_islocking, set_s_islocking] = useState(false); // 
  const [s_cameraPosition, set_s_cameraPosition] = useState(
    new THREE.Vector3(...positionTarget.default[0])
  );
  const [s_orbitTarget, set_s_orbitTarget] = useState(
    new THREE.Vector3(...positionTarget.default[1])
  );
  

  const handlePanelShowing = () => {
    set_s_islocking(prevState => !prevState);
    set_s_cameraPosition(new THREE.Vector3(...positionTarget.reactor[0]));
    set_s_orbitTarget(new THREE.Vector3(...positionTarget.reactor[1]));
    setTimeout(() => {
      set_s_isPanelShowing(prevState => !prevState);
    }, 100)
  };

  return (
    <div className="w-full h-screen bg-black">
      <Canvas >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 40, 10]} />
        <Reactor onClick={handlePanelShowing} />
        {s_isPanelShowing && <DataTable />}
        <Box type="floor"/>
        <CameraController 
          cameraPosition={s_cameraPosition} 
          orbitTarget={s_orbitTarget} 
          s_islocking={s_islocking}
        />
      </Canvas>
    </div>
  );
}
