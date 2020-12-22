import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Games from './data/_masterlist';

function Badge({platform}) {
    const badgeClass = 'platform-badge ' + platform.name + '-badge';
    return (
        <div className="platform">
            <a href={platform.url} target="_blank">
                <div className={badgeClass}></div>
            </a>
        </div>
    )
}

function Game({game}) {
    const imgUrl = useBaseUrl(game.imagePreview);
    const gameUrl = '/games/' + game.slug;
    return (
        <section className="game">
            <div className="game-container">
                <div class="game-preview-container">
                    <img class="img-responsive img-thumbnail" src={imgUrl} />
                </div>

                <div className="game-overview-container">
                    <h3>
                        {game.name}
                    </h3>
                    <p>
                        {game.shortDescription}
                    </p>

                    <div className="block-platforms">
                        {game.platforms && game.platforms.length > 0 && (
                          game.platforms.map((props, idx) => (
                              <Badge platform={props} />
                          ))
                        )}
                    </div>
                    <a className="button button--block button--ophidian-blue" href={gameUrl}>More Info</a>
                    
                </div>
            </div>
        </section>
    )
}

function Main() {
    return (
        <Layout 
            title="Games"
            description="Games created by ManBeardGames">
                <div id="games">
                    {Games && Games.length > 0 && (
                        Games.map((props, idx) => (
                            <Game game={props}></Game>
                        ))
                    )}
                </div>
        </Layout>
    )
}

export default Main;