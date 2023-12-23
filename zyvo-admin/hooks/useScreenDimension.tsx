import { useEffect, useState } from "react";

export const useScreenDimensions = () => {
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }

    const [screenSize, setScreenSize] = useState(getWindowDimensions());

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getWindowDimensions())
        }
        window.addEventListener('resize', updateDimension);

        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize]);


    return [screenSize.width, screenSize.height]
}