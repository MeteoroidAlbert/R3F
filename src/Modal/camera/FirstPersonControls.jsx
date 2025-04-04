import { FirstPersonControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from "three";

export default function FirstPersonCameraControls() {
    const { camera, gl } = useThree();

    useFrame(() => {
        camera.position.y = 30;
    });

    return (
        <FirstPersonControls
            args={[camera, gl.domElement]} // gl.domElement 指向此相機綁定的Canvas元素
            lookSpeed={0.1}
            movementSpeed={60}
            lookVertical={true}          // 不允許上下看
            constrainVertical={true}      // 限制垂直視角
            verticalMin={Math.PI / 4}     // 約 45 度，下視角（人低頭時）
            verticalMax={(Math.PI * 3) / 4} // 約 135 度，上視角（人抬頭時）
        />
    );
}
