import { OrbitControls } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
export default function CameraController({ cameraPosition, orbitTarget, s_islocking }) {
    const { camera } = useThree();
    const orbitControlsRef = useRef();
    const [s_isAnimated, set_s_isAnimated] = useState(false) // 控制是否啟用相機轉移時的動畫

    useEffect(() => {
        set_s_isAnimated(true);
    }, [cameraPosition, orbitTarget]);


    useFrame(() => {
        if (!s_isAnimated) return;

        camera.position.lerp(cameraPosition, 0.05); // 平滑插值: 每幀畫面使相機向目標位置推進5%
        orbitControlsRef.current.target.lerp(orbitTarget, 0.05); // 使相機看向目標位置推進5%
        orbitControlsRef.current.update();

        // 當相機到達指定位置必須停止動畫
        if (camera.position.distanceTo(cameraPosition) < 0.1 && orbitControlsRef.current.target.distanceTo(orbitTarget) < 0.1) {
            camera.position.copy(cameraPosition);
            orbitControlsRef.current.target.copy(orbitTarget);
            set_s_isAnimated(false);
        }
    });

    return <OrbitControls ref={orbitControlsRef} enableRotate={!s_islocking} />;
}