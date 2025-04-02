import { Gltf } from '@react-three/drei';
export default function Mixer({ position, scale, rotation, onClick }) {
    return (
        <Gltf
            src={"/modal/mixer/scene.gltf"}
            position={position} scale={scale}
            rotation={rotation}
            onClick={onClick}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "grab")}
        />
    )
}