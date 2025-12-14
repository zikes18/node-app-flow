import { useEffect, useState } from "react";

export function usePomodoroLogic(initialValue) {
    const [timeLeft, setTimeLeft] = useState(initialValue);
    const [currentTime, setCurrentTime] = useState(false);

    useEffect(() => {
        let timer = null;

        if (currentTime) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    console.log(prev);
                    if (prev <= 1){
                    clearInterval(timer);
                    return 0;
                }
        return prev - 1;
            });
        }, 1000);
    }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [currentTime]);

    function startTimer(){
        setCurrentTime(true);
    }
    function pauseTimer(){
        setCurrentTime(false);
    }
    function resetTimer(newTimer){
        setCurrentTime(false);
        setTimeLeft(newTimer);
    }
    return { timeLeft, currentTime, startTimer, pauseTimer, resetTimer
    };
}