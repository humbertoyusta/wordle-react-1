import React from "react";
import WordComponent from "./WordComponent";
import {useGameBoardContext} from "../contexts/GameBoardProvider";
import useKeypress from "../hooks/useKeypress";
import GameBoardHelper from "../helpers/GameBoardHelper";

type GameBoardState = {
    wordGuesses: String[],
    wordGuessesStatus: Number[][],
    currentGuess: String,
}

export default function GameBoardComponent() {
    const [state, setState] = React.useState<GameBoardState>({
        wordGuesses: [],
        wordGuessesStatus: [],
        currentGuess: "",
    });

    // Add a character to currentGuess when a key is pressed
    useKeypress((key: string) => {
        if (key.length === 1) {
            let charToAppend = key.toUpperCase();
            setState({...state, currentGuess: state.currentGuess + charToAppend});
        }
    });

    // Add the currentGuess to wordGuesses when the enter key is pressed
    const correctWord = useGameBoardContext().correctWord;
    useKeypress((key: string) => {
        if (key === "Enter") {

            if (!GameBoardHelper.isWordValidLength(state.currentGuess, correctWord))
                alert("Word must be the same length as the correct word");

            if (!GameBoardHelper.isWordNotGuessed(state.currentGuess, state.wordGuesses))
                alert("Word has already been guessed");

            const currentGuessStatus = GameBoardHelper.getWordStatus(state.currentGuess, correctWord);

            setState({
                ...state,
                wordGuesses: [...state.wordGuesses, state.currentGuess],
                currentGuess: "",
                wordGuessesStatus: [...state.wordGuessesStatus, currentGuessStatus],
            });
        }
    });

    // Remove the last character from currentGuess when the backspace key is pressed
    useKeypress((key: string) => {
        if (key === "Backspace")
            setState({...state, currentGuess: state.currentGuess.slice(0, -1)});
    });

    // get maxGuesses from the context
    const maxGuesses = useGameBoardContext().maxGuesses;

    // Create a counter to use as a key for each word component
    let counter = 0;

    // List all previous guesses
    const words = state.wordGuesses.map(
        (word: String, index: number) =>
            <WordComponent key={counter ++} word={word} status={state.wordGuessesStatus[index]} />
    );

    // Add the current guess
    words.push(<WordComponent key={counter ++} word={state.currentGuess} status={[]} />);

    // Add empty words to fill the remaining guesses
    while (words.length < maxGuesses)
        words.push(<WordComponent key={counter ++} word={""} status={[]} />);

    return (
        <div className="flex-col flex justify-between flex-nowrap m-auto">
            {words}
        </div>
    );
}





