import {LetterCellDiv} from "../styledComponents/LetterCellDiv";
import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

export default function LetterCellComponent({letter, status}: {letter: String, status: Number}) {
    return (
        <LetterCellDiv status={status} currentlyFilled={(letter !== " " && letter !== "") && (status === LetterCellStatusEnum.EMPTY)}>
            {letter}
        </LetterCellDiv>
    );
}