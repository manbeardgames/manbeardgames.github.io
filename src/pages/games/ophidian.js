import React from 'react';
import GameLayout from './_game';
import Ophidian from './data/_ophidian';


function Main() {
    return (
        <GameLayout game={Ophidian}></GameLayout>
    )
}

export default Main;