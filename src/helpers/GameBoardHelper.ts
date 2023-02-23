import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

export default class GameBoardHelper {
    // Get the status of each letter in the word
    static getWordStatus(word: String, correctWord: String): Number[] {
        const status: Number[] = [];
        const frequencyOfNotCorrect = new Map<String, Number>();

        // Check if the letter is in the correct position
        // If it isn't, add it to the frequency map
        for (let i = 0; i < word.length; i++) {
            if (word[i] === correctWord[i]) {
                status[i] = LetterCellStatusEnum.CORRECT;
            } else {
                frequencyOfNotCorrect.set(correctWord[i], (frequencyOfNotCorrect.get(correctWord[i]) || 0).valueOf() + 1);
            }
        }

        // Check if the letter is in the word, but in the wrong position
        // If it isn't, mark it as incorrect
        for (let i = 0; i < word.length; i++) {
            if (status[i] === LetterCellStatusEnum.CORRECT) {
                continue;
            }
            const frequency = frequencyOfNotCorrect.get(word[i]);
            if (frequency !== undefined && frequency.valueOf() > 0) {
                status[i] = LetterCellStatusEnum.BAD_POSITION;
                frequencyOfNotCorrect.set(word[i], (frequencyOfNotCorrect.get(correctWord[i]) || 0).valueOf() - 1);
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

    static newLetterStatus(oldStatus: Map<String, Number>, word: String, wordStatus: Number[]): Map<String, Number> {
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
        return newStatus;
    }
}