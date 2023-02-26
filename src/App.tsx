import React from 'react';
import './App.css';
import GameBoardComponent from "./components/GameBoardComponent";
import GameBoardProvider from "./contexts/GameBoardProvider";
import getRandomWord from "./helpers/GetRandomWord";

function App() {
    return (
        <GameBoardProvider maxGuesses={6} correctWord={getRandomWord(5)} maxReveals={2}>
            <GameBoardComponent />
        </GameBoardProvider>
    );
}

export default App;
