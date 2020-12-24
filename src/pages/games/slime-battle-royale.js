import React from 'react';
import GameLayout from './_game';
import SlimeBattleRoyale from './data/_slime-battle-royale';


function Main() {
    return (
        <GameLayout game={SlimeBattleRoyale}></GameLayout>
    )
}

export default Main;