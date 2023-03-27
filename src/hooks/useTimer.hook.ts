import React from 'react';

export interface UseTimerHookProps {
}

export const UseTimerHook = (props:UseTimerHookProps) => {
    const [timer, setTimer] = React.useState(0);

    const resetTimer = () => {

    }

    const startTimer = () => {

    }


    return {
        timer,
        resetTimer,
        startTimer
    }
};
