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
import GameBoardHelper from "../helpers/GameBoardHelper";
import {WordListDiv} from "../styledComponents/WordListDiv";

export type GameBoardState = {
    currentGuess: String,
    hasWon: Boolean,
    letterStatus: Map<String, Number>,
    wordGuesses: String[],
    wordGuessesStatus: Number[][],
    revealedPositions: Number[],
}

export default function GameBoardComponent() {
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
    const [alert, setAlert] = React.useState<JSX.Element | undefined>(undefined);
    const [shouldShake, setShouldShake] = React.useState<Boolean>(false);

    const handleKeyPress = (key: String) => {
        try {
            const newState = GameBoardHandleKeyPressHelper.handleKeyPress(
                key, state, correctWord, maxGuesses
            );

            setState(newState);

            // If the player has won, set the alert
            if (newState.hasWon)
                setAlert(<Alert
                    message={"Congratulations, you won!"}
                    color={"green"} ttl={5000} key={Math.random()}
                />);

            // If the player has lost, set the alert
            if (newState.wordGuesses.length === maxGuesses && !newState.hasWon)
                setAlert(<Alert
                    message={"You lost! The correct word was: " + correctWord}
                    color={"red"} ttl={5000} key={Math.random()
                }/>);
        } catch (e) {
            // If the error is an AlertKeyPressError, set the alert
            if (e instanceof AlertKeyPressError) {
                setAlert(<Alert
                    message={e.message} color={"red"} ttl={1200} key={Math.random()}
                />);
                setShouldShake(true);
            }
            else {
                // If the error is not an InvalidKeyPressError, rethrow it
                if (!(e instanceof InvalidKeyPressError))
                    throw e;
            }
        }
    };
    useKeypress(handleKeyPress);

    const handleAnimationEnd = React.useRef(() => {
        setShouldShake(false);
    });

    const handleRevealPosition = () => {
        const newPosition = GameBoardHelper.revealRandomPosition(
            state.revealedPositions,
            state.wordGuessesStatus,
            correctWord
        );
        setState({
            ...state,
            revealedPositions: [...state.revealedPositions, newPosition],
            currentGuess: GameBoardHelper.getNewGuess(state.currentGuess, correctWord, newPosition),
            letterStatus: GameBoardHelper.newLetterStatus(
                state.letterStatus,
                "",
                [],
                [...state.revealedPositions, newPosition],
                correctWord,
            ),
        });
    };

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
            <WordListDiv>{words}</WordListDiv>
            <KeyboardComponent handleKeyPress={handleKeyPress} letterStatus={state.letterStatus} />
            {state.revealedPositions.length < maxReveals &&
                <RevealPositionComponent handleRevealPosition={handleRevealPosition} />
            }
        </>
    );
}





