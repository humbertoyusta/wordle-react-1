import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

const StatusStyleClasses = new Map<Number, String>();
StatusStyleClasses.set(LetterCellStatusEnum.CORRECT, "bg-green-400");
StatusStyleClasses.set(LetterCellStatusEnum.BAD_POSITION, "bg-yellow-400");
StatusStyleClasses.set(LetterCellStatusEnum.INCORRECT, "bg-red-400");

export default StatusStyleClasses;