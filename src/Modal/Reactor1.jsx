import { DragControls, Gltf } from '@react-three/drei';
import { useRef } from 'react';
export default function Reactor1({ position, scale, rotation, onClick }) {
    return (
        <Gltf

            src={"/modal/reactor/scene.gltf"}
            position={position} scale={scale}
            rotation={rotation}
            onClick={onClick}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "grab")}
        />
    )
}