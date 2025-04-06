import { createContext, useContext, useState } from "react";

const ThreeContext = createContext();

export const ThreeProvider = ({children}) => {
    const [s_cameraType, set_s_cameraType] = useState("third");
    const [s_isPlayerShowing, set_s_isPlayerShowing] = useState(false);
    const [s_isDialogueShowing, set_s_isDialogueShowing] = useState(false);
    const [s_interactObj, set_s_interactObj] = useState(undefined);

    return (
        <ThreeContext.Provider value={{
            s_cameraType, set_s_cameraType,
            s_isPlayerShowing, set_s_isPlayerShowing,
            s_isDialogueShowing, set_s_isDialogueShowing,
            s_interactObj, set_s_interactObj
        }}>
            {children}
        </ThreeContext.Provider>
    );
}

export const useThreeContext = () => {
    return useContext(ThreeContext);
}