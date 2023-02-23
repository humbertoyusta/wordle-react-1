import StatusStyleClasses from "../constants/StatusStyleClasses";
import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

type Props = {
    letter: String,
    status: Number | undefined,
    handleKeyPress: (letter: String) => void,
}
export default function KeyComponent (props: Props) {
    const status = props.status === undefined ? LetterCellStatusEnum.EMPTY : props.status;

    return (
        <button className={
            "rounded-md shadow-md h-24 flex justify-center items-center text-gray-400 text-4xl font-bold " +
            StatusStyleClasses.get(status) +
            ((props.letter.length > 1) ? " w-40" : " w-24")
        } onClick={() => props.handleKeyPress(props.letter)}>
            {props.letter}
        </button>
    );
}