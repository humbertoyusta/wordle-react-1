import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

export default function LetterCellComponent({letter, status}: {letter: String, status: Number}) {
    // Create a list of style classes to apply to the letter cell
    const statusStyleClasses: String[] = [];
    // Add the appropriate style class based on the status
    if (status === LetterCellStatusEnum.CORRECT)
        statusStyleClasses.push("bg-green-400");
    if (status === LetterCellStatusEnum.BAD_POSITION)
        statusStyleClasses.push("bg-yellow-400");
    if (status === LetterCellStatusEnum.INCORRECT)
        statusStyleClasses.push("bg-red-400");

    return (
        <div className="border-gray-900 border-2 w-10 h-10">
            <p className={"text-center "+statusStyleClasses.toString().replace(',', ' ')}>{letter}</p>
        </div>
    );
}