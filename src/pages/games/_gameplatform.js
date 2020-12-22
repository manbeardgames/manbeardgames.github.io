import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Platform({game}) {
    return (
        <div class="block-container">
            <div class="block">
                <div class="block-platforms">
                    {game && game.platforms.length > 0 && (
                        game.platforms.map((props, idx) => (
                                <div class="platform">
                                    <a href={props.url} target="_blank">
                                        <img className="" src={useBaseUrl('img/badges/' + props.name + '-badge-dark.png')} />
                                    </a>&nbsp;
                                </div>
                        ))
                    )}                  
                </div>
            </div>
        </div>        
    )
}

export default Platform;