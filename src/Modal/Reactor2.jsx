import { DragControls, Gltf } from "@react-three/drei";
import PressureGauge from "./PressureGauge";
import { BallValve1, BallValve2 } from "./BallValve";
import { useEffect, useMemo, useRef, useState } from "react";
import { useThreeContext } from "../Context/threeContext";
import * as THREE from "three";


function Pillar({ position, s_color }) {
    
    useEffect(() => {
        console.log("s_color:", s_color)
    }, [s_color])


    return (
        <group position={position}>
            {/* 頂部球體 */}
            <mesh position={[0, 7, 0]}>
                <sphereGeometry args={[0.8, 64, 32]} />
                <meshStandardMaterial  color={s_color} />
            </mesh>
            {/* 柱子 */}
            <mesh>
                <cylinderGeometry args={[0.8, 0.8, 14]} />
                <meshStandardMaterial color={s_color} />
            </mesh>
            {/* 底部方塊 */}
            <mesh position={[0, -5.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <boxGeometry args={[2, 2, 0.2]} />
                <meshStandardMaterial color={s_color} />
            </mesh>
            {/* 底部圓柱 */}
            <mesh position={[0, -6.5, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
                <cylinderGeometry args={[1, 1, 1, 64, 64]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </group>
    );
}

function NewBallValve2({ position, rotation, clickable_view2 }) {
    return (
        <group position={position} rotation={rotation}>
            <BallValve1
                scale={[18, 18, 18]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                clickable_view2={clickable_view2}
            />
            <mesh scale={[1, 1, 1]} position={[0, -0.7, 0]}>
                <cylinderGeometry
                    args={[0.18, 0.18, 1, 64, 64]}
                />
                <meshStandardMaterial />
            </mesh>
        </group>
    )
}

export default function Reactor2({ position, onClick, clickable_view1 = true, clickable_view2, s_data = 1 }) {
    const [s_alarm, set_s_alarm] = useState(false);
    const [s_color, set_s_color] = useState("#1e90ff");
    const { s_cameraType } = useThreeContext();

    const groupRef = useRef();
    const originalColors = useRef(new Map());

    const handleClick = () => {
        if (!clickable_view1) return;
        if (!groupRef.current) return;

        // 遍歷所有子節點
        set_s_alarm(true)
        groupRef.current.traverse((child) => {
            if (child.isMesh) {

                child.material = child.material.clone() // 先複製材質 (避免直接修改Gltf src路徑中的scene.gltf原始材質)
                child.material.color.set(0xff4500)

            }


            // window.open("/details/Reactor2", "_blank")
        });

        onClick && onClick();



    };

    const resetColors = () => {
        set_s_alarm(false);
        groupRef.current.traverse((child) => {
            if (child.isMesh && originalColors.current.has(child)) {
                child.material.color.copy(originalColors.current.get(child));
            }
        });



    };

    const pillarPositions = [
        [5, -14, 5],
        [-5, -14, 5],
        [5, -14, -5],
        [-5, -14, -5],
    ];


    const newBallValve2 = [
        [3, 9.7, -3],
        [4, 9.7, -1.5],
        [-4, 9.7, 1.0]
    ]



    const Content = () =>{      
        return  (
            <group  position={position} scale={[1.3, 1.3, 1.3]} ref={groupRef} onClick={handleClick} onDoubleClick={resetColors} castShadow>
                {/*壓力計*/}
                <PressureGauge
                    position={[3.1, 9, 2.9]}
                    scale={[1, 1, 1]}
                    clickable_view2={clickable_view2}
                />
                <mesh scale={[1, 1, 1]} position={[3, 9, 3]}>
                    <cylinderGeometry
                        args={[0.33, 0.33, 1, 64, 64]}
                    />
                    <meshStandardMaterial color={s_color}/>
                </mesh>
                {/*port-in*/}
                <mesh scale={[1, 1, 1]} position={[-1, 9.5, -3]} rotation={[-Math.PI / 9, 0, Math.PI / 30]}>
                    <cylinderGeometry
                        args={[1.5, 1.5, 1.5, 64, 64]}
                    />
                    <meshStandardMaterial color={s_color}/>
                </mesh>
                {/*port-view*/}
                <mesh scale={[1, 1, 1]} position={[-2, 9, 3]} rotation={[Math.PI / 8.5, 0, Math.PI / 18]}>
                    <cylinderGeometry
                        args={[1, 1, 1.5, 64, 64]}
                    />
                    <meshStandardMaterial color={s_color}/>
                </mesh>
                {/*port-ball-valve*/}
                {newBallValve2.map((pos, index) => (
                    <NewBallValve2 key={index} position={pos} clickable_view2={clickable_view2} />
                ))}
                {/*反應槽*/}
                <mesh position={[0, -1, 0]}>
                    <cylinderGeometry args={[7, 7, 13, 64, 64]} />
                    <meshStandardMaterial side={THREE.DoubleSide} color={s_color}/>
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[6, 6, 15, 64, 64]} />
                    <meshStandardMaterial side={THREE.DoubleSide} color={s_color}/>
                </mesh>
                <mesh>
                    <sphereGeometry args={[10, 32, 16, 0, Math.PI * 2, 0, 0.7]} />
                    <meshStandardMaterial color={s_color} />
                </mesh>
                {/* <mesh position={[0, 7.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[7, 0.3, 16, 100]} />
                    <meshStandardMaterial />
                </mesh> */}
                <mesh position={[0, 8, 0]}>
                    <cylinderGeometry args={[6.8, 6.8, 0.5, 64, 64]} />
                    <meshStandardMaterial color={s_color}/>
                </mesh>
                <mesh position={[0, 7.4, 0]}>
                    <cylinderGeometry args={[6.8, 6.8, 0.5, 64, 64]} />
                    <meshStandardMaterial color={s_color}/>
                </mesh>
                <mesh position={[0, 0.6, 0]} rotation={[Math.PI, 0, 0]}>
                    <sphereGeometry args={[10.8, 32, 16, 0, Math.PI * 2, 0, 0.7]} />
                    <meshStandardMaterial color={s_color}/>
                </mesh>
                <mesh position={[0, -7.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[7, 0.3, 16, 100]} />
                    <meshStandardMaterial color={s_color}/>
                </mesh>
                {/*port-output*/}
                <group position={[0, -9, 0]} scale={[1.2, 1.2, 1.2]}>
                    <mesh>
                        <cylinderGeometry args={[0.5, 0.5, 5, 64, 64]} />
                        <meshStandardMaterial color={s_color}/>
                    </mesh>
                    <mesh position={[0, -2.5, 0]}>
                        <sphereGeometry args={[0.5, 64, 32]} />
                        <meshStandardMaterial color={s_color}/>
                    </mesh>
                    <mesh position={[0, -2.855, 0.6]} rotation={[-Math.PI / 3, 0, 0]}>
                        <cylinderGeometry args={[0.5, 0.5, 1.1, 64, 64]} />
                        <meshStandardMaterial color={s_color}/>
                    </mesh>
                    <BallValve2 position={[0, -3.1, 1]} scale={[0.007, 0.007, 0.007]} rotation={[0, -Math.PI / 2, -Math.PI / 6]} />
    
                </group>
    
    
    
    
                {/*角柱*/}
                {pillarPositions.map((pos, index) => (
                    <Pillar key={index} position={pos} s_color={s_color} />
                ))}
            </group>
        )
    }

    useEffect(() => {
        groupRef.current.traverse((child) => {              // traverse --------------------------->three.js 中，遍歷Object3D對象的方法
            if (child.isMesh) {
                // Clone材質以保存其原色
                child.material = child.material.clone();
                originalColors.current.set(child, child.material.color.clone());
            }
        });
    }, [groupRef]);

    useEffect(() => {

        console.log("s_data:", s_data)

        if (s_data <= 25) set_s_color("#1e90ff");
        else if (s_data > 25 && s_data <= 50) set_s_color("#ffff00");
        else if (s_data > 50 && s_data <= 75) set_s_color("#ff8c00");
        else set_s_color("#ff0000");
    }, [s_data])


    return s_cameraType === "drag" ? (
        <DragControls dragLimits={[undefined, [0, 0], undefined]}>
            <Content/>
        </DragControls>
    ) : (
        <Content/>
    );
}