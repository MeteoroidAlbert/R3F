import { DragControls, Gltf } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useThreeContext } from '../Context/threeContext';
export default function FireExtinguisher({ position, scale, rotation }) {
    const {s_cameraType} = useThreeContext();
    const content = (
        <Gltf
            src={"/modal/fire_extinguisher/scene.gltf"}
            position={position}
            scale={scale}
            rotation={rotation}
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