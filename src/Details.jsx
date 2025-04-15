import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThirdPersonController from "./Modal/camera/ThirdPersonController";
import * as THREE from "three";

export default function Details() {
    const [Component, setComponent] = useState(undefined);
    const { modal } = useParams();

    useEffect(() => {
        import(`./Modal/${modal}.jsx`)
            .then((mod) => setComponent(() => mod.default))
            .catch((err) => console.log(err));
    }, [])

    return (
        <div className="relative w-full h-screen">
            <Canvas className="bg-[#b0c4de]">
                {/*光源*/}
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 100, 10]} castShadow />
                {/* {//} */}
                {/* // <Box type="wall_marble" position={[10, 45.5, -89.5]} args={[200, 90, 1]} />
                // <Box type="wall_marble" position={[-89.5, 45.5, 10]} args={[1, 90, 200]} />
                // <Box type="floor_1" position={[10, 0, 10]} args={[200, 1, 200]} /> */}
                {Component && <Component defaultClick={false} position={[0, 1, 0]} />}

                <ThirdPersonController cameraPosition={new THREE.Vector3(25, 25, 25)} orbitTarget={new THREE.Vector3(0, 1, 0)} />
                {/* <OrbitControls/> */}
                {/*坐標軸*/}
                <primitive object={new THREE.AxesHelper(1000)} />
                
            </Canvas>
        </div>

    )
}