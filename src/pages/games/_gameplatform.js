import React from 'react';
import clsx from 'clsx';

function Platform({game}) {
    return (
        <div class="block-container">
            <div class="block">
                <div class="block-platforms">
                    {game && game.platforms.length > 0 && (
                        game.platforms.map((props, idx) => (
                            <div class="platform">
                                <a href={props.url} target="_blank">
                                    <div className={clsx('platform-badge', props.name + '-badge')}></div>
                                </a>
                            </div>
                        ))
                    )}                  
                </div>
            </div>
        </div>        
    )
}

export default Platform;