import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";
import LetterCellComponent from "./LetterCellComponent";
import {useGameBoardContext} from "../contexts/GameBoardProvider";
import {WordDiv} from "../styledComponents/WordDiv";

type Props = {
    word: String,
    status: Number[],
    shouldShake?: Boolean,
    onAnimationEnd?: () => void,
}

export default function WordComponent({word, status, shouldShake = false, onAnimationEnd = () => {}}: Props) {

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
        letters.push(<LetterCellComponent
            key={counter ++}
            letter={word[i]}
            status={status[i]}
            shouldShake={shouldShake}
            onAnimationEnd={onAnimationEnd}
        />)
    }

    // Add empty letter cells to fill the remaining letters
    while (letters.length < requiredLength)
        letters.push(<LetterCellComponent
            key={counter ++}
            letter={""}
            status={LetterCellStatusEnum.EMPTY}
            shouldShake={shouldShake}
            onAnimationEnd={onAnimationEnd}
        />);

    return (
        <WordDiv>
            {letters}
        </WordDiv>
    );
}