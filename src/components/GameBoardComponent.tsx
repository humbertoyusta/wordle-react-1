import React from "react";
import WordComponent from "./WordComponent";
import {useGameBoardContext} from "../contexts/GameBoardProvider";

type GameBoardState = {
    wordGuesses: String[],
}

export default function GameBoardComponent() {
    const [state, setState] = React.useState<GameBoardState>({
        wordGuesses: [],
    });

    // List all previous guesses
    const words = state.wordGuesses.map((word: String) => <WordComponent word={word}></WordComponent>);

    // get maxGuesses from the context
    const maxGuesses = useGameBoardContext().maxGuesses;

    // Add empty words to fill the remaining guesses
    for (let i = 0; i < maxGuesses.valueOf() - state.wordGuesses.length; i++)
        words.push(<WordComponent word={""} />);

    return (
        <div className="flex-col flex justify-between flex-nowrap m-auto">
            {words}
        </div>
    );
}





