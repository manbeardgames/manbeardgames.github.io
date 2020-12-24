import React from 'react';
import GameLayout from './_game';


const ophidian = 
{
    name: 'Ophidian',
    slug: 'ophidian',
    shortDescription: 'Arcade puzzle game inspired by classic snake game play.',
    trailer: 'https://www.youtube.com/embed/OHsSIbKU-SQ',
    mediaPath: 'img/games/ophidian/',
    coverImage: 'cover.png',
    imagePreview: 'game_preview.png',
    screenshots:[
        'screenshot_01.png',
        'screenshot_02.png',
        'screenshot_03.png',
        'screenshot_04.png',
        'screenshot_05.png',
        'screenshot_06.png',
        'screenshot_07.png',
        'screenshot_08.png',
        'screenshot_10.png',
    ],
    platforms: [
        {
            name: 'steam',
            url: 'https://store.steampowered.com/app/697710/Ophidian/',
            label: 'Available on Steam'
        }
    ],   
    description:
    <span>
        <p>
            Ophidian is an arcade puzzle game inspired by classic snake games.  In Ophidian, players navigate the player area to consume food blocks, while avoiding any obstacles set in the way.  Ophidian features multiple game modes for players to enjoy. 
        </p> 
        <p>Arcade features a classic style of game play with newly added features.</p>
        <ul>
            <li>Enjoy classic solo snake game play. How high of a score can you achieve.</li> 
            <li>Go head-to-head with up to four total players locally.</li>
            <li>Try Trash Mode, where each time you eat a food block, a wall black takes its place.</li>
            <li>Challenge yourself in Ghost Mode, where each level pits you against the ghost of yourself from the previous level.</li>
        </ul>
        <p>
            Challenge Mode features levels designed for players to navigate the ophidian through to consume all of the food blocks.  
        </p>
        <ul>
            <li>100 hand crafted levels</li>
            <li>Special block types the player can interact with to complete the levels.</li>
            <li>Replay challenges to compete against your fastest time.</li>
        </ul>
    </span>
}

function Main() {
    return (
        <GameLayout game={ophidian}></GameLayout>
    )
}


export default Main;