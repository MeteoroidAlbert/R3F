import { useRef, useEffect } from "react";
import * as THREE from "three";

const Tape = ({position, type}) => {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            const geometry = new THREE.BufferGeometry();

            // 頂點數據
            const vertices = new Float32Array([
                0, 0, 0,   // 左下
                1.5, 0, 0,   // 右下
                1, 0, 1,   // 左上
                2.5, 0, 1,   // 右上
            ]);

            // 設置頂點(3: 三個值構成空間中一個點)
            geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

            // 以一個個三角形來形成面(0, 1, 2, 3分別是vertice的頂點元素索引)
            const indices = new Uint16Array([
                0, 1, 2,  // 第一個三角形
                1, 3, 2   // 第二個三角形
            ]);

            // 1: indices這個array中每個值代表的是一個頂點
            geometry.setIndex(new THREE.BufferAttribute(indices, 1));

            // 創建材质
            const material = new THREE.MeshStandardMaterial({ color: type, side: THREE.DoubleSide });

            ref.current.geometry = geometry;
            ref.current.material = material;
        }
    }, []);

    return (
        <mesh position={position} ref={ref}>
            
        </mesh>
    );
}

export default function CautionTape({ position, rotation }) {
    return (
        <group position={position} rotation={rotation}>
            <Tape type="black" position={[0, 0, 0]}/>
            <Tape type="yellow" position={[1, 0, 1]}/>
        </group>
    )
}


