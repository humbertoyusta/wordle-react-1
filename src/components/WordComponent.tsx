import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";
import LetterCellComponent from "./LetterCellComponent";
import {useGameBoardContext} from "../contexts/GameBoardProvider";

export default function WordComponent({word}: {word: String}) {

    // Get the required length of the word from the context
    const requiredLength = useGameBoardContext().correctWord.length;

    // Create a counter to use as a key for each letter cell
    let counter = 0;

    // Create a letter cell for each letter in the word
    const letters =
        Array.from(word).map(
            (letter: String) =>
                <LetterCellComponent key={counter ++} letter={letter} status={LetterCellStatusEnum.CORRECT} />
        );

    // Add empty letter cells to fill the remaining letters
    while (letters.length < requiredLength)
        letters.push(<LetterCellComponent key={counter ++} letter={""} status={LetterCellStatusEnum.EMPTY} />);

    return (
        <div className="flex-row flex justify-between flex-nowrap m-auto">
            {letters}
        </div>
    );
}