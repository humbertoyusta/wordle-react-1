import StatusStyleClasses from "../constants/StatusStyleClasses";

export default function LetterCellComponent({letter, status}: {letter: String, status: Number}) {
    return (
        <div className="border-gray-900 border-2 w-10 h-10">
            <p className={"text-center "+StatusStyleClasses.get(status)}>{letter}</p>
        </div>
    );
}