import React from "react";
import WordComponent from "./WordComponent";
import {useGameBoardContext} from "../contexts/GameBoardProvider";
import useKeypress from "../hooks/useKeypress";
import KeyboardComponent from "./KeyboardComponent";
import {GameBoardHandleKeyPressHelper} from "../helpers/GameBoardHandleKeyPressHelper";
import {InvalidKeyPressError} from "../errors/InvalidKeyPressError";
import {AlertKeyPressError} from "../errors/AlertKeyPressError";
import Alert from "./Alert";
import {RevealPositionComponent} from "./RevealPositionComponent";

export type GameBoardState = {
    currentGuess: String,
    hasWon: Boolean,
    letterStatus: Map<String, Number>,
    wordGuesses: String[],
    wordGuessesStatus: Number[][],
    revealedPositions: Number[],
}

export default function GameBoardComponent() {
    const [alert, setAlert] = React.useState<JSX.Element | undefined>(undefined);
    const [shouldShake, setShouldShake] = React.useState<Boolean>(false);

    // get maxGuesses and correctWord from the context
    const {maxGuesses, correctWord, maxReveals} = useGameBoardContext();

    const [state, setState] = React.useState<GameBoardState>({
        wordGuesses: [],
        wordGuessesStatus: [],
        currentGuess: "",
        hasWon: false,
        letterStatus: new Map<String, Number>(),
        revealedPositions: [],
    });

    const handleKeyPress = (key: String) => {
        try {
            const newState = GameBoardHandleKeyPressHelper.handleKeyPress(key, state, correctWord, maxGuesses);

            setState(newState);

            if (newState.hasWon)
                setAlert(<Alert message={"Congratulations, you won!"} color={"green"} ttl={5000} key={Math.random()}/>);

            if (newState.wordGuesses.length === maxGuesses && !newState.hasWon)
                setAlert(<Alert message={"You lost! The correct word was: " + correctWord} color={"red"} ttl={5000} key={Math.random()}/>);
        } catch (e) {
            if (e instanceof AlertKeyPressError) {
                setAlert(<Alert message={e.message} color={"red"} ttl={1200} key={Math.random()}/>);
                setShouldShake(true);
            }
            else {
                if (!(e instanceof InvalidKeyPressError))
                    throw e;
            }
        }
    };

    const handleAnimationEnd = React.useRef(() => {
        setShouldShake(false);
    });

    const handleRevealPosition = () => {
        const newRevealedPositions = state.revealedPositions.slice();
        while (true) {
            const newPosition = Math.floor(Math.random() * correctWord.length);
            if (!newRevealedPositions.includes(newPosition)) {
                newRevealedPositions.push(newPosition);
                break;
            }
        }
        const newPosition = newRevealedPositions[newRevealedPositions.length - 1];
        let newGuess = state.currentGuess.slice();
        if (newGuess.length > newPosition.valueOf())
            newGuess = newGuess.slice(0, newPosition.valueOf()) +
                correctWord[newPosition.valueOf()] +
                newGuess.slice(newPosition.valueOf() + 1);
        setState({...state, revealedPositions: newRevealedPositions, currentGuess: newGuess});
    };

    useKeypress(handleKeyPress);

    // Create a counter to use as a key for each word component
    let counter = 0;

    // List all previous guesses
    const words = state.wordGuesses.map(
        (word: String, index: number) =>
            <WordComponent
                key={counter ++}
                word={word}
                revealedPositions={state.revealedPositions}
                status={state.wordGuessesStatus[index]}
                shouldColor={true}
            />
    );

    // Add the current guess
    if (!state.hasWon && state.wordGuesses.length < maxGuesses)
        words.push(<WordComponent
            key={counter ++}
            word={state.currentGuess}
            status={[]}
            revealedPositions={state.revealedPositions}
            shouldShake={shouldShake}
            onAnimationEnd={handleAnimationEnd.current}
        />);

    // Add empty words to fill the remaining guesses
    while (words.length < maxGuesses)
        words.push(<WordComponent
            key={counter ++}
            word={""}
            status={[]}
            revealedPositions={[]}
        />);

    return (
        <>
            {alert}
            <div className="flex-col flex justify-between flex-nowrap m-auto">
                {words}
            </div>
            <KeyboardComponent handleKeyPress={handleKeyPress} letterStatus={state.letterStatus} />
            {state.revealedPositions.length < maxReveals &&
                <RevealPositionComponent handleRevealPosition={handleRevealPosition} />
            }
        </>
    );
}





