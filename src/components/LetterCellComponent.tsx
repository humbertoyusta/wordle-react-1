import {LetterCellDiv} from "../styledComponents/LetterCellDiv";

export default function LetterCellComponent({letter, status}: {letter: String, status: Number}) {
    return (
        <LetterCellDiv status={status}>
            {letter}
        </LetterCellDiv>
    );
}