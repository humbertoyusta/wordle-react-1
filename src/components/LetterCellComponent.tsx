import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

export default function LetterCellComponent({letter, status}: {letter: String, status: Number}) {

    // Map of status to style classes
    const statusStyleClasses = new Map<Number, String>();
    statusStyleClasses.set(LetterCellStatusEnum.CORRECT, "bg-green-400");
    statusStyleClasses.set(LetterCellStatusEnum.BAD_POSITION, "bg-yellow-400");
    statusStyleClasses.set(LetterCellStatusEnum.INCORRECT, "bg-red-400");

    return (
        <div className="border-gray-900 border-2 w-10 h-10">
            <p className={"text-center "+statusStyleClasses.get(status)}>{letter}</p>
        </div>
    );
}