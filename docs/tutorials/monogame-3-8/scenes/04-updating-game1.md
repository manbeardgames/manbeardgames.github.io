---
id: updating-game1
title: "Scenes: Updating Game1"
hide_title: true
hide_table_of_contents: false
sidebar_label: Updating Game1
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
slug: /tutorials/monogame-3-8/scenes/updating-game1
---

# Updating Game1
Now that we have the `Scene` class completed, we need to up `Game1` so it can properly handle scenes.  The following is a list of things that will need to be handled

* Keeping track of what scene is currently the active scene and which scene, if any, is the next scene.
* Updating the active scene.
* Drawing the active scene.
* Ability to change from one scene to another.

:::note Perform the Following
In the next sections, we'll go over implementing each of the above points into our `Game1` class. So open up **Game1.cs** class file in your project and let's dive in.
:::

### Tracking Active and Next Scene
We can make use of two instance field to keep track of which scene is the **active** scene and, when we need to change scenes, which is the **next** scene to switch to.

:::note Perform the Following
Add the following fields to `Game1`

```csharp
//  The current scene that is active.
private Scene _activeScene;

//  The next scene to switch to.
private Scene _nextScene;
```
:::

Anytime we need to update, draw, or reference the current active scene for any reason, we'll use the `_activeScene` field.  The `_nextScene` field will be used to store a reference to the next scene to switch to whenever we need to switch scenes. This field should only hold a value when there is a scene to switch to. Once the switch has occurred, it will be set to `null`.

### Updating the Active Scene
Next, we need to ensure that we are updating the active scene.  

:::note Perform the Following
Find the `Update(GameTime)` method in `Game1` class and change it to the following

```csharp
protected override void Update(GameTime gameTime)
{
    //  If there is an active scene, update it.
    if(_activeScene != null)
    {
        _activeScene.Update(gameTime);
    }

    base.Update(gameTime);
}
```
:::

So far, the `Update(GameTime)` logic is pretty simple.  It checks if there is a current active scene, and if so, updates it.

### Drawing the Active Scene
Next, we need to ensure that we are drawing the active scene to the screen.

:::note Perform the Following
Find the `Draw(SpriteBatch, GameTime)` method in the `Game1` class and change it to the following

```csharp
protected override void Draw(GameTime gameTime)
{
    //  If there is an active scene, draw it.
    if(_activeScene != null)
    {
        _activeScene.BeforeDraw(_spriteBatch, Color.Black);
        _activeScene.Draw(_spriteBatch);
        _activeScene.AfterDraw(_spriteBatch);
    }

    base.Draw(gameTime);
}
```
:::

This will handle calling `BeforeDraw(SpriteBatch, Color)`, `Draw(SpriteBatch)`, and `AfterDraw(SpriteBatch)`, in that order, for the active scene.

:::note  
The default Game1 class clears the backbuffer using good old `Color.CornflowerBlue` by default. Here, I'm passing instead `Color.Black` as the color to clear the backbuffer with.  You can use whatever color you'd like.
:::  

### Changing Scenes
To change scenes, we're going to first create a method to handle setting what the next scene should be. 

:::note Perform the Following
Add the following method to the `Game1` class.

```csharp
/// <summary>
///     Sets the next scene to switch to.
/// </summary>
/// <param name="next">
///     The Scene instance to switch to.
/// </param>
public void ChangeScene(Scene next)
{
    //  Only set the _nextScene value if it is not the
    //  same instance as the _activeScene.
    if(_activeScene != next)
    {
        _nextScene = next;
    }
}
```
:::

As far as things go, this is pretty simple.  It detects if the scene we are switching to is the same instance as the current active scene. Only if they are different instances will if set the value of `_nextScene`

Next we need to add an additional method to handle the actual transitioning from one scene to the next. 

:::note Perform the Following
Add the following method to the `Game1` class.

```csharp
/// <summary>
///     Handles transitioning gracefully from one scene to
///     the next.
/// </summary>
private void TransitionScene()
{
    if(_activeScene != null)
    {
        _activeScene.UnloadContent();
    }

    //  Perform a garbage collection to ensure memory is cleared
    GC.Collect();

    //  Set the active scene.
    _activeScene = _nextScene;

    //  Null the next scene value
    _nextScene = null;

    //  If the active scene isn't null, initialize it.
    //  Remember, the Initialize method also calls the LoadContent method
    if(_activeScene != null)
    {
        _activeScene.Initialize();
    }
}
```
:::

A few things are happening here. First, if `_activeScene` isn't `null`, we tell it to unload all content managed by that scene by calling the `Unload()` method. We no longer need it, so free up the memory.  Next, we perform a manual garbage collection to ensure the memory is freed up.  Then we set the `_activeScene` to the `_nextScene`, and, if it isn't `null`, we call the `Initialize` method.

Finally, we need to do one last change in the Game1 `Update(GameTime)` method.  

:::note Perform the Following
Go back to the `Update(GameTime)` method and update it to the following.

```csharp
protected override void Update(GameTime gameTime)
{
    //  If there is a next scene waiting to be switched to
    //  transition to that scene.
    if (_nextScene != null)
    {
        TransitionScene();
    }

    //  If there is an active scene, update it.
    if (_activeScene != null)
    {
        _activeScene.Update(gameTime);
    }

    base.Update(gameTime);
}
```
:::

With this change, we detect first if there is a next scene to switch to, and if so, we perform the scene transitions. Now you may be asking, *why do we need to transition scene here? Why didn't we just perform the transition inside the `ChangeScene(Scene)` method all at once?*

Well, we could have, absolutely. However, remember when we end one scene, we unload all of the content managed by the scene. Also, most likely, the call to `ChangeScene(Scene)` will be performed from within a scene itself.  So by telling our game which scene to switch to, and then performing the actual transition during the next update frame, we can be sure no issues occur with any references to the current scene's properties, objects, etc.

(actually, I'm probably talking out of my ass with that last paragraph, but this is generally the structure used.)

On the next page, we're going to test our setup.