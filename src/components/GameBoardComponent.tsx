import React from "react";
import WordComponent from "./WordComponent";
import {useGameBoardContext} from "../contexts/GameBoardProvider";
import useKeypress from "../hooks/useKeypress";
import KeyboardComponent from "./KeyboardComponent";
import {GameBoardHandleKeyPressHelper} from "../helpers/GameBoardHandleKeyPressHelper";
import {InvalidKeyPressError} from "../errors/InvalidKeyPressError";
import {AlertKeyPressError} from "../errors/AlertKeyPressError";
import Alert from "./Alert";

export type GameBoardState = {
    currentGuess: String,
    hasWon: Boolean,
    letterStatus: Map<String, Number>,
    wordGuesses: String[],
    wordGuessesStatus: Number[][],
}

export default function GameBoardComponent() {
    const [alert, setAlert] = React.useState<JSX.Element | undefined>(undefined);

    // get maxGuesses and correctWord from the context
    const {maxGuesses, correctWord} = useGameBoardContext();

    const [state, setState] = React.useState<GameBoardState>({
        wordGuesses: [],
        wordGuessesStatus: [],
        currentGuess: "",
        hasWon: false,
        letterStatus: new Map<String, Number>(),
    });

    const handleKeyPress = (key: String) => {
        try {
            const newState = GameBoardHandleKeyPressHelper.handleKeyPress(key, state, correctWord, maxGuesses);

            setState(newState);

            if (newState.hasWon)
                setAlert(<Alert message={"Congratulations, you won!"} color={"green"} />);

            if (newState.wordGuesses.length === maxGuesses)
                setAlert(<Alert message={"You lost! The correct word was: " + correctWord} color={"red"} />);
        } catch (e) {
            if (e instanceof AlertKeyPressError)
                setAlert(<Alert message={e.message} color={"red"} />);
            else {
                if (!(e instanceof InvalidKeyPressError))
                    throw e;
            }
        }
    }

    useKeypress(handleKeyPress);

    // Create a counter to use as a key for each word component
    let counter = 0;

    // List all previous guesses
    const words = state.wordGuesses.map(
        (word: String, index: number) =>
            <WordComponent key={counter ++} word={word} status={state.wordGuessesStatus[index]} />
    );

    // Add the current guess
    if (!state.hasWon && state.wordGuesses.length < maxGuesses)
        words.push(<WordComponent key={counter ++} word={state.currentGuess} status={[]} />);

    // Add empty words to fill the remaining guesses
    while (words.length < maxGuesses)
        words.push(<WordComponent key={counter ++} word={""} status={[]} />);

    return (
        <>
            {alert}
            <div className="flex-col flex justify-between flex-nowrap m-auto">
                {words}
            </div>
            <KeyboardComponent handleKeyPress={handleKeyPress} letterStatus={state.letterStatus} />
        </>
    );
}





