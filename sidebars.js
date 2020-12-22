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
          label: 'MonoGame Tutorials',
          items: [
            {
              type: 'category',
              label: 'Scenes',
              items: [
                'tutorials/scenes/tutorials-scenes-introduction',
                'tutorials/scenes/tutorials-scenes-what-is-a-scene',
                'tutorials/scenes/tutorials-scenes-scene-class',
                'tutorials/scenes/tutorials-scenes-updating-game1',
                'tutorials/scenes/tutorials-scenes-testing-our-setup',
                'tutorials/scenes/tutorials-scenes-conclusion'
              ]
            },
            {
              type: 'category',
              label: 'Scene Transitions',
              items: [
                'tutorials/scene-transitions/tutorials-scene-transitions-introduction',
                'tutorials/scene-transitions/tutorials-scene-transitions-rendertarget-overview',
                'tutorials/scene-transitions/tutorials-scene-transitions-updating-scene-class',
                'tutorials/scene-transitions/tutorials-scene-transitions-transition-class',
                'tutorials/scene-transitions/tutorials-scene-transitions-updating-game1',
                'tutorials/scene-transitions/tutorials-scene-transitions-fade-transition',
                'tutorials/scene-transitions/tutorials-scene-transitions-even-odd-transition'
              ]
            }
          ]
        }
       ]
    },
  ]
}