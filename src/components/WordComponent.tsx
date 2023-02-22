import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";
import LetterCellComponent from "./LetterCellComponent";
import {useGameBoardContext} from "../contexts/GameBoardProvider";

export default function WordComponent({word, status}: {word: String, status: Number[]}) {

    // Get the required length of the word from the context
    const requiredLength = useGameBoardContext().correctWord.length;

    // Create a counter to use as a key for each letter cell
    let counter = 0;

    // Add empty status values to fill the remaining letters
    while (status.length < requiredLength)
        status.push(LetterCellStatusEnum.EMPTY);

    // Create a letter cell for each letter in the word
    const letters: JSX.Element[] = [];
    for (let i = 0; i < word.length; i++) {
        letters.push(<LetterCellComponent key={counter ++} letter={word[i]} status={status[i]} />)
    }

    // Add empty letter cells to fill the remaining letters
    while (letters.length < requiredLength)
        letters.push(<LetterCellComponent key={counter ++} letter={""} status={LetterCellStatusEnum.EMPTY} />);

    return (
        <div className="flex-row flex justify-between flex-nowrap m-auto">
            {letters}
        </div>
    );
}