import { Gltf } from '@react-three/drei';
export default function PalletTruck({ position, scale, rotation }) {
    return (
        <Gltf
            src={"/modal/pallet_truck/scene.gltf"}
            position={position} 
            scale={scale}
            rotation={rotation}
            // onPointerOver={() => (document.body.style.cursor = "pointer")}
            // onPointerOut={() => (document.body.style.cursor = "grab")}
        />
    )
}