import React from 'react';
import './App.css';
import GameBoardComponent from "./components/GameBoardComponent";
import GameBoardProvider from "./contexts/GameBoardProvider";
import getRandomWord from "./helpers/GetRandomWord";

function App() {
    return (
        <GameBoardProvider maxGuesses={7} correctWord={getRandomWord(5)}>
            <GameBoardComponent />
        </GameBoardProvider>
    );
}

export default App;
