import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function FirstPersonCameraControls() {
  const { camera } = useThree();
  // 持久儲存資訊(hint: useFrame是每幀重新渲染，不儲存的話，則值會被不斷重置)
  const velocity = useRef(new THREE.Vector3()); // 速度向量: 這一幀中，相機要移動的速度（方向 + 大小） ----> 描述的是這一幀應該移動多少"距離"
  const direction = useRef(new THREE.Vector3()); // 方向向量: 當前按鍵輸入導致的移動方向  ----------------> 描述的是 "往哪裡" 走
  const move = useRef({ forward: false, backward: false, left: false, right: false });
  // 場景內相機移動速度
  const speed = 100;

  // FPS移動鏡頭核心概念
  useFrame((_, delta) => {            // delta: 前幀 --> 這一幀 的 "時間差"
    direction.current.set(0, 0, 0);   // 每一幀都先清除方向向量，並根據按鍵輸入重新賦值

    // 方向向量重新賦值
    if (move.current.forward) direction.current.z -= 1;
    if (move.current.backward) direction.current.z += 1;
    if (move.current.left) direction.current.x -= 1;
    if (move.current.right) direction.current.x += 1;

    // 把方向向量轉成長度為 1 的單位向量，避免對角線方向比直走快 -------------------------------------------------------------> 向量合的概念
    direction.current.normalize();
    // 把方向向量根據目前鏡頭的旋轉角度（朝向）做旋轉 ---------------------------------------------> 使用者面朝哪裡，則按「W」就是往那個方向走
    direction.current.applyEuler(camera.rotation);

    // 將方向向量轉成速度向量: 以「每秒 speed 單位距離」移動 -------------->  移動 = 要走的方向(direction) * 速度(speed) * 這幀所花時間(delta)
    velocity.current.copy(direction.current).multiplyScalar(delta * speed);

    // 相機應用此速度去移動
    camera.position.add(velocity.current);

    // 每幀的相機都固定高度 ----------------------------------------------------------------------------------------> 好比人在行走時的身高
    camera.position.y = 30;
  });

  // 鍵盤控制
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW': move.current.forward = true; break;
        case 'KeyS': move.current.backward = true; break;
        case 'KeyA': move.current.left = true; break;
        case 'KeyD': move.current.right = true; break;
        default: break;
      }
    };
    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW': move.current.forward = false; break;
        case 'KeyS': move.current.backward = false; break;
        case 'KeyA': move.current.left = false; break;
        case 'KeyD': move.current.right = false; break;
        default: break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return <PointerLockControls />; // PointerLockControl 是Three.js中的一種相機軌道，專門用於隱藏游標、但可利用游標移動來轉向 ----> FPS 相機的基礎
}
