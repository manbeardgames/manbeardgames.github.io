---
id: what-is-a-scene
title: "Scenes: What is a Scene"
hide_title: true
hide_table_of_contents: false
sidebar_label: What is a Scene
custom_edit_url: null
keywords:
    - 'monogame tutorial'
    - 'monogame framework'
    - 'monogame'
    - 'tutorial'
    - 'scene transition'
    - 'scene'
    - 'scenes'
description: 'A tutorial on creating scenes in a MonoGame project.'
image: /img/mgb_cookie.svg
slug: /tutorials/monogame-3-8/scenes/what-is-a-scene
---

# What is a Scene?
Most people reading this are probably familiar with the videogame Super Mario Bros.  When you first start that game, the first thing the player is shown is the *Title* screen. From here, you can choose *1 Player Game* to start the game, which then presents the player with an informative screen showing *World #-#* and the number of lives remaining. After a second, you're finally presented with the first level of the game.

![](/img/tutorials/scenes/three-screens.png)


Each of of these screens that the player see has a cleared and defined purpose for the visuals that it presents and the controls it gives the player.  These *screens* are what we are going to call **scenes**. Scenes are not a new concept to game development.  Many game engines, such as Unity, implement Scenes at their core.  

###  Defining a Scene
In MonoGame, the default `Game1` class that we are given when creating a new project can be thought of as a scene.  And this works great when we are prototyping or making something on a super small scale.  Keeping all of our code in `Game1` however isn't very scalable.

Since `Game1` is like a scene, we can use it as a foundation for defining the structure of our `Scene` class.  A few concept we'll borrow from it will be

* A `Initialize()` method that can initialize our scene.
* A `LoadContent()` method where we can load all of scene specific content.
* A `UnloadContent()` method where we can unload and dispose of any content no longer needed when the scene is no longer in use.
* A `Update()` method so we can update the scene each frame.
* A `Draw()` method so we can draw the scene.

Along with these concepts, we can add the following methods to help out as well

* A `BeforeDraw()` method where we can make the necessary preparations for the scene to draw
* A `EndDraw()` method where we can perform the necessary things to gracefully end drawing in our scene.

We'll also need a reference to our `Game1` class so we can easily access things like the `GraphicsDeviceManager`.  Lastly, each scene will need its own `ContentManager` instance to load and manage scene specific content.