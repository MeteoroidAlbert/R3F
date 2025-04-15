import { useRef, useEffect, useState, useMemo } from 'react'
import { DragControls, Gltf } from '@react-three/drei'
import { useThreeContext } from '../Context/threeContext'
import { RigidBody, useRapier } from '@react-three/rapier'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function Reactor1({
    position,
    scale,
    rotation,
    onClick,
}) {
    const { s_cameraType, s_isDialogueShowing, set_s_isDialogueShowing, s_interactObj, set_s_interactObj } = useThreeContext()
    const rigidBodyRef = useRef();
    const playerPosRef = useRef();
    const lastDistance = useRef(null);
    const { world } = useRapier();

    const reactorPosition = useMemo(() => new THREE.Vector3(...position), [position]);

    // const [lastDistance, setLastDistance] = useState(null);
    

    useFrame(() => {
        if (world) {
            world.forEachRigidBody((body) => {
                const pos = body.translation();
                const name = body.userData?.name;
                if (name === "player") {
                    playerPosRef.current = {
                        x: pos.x,
                        y: pos.y,
                        z: pos.z,
                    };

                    const dx = pos.x - reactorPosition.x;
                    const dy = pos.y - reactorPosition.y;
                    const dz = pos.z - reactorPosition.z;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    
                    // 優化性能: 避免不必要的重複setState
                    if (lastDistance.current === null || Math.abs(lastDistance.current - distance) > 1) {
                        // setLastDistance(distance); // 更新距離
                        lastDistance.current = distance;
                        if (distance < 50) {
                            if (!s_isDialogueShowing) set_s_isDialogueShowing(true);
                            if (s_interactObj !== "reactor1") set_s_interactObj("reactor1");
                        } else {
                            if (s_isDialogueShowing) set_s_isDialogueShowing(false);
                            if (s_interactObj === "reactor1") set_s_interactObj(undefined);
                        }
                    }
                }
            });
        }
    });

  


    const handleClick = () => {
        if (s_cameraType === "third") {
            onClick();
            
        } 
    }


    const content = (
        <RigidBody
            ref={rigidBodyRef}
            type="fixed"
            colliders="trimesh"
            userData={{
                name: "reactor1",
            }}
            onCollisionEnter={({ other }) => {
                if (other.rigidBodyObject.userData?.name === "player") {
                    console.log("碰撞發生！")
                }
            }}
        >
            <group position={position} rotation={rotation}>
                <Gltf
                    src="/modal/reactor/scene.gltf"

                    scale={scale}

                    onClick={handleClick}
                    castShadow
                />
            </group>

        </RigidBody>
    )

    return s_cameraType === "drag" ? (
        <DragControls dragLimits={[undefined, [0, 0], undefined]}>
            {content}
        </DragControls>
    ) : content
}

