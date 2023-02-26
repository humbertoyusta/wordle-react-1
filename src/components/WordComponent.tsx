import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";
import LetterCellComponent from "./LetterCellComponent";
import {useGameBoardContext} from "../contexts/GameBoardProvider";
import {WordDiv} from "../styledComponents/WordDiv";

type Props = {
    word: String,
    status: Number[],
    revealedPositions: Number[],
    shouldShake?: Boolean,
    shouldColor?: Boolean,
    onAnimationEnd?: () => void,
}

export default function WordComponent({word, status, revealedPositions, shouldShake = false, shouldColor = false, onAnimationEnd = () => {}}: Props) {

    // Get the required length of the word from the context
    const correctWord = useGameBoardContext().correctWord;

    // Create a counter to use as a key for each letter cell
    let counter = 0;

    // Complete the status array
    for (let i = 0; i < correctWord.length; i++) {
        if (status[i] !== undefined)
            continue;
        if (revealedPositions.includes(i))
            status.push(LetterCellStatusEnum.REVEALED);
        else
            status.push(LetterCellStatusEnum.EMPTY);
    }

    // Create a letter cell for each letter in the word
    const letters: JSX.Element[] = [];
    for (let i = 0; i < word.length; i++) {
        letters.push(<LetterCellComponent
            position={counter}
            key={counter++}
            letter={word[i]}
            status={status[i]}
            shouldColor={shouldColor}
        />)
    }

    // Add empty letter cells to fill the remaining letters
    while (letters.length < correctWord.length)
        letters.push(<LetterCellComponent
            position={counter}
            key={counter ++}
            letter={revealedPositions.includes(letters.length) ? correctWord[letters.length] : ""}
            status={status[letters.length]}
            shouldColor={shouldColor}
        />);

    return (
        <WordDiv shouldShake={shouldShake} onAnimationEnd={onAnimationEnd}>
            {letters}
        </WordDiv>
    );
}