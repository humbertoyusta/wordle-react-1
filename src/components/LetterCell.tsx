import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

export default function LetterCell({letter, status}: {letter: string, status: number}) {
    const statusStyleClasses: String[] = [];
    if (status === LetterCellStatusEnum.CORRECT)
        statusStyleClasses.push("bg-green-400");
    if (status === LetterCellStatusEnum.BAD_POSITION)
        statusStyleClasses.push("bg-yellow-400");
    return (
        <div className="border-gray-900 border-2 w-10 h-10">
            <p className={"text-center "+statusStyleClasses.toString().replace(',', ' ')}>{letter}</p>
        </div>
    );
}