import { Gltf } from '@react-three/drei';
export default function PressureGauge({ position, scale, rotation, onClick }) {
    return (
        <Gltf
            src={"/modal/pressure_gauge/scene.gltf"}
            position={position} scale={scale}
            rotation={rotation}
        />
    )
}