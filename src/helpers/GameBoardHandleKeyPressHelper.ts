import {GameBoardState} from "../components/GameBoardComponent";
import {InvalidKeyPressError} from "../errors/InvalidKeyPressError";
import GameBoardHelper from "./GameBoardHelper";
import {AlertKeyPressError} from "../errors/AlertKeyPressError";
const wordExists = require("word-exists");

export class GameBoardHandleKeyPressHelper {
    private static handleLetterKeyPress(key: String, oldState: GameBoardState): GameBoardState {
        return {
            ...oldState,
            currentGuess: oldState.currentGuess + key.toUpperCase(),
        };
    }

    private static handleBackspaceKeyPress(oldState: GameBoardState): GameBoardState {
        return {
            ...oldState,
            currentGuess: oldState.currentGuess.slice(0, -1),
        };
    }

    private static handleEnterKeyPress(oldState: GameBoardState, correctWord: String): GameBoardState {
        if (!GameBoardHelper.isWordValidLength(oldState.currentGuess, correctWord))
            throw new AlertKeyPressError("Not enough letters.");

        if (!wordExists(oldState.currentGuess))
            throw new AlertKeyPressError("Word must exist.");

        if (!GameBoardHelper.isWordNotGuessed(oldState.currentGuess, oldState.wordGuesses))
            throw new AlertKeyPressError("Word has already been guessed.");

        const currentGuessStatus = GameBoardHelper.getWordStatus(oldState.currentGuess, correctWord);

        const won = GameBoardHelper.isWordCorrect(oldState.currentGuess, correctWord);

        return {
            ...oldState,
            wordGuesses: [...oldState.wordGuesses, oldState.currentGuess],
            currentGuess: "",
            wordGuessesStatus: [...oldState.wordGuessesStatus, currentGuessStatus],
            hasWon: won,
            letterStatus: GameBoardHelper.newLetterStatus(oldState.letterStatus, oldState.currentGuess, currentGuessStatus),
        };
    }

    static handleKeyPress (key: String, oldState: GameBoardState, correctWord: String, maxGuesses: Number): GameBoardState {
        if (oldState.hasWon)
            throw new InvalidKeyPressError("You have already won the game");
        if (oldState.wordGuesses.length >= maxGuesses)
            throw new InvalidKeyPressError("You have already lost the game");

        // If key is a letter
        if (key.length === 1 && key.match(/[a-zA-Z]/i) && oldState.currentGuess.length < correctWord.length)
            return this.handleLetterKeyPress(key, oldState);

        // If key is backspace/delete
        if (key === "Backspace" || key === "Delete")
            return this.handleBackspaceKeyPress(oldState);

        // If key is enter
        if (key === "Enter")
            return this.handleEnterKeyPress(oldState, correctWord);

        throw new InvalidKeyPressError("Invalid key press");
    }
}