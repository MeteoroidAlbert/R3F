import { OrbitControls, PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import { useThreeContext } from '../../Context/threeContext';
export default function ThirdPersonController({ cameraPosition, orbitTarget, s_islocking, set_s_orbitTarget }) {
    const { scene } = useThree();

    const orbitControlsRef = useRef();
    const cameraRef = useRef();
    const [s_isAnimated, set_s_isAnimated] = useState(false) // 控制是否啟用相機轉移時的動畫
    const [s_center, set_s_center] = useState(useState(new THREE.Vector3()));

    const {s_visible_view2, s_visible_view3} = useThreeContext();


    // 強制打斷useFrame的平滑插值動畫(hint: 這樣就可以不必等到鏡頭移回定點就能進行操作)
    const cancelAnimate = () => {
        set_s_isAnimated(false); //orbitControls事件；onStart: 交互發生時； onEnd: 交互結束時； onChange: 每當OrbitControls做出改變時都會觸發（例如滑動、滾輪縮放、鍵盤縮放）
    }

    // useEffect(() => {
    //     const fullBox = new THREE.Box3(); // 場景box

    //     scene.traverse(obj => {
    //         if (obj.isMesh) {
    //             const box = new THREE.Box3().setFromObject(obj); // 將單一物件包裝成一個box
    //             fullBox.union(box) // 將單一box併入fullBox
    //         }
    //     })

    //     const center = new THREE.Vector3();
    //     fullBox.getCenter(center);

    //     console.log(center);

    //     set_s_center(center);
    // }, [])

    useEffect(() => {
        set_s_isAnimated(true);
    }, [cameraPosition, orbitTarget]);

    // useEffect(() => {
    //     set_s_isAnimated(true);
    // }, [cameraPosition, s_center]);

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

    // useFrame(() => {
    //     if (!s_isAnimated && !s_visible_view2 && !s_visible_view3) return;
    //     const cam = cameraRef.current;
    //     const ctrls = orbitControlsRef.current;
    //     cam?.position.lerp(cameraPosition, 0.05); // 平滑插值: 每幀畫面使相機向目標位置推進5%
    //     ctrls?.target.lerp(s_center, 0.05); // 使相機看向目標位置推進5%
    //     ctrls.update();

    //     // 當相機到達指定位置必須停止動畫
    //     if (cam?.position.distanceTo(cameraPosition) < 0.1 && ctrls.target.distanceTo(s_center) < 0.1) {
    //         cam?.position.copy(cameraPosition);
    //         ctrls.target.copy(s_center);
    //         set_s_isAnimated(false);
    //     }
    // });



    return (
        <>
            <PerspectiveCamera ref={cameraRef} fov={60} near={0.1} far={1000} makeDefault />
            <OrbitControls ref={orbitControlsRef} onStart={cancelAnimate} enableRotate={!s_islocking} makeDefault />
        </>

    )
}


