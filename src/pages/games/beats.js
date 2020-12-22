import React from 'react';
import Layout from '@theme/Layout';
import Header from './_gameheader';
import Description from './_gamedescription';
import Platform from './_gameplatform'
import Game from './data/_beats';

function Main() {
    return (
        <Layout
            title={Game.name}
            description={Game.shortDescription}>
            <div id="game">
                <Header game={Game}></Header>
                <Description game={Game}></Description>
            </div>
        </Layout>
    )
}

export default Main;