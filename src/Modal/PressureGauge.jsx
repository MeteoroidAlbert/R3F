import { Gltf } from '@react-three/drei';
import { useThreeContext } from '../Context/threeContext';
export default function PressureGauge({ position, scale=[1.5, 1.5, 1.5], rotation, clickable_view2 = false }) {
    const { set_s_selectedObj_view3 } = useThreeContext();
    
    const handleClick = () => {
        if (clickable_view2) {
            set_s_selectedObj_view3("PressureGauge");
        }
    }
    
    return (
        <Gltf
            src={"/modal/pressure_gauge/scene.gltf"}
            position={position} 
            scale={scale}
            rotation={rotation}
            onClick={handleClick}
        />
    )
}