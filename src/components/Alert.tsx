import React, { useState, useEffect } from 'react';
import {AlertDiv} from "../styledComponents/AlertDiv";

export default function Alert ({message, color, ttl}: {message: String, color: String, ttl: Number}) {
    const [visible, setVisible] = useState(true);
    const [animation, setAnimation] = useState("hide");

    useEffect(() => {
        setAnimation("show");
        const timer1 = setTimeout(() => {
            setAnimation("hide");
            }, ttl.valueOf() - 200);
        const timer2 = setTimeout(() => {
           setVisible(false);
        }, ttl.valueOf());

        return () => {clearTimeout(timer1); clearTimeout(timer2);};
    }, [ttl]);

    return visible ? (
        <AlertDiv className={animation} color={color.valueOf()}>
            <p>{message}</p>
        </AlertDiv>
    ) : null;
};