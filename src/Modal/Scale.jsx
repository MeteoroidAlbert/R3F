function Pillar({ position }) {
    return (
        <group position={position}>
            <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 64, 64]} />
                <meshStandardMaterial />
            </mesh>
            <mesh position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.25, 0.25, 0.2, 64, 64]} />
                <meshStandardMaterial />
            </mesh>
        </group>
    )

}

export default function Scales({ position, scale, rotation }) {
    const pillarPositions = [
        [4, 0, 2.5],
        [4, 0, -2.5],
        [-4, 0, 2.5],
        [-4, 0, -2.5]
    ]

    return (
        <group position={position} scale={scale} rotation={rotation}>
            {/*秤頭*/}
            <mesh position={[5.3, 5.5, 0]} rotation={[0, 0, -Math.PI/8]}>
                <boxGeometry args={[0.4, 1.2, 3]} />
                <meshStandardMaterial />
            </mesh>
            {/*秤頸*/}
            <mesh position={[5.3, 2.3, 0]}>
                <boxGeometry args={[0.4, 6, 0.8]} />
                <meshStandardMaterial />
            </mesh>
            <mesh position={[2.5, -0.6, 0]}>
                <boxGeometry args={[6, 0.4, 0.8]} />
                <meshStandardMaterial />
            </mesh>
            {/*秤盤*/}
            <mesh>
                <boxGeometry args={[9, 1, 6]} />
                <meshStandardMaterial />
            </mesh>
            {/*秤身*/}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[8.5, 0.5, 5.5]} />
                <meshStandardMaterial />
            </mesh>
            {/*秤腳*/}
            {pillarPositions.map((pos, i) => <Pillar position={pos} key={i} />)}

        </group>
    )
}