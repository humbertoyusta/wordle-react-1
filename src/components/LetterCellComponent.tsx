import {LetterCellDiv} from "../styledComponents/LetterCellDiv";
import {LetterCellStatusEnum} from "../enums/LetterCellStatusEnum";

type Props = {
    letter: String,
    status: Number,
};

export default function LetterCellComponent(props: Props) {
    return (
        <LetterCellDiv
            status={props.status}
            currentlyFilled={(props.letter !== " " && props.letter !== "") && (props.status === LetterCellStatusEnum.EMPTY)}
        >
            {props.letter}
        </LetterCellDiv>
    );
}