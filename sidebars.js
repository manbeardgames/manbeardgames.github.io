module.exports = {
  games: [
    {
      type: 'category',
      label: 'Games',
      items: [ 
        'games/games', 
        'games/beats',
        'games/ophidian',
        'games/echo',
        'games/slime-battle-royale',
        'games/droplet'
      ]
    }
  ],
  tutorials: [
    {
      type: 'category',
      label: 'Tutorials',
      items: [ 
        'tutorials/tutorials',
        {
          type: 'category',
          label: 'MonoGame 3.8 Tutorials',
          items: [
            {
              type: 'category',
              label: 'Collision Detection',
              items: [
                'tutorials/monogame-3-8/collision-detection/introduction',
                'tutorials/monogame-3-8/collision-detection/aabb',
                'tutorials/monogame-3-8/collision-detection/circles',
                'tutorials/monogame-3-8/collision-detection/conclusion'
              ]
            },
            {
              type: 'category',
              label: 'Scenes',
              items: [
                'tutorials/monogame-3-8/scenes/introduction',
                'tutorials/monogame-3-8/scenes/what-is-a-scene',
                'tutorials/monogame-3-8/scenes/scene-class',
                'tutorials/monogame-3-8/scenes/updating-game1',
                'tutorials/monogame-3-8/scenes/testing-our-setup',
                'tutorials/monogame-3-8/scenes/conclusion'
              ]
            },
            {
              type: 'category',
              label: 'Scene Transitions',
              items: [
                'tutorials/monogame-3-8/scene-transitions/introduction',
                'tutorials/monogame-3-8/scene-transitions/rendertarget-overview',
                'tutorials/monogame-3-8/scene-transitions/updating-scene-class',
                'tutorials/monogame-3-8/scene-transitions/transition-class',
                'tutorials/monogame-3-8/scene-transitions/updating-game1',
                'tutorials/monogame-3-8/scene-transitions/fade-transition',
                'tutorials/monogame-3-8/scene-transitions/even-odd-transition',
                'tutorials/monogame-3-8/scene-transitions/conclusion'
              ]
            }
          ]
        }
       ]
    },
  ]
}