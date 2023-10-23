import React, { useEffect } from 'react';

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            console.log("🚀 ~ file: useOnClickOutside.js:6 ~ listener ~ ref:", ref.current)
            if(!ref.current || ref.current.contains(event.target)){
                return ;
            }
            handler(); 
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
        }
    }, [ref, handler]);
};

export default useOnClickOutside;