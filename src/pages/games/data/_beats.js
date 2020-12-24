import React from 'react';

const beats = 
{
    name: 'Beats',
    slug: 'beats',
    shortDescription: 'One button music rhythm game made for the One Mechanic Game Jam 5',
    trailer: 'https://www.youtube.com/embed/ZGqBBV0PM3g',
    mediaPath: 'img/games/beats/',
    coverImage: 'cover.png',
    preview: 'game_preview.png',
    screenshots:[
        'screenshot_01.png',
        'screenshot_02.png',
        'screenshot_03.png',
        'screenshot_04.png',
        'screenshot_05.png'
     ],
    platforms: [
        {
            name: 'itch',
            url: 'https://manbeardgames.itch.io/beats',
            label: 'Available on Itch.io'
        },
        {
            name: 'gdq',
            url: 'https://itch.io/jam/omgjam5/rate/326293',
            label: 'OMG Jam 5'
        }
    ],   
    description:
    <span>
        <p>
            Beats is a one button music rhythm game developed for <b>Game Dev's Quest: One Mechanic Game Jam 5</b>.  Running through the forest, our adventurer is meet with skeletons blocking his path. Using the beat of the song, the adventurer must attack the skeletons as the approach, before they attack him.
        </p>
        <p>
            The current available version fo the game is only a prototype as it was developed for the game jam. It features only one song/stage.  As the song begins, skeletons will appear and move toward the attack zone, where players must hit the button to attack them in beat with the music.
        </p>
    </span>
}

export default beats;