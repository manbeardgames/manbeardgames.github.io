import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Games from './data/_masterlist';
import clsx from 'clsx';

function BadgeOld({platform}) {
    const badgeUrl = useBaseUrl('img/badges/' + platform.name + '-badge-dark.png');
    const badgeClass = 'platform-badge ' + platform.name + '-badge';
    return (
        <div className="platform">
            <a href={platform.url} target="_blank">
                <img className="platform-badge" src={badgeUrl} />
            </a>
        </div>
    )
}

function Badge({platform}) {
    const platformPath = useBaseUrl('img/platforms/' + platform.name + '.png')
    const style = {
        width: '100%'
    }
    return (
        <a href={platform.url}
        className={clsx('platform-button', 'button-' + platform.name)}
        target="_blank"
        style={style}>
            <img src={platformPath} />
            <span className={clsx('label')}>{platform.label}</span>
        </a>
    )
}

function Game({game}) {
    const mediaPath = useBaseUrl(game.mediaPath);
    const gameUrl = '/games/' + game.slug;
    return (
        <section className={clsx('game')}>
            <div className={clsx('game-container')}>
                <div className={clsx('game-preview-container')}>
                    <img className={clsx('img-responsive', 'img-thumbnail')}
                         src={mediaPath + game.preview} />
                </div>

                <div className={clsx('game-overview-container')}>
                    <h3>{game.name}</h3>
                    <p>{game.shortDescription}</p>

                    
                        {/* {game.platforms && game.platforms.length > 0 && (
                          game.platforms.map((platform, idx) => (
                              <Badge platform={platform} />
                          ))
                        )} */}
                    
                    <a className={clsx('button', 'button--lg', 'button--block', 'button--ophidian-blue')}
                       href={gameUrl}>
                           More Info                           
                    </a>
                </div>
            </div>
        </section>
    )
}

function Main() {
    return (
        <Layout title="Games" description="Games created by ManBeardGames">
                <div id="games">
                    {Games && Games.length > 0 && (
                        Games.map((game, idx) => (
                            <Game game={game}></Game>
                        ))
                    )}
                </div>
        </Layout>
    )
}

export default Main;