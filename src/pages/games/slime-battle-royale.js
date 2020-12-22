import React from 'react';
import Layout from '@theme/Layout';
import Header from './_gameheader';
import Description from './_gamedescription';
import Platform from './_gameplatform'
import Game from './data/_slime-battle-royale';

function Main() {
    return (
        <Layout
            title={Game.name}
            description={Game.shortDescription}>
            <div id="game">
                <Header game={Game}></Header>
                <Description game={Game}></Description>
                <Platform game={Game}></Platform>
            </div>
        </Layout>
    )
}

export default Main;