import {LetterCellDiv} from "../styledComponents/LetterCellDiv";
import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

type Props = {
    letter: String,
    status: Number,
    shouldColor: Boolean,
    position: Number,
};

export default function LetterCellComponent(props: Props) {
    return (
        <LetterCellDiv
            status={props.status}
            currentlyFilled={
                (props.letter !== " " && props.letter !== "") &&
                (props.status === LetterCellStatusEnum.EMPTY)
            }
            position={props.position}
            shouldColor={props.shouldColor}
        >
            {props.letter}
        </LetterCellDiv>
    );
}