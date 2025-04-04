import { Gltf } from '@react-three/drei';
export default function FireExtinguisher({ position, scale, rotation }) {
    return (
        <Gltf
            src={"/modal/fire_extinguisher/scene.gltf"}
            position={position} 
            scale={scale}
            rotation={rotation}
            // onPointerOver={() => (document.body.style.cursor = "pointer")}
            // onPointerOut={() => (document.body.style.cursor = "grab")}
        />
    )
}