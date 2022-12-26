import { useState } from "react";

function useIsVisible(): boolean {

    const [isVisible, setIsVisible] = useState(true);

    document.addEventListener("visibilitychange", () => {
        setIsVisible(!document.hidden);
    });

    return isVisible;
}



export default useIsVisible;