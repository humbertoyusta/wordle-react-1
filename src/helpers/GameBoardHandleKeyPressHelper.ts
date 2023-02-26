import {GameBoardState} from "../components/GameBoardComponent";
import {InvalidKeyPressError} from "../errors/InvalidKeyPressError";
import GameBoardHelper from "./GameBoardHelper";
import {AlertKeyPressError} from "../errors/AlertKeyPressError";
const wordExists = require("word-exists");

export class GameBoardHandleKeyPressHelper {
    private static handleLetterKeyPress(key: String, oldState: GameBoardState, correctWord: String) {
        let newGuess = oldState.currentGuess.slice();
        // If the next letter is revealed, add it to the guess
        while (oldState.revealedPositions.includes(newGuess.length))
            newGuess += correctWord[newGuess.length];
        // Add the pressed letter to the guess
        newGuess += key.toUpperCase();
        // If the next letter is revealed, add it to the guess
        while (oldState.revealedPositions.includes(newGuess.length))
            newGuess += correctWord[newGuess.length];
        return {
            ...oldState,
            currentGuess: newGuess,
        };
    }

    private static handleBackspaceKeyPress(oldState: GameBoardState): GameBoardState {
        let newGuess = oldState.currentGuess.slice();
        // While the last letter is revealed, remove it
        while (oldState.revealedPositions.includes(newGuess.length - 1)) {
            newGuess = newGuess.slice(0, -1);
        }
        // Remove the last letter
        return {
            ...oldState,
            currentGuess: newGuess.slice(0, -1),
        };
    }

    private static handleEnterKeyPress(oldState: GameBoardState, correctWord: String): GameBoardState {
        // If the guess is empty, throw an error
        if (!GameBoardHelper.isWordValidLength(oldState.currentGuess, correctWord))
            throw new AlertKeyPressError("Not enough letters.");

        // If the guess is not a word, throw an error
        if (!wordExists(oldState.currentGuess))
          throw new AlertKeyPressError("Word must exist.");

        // If the guess has already been guessed, throw an error
        if (!GameBoardHelper.isWordNotGuessed(oldState.currentGuess, oldState.wordGuesses))
            throw new AlertKeyPressError("Word has already been guessed.");

        // Get the status of the guess
        const currentGuessStatus = GameBoardHelper.getWordStatus(oldState.currentGuess, correctWord, oldState.revealedPositions);

        // Check if the guess is correct
        const won = GameBoardHelper.isWordCorrect(oldState.currentGuess, correctWord);

        // Return the new state
        return {
            ...oldState,
            wordGuesses: [...oldState.wordGuesses, oldState.currentGuess],
            currentGuess: "",
            wordGuessesStatus: [...oldState.wordGuessesStatus, currentGuessStatus],
            hasWon: won,
            letterStatus: GameBoardHelper.newLetterStatus(
                oldState.letterStatus,
                oldState.currentGuess,
                currentGuessStatus,
                oldState.revealedPositions,
                correctWord,
            ),
        };
    }

    static handleKeyPress (key: String, oldState: GameBoardState, correctWord: String, maxGuesses: Number): GameBoardState {
        // If game is over (won or lost)
        if (oldState.hasWon)
            throw new InvalidKeyPressError("You have already won the game");
        if (oldState.wordGuesses.length >= maxGuesses)
            throw new InvalidKeyPressError("You have already lost the game");

        // If key is a letter
        if (key.length === 1 && key.match(/[a-zA-Z]/i) && oldState.currentGuess.length < correctWord.length)
            return this.handleLetterKeyPress(key, oldState, correctWord);

        // If key is backspace/delete
        if (key === "Backspace" || key === "Delete")
            return this.handleBackspaceKeyPress(oldState);

        // If key is enter
        if (key === "Enter")
            return this.handleEnterKeyPress(oldState, correctWord);

        // If key is not valid
        throw new InvalidKeyPressError("Invalid key press");
    }
}