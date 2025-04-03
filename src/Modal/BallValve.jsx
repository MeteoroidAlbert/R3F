import { Gltf } from '@react-three/drei';
export const BallValve1 = ({ position, scale, rotation }) => {
    return (
        <Gltf
            src={"/modal/ball_valve/valve_1/scene.gltf"}
            position={position} scale={scale}
            rotation={rotation}
        />
    )
}

export const BallValve2 = ({ position, scale, rotation }) => {
    return (
        <Gltf
            src={"/modal/ball_valve/valve_2/scene.gltf"}
            position={position} scale={scale}
            rotation={rotation}
        />
    )
}