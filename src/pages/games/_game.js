import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import clsx from 'clsx';


function Game({game}) {
    const mediaPath = useBaseUrl(game.mediaPath)
    const platformPath = useBaseUrl('img/platforms/')
    return (
        <Layout title={game.name} description={game.shortDescription}>
            <div id='game'>
                <div className={clsx('wrapper', 'game-cover')} style={{backgroundImage: 'url(' + mediaPath + game.coverImage + ')'}}>
                        <div className={clsx('content')}>
                            <h1>{game.name}</h1>
                            {game && game.trailer && (
                            <div className={clsx('video-wrapper')}>
                                <iframe className={clsx('video')}
                                        src={game.trailer}
                                        frameBorder='0'
                                        allowFullScreen />
                            </div>
                            )}
                        </div>
                </div>

                <div className={clsx('wrapper', 'game-info')}>
                    <div className={clsx('content')}>
                        <div className={clsx('about')}>
                            <h2>About {game.name}</h2>
                            <hr />
                            {game.description}
                        </div>
                    </div>
                </div>

                <div className={clsx('wrapper', 'game-platforms')}>
                    <div className={clsx('content')}>
                        <h2>Platforms</h2>
                        <hr />
                        <div className={clsx('row')}>
                            {game.platforms && game.platforms.length > 0 && (
                                game.platforms.map((platform, idx) => (
                                    <div className={clsx('col', 'col--4')}>
                                        <a href={platform.url} className={clsx('platform-button', 'button-' + platform.name)} target="_blank">
                                            <img src={platformPath + platform.name + '.png'} />
                                            <span className={clsx('label')}>{platform.label}</span>
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {game.screenshots && game.screenshots.length > 0 && (
                    <div className={clsx('wrapper game-screenshots')}>
                        <div className={clsx('content')}>
                            <h2>Screenshots</h2>
                            <hr />
                            <div className={clsx('row')}>
                                {game.screenshots.map((url, idx) => (
                                    <div className={clsx('col', 'col--4')}>
                                        <a href={mediaPath + url} target='_blank'>
                                            <img src={mediaPath + url} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Game;