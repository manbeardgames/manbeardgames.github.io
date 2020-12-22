---
id: tutorials-scene-transitions-updating-game1
title: 'Scene Transitions: Updating Game1'
hide_title: false
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
description: 'A tutorial on create scene transition effects in a MonoGame project.'
image:
slug: /tutorials/scene-transitions/updating-game1
---

Now that we have updating our `Scene` class and created the `Transition` class, we need to update our `Game1` class to use the transitions when switching scenes. There are a few things we'll need

* A reference to the transition out effect being used.
* A reference to the transition in effect being used.
* A reference to the current transition that is transitioning
* A method to handle changing scenes using transitions
* An implementation of subscribing to the graphics device **reset** and **created** events so that we can pass this along to the scene and any transitions.

With those points defined, let's get started updating our `Game1` class.  Open the **Game1.cs** class file.

### Transition Fields
First, we need to add three new fields to our `Game1` class.  

```csharp
//   The Transition Out instance.
private Transition _transitionOut;

//  The Transition In instance.
private Transition _transitionIn;

//  The current transition being used.
private Transition _currentTransition;
```

`_transitionOut` will be our reference to the transition effect that is transitioning the current scene *out*.

`_transitionIn` will be our reference to the transition effect that is transitioning the current scene *in*.

`_currentTransition` will hold a reference to either `_transitionOut` or `_transitionIn` depending on which transition is the current one that is transitioning.

### ChangeScene(Scene, Transition, Transition)
Next, we're going to add an overload method of the `ChangeScene` method.  Add the following method to `Game1`.

```csharp
/// <summary>
///     Changes the current scene to the screen provided using the transition
///     in and out instance provided.
/// </summary>
/// <param name="to">
///     The scene to change to.
/// ></param>
/// <param name="tOut">
///     The transition to use when transitioning out.
/// </param>
/// <param name="tIn">
///     The transition to use when transitioning in.
/// </param>
public void ChangeScene(Scene to, Transition tOut, Transition tIn)
{
    if (_currentTransition == null || !_currentTransition.IsTransitioning)
    {
        if (_activeScene != to)
        {
            _nextScene = to;
            _transitionOut = tOut;
            _transitionIn = tIn;

            //  Subscribe to the TransitionCompleted events for each
            _transitionOut.TransitionCompleted += TransitionOutCompleted;
            _transitionIn.TransitionCompleted += TransitionInCompleted;

            //  Set the curren transition to the out transition first.
            _currentTransition = _transitionOut;

            //  Start the current transition.
            _currentTransition.Start(_activeScene.RenderTarget);
        }
    }
}
```

This `ChangeScene(Scene, Transition, Transition)` method takes three parameters.  A `Scene` instance of the scene that we are transitioning **to**, a `Transition` instance that we can use to transition the current scene **out** with, and finally a `Transition` instance that we can use to transition the next scene **in** with.

First, it checks to see if the `_currentTransition` is `null` and if not ensure that it is not in the middle of a transition, and only continues if this scenario matches.  We don't want to trigger a transition while a transition is already happening.

Next we check to make sure that the scene to switch **to** is not the same instance of the current active scene, and only continue if they are different.

If these checks pass, then we cache the references to the next scene, the transition out and the transition in instances.  We then subscribe to the `TransitionCompleted` events for both the `_transitionOut` and `_transitionIn` instances. Next we set the `_currentTransition` as the `_transitionOut` and tell it to start, giving it the reference to the current active scene's render target.

### TransitionOutCompleted(object, EventArgs)
In the `ChangeScene(Scene, Transition, Transition)` method, we subscribed to the `TransitionCompleted` event of the `_transitionOut` instance.  So we need to add that method now. Add the following method to the `Game1` class.

```csharp
/// <summary>
///     Called when the transition out being used is completed.
/// </summary>
private void TransitionOutCompleted(object sender, EventArgs e)
{
    //  Unsubscribe from the event so we don't leave any references.
    _transitionOut.TransitionCompleted -= TransitionOutCompleted;

    //  Dispose of the instance.
    _transitionOut.Dispose();
    _transitionOut = null;

    //  Change the scene.
    TransitionScene();

    //  Set the current transition to the in transition and start it.
    _currentTransition = _transitionIn;
    _currentTransition.Start(_activeScene.RenderTarget);
}
```

So, whenever the transition out is completed, this gets called.  The first thing we do is unsubscribe from the event.  This is so we don't leave any hanging reference to the `_transitionOut`.  Next we dispose of the `_transitionOut` instance since we no longer need it and can free up its resources.

After this, we call the `TransitionScene()` method we setup in the previous tutorial to gracefully handle changing from the current active scene to the next. Then we set the `_currentTransition` to the `_transitionIn` instance and tell it to start transitioning in.

### TransitionInCompleted(object, EventArgs)
As with the transition out, we subscribed to the `TransitionCompleted` event of the `_transitionIn` instance. So we need to add the method for that next.  Add the following method to the `Game1` class.

```csharp
/// <summary>
///     Called when the transition in being used is completed.
/// </summary>
private void TransitionInCompleted(object sender, EventArgs e)
{
    //  Unsubscribe from the event so we don't leave any references.
    _transitionIn.TransitionCompleted -= TransitionInCompleted;

    //  Dispose of the instance.
    _transitionIn.Dispose();
    _transitionIn = null;
    _currentTransition = null;
}
```

This one is pretty simple and just does some basic cleanup of resources. First we unsubscribe to the `TransitionCompleted` event.  Then we dispose of `_transitionIn` and set both it and `_currentTransition` to `null` since they are no longer needed.

### Change Update(GameTime)
Now we need to change the `Update(GameTime)` method. The following is what this method should look like now.

```csharp
protected override void Update(GameTime gameTime)
{
    PrevKeyboardState = CurKeyboardState;
    CurKeyboardState = Keyboard.GetState();

    //  If there is a current transition happening, then we need to update
    //  that transition. Otherwise, if there is no current transition, but there
    //  is a next scene to switch to, switch to that scene instead.
    if(_currentTransition != null && _currentTransition.IsTransitioning)
    {
        _currentTransition.Update(gameTime);
    }
    else if(_currentTransition == null && _nextScene != null)
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

The change we have made is right in the middle of it. Previously we were just checking if there was a next scene to switch to, and if so, we immediately switched to that scene. 

With the new change, instead we first check if there is a current transition and if it is transitioning. If so, then we update the current transition.  Otherwise, we check to see if there is not a current transition but there **IS** a next scene, and if so we switch to the next scene.

By setting it up this way, it allows us to switch scenes using transition effects, but if we want to simply switch without them by using the old `ChangeScene(Scene)` method, we can still do that to instantly switch.

### Change Draw(GameTime)
Finally, we need to change the `Draw(GameTime)` method to handle not only drawing the current transition, but also to handle using the render targets we created for the transitions and the scenes.

The following is what the `Draw(GameTime)` method should be updated to.

```csharp
protected override void Draw(GameTime gameTime)
{
    //  The color to use when clearing the backbuffer.
    Color clearColor = Color.CornflowerBlue;

    if (_activeScene != null)
    {
        //  Render the current scene.
        _activeScene.BeforeDraw(_spriteBatch, clearColor);
        _activeScene.Draw(_spriteBatch);
        _activeScene.AfterDraw(_spriteBatch);

        //  If there is a current transition happening, render the transition.
        if (_currentTransition != null && _currentTransition.IsTransitioning)
        {
            _currentTransition.Draw(_spriteBatch, Color.Black);
        }

        //  Prepare the graphics device for the final render.
        GraphicsDevice.Clear(Color.Black);

        _spriteBatch.Begin();

        //  If we are transitioning, then we render the transition effect; otherwise, we'll render
        //  the current scene.
        if (_currentTransition != null && _currentTransition.IsTransitioning)
        {
            _spriteBatch.Draw(texture: _currentTransition.RenderTarget,
                                destinationRectangle: _currentTransition.RenderTarget.Bounds,
                                sourceRectangle: _currentTransition.RenderTarget.Bounds,
                                color: Color.White);
        }
        else if (_activeScene != null)
        {
            _spriteBatch.Draw(texture: _activeScene.RenderTarget,
                                destinationRectangle: _activeScene.RenderTarget.Bounds,
                                sourceRectangle: _activeScene.RenderTarget.Bounds,
                                color: Color.White);
        }

        _spriteBatch.End();
    }
    base.Draw(gameTime);
}
```

There is a bit to digest here, so let's break it down.

First, we check to see if there is an active scene. We can't perform our draw code here without a scene to render.  If there is an active scene, then we draw it in order of `BeginDraw(SpriteBatch, Color)`, `Draw(SpriteBatch)`, `EndDraw(SpriteBatch)`.  **Remember, the scene is now drawing it its render target here, not the screen.**

Next we check if there is a current transition happening.  If there is, we tell the transition to draw. **Just like with the scene, remember, the transition is drawing to its render target, not to the screen.**

Once we have finished drawing the scene and the transition, we finally draw to the screen.  **Recall that both the scene and the transition, in their final draw methods, both set the `GraphicsDevice` render target to null.  This means at this point we are prepared to draw to the screen**.

First we check to see if there is a current transition and if it is transitioning.  If so, we draw the render target of the current transition to the screen.  If there is no transition happening, we instead draw the render target of the current active scene to the screen.

:::note  
Here, i have changed the color we use to clear the backbuffer to good old Cornflower blue.  This is so the background of our game isn't black, which makes it easier to see the transition effects that we'll be creating in this tutorial.

Do note however, that when clearing the backbuffer for the final draw, I do use Color.Black.
:::


### GraphicsDevice Created and Reset Events
Finally, we need to make sure that we are handling the `GraphicsDevice.DeviceCreated` and `GraphicsDevice.DeviceReset` events so we can pass this along and handle them in the current active scene and any transitions.

To do this, first locate the `Initialize()` method in the `Game1` class and change it to the following.

```csharp
protected override void Initialize()
{
    base.Initialize();

    //  Handle the created and reset events.
    _graphics.DeviceCreated += GraphicsDeviceCreated;
    _graphics.DeviceReset += GraphicsDeviceReset;

    //  Load the GreenCircleScene as our first scene.
    ChangeScene(new GreenCircleScene(this));
}
```

Here we subscribe the necessary events.  Next, let's add the `GraphicsDeviceCreated(object, EventArgs)` and `GraphicsDeviceReset(object, EventArgs)` methods.  Add the following methods to the `Game1` class.

**GraphicsDeviceCreated(object, EventArgs)***
```csharp
/// <summary>
///     Called when the graphics device is created.
/// </summary>
protected virtual void GraphicsDeviceCreated(object sender, EventArgs e)
{
    if(_activeScene != null)
    {
        _activeScene.HandleGraphicsCreated();
    }

    if(_transitionOut != null)
    {
        _transitionOut.HandleGraphicsCreated();
    }

    if(_transitionIn != null)
    {
        _transitionIn.HandleGraphicsCreated();
    }
}
```

**GraphicsDeviceReset(object, EventArgs)**
```csharp
/// <summary>
///     Called when the graphics device is reset.
/// </summary>
protected virtual void GraphicsDeviceReset(object sender, EventArgs e)
{
    if (_activeScene != null)
    {
        _activeScene.HandleGraphicsReset();
    }

    if (_transitionOut != null)
    {
        _transitionOut.HandleGraphicsReset();
    }

    if (_transitionIn != null)
    {
        _transitionIn.HandleGraphicsReset();
    }
}
```

In both of these, we tell the current active screen and any transitions to handle the event.

And that's it for all of the `Game1` updates. Now lets actually create a transition effect to test this with.