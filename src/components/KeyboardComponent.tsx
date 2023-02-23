import React from "react";
import KeyComponent from "./KeyComponent";
import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";
import {KeyBoardRowDiv} from "../styledComponents/KeyBoardRowDiv";
import {KeyBoardDiv} from "../styledComponents/KeyBoardDiv";

type KeyboardState = {
    keys: String[][],
}

type KeyboardProps = {
    handleKeyPress: (letter: String) => void,
    letterStatus: Map<String, Number>,
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
    });

    return (
        <KeyBoardDiv>
            {state.keys.map((row, i) => (
                <KeyBoardRowDiv key={i}>
                    {row.map((key, j) =>
                        <KeyComponent key={j} letter={key} status={props.letterStatus.get(key)} handleKeyPress={props.handleKeyPress} />)}
                </KeyBoardRowDiv>
            ))}
        </KeyBoardDiv>
    );
}