---
id: updating-scene-class
title: 'Scene Transitions: Updating The Scene Class'
hide_title: true
hide_table_of_contents: false
sidebar_label: Updating the Scene Class
custom_edit_url: null
keywords:
    - 'monogame tutorial'
    - 'monogame framework'
    - 'monogame'
    - 'tutorial'
    - 'scene transition'
    - 'scene'
    - 'scenes'
description: 'A tutorial on creating scene transition effects in a MonoGame project.'
image: /img/mgb_cookie.svg
slug: /tutorials/monogame-3-8/scene-transitions/updating-scene-class
---
# Updating the Scene Class

:::note
This tutorial builds off of the code that was created in the [previous tutorial on creating scenes](../scenes/introduction).  If you haven't completed that tutorial yet, it is advised that you go through it before continuing past this point.
:::

The first thing we're going to do is update our `Scene` class.  Each scene will need to have it's own `RenderTarget2D` instance that it draws to.  Open the **Scene.cs** class file and let's get started.

### RenderTarget Property
Each scene will need to have its own `RenderTarget2D` instance that it draws to.  We can create a property for this to hold the instance.

:::note Perform the following.
Open the **Scene.cs** class file and add the following property.

```csharp
/// <summary>
///     Gets the RenderTarget this Scene draws to.
/// </summary>
public RenderTarget2D RenderTarget { get; protected set; }
```
:::

This makes it so the render target is publicly accessible for any object that has a reference to our Scene instance, but only Scene types can set the value.

### GenerateRenderTarget()
We need to add a new method to our `Scene` class that we can use to create the `RenderTarget2D` instance.  We could just do this in the constructor of our `Scene` class, but remember, we may need to recreate the render target if the graphics device resets.  So we'll do it in a new method we can call when needed.

:::note Perform the Following
Add the following method to the `Scene` class.

```csharp
/// <summary>
///     Generates a RenderTarget2D instance for our Scene.
/// </summary>
public virtual void GenerateRenderTarget()
{
    int width = _game.GraphicsDevice.PresentationParameters.BackBufferWidth;
    int height = _game.GraphicsDevice.PresentationParameters.BackBufferHeight;

    //  If the RenderTarget instance has already been created previously but has yet
    //  to be disposed of properly, dispose of the instance before setting a new one.
    if (RenderTarget != null && !RenderTarget.IsDisposed)
    {
        RenderTarget.Dispose();
    }

    RenderTarget = new RenderTarget2D(_game.GraphicsDevice, width, height);
}
```
:::

This method will check to see if there is already a render target and, if so , will dispose of it before creating a new one. Now that we have this method, we can update the constructor so that it generates the render target when a scene is created.  

:::note Perform the Following
Find the constructor of our `Scene` class and update it to the following.

```csharp
/// <summary>
///     Creates a new Scene instance.
/// </summary>
/// <param name="game">
///     A reference to our Game1 instance.
/// </param>
/// <exception cref="ArgumentNullException">
///     Thrown if the value supplied for <paramref name="game"/> 
///     is null
/// </exception>
public Scene(Game1 game)
{
    if (game == null)
    {
        throw new ArgumentNullException(nameof(game), "Game cannot be null!");
    }

    _game = game;
    
    //  Generate the render target
    GenerateRenderTarget();
}
```
:::

### HandleGraphicsReset() and HandleGraphicsCreated()
As was pointed out previously, whenever the graphics device is created or reset, we have to regenerate our render target instance.  So we need a couple of methods within the scene class that can be called in this events.  

:::note Perform the Following
Add the following two methods to the `Scene` class.

**HandleGraphicsCreated()**
```csharp
/// <summary>
///     Handles creating the contents of VRAM for the scene when the GraphicsDevice
///     is created.
/// </summary>
public virtual void HandleGraphicsCreated()
{
    GenerateRenderTarget();
}
```

**HandleGraphicsReset()**
```csharp
 /// <summary>
///     Handles recreating contents of VRAM for the scene when the GraphicsDevice
///     is reset.
/// </summary>
public virtual void HandleGraphicsReset()
{
    GenerateRenderTarget();
}
```
:::

These two methods, when called, will simply just call the `GenerateRenderTarget()` method to recreate the render target instance.

### Using the RenderTarget
Now that we have a render target for the scene that we can draw too, we need to tell the scene to actually draw to it instead of to the game window directly. We can do this by telling the `GraphicsDevice` to use the render target.  

:::note Perform the Following
Locate the `BeforeDraw(SpriteBatch)` method of our `Scene` class and change it to the following.

```csharp
/// <summary>
///     Handles preparing the Scene to draw.
/// </summary>
/// <remarks>
///     This is called just before the main Draw method.
/// </remarks>
/// <param name="spriteBatch"></param>
public virtual void BeforeDraw(SpriteBatch spriteBatch, Color clearColor)
{
    //  Tell the graphics device to use this scene's render target.
    _game.GraphicsDevice.SetRenderTarget(RenderTarget);

    //  Clear the backbuffer
    _game.GraphicsDevice.Clear(clearColor);

    //  Begin the spritebatch
    spriteBatch.Begin();
}
```
:::

Here, the change we made is the first line inside the method.  We simply tell the `GraphicsDevice` to use the scene's render target.  

This however is only half the story.  If we tell the `GraphicsDevice` to use the render target, then it will keep using it, even in other draw code outside of our scene. We need to make sure that when we are finished drawing our scene, that we tell the `GraphicsDevice` to switch back to drawing to the backbuffer. 

:::note Perform the Following
Locate the `AfterDraw(SpriteBatch)` method, and change it to the following.

```csharp
/// <summary>
///     Handles ending any drawing the scene is performing.
/// </summary>
/// <remarks>
///     This is called immediately after Draw.
/// </remarks>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
public virtual void AfterDraw(SpriteBatch spriteBatch)
{
    //  End the spritebatch
    spriteBatch.End();

    //  Tell the graphics device to stop using the render target
    _game.GraphicsDevice.SetRenderTarget(null);
}
```
:::

The change we made here is at the end of method. We just set the render target that the `GraphicsDevice` is using to `null`.  This tells it to go back to drawing to the game window.

### Disposing the RenderTarget
The last change we need to make to our `Scene` class is ensuring that we dispose of the `RenderTarget2D` instance when the scene is no longer being used.  If you recall from the previous tutorial, we setup the `UnloadContent()` method to handle freeing resources managed by the Scene's `ContentManger()`.  This will be a great place to also dispose of the render target, since it self is content of the scene that needs to be unloaded.

:::note Perform the Following
Find the `UpdateContent()` method and change it to the following.

```csharp
/// <summary>
///     Unloads any content that has been loaded by the scene.
/// </summary>
/// <remarks>
///     This will be called after the game switches to a new
///     scene.
/// </remarks>
public virtual void UnloadContent()
{
    _content.Unload();
    _content = null;

    //  Dispose of the render target if it is not already disposed.
    if(RenderTarget != null && !RenderTarget.IsDisposed)
    {
        RenderTarget.Dispose();
        RenderTarget = null;
    }
}
```
:::

Here the change we make is to check if the render target has been disposed, and if not, we dispose of it. 

That's it for all the updates to our `Scene` class.  Next, we're going to create the base class for the transition effects.