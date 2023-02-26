import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";
import {BoardCellButton} from "../styledComponents/BoardCellButton";

type Props = {
    letter: String,
    status: Number | undefined,
    handleKeyPress: (letter: String) => void,
}
export default function KeyComponent (props: Props) {
    const status = props.status === undefined ? LetterCellStatusEnum.EMPTY : props.status;

    return (
        <BoardCellButton
            status={status}
            letter={props.letter}
            onClick={() => props.handleKeyPress(props.letter)}
        >
            {props.letter}
        </BoardCellButton>
    );
}