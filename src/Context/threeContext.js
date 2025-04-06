import { createContext, useContext, useState } from "react";

const ThreeContext = createContext();

export const ThreeProvider = ({children}) => {
    const [s_cameraType, set_s_cameraType] = useState("third");

    return (
        <ThreeContext.Provider value={{
            s_cameraType, set_s_cameraType,
        }}>
            {children}
        </ThreeContext.Provider>
    );
}

export const useThreeContext = () => {
    return useContext(ThreeContext);
}