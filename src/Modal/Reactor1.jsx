import { DragControls, Gltf } from '@react-three/drei';
import { useThreeContext } from '../Context/threeContext';
import { RigidBody } from '@react-three/rapier';
export default function Reactor1({ position, scale, rotation, onClick }) {
    const {s_cameraType} = useThreeContext();

    const handleClick = () => {
        if (s_cameraType !== "third") {
            return;
        }
        else {
            onClick();
        }
    }

    const content = (
        <RigidBody type="fixed" colliders="trimesh">
        <Gltf
            src={"/modal/reactor/scene.gltf"}
            position={position} scale={scale}
            rotation={rotation}
            onClick={handleClick}
        />
        </RigidBody>
    )

    return s_cameraType === "drag" ? (
        <DragControls dragLimits={[undefined, [0, 0], undefined]}>
            {content}
        </DragControls>
    ) : (
        content
    );
}