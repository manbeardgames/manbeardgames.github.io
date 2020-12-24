import React from 'react';

const droplet = 
{
    name: 'Droplet',
    slug: 'droplet',
    shortDescription: 'Tiny and insignificant, you are not discourage from dreaming big. Consume those around you, but remember there is always someone bigger waiting.',
    trailer: 'https://www.youtube.com/embed/UmCM3mFo3XA',
    mediaPath: 'img/games/droplet/',
    coverImage: 'cover.png',
    preview: 'game_preview.png',
    screenshots:[ ],
    platforms: [
        {
            name: 'itch',
            url: 'https://manbeardgames.itch.io/droplet',
            label: 'Available on Itch.io'
        },
        {
            name: 'ludum',
            url: 'https://ldjam.com/events/ludum-dare/40/droplet',
            label: 'Ludum Dare 40'
        }

    ],   
    description:
    <span>
        <p>
            You are a small, tiny insignificant droplet. Small as you may be, this doesn't discourage you from dreaming to be bigger. As you consume those that stand in your way, you watch yourself grow. But don't let your ego blind you, as there are always others out there, bigger and better than you, waiting to grow by consuming you.
        </p>
        <p>
            Droplet was made for Ludum Dare 40 with the theme <b>"The more you have, the worse it is"</b>. In Droplet, players can only consume other droplets that are smaller than themselves, with a bit of a twist. Consuming those of the same color will allow you to grow, while those of the opposite color will allow you to shrink. The goal is to grow as large as you can, however, the bigger you get, the slower you move.
        </p>
    </span>
}


export default droplet;