import React from 'react';
import GameLayout from './_game';
import Beats from './data/_beats';


function Main() {
    return (
        <GameLayout game={Beats}></GameLayout>
    )
}

export default Main;