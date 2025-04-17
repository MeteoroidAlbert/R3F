import { createContext, useContext, useEffect, useState } from "react";
import { componentMap } from '../util';

const ThreeContext = createContext();

export const ThreeProvider = ({ children }) => {
    const [s_cameraType, set_s_cameraType] = useState("third"); // ----------------------> 相機(視角)類型
    const [s_isPlayerShowing, set_s_isPlayerShowing] = useState(false);  // -------------> 第一人稱角色顯示
    const [s_isDialogueShowing, set_s_isDialogueShowing] = useState(false); // ----------> 提示框顯示
    const [s_interactObj, set_s_interactObj] = useState(undefined);  // -----------------> 物理引擎交互物件
    const [s_selectedObj_view2, set_s_selectedObj_view2] = useState(undefined) // -------> View2選中物件
    const [s_visible_view2, set_s_visible_view2] = useState(false);  // -----------------> View2子畫布顯示
    const [Component_view2, setComponent_view2] = useState(undefined); // ---------------> View2渲染元件
    const [s_selectedObj_view3, set_s_selectedObj_view3] = useState(undefined) // -------> View3選中物件
    const [s_visible_view3, set_s_visible_view3] = useState(false);  // -----------------> View3子畫布顯示
    const [Component_view3, setComponent_view3] = useState(undefined); // ---------------> View3渲染元件

    // 設定View2渲染元件
    useEffect(() => {
        setComponent_view2(() => componentMap[s_selectedObj_view2] || null);
    }, [s_selectedObj_view2]);

    // 延遲visible = true(hint: 使View2可以表現出Drawer行為)
    useEffect(() => {
        if (Component_view2 && s_cameraType === "third") {
            setTimeout(() => {
                set_s_visible_view2(true);
            }, 100)

        }
        else {
            set_s_visible_view2(false);
        }
    }, [Component_view2])

    // 設定View3渲染元件
    useEffect(() => {
        setComponent_view3(() => componentMap[s_selectedObj_view3] || null);
    }, [s_selectedObj_view3]);

    // 延遲visible = true(hint: 使View3可以表現出Drawer行為)
    useEffect(() => {
        if (Component_view3 && s_cameraType === "third") {
            setTimeout(() => {
                set_s_visible_view3(true);
            }, 100)

        }
        else {
            set_s_visible_view3(false);
        }
    }, [Component_view3])


    return (
        <ThreeContext.Provider value={{
            s_cameraType, set_s_cameraType,
            s_isPlayerShowing, set_s_isPlayerShowing,
            s_isDialogueShowing, set_s_isDialogueShowing,
            s_interactObj, set_s_interactObj,
            s_selectedObj_view2, set_s_selectedObj_view2,
            s_visible_view2, set_s_visible_view2,
            Component_view2, setComponent_view2,
            s_selectedObj_view3, set_s_selectedObj_view3,
            s_visible_view3, set_s_visible_view3,
            Component_view3, setComponent_view3,
        }}>
            {children}
        </ThreeContext.Provider>
    );
}

export const useThreeContext = () => {
    return useContext(ThreeContext);
}