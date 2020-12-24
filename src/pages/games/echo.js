import React from 'react';
import GameLayout from './_game';
import Echo from './data/_echo';


function Main() {
    return (
        <GameLayout game={Echo}></GameLayout>
    )
}

export default Main;