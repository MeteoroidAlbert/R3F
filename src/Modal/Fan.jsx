import { Gltf, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Fan({ position, scale, rotation }) {
  // 同時使用useGLTF與<GLTF>，避免scene從useGLTF加載出來時，受到Three.js底層邏輯限制，在畫面上
  // 無法同時存在複數個相同路徑來源的元件

  // 1. 只使用 useGLTF 的方式加載出文件內的動畫資料，但不在此賦值出scene
  const { animations } = useGLTF("/modal/fan/scene.gltf");
  
  // 2. 透過 useAnimations 的綁定動畫到ref上
  const groupRef = useRef();
  const { actions } = useAnimations(animations, groupRef);

  // 3. 處理動畫播放
  useEffect(() => {
    if (animations?.length) {
      actions[animations[0].name]?.play();
    }
    return () => actions[animations[0].name]?.stop();
  }, [actions]);

  // 4. 渲染時，透過Gltf元件來加載scene，這樣可以避免前敘述問題
  // 關鍵概念: 分開處理動畫與場景，即可確保元件的動畫與渲染能夠被複用
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Gltf src="/modal/fan/scene.gltf" />
    </group>
  );
}