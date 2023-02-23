import React, { useState, useEffect } from 'react';
import {AlertDiv} from "../styledComponents/AlertDiv";

export default function Alert ({message, color}: {message: String, color: String}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return visible ? (
        <AlertDiv color={color.valueOf()}>
            <p>{message}</p>
        </AlertDiv>
    ) : null;
};