import { useLoader } from '@react-three/fiber';
import * as THREE from "three";
import { Geometry, Base, Addition, Subtraction, ReverseSubtraction, Intersection, Difference } from '@react-three/csg'
import Fan from './Fan';
import { RigidBody } from '@react-three/rapier';

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
    wall_concrete: [
        "/image/textures/wall/concrete/seamless_concrete_48-2K/2K-concrete_48_Base Color.jpg", // diffuseMap
        "/image/textures/wall/concrete/seamless_concrete_48-2K/2K-concrete_48_Height.jpg", // displacementMap
        "/image/textures/wall/concrete/seamless_concrete_48-2K/2K-concrete_48_Normal.jpg", // normalMap
        "/image/textures/wall/concrete/seamless_concrete_48-2K/2K-concrete_48_Roughness.jpg", // roughnessMap

    ],
    wall_paper: [
        "/image/textures/wall/wallpaper/wallpaper_38-2K/2K-wallpaper_38_basecolor.png",  // diffuseMap
        "/image/textures/wall/wallpaper/wallpaper_38-2K/2K-wallpaper_38_height.png", // displacementMap
        "/image/textures/wall/wallpaper/wallpaper_38-2K/2K-wallpaper_38_normal.png", // normalMap
        "/image/textures/wall/wallpaper/wallpaper_38-2K/2K-wallpaper_38_roughness.png", //  roughnessMap
    ],
    wall_marble: [
        "/image/textures/wall/marble/king_white_marble-2K/king_white_-_polished_-_marble-diffuse-2K.png",
        "/image/textures/wall/marble/king_white_marble-2K/king_white_-_polished_-_marble-displacement-2K.png",
        "/image/textures/wall/marble/king_white_marble-2K/king_white_-_polished_-_marble-normal-2K.png",
        "/image/textures/wall/marble/king_white_marble-2K/king_white_-_polished_-_marble-specular-2K.png",
    ]
}

export const Box = ({ type, position, args }) => {


    const validTextures = textures[type].filter(texture => texture !== null && texture !== undefined);
    const [diffuseMap, displacementMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, validTextures);
    const color = type === "floor_1" ? 0x3cb371 : 0xFFFFFF;





    return (
        <RigidBody type="fixed" >
        <mesh position={position} castShadow>
            <boxGeometry args={args} />
            <meshStandardMaterial
                color={color}
                map={diffuseMap}           // 基礎顏色
                displacementMap={displacementMap}
                displacementScale={0.1}    // 置換高度
                normalMap={normalMap}      // 法線
                roughnessMap={roughnessMap}  // 粗糙度
                roughness={type === "floor_1" ? 0.3 : 0.5}            // 控制粗糙度
            />
        </mesh>
        </RigidBody>
    );
}

// [-89.5, 45.5, 10]

export const HoleBox = ({ type, position, args }) => {
    const validTextures = textures[type].filter(texture => texture !== null && texture !== undefined);
    const [diffuseMap, displacementMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, validTextures);
    const color = type === "floor_1" ? 0x3cb371 : 0xFFFFFF;

    return (
        <group position={position}>
            <mesh >
            <Geometry>
                <Base position={[0, 0, 0]}>
                    <boxGeometry args={args} />
                </Base>
                <Subtraction position={[0, 20, 65]}>  
                    <boxGeometry args={[1, 10, 10]} />
                </Subtraction>
                <Subtraction position={[0, 20, 80]}>  
                    <boxGeometry args={[1, 10, 10]} />
                </Subtraction>
            </Geometry>
            <meshStandardMaterial
                color={color}
                map={diffuseMap}           // 基礎顏色
                displacementMap={displacementMap}
                displacementScale={0.1}    // 置換高度
                normalMap={normalMap}      // 法線
                roughnessMap={roughnessMap}  // 粗糙度
                roughness={type === "floor_1" ? 0.3 : 0.5}            // 控制粗糙度
            />
        </mesh>
        <Fan position={[-3.5, 20.05, 65.1]} scale={[0.5, 0.5, 0.5]} rotation={[0, -Math.PI/2, 0]}/>
        <Fan position={[-3.5, 20.05, 80.1]} scale={[0.5, 0.5, 0.5]} rotation={[0, -Math.PI/2, 0]}/> 
        </group>
        
    )
}