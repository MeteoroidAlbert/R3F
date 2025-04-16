import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
export default function ThirdPersonController({ cameraPosition, orbitTarget, s_islocking, type }) {
    // const { camera } = useThree();
    const orbitControlsRef = useRef();
    const cameraRef = useRef();
    const [s_isAnimated, set_s_isAnimated] = useState(false) // 控制是否啟用相機轉移時的動畫

    useEffect(() => {
        set_s_isAnimated(true);
    }, [cameraPosition, orbitTarget]);

    // 強制打斷useFrame的平滑插值動畫(hint: 這樣就可以不必等到鏡頭移回定點就能進行操作)
    useEffect(() => {
        const ctrls = orbitControlsRef.current;
        const onStart = () => {
            set_s_isAnimated(false);
        }
        ctrls?.addEventListener("start", onStart); // Controls事件； start: 交互發生時； end: 交互結束時； change: 每當OrbitControls做出改變時都會觸發（例如滑動、滾輪縮放、鍵盤縮放）
        
        return () => ctrls?.removeEventListener("start", onStart);
    }, [orbitControlsRef.current]);


    useFrame(() => {
        if (!s_isAnimated) return;
        const cam = cameraRef.current;
        const ctrls = orbitControlsRef.current;
        cam?.position.lerp(cameraPosition, 0.05); // 平滑插值: 每幀畫面使相機向目標位置推進5%
        ctrls?.target.lerp(orbitTarget, 0.05); // 使相機看向目標位置推進5%
        ctrls.update();

        // 當相機到達指定位置必須停止動畫
        if (cam?.position.distanceTo(cameraPosition) < 0.1 && ctrls.target.distanceTo(orbitTarget) < 0.1) {
            cam?.position.copy(cameraPosition);
            ctrls.target.copy(orbitTarget);
            set_s_isAnimated(false);
        }
    });

    return (
        <>
            <PerspectiveCamera ref={cameraRef} fov={60} near={0.1} far={1000} makeDefault />
            <OrbitControls ref={orbitControlsRef} enableRotate={!s_islocking} makeDefault />
        </>

    )
}


