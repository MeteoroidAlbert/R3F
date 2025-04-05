import { DragControls, Gltf } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
export default function FireExtinguisher({ position, scale, rotation, s_comeraType }) {
    const content = (
        <Gltf
            src={"/modal/fire_extinguisher/scene.gltf"}
            position={position}
            scale={scale}
            rotation={rotation}
        />
    )

    return s_comeraType === "drag" ? (
        <DragControls dragLimits={[undefined, [0, 0], undefined]}>
            {content}
        </DragControls>
    ) : (
        content
    );
}