import { DragControls, Gltf } from '@react-three/drei';
import { useThreeContext } from '../Context/threeContext';
export default function Mixer({ position, scale=[5.5, 5.5, 5.5], rotation, defaultClick = true, onClick }) {
    const { s_cameraType } = useThreeContext();

    const handleClick = () => {
        if (s_cameraType !== "third" || !defaultClick) {
            return;
        }
        else {
            onClick();
        }
    }

    const content = (
        <Gltf
            src={"/modal/mixer/scene.gltf"}
            position={position} 
            scale={scale}
            rotation={rotation}
            onClick={handleClick}
            // onPointerOver={() => ( s_cameraType === "third" ? document.body.style.cursor = "pointer" : null)}
            // onPointerOut={() => (document.body.style.cursor = "auto")}
        />
    )

    return s_cameraType === "drag" ? (
        <DragControls dragLimits={[undefined, [0, 0], undefined]}>
            {content}
        </DragControls>
    ) : (
        content
    );
}