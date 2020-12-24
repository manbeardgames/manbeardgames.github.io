import React from 'react';

const slime_battle_royale = 
{
    name: 'Slime Battle Royale',
    slug: 'slime-battle-royale',
    shortDescription: 'The rules are simple, only one slime can leave.',
    trailer: 'https://www.youtube.com/embed/nyeg6q8pIZ4',
    mediaPath: 'img/games/slime-battle-royale/',
    coverImage: 'cover.png',
    preview: 'game_preview.png',
    screenshots:[ ],
    platforms: [
        {
            name: 'itch',
            url: 'https://manbeardgames.itch.io/slime-battle-royale',
            label: 'Available on Itch.io'
        },
        {
            name: 'ludum',
            url: 'https://ldjam.com/events/ludum-dare/41/slime-battle-royale',
            label: "Ludum Dare 41"
        }
    ],   
    description:
    <span>
        <p>
            You are trapped in a dungeon with other slimes. The rules are simple, only one slime can leave. Time is precious, as there is poison slowly creeping in from all sides of the dungeon. You must hurry to defeat them all, using the ancient fighting technique of rock-paper-scissors. Or die a painful death.
        </p>
        <p>
            Slime Battle Royale was made for Ludum Dare 41 with the them <b>Combine two incompatible genres"</b>. This uses the Battle Royale genre and the Turn-Base Fighting genres. In Battle Royale games, the playing field is constantly closing in, getting smaller and smaller. So moving without delay is crucial.  The Turn-Base Fighting serves as a deterrent to your movement, forcing you to stop and take actions.
        </p>
    </span>
}


export default slime_battle_royale;