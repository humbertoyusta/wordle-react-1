import React, { useState, useEffect } from 'react';
import {AlertDiv} from "../styledComponents/AlertDiv";

const ALERT_DURATION = 1000;

export default function Alert ({message, color}: {message: String, color: String}) {
    const [visible, setVisible] = useState(true);
    const [animation, setAnimation] = useState("hide");

    useEffect(() => {
        setAnimation("show");
        const timer1 = setTimeout(() => {
            setAnimation("hide");
            }, ALERT_DURATION - 200);
        const timer2 = setTimeout(() => {
           setVisible(false);
        }, ALERT_DURATION);

        return () => {clearTimeout(timer1); clearTimeout(timer2);};
    }, []);

    return visible ? (
        <AlertDiv className={animation} color={color.valueOf()}>
            <p>{message}</p>
        </AlertDiv>
    ) : null;
};