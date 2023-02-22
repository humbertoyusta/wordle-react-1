import React from "react";
import KeyComponent from "./KeyComponent";
import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

type KeyboardState = {
    keys: String[][],
    status: Number[][],
}

type KeyboardProps = {
    handleKeyPress: (letter: String) => void,
}

// Create the keyboard state
const keys: String[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete'],
];
// Create the keyboard status
const status: Number[][] = [];
for (let i = 0; i < keys.length; i++) {
    status.push([]);
    for (let j = 0; j < keys[i].length; j++) {
        status[i].push(LetterCellStatusEnum.EMPTY);
    }
}
export default function KeyboardComponent(props: KeyboardProps) {
    const [state, setState] = React.useState<KeyboardState>({
        keys: keys,
        status: status,
    });

    return (
        <div className={"flex-nowrap flex flex-col mt-5"}>
            {state.keys.map((row, i) => (
                <div key={i} className={"flex-row flex justify-between flex-nowrap m-auto"}>
                    {row.map((key, j) =>
                        <KeyComponent key={j} letter={key} status={state.status[i][j]} handleKeyPress={props.handleKeyPress} />)}
                </div>
            ))}
        </div>
    );
}