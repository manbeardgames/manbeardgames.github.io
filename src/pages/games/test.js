import React from 'react';
import Layout from '@theme/Layout';
import Header from './_gameheader';
import Description from './_gamedescription';
import Platform from './_gameplatform'
import Game from './data/_ophidian';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Main() {
    const gameCoverInline = {
        backgroundImage: "url(" + useBaseUrl(Game.imageCover) + ")"
    };
    return (
        <Layout
            title={Game.name}
            description={Game.shortDescription}>
            <div id="game">
                <div className="wrapper game-cover" style={gameCoverInline}>
                    <div className="content">
                        <h1>Ophidian</h1>
                        <div className="video-wrapper">
                            <iframe className="video" src={Game.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
                <div className="wrapper game-info">
                    <div className="content">
                        <h2>
                            About Ophidian
                        </h2>
                        <hr />
                        <p>
                            Ophidian is an arcade puzzle game inspired by classic snake games.  In Ophidian, players navigate the player area to consume food blocks, while avoiding any obstacles set in the way.  Ophidian features multiple game modes for players to enjoy. 
                        </p>
                        <p>
                            Arcade features a classic style of game play with newly added features. 
                            <ul>
                                <li>Enjoy classic solo snake gameplay. How high of a score can you achieve.</li> 
                                <li>Go head-to-head with up to four total players locally.</li>
                                <li>Try Trash Mode, where each time you eat a food block, a wall black takes its place.</li>
                                <li>Challenge yourself in Ghost Mode, where each level pits you against the ghost of yourself from the previous level.</li>
                            </ul>
                        </p>
                        <p>
                            Challenge Mode features levels designed for players to navigate the ophidian through to consume all of the food blocks.  
                            <ul>
                                <li>100 hand crafted levels</li>
                                <li>Special block types the player can interact with to complete the levels.</li>
                                <li>Replay challenges to compete against your fastest time.</li>
                            </ul>
                        </p>
                    </div>
                </div>
                
                <div className="wrapper game-platforms">
                    <div className="content">
                        <h2>Platforms</h2>
                        <hr />
                        <div class="row">
                            <div class="col col--4">
                                <a href="https://store.steampowered.com/app/697710/Ophidian/" target="_blank" class="platform-button button-steam">
                                    <img src="/img/platforms/steam.png" />
                                    <span class="label">Available on Steam</span>
                                </a>
                            </div>
                            <div class="col col--4">
                                <a href="" class="platform-button button-itch">
                                    <img src="/img/platforms/itch.png" />
                                    <span class="label">Available on Itch.io</span>
                                </a>
                            </div>
                            <div class="col col--4">
                                <a href="" class="platform-button button-ludum">
                                    <img src="/img/platforms/ludum-ld.png" />
                                    <span class="label">Made for LDJAM</span>
                                </a>
                            </div>
                            <div class="col col--4">
                                <a href="" class="platform-button button-gdq-omgjam">
                                    <img src="/img/platforms/gdq-omgjam.png" />
                                    <span class="label">Made For OMGJAM</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="wrapper game-screenshots">
                    <div className="content">
                        <h2>Screenshots</h2>
                        <hr />
                        <div className="row">
                            <div className="col col--4">
                                <a href="/img/games/ophidian/screenshot_01.png" target="_blank">
                                    <img src="/img/games/ophidian/screenshot_01.png" />
                                </a>
                            </div>
                            <div className="col col--4">
                                <a href="/img/games/ophidian/screenshot_02.png" target="_blank">
                                    <img src="/img/games/ophidian/screenshot_02.png" />
                                </a>
                            </div>
                            <div className="col col--4">
                                <a href="/img/games/ophidian/screenshot_03.png" target="_blank">
                                    <img src="/img/games/ophidian/screenshot_03.png" />
                                </a>
                            </div>
                            <div className="col col--4">
                                <a href="/img/games/ophidian/screenshot_04.png" target="_blank">
                                    <img src="/img/games/ophidian/screenshot_04.png" />
                                </a>
                            </div>
                            <div className="col col--4">
                                <a href="/img/games/ophidian/screenshot_05.png" target="_blank">
                                    <img src="/img/games/ophidian/screenshot_05.png" />
                                </a>
                            </div>
                            <div className="col col--4">
                                <a href="/img/games/ophidian/screenshot_06.png" target="_blank">
                                    <img src="/img/games/ophidian/screenshot_06.png" />
                                </a>
                            </div>
                            <div className="col col--4">
                                <a href="/img/games/ophidian/screenshot_07.png" target="_blank">
                                    <img src="/img/games/ophidian/screenshot_07.png" />
                                </a>
                            </div>
                            <div className="col col--4">
                                <a href="/img/games/ophidian/screenshot_08.png" target="_blank">
                                    <img src="/img/games/ophidian/screenshot_08.png" />
                                </a>
                            </div>
                            <div className="col col--4">
                                <a href="/img/games/ophidian/screenshot_10.png" target="_blank">
                                    <img src="/img/games/ophidian/screenshot_10.png" />
                                </a>
                            </div>                                                                                                                                                                                                                                
                        </div>
                    </div>
                </div>
                
            </div>
        </Layout>
    )
}

export default Main;