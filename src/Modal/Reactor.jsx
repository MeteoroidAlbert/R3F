import { Gltf } from '@react-three/drei';
export default function Reactor({ position, scale, rotation, onClick }) {
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