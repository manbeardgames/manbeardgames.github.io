import React from 'react';
import clsx from 'clsx';

function Header({game}) {
    const visibility = game.trailer.length == 0 ? 'no-trailer' : 'has-trailer';
    return (
        <div className={clsx('block', game.slug + '-cover-image')}>
            <div className="row">
                <div className="ml-auto mr-auto col col--6 ">
                    <div className={clsx('block-trailer', 'img-thumbnail', visibility)}>
                        <div className="embed-responsive embed-responsive-16by9">
                            {game && game.trailer && (
                            <iframe width="560" height="315" src={game.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;