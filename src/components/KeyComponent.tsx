import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

type Props = {
    letter: String,
    status: Number,
    handleKeyPress: (letter: String) => void,
}
export default function KeyComponent (props: Props) {

    // Map of status to style classes
    const statusStyleClasses = new Map<Number, String>();
    statusStyleClasses.set(LetterCellStatusEnum.CORRECT, "bg-green-400");
    statusStyleClasses.set(LetterCellStatusEnum.BAD_POSITION, "bg-yellow-400");
    statusStyleClasses.set(LetterCellStatusEnum.INCORRECT, "bg-red-400");

    return (
        <button className={
            "rounded-md shadow-md h-24 flex justify-center items-center text-gray-400 text-4xl font-bold " +
            statusStyleClasses.get(props.status) +
            ((props.letter.length > 1) ? " w-40" : " w-24")
        } onClick={() => props.handleKeyPress(props.letter)}>
            {props.letter}
        </button>
    );
}