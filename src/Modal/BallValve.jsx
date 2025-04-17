import { Gltf } from '@react-three/drei';
import { useThreeContext } from '../Context/threeContext';
export const BallValve1 = ({ position, scale=[30, 30, 30], rotation, clickable_view2 }) => {
    const { set_s_selectedObj_view3 } = useThreeContext();

    const handleClick = () => {
        if (clickable_view2) {
            set_s_selectedObj_view3("BallValve1");
        }
    }

    return (
        <Gltf
            src={"/modal/ball_valve/valve_1/scene.gltf"}
            position={position}
            scale={scale}
            rotation={rotation}
            onClick={handleClick}
        />
    )
}

export const BallValve2 = ({ position, scale, rotation }) => {
    return (
        <Gltf
            src={"/modal/ball_valve/valve_2/scene.gltf"}
            position={position}
            scale={scale}
            rotation={rotation}
        />
    )
}