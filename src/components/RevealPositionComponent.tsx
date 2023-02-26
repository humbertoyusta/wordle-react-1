import React from "react";
import {RevealPositionButton} from "../styledComponents/RevealPositionButton";

type Props = {
    handleRevealPosition: () => void,
}

export const RevealPositionComponent = ({handleRevealPosition}: Props) => {
    const ref = React.useRef<HTMLButtonElement>(null);
    return (
        <RevealPositionButton
            ref={ref}
            onClick={() => { handleRevealPosition(); ref.current?.blur();}}
        />
    );
};