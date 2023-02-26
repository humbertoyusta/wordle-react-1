import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

export default class GameBoardHelper {
    // Get the status of each letter in the word
    static getWordStatus(word: String, correctWord: String, revealedPositions: Number[]): Number[] {
        const status: Number[] = [];
        const frequencyOfNotCorrect = new Map<String, Number>();

        // Check if the letter is revealed, if not,
        // check if it is in the correct position
        // If it isn't, add it to the frequency map
        for (let i = 0; i < word.length; i++) {
            if (revealedPositions.includes(i)) {
                status[i] = LetterCellStatusEnum.REVEALED;
                continue;
            }
            if (word[i] === correctWord[i]) {
                status[i] = LetterCellStatusEnum.CORRECT;
            } else {
                frequencyOfNotCorrect.set(correctWord[i], (frequencyOfNotCorrect.get(correctWord[i]) || 0).valueOf() + 1);
            }
        }

        // Check if the letter is in the word, but in the wrong position
        // If it isn't, mark it as incorrect
        for (let i = 0; i < word.length; i++) {
            // If the letter is already correct or revealed, skip it
            if (status[i] === LetterCellStatusEnum.CORRECT ||
                status[i] === LetterCellStatusEnum.REVEALED) {
                continue;
            }
            const frequency = frequencyOfNotCorrect.get(word[i]);
            if (frequency !== undefined && frequency.valueOf() > 0) {
                status[i] = LetterCellStatusEnum.BAD_POSITION;
                frequencyOfNotCorrect.set(word[i], (frequencyOfNotCorrect.get(word[i]) || 0).valueOf() - 1);
            } else {
                status[i] = LetterCellStatusEnum.INCORRECT;
            }
        }

        return status;
    }

    // Check if a word is correct
    static isWordCorrect(word: String, correctWord: String): boolean {
        return word === correctWord;
    }

    // Check if a word has valid length
    static isWordValidLength(word: String, correctWord: String): boolean {
        return word.length === correctWord.length;
    }

    // Check if a word has not been guessed before
    static isWordNotGuessed(word: String, guessedWords: String[]): boolean {
        return !guessedWords.includes(word);
    }

    // Get the new letter status of the letters in the keyboard after a guess
    static newLetterStatus(
        oldStatus: Map<String, Number>,
        word: String,
        wordStatus: Number[],
        revealedPositions: Number[],
        correctWord: String
    ): Map<String, Number> {
        const newStatus = new Map<String, Number>(oldStatus);
        for (let i = 0; i < word.length; i++) {
            if (wordStatus[i] === LetterCellStatusEnum.CORRECT) {
                newStatus.set(word[i], LetterCellStatusEnum.CORRECT);
            }
            if (wordStatus[i] === LetterCellStatusEnum.BAD_POSITION) {
                if (newStatus.get(word[i]) !== LetterCellStatusEnum.CORRECT)
                    newStatus.set(word[i], LetterCellStatusEnum.BAD_POSITION);
            }
            if (wordStatus[i] === LetterCellStatusEnum.INCORRECT) {
                if (newStatus.get(word[i]) !== LetterCellStatusEnum.CORRECT &&
                    newStatus.get(word[i]) !== LetterCellStatusEnum.BAD_POSITION)
                    newStatus.set(word[i], LetterCellStatusEnum.INCORRECT);
            }
        }
        for (let revealPosition of revealedPositions) {
            newStatus.set(correctWord[revealPosition.valueOf()], LetterCellStatusEnum.REVEALED);
        }
        return newStatus;
    }

    // Check if a letter has been guessed before
    static hasBeenGuessed(position: Number, wordGuessedStatus: Number[][]): boolean {
        return wordGuessedStatus.some((status: Number[]) =>
            status[position.valueOf()] === LetterCellStatusEnum.CORRECT);
    }

    // Get a random position that hasn't been guessed yet
    static revealRandomPosition(revealedPositions: Number[], wordGuessesStatus: Number[][], correctWord: String): Number {
        // Get all the possible positions that haven't been guessed or revealed yet
        const possiblePositions = [];
        for (let i = 0; i < correctWord.length; i++) {
            if (revealedPositions.includes(i)) {
                continue;
            }
            if (!GameBoardHelper.hasBeenGuessed(i, wordGuessesStatus)) {
                possiblePositions.push(i);
            }
        }
        // If there are no possible positions, get all the positions that haven't been revealed
        if (possiblePositions.length === 0) {
            for (let i = 0; i < correctWord.length; i++)
                if (!revealedPositions.includes(i))
                    possiblePositions.push(i);
        }
        // Return a random position from the possible positions
        return possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    }

    // Get the new guess with the revealed letter
    static getNewGuess(currentGuess: String, correctWord: String, newPosition: Number): String {
        if (currentGuess.length > newPosition.valueOf())
            return currentGuess.slice(0, newPosition.valueOf()) +
                correctWord[newPosition.valueOf()] +
                currentGuess.slice(newPosition.valueOf() + 1);
        else
            return currentGuess;
    }
}