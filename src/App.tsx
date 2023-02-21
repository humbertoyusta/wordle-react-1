import React from 'react';
import './App.css';
import GameBoardComponent from "./components/GameBoardComponent";
import GameBoardProvider from "./contexts/GameBoardProvider";

function App() {
    return (
        <GameBoardProvider maxGuesses={6} correctWord={"HELLO"}>
            <GameBoardComponent />
        </GameBoardProvider>
    );
}

export default App;
