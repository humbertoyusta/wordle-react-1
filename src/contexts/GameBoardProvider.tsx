import React, {createContext} from "react";

export type GameBoardContextType = {
    correctWord: String,
    maxGuesses: Number,
    maxReveals: Number,
};

const GameBoardContext = createContext<GameBoardContextType|undefined>(undefined);

type GameBoardProviderProps = {
    correctWord: String,
    maxGuesses: Number,
    maxReveals: Number,
    children: React.ReactNode,
};

export default function GameBoardProvider(props: GameBoardProviderProps) {
    return (
        <GameBoardContext.Provider value={{
            correctWord: props.correctWord,
            maxGuesses: props.maxGuesses,
            maxReveals: props.maxReveals,
        }}>
            {props.children}
        </GameBoardContext.Provider>
    );
}

export function useGameBoardContext() {
    const context = React.useContext<GameBoardContextType|undefined>(GameBoardContext);
    if (context === undefined) {
        throw new Error("useGameBoardContext must be used within a GameBoardProvider");
    } else {
        return context;
    }
}