import { Gltf } from '@react-three/drei';
export default function ExcalmationMark({ position, scale, rotation }) {
    return (
        <Gltf
            src={"/modal/exclamation_mark/scene.gltf"}
            position={position}
            scale={scale}
            rotation={rotation}
        />
    )
}