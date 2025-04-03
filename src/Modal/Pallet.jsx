import { Gltf } from '@react-three/drei';
export default function Pallet({ position, scale, rotation }) {
    return (
        <Gltf
            src={"/modal/pallet/scene.gltf"}
            position={position} 
            scale={scale}
            rotation={rotation}
            // onPointerOver={() => (document.body.style.cursor = "pointer")}
            // onPointerOut={() => (document.body.style.cursor = "grab")}
        />
    )
}