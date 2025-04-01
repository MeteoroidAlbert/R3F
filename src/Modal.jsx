import { Canvas, useLoader } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from "three";
export const AGV = () => {
    const [s_position, set_s_position] = useState([10, 0.5, 16])
    const { scene } = useGLTF("/modal/AGV/scene.gltf");
    return <primitive object={scene} position={s_position} scale={[0.01, 0.01, 0.01]} />
}

export const Shelf_1 = () => {
    const { scene } = useGLTF("/modal/shelf/shelf_1/scene.gltf");
    return <primitive object={scene} scale={[2.5, 2.5, 2.5]} position={[8, 0.5, 3]} />;
}