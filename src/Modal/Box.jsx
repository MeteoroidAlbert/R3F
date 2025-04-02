import { useLoader } from '@react-three/fiber';
import * as THREE from "three";
export default function Box({ type, position, args }) {
    const textures = {
        floor_1: [
            "/image/textures/floor/concrete/concrete_31-2K/2K-concrete_31-diffuse.jpg", // diffuseMap
            "/image/textures/floor/concrete/concrete_31-2K/2K-concrete_31-displacement.jpg", // displacementMap
            "/image/textures/floor/concrete/concrete_31-2K/2K-concrete_31-normal.jpg", // normalMap
            null, // roughnessMap
        ],
        floor_2: [
            "/image/textures/floor/concrete/vermond_grey-2K/2K-vermond_grey-diffuse.jpg", // diffuseMap
            "/image/textures/floor/concrete/vermond_grey-2K/2K-vermond_grey-displacement.jpg", // diplacementMap
            "/image/textures/floor/concrete/vermond_grey-2K/2K-vermond_grey-normal.jpg", // normalMap
            null,
        ],
        wall: [
            "/image/textures/wall/concrete/seamless_concrete_48-2K/2K-concrete_48_Base Color.jpg", // diffuseMap
            "/image/textures/wall/concrete/seamless_concrete_48-2K/2K-concrete_48_Height.jpg", // displacementMap
            "/image/textures/wall/concrete/seamless_concrete_48-2K/2K-concrete_48_Normal.jpg", // normalMap
            "/image/textures/wall/concrete/seamless_concrete_48-2K/2K-concrete_48_Roughness.jpg", // roughnessMap
        ],
    }

    const validTextures = textures[type].filter(texture => texture !== null && texture !== undefined);


    const [diffuseMap, displacementMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, validTextures);





    return (
        <mesh position={position} >
            <boxGeometry args={args} />
            <meshStandardMaterial
                map={diffuseMap}           // 基礎顏色
                displacementMap={displacementMap}
                displacementScale={0.1}    // 置換高度
                normalMap={normalMap}      // 法線
                roughnessMap={roughnessMap}  // 粗糙度
                roughness={0.7}            // 控制粗糙度
            />
        </mesh>
    );
}