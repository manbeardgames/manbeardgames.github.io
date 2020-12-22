import React from 'react';

function Description({game}) {
    return (
        <div class="block-container">
            <div class="block">
                <h3 class="block-header">{game.name}</h3>
                <hr />
                <div class="block-description">
                    {game && game.description.length > 0 && (
                        game.description.map((props, idx) => (
                            <p>{props}</p>
                        ))
                    )}
                </div>
            </div>
        </div>        
    )
}

export default Description;