// import * as THREE from "three"

// import { useEffect, useRef } from "react"
// import { useFrame, useThree } from "@react-three/fiber"
// import { PointerLockControls, useKeyboardControls } from "@react-three/drei"
// import { CapsuleCollider, RigidBody } from "@react-three/rapier"


// const SPEED = 50
// const direction = new THREE.Vector3()
// const frontVector = new THREE.Vector3()
// const sideVector = new THREE.Vector3()

// export function Player() {
//     const { camera } = useThree();
//     const ref = useRef();
//     const controlsRef = useRef();
//     const [, get] = useKeyboardControls()

//     // 初始化相機位置
//     useEffect(() => {
//         camera.position.set(0, 2, 0)
//         return () => {
//             // 切換視角時重置相機控制
//             if (controlsRef.current) {
//                 controlsRef.current.dispose()
//             }
//         }
//     }, [camera])

//     useFrame((state) => {
//         if (!ref.current) {
//             console.log("Not ready!");
//             return;
//         }
//         const { forward, backward, left, right } = get();
//         const velocity = ref.current.linvel()
//         // update camera
//         const { x, y, z } = ref.current.translation()
//         camera.position.set(x, y + 1.8, z) // 1.8 是玩家高度偏移
//         // movement
//         frontVector.set(0, 0, backward - forward)
//         sideVector.set(left - right, 0, 0)
//         direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
//         ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
//     })
//     return (
//         <>
//             <PointerLockControls ref={controlsRef} />
//             <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 1, 0]} enabledRotations={[false, false, false]}>
//                 <CapsuleCollider args={[15.75, 15.5]} />
//             </RigidBody>
//         </>
//     )
// }
import * as THREE from "three"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import { useThreeContext } from "../../Context/threeContext"

const SPEED = 30 // 降低速度以增加穩定性
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export function Player() {
  const {set_s_isPlayerShowing}= useThreeContext();
  const ref = useRef()
  const [, get] = useKeyboardControls()

  // 防止物理引擎休眠
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.wakeUp() // 每1秒強制喚醒物理體
      }
    }, 1000)
    set_s_isPlayerShowing(true);
    return () => {
      clearInterval(interval)
      set_s_isPlayerShowing(false);
    }
  }, [])

  useFrame((state) => {
    if (!ref.current) return

    const { forward, backward, left, right } = get()
    const velocity = ref.current.linvel()
    const pos = ref.current.translation()

    // 正確設置相機位置（Y軸偏移）
    state.camera.position.set(
      pos.x,
      pos.y + 1.8, // 標準第一人稱視角高度偏移
      pos.z
    )

    // 移動方向計算
    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation)

    // 始終允許移動（無需接地檢測）
    ref.current.setLinvel({
      x: direction.x,
      y: velocity.y, // 保持原有Y軸速度（重力）
      z: direction.z
    })

    // 手動重置異常狀態（防止卡住）
    // if (Math.abs(velocity.x) < 0.01 && Math.abs(velocity.z) < 0.01 && (forward || backward || left || right)) {
    //   ref.current.setLinvel({
    //     x: direction.x * 2, // 輕微助推
    //     y: velocity.y,
    //     z: direction.z * 2
    //   })
    // }
  })

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 10, 0]}
      enabledRotations={[false, false, false]}
      linearDamping={0.25} // 適當阻尼
      friction={0.1}       // 降低摩擦
      userData={{ name: "player" }}
    >
      <CapsuleCollider args={[15.88, 0.5]} /> {/* 標準人形尺寸 */}
    </RigidBody>
  )
}

