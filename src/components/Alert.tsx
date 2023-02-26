import React, { useState, useEffect } from 'react';
import {AlertDiv} from "../styledComponents/AlertDiv";

type AlertProps = {
    message: String,
    color: String,
    ttl: Number,
};

export default function Alert ({message, color, ttl}: AlertProps) {
    const [visible, setVisible] = useState(true);
    const [animation, setAnimation] = useState("hide");

    useEffect(() => {
        // set the show animation
        setAnimation("show");
        // set a timer to trigger the hide animation
        const timer1 = setTimeout(() => {
            setAnimation("hide");
            }, ttl.valueOf() - 200);
        // set a timer to remove the alert from the DOM
        const timer2 = setTimeout(() => {
           setVisible(false);
        }, ttl.valueOf());

        // return a function to clear the timers
        return () => {clearTimeout(timer1); clearTimeout(timer2);};
    }, [ttl]);

    // return the alert if it is visible
    return visible ? (
        <AlertDiv className={animation} color={color.valueOf()}>
            <p>{message}</p>
        </AlertDiv>
    ) : null;
};