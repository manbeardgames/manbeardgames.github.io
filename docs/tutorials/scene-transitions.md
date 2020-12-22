---
id: tutorials-scene-transitions
title: Scene Transitions
hide_title: false
hide_table_of_contents: false
sidebar_label: Scene Transitions
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
slug: /tutorials/scene-transitions
---

In the previous tutorial, we went throught the steps of adding a `Scene` class and implementing it int our `Game1` class. With this, we were able to change from one scene to another using the `ChangeScene(Scene)` method we created.  However, when we changed scenes, visually, it was less than impressive. One scene pops out and the new one pops in almost instantly.

In this tutorial, we're going to fix that. We're going to adjust what we did previous so that we can have different effects to transition our scenes out and in.  

## RenderTarget Introduction
A `RenderTarget2D` is like a special kind of texture that we can draw things too.  So instaed of drawing our scene directly to the game window (aka backbuffer), we're instead going to draw our scene to a render target.  By doing this, when we do our scene transitions, we can manipute the render target before we draw it the the screen to do the transition effects.

There are a few caveots to using render targets though that we need to be aware of, and, make sure that we handle them properly.

1. A `RenderTarge2D` instance is a graphical resource object that we are creating manually. This means its life cycle is not managed by the `ContentManager` like a normal texture, and we'll need to handle disposing of it properly when no longer needed.
2. The contents of the `RenderTarget2D` when we draw to it reside in VRAM.  Due to this, anytime a `GraphicsDevice.DeviceCreated` or `GraphicsDevice.DeviceReset` event occurs, all contents of VRAM are discarded and the `RenderTarget2D` instance will need to be recreated again.  (this isn't as scary as it sounds).

So, with these points in mind, let's get started updating our scene demo.

## Updateing the Scene Class.
The first thing we're going to do is update our `Scene` class.  Each scene will need to have it's own `RenderTarget2D` instance that it draws to.  Open the **Scene.cs** class file and let's get started.

### RenderTarget Property
The first thing we need to do is add new property to the `Scence` class to hold our render target instance. To do this, add the following property.

```csharp
/// <summary>
///     Gets the RenderTarget this Scene draws to.
/// </summary>
public RenderTarget2D RenderTarget { get; protected set; }
```

This makes it so the render tager it publically accessible for any object that has a reference to our Scene instnace, but only derviced Scene types can set the value.

### GenerateRenderTarget()
We need to add a new method to our `Scene` class that we can use to create the `RenderTarget2D` instance.  We could just do this in the constructor of our Scene class, but remember, we may need to recreate the render target if the graphics device resets.  So we'll do it in a method we can call when needed.

Add the following method to the `Scene` class.

```csharp
/// <summary>
///     Genereates a RenderTarget2D instnace for our Scene.
/// </summary>
public virtual void GenerateRenderTarget()
{
    int width = _game.GraphicsDevice.PresentationParameters.BackBufferWidth;
    int height = _game.GraphicsDevice.PresentationParameters.BackBufferHeight;

    //  If the RenderTarget instance has already been created previously but has yet
    //  to be disposed of properly, dispose of the instnace before setting a new one.
    if (RenderTarget != null && !RenderTarget.IsDisposed)
    {
        RenderTarget.Dispose();
    }

    RenderTarget = new RenderTarget2D(_game.GraphicsDevice, width, height);
}
```

This method will check to see if there is already a render target and if so will dispose of it before creating a new one. Now that we have this method, we can update the constructor so that it genreates the render target when a scene is created.  Update the constructor as follows

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

### HandleGraphicsReset() and HandleGraphicsCreated()
As was pointed out previously, whenever the graphics device is created or reset, we have to regenerate our render target instance.  So we need a couple of methods within the scene class that can be called in this events.  

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

### Using the RenderTarget
Now that we have a render target for the scene that we can draw too, we need to tell the scene to actually draw to it insted of to the game window directly. We can do this by telling the `GraphicsDevice` to use the render target.  Find the `BeforeDraw(SpriteBatch)` method of our `Scene` class and change it to the following.

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

Here, the change we made is the first line inside the method.  We simply tell the `GraphicsDevice` to use the scene's render target.  

This however is only half the story.  If we tell the `GraphicsDevice` to use the render target, then it will keep using it, even other draw code outside of our scene. We need to make sure that when we are finsihed drawing our scene, that we tell the `GraphicsDevice` to switch back to drawing to the backbuffer. 

To do this, locate the `AfterDraw(SpriteBatch)` method, and change it to the following.

```csharp
/// <summary>
///     Handles ending any drawing the scene is performing.
/// </summary>
/// <remarks>
///     This is called immediatly after Draw.
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

The change we made here is at the end of method. We just set the render target that the `GraphicsDevice` is using to `null`.  This tell it to go back to drawing to the game window.

### Disposing the RenderTarget
The last change we need to make to our `Scene` class is ensuring that we dispose of the `RenderTarget2D` instance when the scene is no longer being used.  If you recall from the previous tutorial, we setup the `UnloadContent()` method to handle freeing resources managed by the Scene's `ContentManger()`.  This will be a great place to also dispose of the render target, since itself is content of the scene that needs to be unloaded.

Find the `UpdateContent()` method and update it to the following.

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

Here the change we make is to check if the render target hasn't been disposed, and if not, we dispose of it.

## Transition Class
Now that we have updated our `Scene` class, the next thing we need to do is create the `Transition` class.  A transition, like a scene, is an abstract concept that is implemented by the different type of transitions, such as fade swips, etc.  So before we get to the code of the `Transition` class, let's first define what we'll need.

* A way of specifing if the transition is **in** or **out** (i.e. fade in vs fade out).
* A render target to draw the transition too.
* Handling graphics create/reset for the render target.
* Disposale of the render target
* A reference to render target of the scene we are transitioning.
* Way of tracking how long the transition should take and the amount of time the amount of time that has elasped.
* A way of telling the transition when to start.
* A way of knowing exatly when the transition has ended so we can handle anything in code

So now that we have defined what we'll need, let's take a look at the code.

### The Code
Below is the entire code needed for the transition class. Look it over and then we'll dive into each section of the code below.

**using statements**
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
```

**Transition class**
```csharp
/// <summary>
///     Base class for all transition instances.
/// </summary>
public abstract class Transition : IDisposable
{
    public enum TransitionKind
    {
        In,
        Out
    }

    protected bool _disposed;   //  Indicates if this instance has been disposed of.
    protected Game1 _game;   //  Cached reference to our game instance.

    /// <summary>
    ///     Gets a value indicating if this transition is currently transitioning.
    /// </summary>
    public bool IsTransitioning { get; private set; }

    /// <summary>
    ///     Gets a value indicating the type of transition this is
    /// </summary>
    public TransitionKind Kind { get; private set; }

    /// <summary>
    ///     Gets the total amount of time required for this transition to complete.
    /// </summary>
    public TimeSpan TransitionTime { get; private set; }

    /// <summary>
    ///     Gets the total amount of time remaining for the transition to complete.
    /// </summary>
    public TimeSpan TransitionTimeRemaining { get; private set; }

    /// <summary>
    ///     Gets a cached reference to the RenderTarget2D instance used by the Scene
    ///     this transition is transitioning.
    /// </summary>
    public RenderTarget2D SourceTexture { get; private set; }

    /// <summary>
    ///     Gets the RenderTarget2D instanice this transition renders to.
    /// </summary>
    public RenderTarget2D RenderTarget { get; private set; }

    /// <summary>
    ///     Event triggered when the transition has fully complerted.
    /// </summary>
    public event EventHandler TransitionCompleted;

    /// <summary>
    ///     Creates a new Transition instance.
    /// </summary>
    /// <param name="game">
    ///     A reference to our Game instance.
    /// </param>
    /// <param name="transitionTime">
    ///     The total amount of time the transition will take.
    /// </param>
    /// <param name="kind">
    ///     The type of transition.
    /// </param>
    public Transition(Game1 game, TimeSpan transitionTime, TransitionKind kind)
    {
        _game = game;
        TransitionTimeRemaining = TransitionTime = transitionTime;
        Kind = kind;
        CreateRenderTarget();
    }

    /// <summary>
    ///     Starts the transition.
    /// </summary>
    /// <param name="sourceTexture">
    ///     A reference to the RenderTarget2D instance of the scene being transitioned.
    /// </param>
    public virtual void Start(RenderTarget2D sourceTexture)
    {
        SourceTexture = sourceTexture;
        IsTransitioning = true;
    }

    /// <summary>
    ///     Updates this Transition.
    /// </summary>
    /// <param name="gameTime">
    ///     A snapshot of the timing values provided by the MonoGame Framework.
    /// </param>
    public virtual void Update(GameTime gameTime)
    {
        TransitionTimeRemaining -= gameTime.ElapsedGameTime;

        if (TransitionTimeRemaining <= TimeSpan.Zero)
        {
            IsTransitioning = false;

            if (TransitionCompleted != null)
            {
                TransitionCompleted(this, EventArgs.Empty);
            }
        }
    }

    /// <summary>
    ///     Draws the Transition to its render target.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    /// <param name="clearColor">
    ///     The color value to use when clearing the backbuffer.
    /// </param>
    public void Draw(SpriteBatch spriteBatch, Color clearColor)
    {
        BeginRender(spriteBatch, clearColor);
        Render(spriteBatch);
        EndRender(spriteBatch);
    }

    /// <summary>
    ///     Prepares this transition for rendering.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    /// <param name="clearColor">
    ///     The color value to use when clearing the backbuffer.
    /// </param>
    private void BeginRender(SpriteBatch spriteBatch, Color clearColor)
    {
        //  Prepare the graphics device.
        _game.GraphicsDevice.SetRenderTarget(RenderTarget);
        _game.GraphicsDevice.Viewport = new Viewport(RenderTarget.Bounds);
        _game.GraphicsDevice.Clear(clearColor);

        //  Begin the sprite batch.
        spriteBatch.Begin(blendState: BlendState.AlphaBlend,
                            samplerState: SamplerState.PointClamp);
    }

    /// <summary>
    ///     Renders this transition.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    protected virtual void Render(SpriteBatch spriteBatch) { }

    /// <summary>
    ///     Ends the rendering for this tansition.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    private void EndRender(SpriteBatch spriteBatch)
    {
        //  End the sprite batch.
        spriteBatch.End();

        _game.GraphicsDevice.SetRenderTarget(null);
    }

    /// <summary>
    ///     When the graphics device is created, no contents are in VRAM, so we need
    ///     to ensure that the RenderTarget is created.
    /// </summary>
    public void HandleGraphicsCreated()
    {
        CreateRenderTarget();
    }

    /// <summary>
    ///     When the graphics device is reset, all contents of VRAM are discared. When
    ///     this happens, we need to create things like RenderTarget instances.
    /// </summary>
    public void HandleGraphicsReset()
    {
        CreateRenderTarget();
    }

    /// <summary>
    ///     Creates a new RenderTarget instance for this Transition.
    /// </summary>
    private void CreateRenderTarget()
    {
        int width = _game.GraphicsDevice.PresentationParameters.BackBufferWidth;
        int height = _game.GraphicsDevice.PresentationParameters.BackBufferHeight;

        //  If the RenderTarget instance has already been created previously but has yet
        //  to be disposed of properly, dispose of the instnace before setting a new one.
        if (RenderTarget != null && !RenderTarget.IsDisposed)
        {
            RenderTarget.Dispose();
        }

        RenderTarget = new RenderTarget2D(_game.GraphicsDevice, width, height);
    }

    /// <summary>
    ///     Handles the disposing of resources used by this instance.
    /// </summary>
    /// <remarks>
    ///     For more informaiton on using Dispose and the IDisposable interface
    ///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
    /// </remarks>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    /// <summary>
    ///     Handles the disposing of resources used by this instance.
    /// </summary>
    /// <param name="isDisposing">
    ///     A value indicating if resources should be disposed.
    /// </param>
    /// <remarks>
    ///     For more informaiton on using Dispose and the IDisposable interface
    ///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
    /// </remarks>
    protected virtual void Dispose(bool isDisposing)
    {
        if (_disposed)
        {
            return;
        }

        if (isDisposing)
        {
            if (RenderTarget != null)
            {
                RenderTarget.Dispose();
                RenderTarget = null;
            }
        }

        _disposed = true;
    }
}
```

### IDisposable
The first thing to pay attention to in the code is that we are using the `IDisposable` interface.  

```csharp
public abstract class Transition : IDisposable
```

This means we have a Dispose method that we can call manually, or can be called by the garbage collector automatically when there is no reference to a transition object instnace. By having this, we can ensure that resources are cleaned up, like the render target.

The implementation here for the `IDisposable` interface is pretty simple.  First we have the following field

```csharp
protected bool _disposed;
```

This field indicates if the transition instance has already been disposed of.

Next we have the `Dispose()` and `Dispose(bool)` methods.

```csharp
/// <summary>
///     Handles the disposing of resources used by this instance.
/// </summary>
/// <remarks>
///     For more informaiton on using Dispose and the IDisposable interface
///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
/// </remarks>
public void Dispose()
{
    Dispose(true);
    GC.SuppressFinalize(this);
}

/// <summary>
///     Handles the disposing of resources used by this instance.
/// </summary>
/// <param name="isDisposing">
///     A value indicating if resources should be disposed.
/// </param>
/// <remarks>
///     For more informaiton on using Dispose and the IDisposable interface
///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
/// </remarks>
protected virtual void Dispose(bool isDisposing)
{
    if (_disposed)
    {
        return;
    }

    if (isDisposing)
    {
        if (RenderTarget != null)
        {
            RenderTarget.Dispose();
            RenderTarget = null;
        }
    }

    _disposed = true;
}
```

The first `Dispose()` method is the public one. This is the one that we can call when we need to dispose of the instance, or is called by the garbage collector.  The second `Dispose(bool)` is where the dispoal occurs.  Here, we check if we have already disposed, and if so we just return back.  If not, we then check the value of `_isDisposing`, and if `true`, we dispose of the render target gracefully.

### TransitionKind Enum
Next, we said before that we needed a way of indicating if we were transitioning **in** or **out**. This is what the `TransitionKind` enum is for.

```csharp
/// <summary>
///     Defines a value that indicates the kind of transition.
/// </summary>
public enum TransitionKind
{
    /// <summary>
    ///     Indecates a transition in.
    /// </summary>
    In,

    /// <summary>
    ///     Indicates a transition out.
    /// </summary>
    Out
}
```

As far as things go, this is pretty simple.  It defines a value for us that indicates if a transition is transitioning *in* or *out*.

### Fields
Our `Transition` class only has two fields.

```csharp
protected bool _disposed;
protected Game1 _game; 
```

We talked previously about the `_disposed` field in the IDisposable section above.  The `_game` field is to store a cached reference to the `Game1` instance, just like we did in the Scene class.

### Properties
The following are the properties of our `Transition` class.

```csharp
/// <summary>
///     Gets a value indicating if this transition is currently transitioning.
/// </summary>
public bool IsTransitioning { get; private set; }

/// <summary>
///     Gets a value indicating the type of transition this is
/// </summary>
public TransitionKind Kind { get; private set; }

/// <summary>
///     Gets the total amount of time required for this transition to complete.
/// </summary>
public TimeSpan TransitionTime { get; private set; }

/// <summary>
///     Gets the total amount of time remaining for the transition to complete.
/// </summary>
public TimeSpan TransitionTimeRemaining { get; private set; }

/// <summary>
///     Gets a cached reference to the RenderTarget2D instance used by the Scene
///     this transition is transitioning.
/// </summary>
public RenderTarget2D SourceTexture { get; private set; }

/// <summary>
///     Gets the RenderTarget2D instanice this transition renders to.
/// </summary>
public RenderTarget2D RenderTarget { get; private set; }
```

These should all be pretty self explanitory.  

`IsTransitioning` is a value we can set to indicate if the transition has started and is currently in the middel of transitioning.  

`Kind` indicates what `TransitionKind` this transition is doing.

`TransitionTime` is a TimeSpan that indicates the total amount of time the transition should take before it is completed.

`TransitoinTimeRemaining` is a TimeSpan we use as a countdown to indicate how much time left for the transition to complete.

`SourceTexture` is a reference to the render target of the scene that this transition is transitioning.  We'll manipulate this render target when we draw the transition to create the transition effect.

`RenderTarget` is the render target that we draw the transition too.

### Events
There is only one event in the `Transition` class.

```csharp
/// <summary>
///     Event triggered when the transition has fully complerted.
/// </summary>
public event EventHandler TransitionCompleted;
```

We will invoke this event when a transition has completed. Anything subscribed to this event can safely assume that the transition is done and it can move on.

### Constructor
Next, let's take a look at the constructor

```csharp
/// <summary>
///     Creates a new Transition instance.
/// </summary>
/// <param name="game">
///     A reference to our Game instance.
/// </param>
/// <param name="transitionTime">
///     The total amount of time the transition will take.
/// </param>
/// <param name="kind">
///     The type of transition.
/// </param>
public Transition(Game1 game, TimeSpan transitionTime, TransitionKind kind)
{
    _game = game;
    TransitionTimeRemaining = TransitionTime = transitionTime;
    Kind = kind;
    CreateRenderTarget();
}
```

When creating a new `Transition` instance, this is the constructor that is called.  It requires a reference to `Game1`, a TimeSpan indicating how long the transition will take, and a `TransitionKind` value to indicate if this transition is going *in* or *out.

After caching these values, we create the RenderTarget for the transition.

### Start(RenderTarget)
The `Start(RenderTarget)` method is used to start the transition.

```csharp
/// <summary>
///     Starts the transition.
/// </summary>
/// <param name="sourceTexture">
///     A reference to the RenderTarget2D instance of the scene being transitioned.
/// </param>
public virtual void Start(RenderTarget2D sourceTexture)
{
    SourceTexture = sourceTexture;
    IsTransitioning = true;
}
```

When `Start` is called, we have to pass to it the render target instance of the scene that is being transitioned.  We simply just cache the reference to the render target, then set the `IsTransitioning` property to `true` to indicate the the transition has started.

### Update(GameTime)
Next is the `Update(GameTime)` method.

```csharp
/// <summary>
///     Updates this Transition.
/// </summary>
/// <param name="gameTime">
///     A snapshot of the timing values provided by the MonoGame Framework.
/// </param>
public virtual void Update(GameTime gameTime)
{
    TransitionTimeRemaining -= gameTime.ElapsedGameTime;

    if (TransitionTimeRemaining <= TimeSpan.Zero)
    {
        IsTransitioning = false;

        if (TransitionCompleted != null)
        {
            TransitionCompleted(this, EventArgs.Empty);
        }
    }
}
```

This is a pretty simple update method all things considered.  We subtract the amount of time that has elapsed from the `TransitionTimeRemaining`.  We then check if the `TransitionTimeRemaining` has reached or gone below zero.  If it has, we set `IsTransitioning` to false and trigger the `TransitionComleted` event.

### BeforeRender(SpriteBatch, Color)
The `Beforerender(SpriteBatch, Color)` method will handle setting up the graphics device and the spritebatch to for rendering our transition.


```csharp
/// <summary>
///     Prepares this transition for rendering.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
/// <param name="clearColor">
///     The color value to use when clearing the backbuffer.
/// </param>
private void BeginRender(SpriteBatch spriteBatch, Color clearColor)
{
    //  Prepare the graphics device.
    _game.GraphicsDevice.SetRenderTarget(RenderTarget);
    _game.GraphicsDevice.Clear(clearColor);

    //  Begin the sprite batch.
    spriteBatch.Begin(blendState: BlendState.AlphaBlend,
                        samplerState: SamplerState.PointClamp);
}
```

Here we seting the `GraphicsDvice` rendertarget to use the transition's rendertaget.  Then we clear the backbuffer using the color provided.  After that we tell the `SpriteBatch` instnace to begin.


### Render(SpriteBatch)
Next is the `Render(SpriteBatch)` method.

```csharp
/// <summary>
///     Renders this transition.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
protected virtual void Render(SpriteBatch spriteBatch) { }
```

In this base `Transition` class, we don't do anything here. Instead it will be up to the class that inherits from `Transition` to implement how to render the transition.


### EndRender(SpriteBatch)
The `EndRender(SpriteBatch)` method handles gracefully endeing rendering of our transition.

```csharp
/// <summary>
///     Ends the rendering for this tansition.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
private void EndRender(SpriteBatch spriteBatch)
{
    //  End the sprite batch.
    spriteBatch.End();

    _game.GraphicsDevice.SetRenderTarget(null);
}
```

It does this by simply ending the spritebatch and then setting the render target of the graphics device to null.

### Draw(SpriteBatch, Color)
This is where all of the above rendering methods get called.

```csharp
/// <summary>
///     Draws the Transition to its render target.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
/// <param name="clearColor">
///     The color value to use when clearing the backbuffer.
/// </param>
public void Draw(SpriteBatch spriteBatch, Color clearColor)
{
    BeginRender(spriteBatch, clearColor);
    Render(spriteBatch);
    EndRender(spriteBatch);
}
```

We pass in the `SpriteBatch` instance used for drawing and a `Color` to clear the backbuffer with, then call the `BeginRender(SpriteBatch, Color)`, `Render(SpriteBatch)`, and `EndRender(SpriteBatch)` methods in that order.

### HandleGraphicsCreated()
Just like in our `Scene` class, we have a `HandleGraphicsCreated()` method that can be called whenever the graphics device is created.

```csharp
/// <summary>
///     When the graphics device is created, no contents are in VRAM, so we need
///     to ensure that the RenderTarget is created.
/// </summary>
public void HandleGraphicsCreated()
{
    CreateRenderTarget();
}
```

When this happens, we tell the transition instance to create its render target.

### HandleGraphicsReset()
Again, just like in our `Scene` class, we have a `HandleGraphicsReset()` method that can be called whenver the graphics device is reset

```csharp
/// <summary>
///     When the graphics device is reset, all contents of VRAM are discared. When
///     this happens, we need to create things like RenderTarget instances.
/// </summary>
public void HandleGraphicsReset()
{
    CreateRenderTarget();
}
```

When this happens, we tell the transition instance to craete its render target.

### CreateRenderTarget()
Finally, we have the `CreateRenderTarget()` method.

```csharp
/// <summary>
///     Creates a new RenderTarget instance for this Transition.
/// </summary>
private void CreateRenderTarget()
{
    int width = _game.GraphicsDevice.PresentationParameters.BackBufferWidth;
    int height = _game.GraphicsDevice.PresentationParameters.BackBufferHeight;

    //  If the RenderTarget instance has already been created previously but has yet
    //  to be disposed of properly, dispose of the instnace before setting a new one.
    if (RenderTarget != null && !RenderTarget.IsDisposed)
    {
        RenderTarget.Dispose();
    }

    RenderTarget = new RenderTarget2D(_game.GraphicsDevice, width, height);
}
```

Just like with the `Scene` class, we first check if the render target needs to be disposed of, and if so, we dispose it. Then we create the instance.

## Updating Game1
Now that we have updating our `Scene` class and created the `Transition` class, we need to update our `Game1` class to use the transitions when switching scenes. There are a few things we'll need

* A reference to the transition out effect being used.
* A reference to the transition in effect being used.
* A refrence to the current transition that is transitioning
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

`_transitionIn` will be our referece to the transition effect that is transitioning the current sceen *in*.

`_currentTransition` will hold a reference to either `_transitionOut` or `_transitionIn` depending on whcih transition is the current one that is transitioning.

### ChangeScene(Scene, Transition, Transition)
Next, we're going to add an overload method of the `ChangeScene` method.  Add the following method to `Game1`.

```csharp
/// <summary>
///     Changes the current scene to the sceen provided using the transition
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

This `ChangeScene(Scene, Transition, Transition)` method takes three parameters.  A `Scene` instance of the scene that we are transitioning **to**, a `Transition` instance that we can use to transition the current scene **out** with, and finally a `Transition` instance that we canuse to transitoin the next scene **in** with.

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

So, whenever the transition out is completed, this gets called.  The first thing we do is unsubscribe fromt he event.  This is so we don't leave any hanging reference to the `_transitionOut`.  Next we dispose of the `_transitionOut` instance since we no longer need it and can free up its resources.

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
    //  is a next scene to swtich to, switch to that scene instead.
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

The change we have made is right in the middle of it. Previously we were just checking if there was a next scene to switch to, and if so, we immediatly switched to that scene. 

With the new change, instead we first check if there is a current transition and if it is transitioning. If so, then we update the current transition.  Otherwise, we check to see if there is not a current transitoin but there **IS** a next scene, and if so we switch to the next scene.

By setting it up this way, it allows us to switch scenes using transition effects, but if we want to simply switch without them by using the old `ChangeScene(Scene)` method, we can still do that to instantly switch.

### Change Draw(GameTime)
Finally, we need to change the `Draw(GameTime)` method to handle not only drawing the current transition, but also to handle using the render targets we created for the transitions and the scenes.

The following is what the `Draw(GameTime)` method should be updated to.

```csharp
protected override void Draw(GameTime gameTime)
{
    //  The color to use when clearing the backbuffer.
    Color clearColor = Color.Black;

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
        GraphicsDevice.Clear(clearColor);

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

First, we check to see if there is an active scene. We can't perform our draw code here without a scene to render.  If there is an active scene, then we draw it in order of `BeginDraw(SpriteBatch, Color)`, `Draw(SpriteBatch)`, `EndDraw(SpriteBatch)`.  **Remember, the scene is now drawing it its render target here, not the sreen.**

Next we check if there is a current transition happening.  If there is, we tell the transition to draw. **Just like with the scene, remember, the transition is drawing to its render target, not to the screen.**

Once we have finished drawing the scene and the transition, we finally draw to the screen.  **Recall that both the scene and the transition, in their final draw methods, both set the `GraphicsDevice` render target to null.  This means at this point we are prepared to draw to the screen**.

First we check to see if there is a current transition and if it is transitioning.  If so, we draw the render target of the current transition to the screen.  If there is no transition happening, we instead draw the render target of the current active scene to the screen.


### GraphicsDevice Created and Reset Events
Finally, we need to maek sure that we are handling the `GraphicsDevice.DeviceCreated` and `GraphicsDevice.DeviceReset` events so we can pass this along and handle them in the current acrive scene and any transitions.

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

Here we subscribe the neccesary events.  Next, let's add the `GraphicsDeviceCreated(object, EventArgs)` and `GraphicsDeviceReste(object, EventArgs)` methods.  Add the following methods to the `Game1` class.

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

In both of these, we tell the current active sceen and any transitions to handle the event.

And that's it for all of the `Game1` updates. Now lets actually create a transition effect to test this with.


## Fade Transition Effect
The first transition effect we'll create is going to be the most command and simplest one of all, a fade effect.  This transition will simply fade out the current scene and then fade in the next one.

Create a new class file called **FadeTransition.cs** in your project then add the following code.

**using statements
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
```

**FadeTransition class**
```csharp
/// <summary>
///     A transition that fades the scene out/in.
/// </summary>
public class FadeTransition : Transition
{
    /// <summary>
    ///     Creates a new FadeTransition instance.
    /// </summary>
    /// <param name="game">
    ///     A reference to our Game instance.
    /// </param>
    /// <param name="transitionTime">
    ///     The total amount of time the transition will take.
    /// </param>
    /// <param name="kind">
    ///     The type of transition.
    /// </param>
    public FadeTransition(Game1 game, TimeSpan transitionTime, TransitionKind kind)
        : base(game, transitionTime, kind) { }

    /// <summary>
    ///     Renders this transition.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    protected override void Render(SpriteBatch spriteBatch)
    {
        spriteBatch.Draw(texture: SourceTexture,
                            destinationRectangle: SourceTexture.Bounds,
                            sourceRectangle: SourceTexture.Bounds,
                            color: Color.White * GetAlpha());
    }

    /// <summary>
    ///     Gets the alpha value to use for the color mask when rendering.
    /// </summary>
    /// <returns>
    ///     The value to use for the color mask alpha
    /// </returns>
    private float GetAlpha()
    {
        double timeLeft = TransitionTimeRemaining.TotalSeconds;

        if (Kind == TransitionKind.Out)
        {
            return (float)(timeLeft / TransitionTime.TotalSeconds);
        }
        else
        {
            return (float)(1.0 - (timeLeft / TransitionTime.TotalSeconds));
        }
    }
}
```

### Constructor
The constructor of our `FadeTransition` is pretty simple. 

```csharp
/// <summary>
///     Creates a new FadeTransition instance.
/// </summary>
/// <param name="game">
///     A reference to our Game instance.
/// </param>
/// <param name="transitionTime">
///     The total amount of time the transition will take.
/// </param>
/// <param name="kind">
///     The type of transition.
/// </param>
public FadeTransition(Game1 game, TimeSpan transitionTime, TransitionKind kind)
    : base(game, transitionTime, kind) { }
```

It simply just takes in the required values of the base `Transition` constructor and then passes them along.

### Render(SpriteBatch)
The `Render(SpriteBatch)` method is rather simple as well.

```csharp
/// <summary>
///     Renders this transition.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
protected override void Render(SpriteBatch spriteBatch)
{
    spriteBatch.Draw(texture: SourceTexture,
                        destinationRectangle: SourceTexture.Bounds,
                        sourceRectangle: SourceTexture.Bounds,
                        color: Color.White * GetAlpha());
}
```

All it does is render the source texture, but sets the color mask to `Color.White * GetAlpha()`.  By multiplying it by an alpha value, we can make the render of the texture transparent depending on the amount of alpha we apply.


### GetAlpha()
The `GetAlpha()` method is responsible for determining how much alpha to apply to the render.

```csharp
/// <summary>
///     Gets the alpha value to use for the color mask when rendering.
/// </summary>
/// <returns>
///     The value to use for the color mask alpha
/// </returns>
private float GetAlpha()
{
    double timeLeft = TransitionTimeRemaining.TotalSeconds;

    if (Kind == TransitionKind.Out)
    {
        return (float)(timeLeft / TransitionTime.TotalSeconds);
    }
    else
    {
        return (float)(1.0 - (timeLeft / TransitionTime.TotalSeconds));
    }
}
```

Depending on if the fade transition is fading in or out, we interpolate the alpha value betwen 0.0 and 1.0 based on the amount of time that is remaining for the transition.


### Testing The Transition
Now let's test the transition. Open the **GreenCircleScene.cs** class file and locate the `Update(GameTime)` method.  Change the method to the following.

```csharp
/// <summary>
///     Updates this scene.
/// </summary>
/// <param name="gameTime">
///     A snapshot of the frame specific timing values.
/// </param>
public override void Update(GameTime gameTime)
{
    if(_game.CurKeyboardState.IsKeyDown(Keys.Space) && _game.PrevKeyboardState.IsKeyUp(Keys.Space))
    {
        //  Tell the game to change to the OrangeCircleScene using the FadeTransition
        _game.ChangeScene(new OrangeCircleScene(_game),
                            new FadeTransition(_game, TimeSpan.FromSeconds(1), Transition.TransitionKind.Out),
                            new FadeTransition(_game, TimeSpan.FromSeconds(1), Transition.TransitionKind.In));
    }
}
```

We've udpated it so that when we call `_game.ChangeScene` we are now using the `(Scene, Transition Transition)` overload.  We pass to it a new `OrangeCircleScene` instance, a `FadeTransition` instance that is fading out and a `FadeTransition` instance that is fading in.

Next, open the **OrangeCircleScene.cs** class file and make the same change to it's `Udpate(GameTime)` method as we did above to. Only for this one, make sure we are changing to the `GreenCircleScene` instead.

If you run the game now, you should see the green circle scene first. Then if you press the space key to change scenes, the green circle scene will fade out, then the orange circle sceen will fade in.  It's magic!!!

![](/img/tutorials/scene-transitions/fade-transition.gif)


## EvenOddTileTransition
Now that we've created a simple fade transition, lets create one that really stands out. Imagine a grid, like a chess board.  In this grid, we're going to group each odd grid cell together and each even grid cell together.  To help visualize this, see the image below.  The gray grid cells are the even ones and the white grid cells are the odd ones.

![](/img/tutorials/scene-transitions/even-odd-grid.png)

What were going to do with this transition effect take our scene and theoretcilly split it up into a grid like this.  For the transtion out, we are going first take all of the odd grid cells and shink + rotate them out of the scene. Then we are going to take all of the even grid cells and shrink + rotate them out of the scene  For the transition in, we'll do the reverse, growing + rotating the cells into the screen.

Create a new class file in your project called **EvenOddTileTransition.cs**.  Then add the following code

**using statements**
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
```

**EvenOddTileTransition class**
```csharp
/// <summary>
///     A transition that divides the scene into a checkerboard and spins out/in the odd tiles
///     then the even tiles
/// </summary>
public class EvenOddTileTransition : Transition
{
    //  Have the transition time.
    private double _transitionHalfTime;

    //  The width and height, in pixels,  of a tile.
    private int _tileSize;

    //  The total number of columns.
    private int _columns;

    //  The total number of rows.
    private int _rows;

    /// <summary>
    ///     Creates a new EvenOddTransition instance.
    /// </summary>
    /// <param name="game">
    ///     A reference to our Game instance.
    /// </param>
    /// <param name="tileSize">
    ///     The width and height, in pixels, of a tile.
    /// </param>
    /// <param name="transitionTime">
    ///     The total amount of time the transition will take.
    /// </param>
    /// <param name="kind">
    ///     The type of transition.
    /// </param>
    public EvenOddTileTransition(Game1 game, int tileSize, TimeSpan transitionTime, TransitionKind kind)
        : base(game, transitionTime, kind)
    {
        _transitionHalfTime = TransitionTime.TotalSeconds / 2;
        _tileSize = tileSize;
    }

    /// <summary>
    ///     Starts the transition.
    /// </summary>
    /// <param name="sourceTexture">
    ///     A reference to the RenderTarget2D instance of the scene being transitioned.
    /// </param>
    public override void Start(RenderTarget2D sourceTexture)
    {
        base.Start(sourceTexture);

        _columns = (int)Math.Ceiling(SourceTexture.Width / (float)_tileSize);
        _rows = (int)Math.Ceiling(SourceTexture.Height / (float)_tileSize);
    }

    /// <summary>
    ///     Renders this transition.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    protected override void Render(SpriteBatch spriteBatch)
    {
        for (int row = 0; row < _rows; row++)
        {
            for (int column = 0; column < _columns; column++)
            {
                int size = GetSize(IsOdd(column, row));
                int xPos = ((column * _tileSize) + (_tileSize - size) / 2) + (size / 2);
                int yPos = ((row * _tileSize) + (_tileSize - size) / 2) + (size / 2);

                spriteBatch.Draw(texture: SourceTexture,
                                    destinationRectangle: new Rectangle(xPos, yPos, size, size),
                                    sourceRectangle: new Rectangle(column * _tileSize, row * _tileSize, _tileSize, _tileSize),
                                    color: Color.White,
                                    rotation: GetRotation(IsOdd(column, row)),
                                    origin: new Vector2(_tileSize, _tileSize) * 0.5f,
                                    effects: SpriteEffects.None,
                                    layerDepth: 0.0f);
            }
        }
    }

    /// <summary>
    ///     Calculates and returns the value to use for the tiles rotation.
    /// </summary>
    /// <param name="isOdd">
    ///     Is the tile one of the odd tiles. An odd tile is one that is ina  row and column that is both
    ///     even numbers, or both odd numbers.
    /// </param>
    /// <returns>
    ///     The rotation value to use for the tile.
    /// </returns>
    private float GetRotation(bool isOdd)
    {
        double timeLeft = TransitionTimeRemaining.TotalSeconds;

        if (isOdd)
        {
            timeLeft = Math.Min(timeLeft, _transitionHalfTime);
        }
        else
        {
            timeLeft = Math.Max(timeLeft - _transitionHalfTime, 0);
        }

        if (Kind == TransitionKind.Out)
        {
            return 5.0f * (float)Math.Sin((timeLeft / _transitionHalfTime) - 1.0);
        }
        else
        {
            return 5.0f * (float)Math.Sin((timeLeft / _transitionHalfTime));
        }
    }

    /// <summary>
    ///     Calcualtes and returns the size value to use for a tile.
    /// </summary>
    /// <param name="isOdd">
    ///     Is the tile one of the odd tiles. An odd tile is one that is ina  row and column that is both
    ///     even numbers, or both odd numbers.
    /// </param>
    /// <returns>
    ///     The size value to use for the tile.
    /// </returns>
    private int GetSize(bool isOdd)
    {
        double timeLeft = TransitionTimeRemaining.TotalSeconds;

        if (isOdd)
        {
            timeLeft = Math.Min(timeLeft, _transitionHalfTime);
        }
        else
        {
            timeLeft = Math.Max(timeLeft - _transitionHalfTime, 0);
        }

        if (Kind == TransitionKind.Out)
        {
            return (int)((_tileSize) * (timeLeft / _transitionHalfTime));
        }
        else
        {
            return (int)((_tileSize) * (1 - (timeLeft / _transitionHalfTime)));
        }
    }

    /// <summary>
    ///     Given a column (x) and row (y) of a tile, determines if it is an 
    ///     odd tile.
    /// </summary>
    /// <remarks>
    ///     An odd tile is one where both the row and column are even numbers or
    ///     both the row and column are odd numbers
    /// </remarks>
    /// <param name="column">
    ///     The column the tile is in.
    /// </param>
    /// <param name="row">
    ///     The row the tile is in.
    /// </param>
    /// <returns></returns>
    private bool IsOdd(int column, int row)
    {
        return (column % 2 == 0 && row % 2 == 0) || (column % 2 != 0 && row % 2 != 0);
    }
}
```

### Fields
The `EvenOddTileTransition` class has the following fields

```csharp
//  Half the transition time.
private double _transitionHalfTime;

//  The width and height, in pixels,  of a tile.
private int _tileSize;

//  The total number of columns.
private int _columns;

//  The total number of rows.
private int _rows;
```

These are pretty self explainitory as to what they values they store are for.

### Constructor
The constructor for the `EvenOddTileTransition` class is a little different than the fade one.

```csharp
/// <summary>
///     Creates a new EvenOddTransition instance.
/// </summary>
/// <param name="game">
///     A reference to our Game instance.
/// </param>
/// <param name="tileSize">
///     The width and height, in pixels, of a tile.
/// </param>
/// <param name="transitionTime">
///     The total amount of time the transition will take.
/// </param>
/// <param name="kind">
///     The type of transition.
/// </param>
public EvenOddTileTransition(Game1 game, int tileSize, TimeSpan transitionTime, TransitionKind kind)
    : base(game, transitionTime, kind)
{
    _transitionHalfTime = TransitionTime.TotalSeconds / 2;
    _tileSize = tileSize;
}
```

It takes the usual parameters as before, but with the addition of the `int tileSize` parameter.  This value is used to indicate the width and height, in pixels, of each of the grid tiles for the transition.

We then calculate the `_transitionHalfTime` value and cache the tile size given.

### Start(RenderTarget)
The `Start(RenderTarget)` does a little setup as well for the transition

```csharp
/// <summary>
///     Starts the transition.
/// </summary>
/// <param name="sourceTexture">
///     A reference to the RenderTarget2D instance of the scene being transitioned.
/// </param>
public override void Start(RenderTarget2D sourceTexture)
{
    base.Start(sourceTexture);

    _columns = (int)Math.Ceiling(SourceTexture.Width / (float)_tileSize);
    _rows = (int)Math.Ceiling(SourceTexture.Height / (float)_tileSize);
}
```

When we tell the transition to start, we calculate the total number of columns and rows for the grid.  We do this here instead of in the constructor because we need to know the dimensions of the `SourceTexture`.  

We also use `Math.Ceiling` here to ensure that if the texture cannot be divided cleanly, we add an extra row or column for the excess amount.

### Render(SpriteBatch)
Next is the `Render(SpriteBatch)` method.

```csharp
/// <summary>
///     Renders this transition.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
protected override void Render(SpriteBatch spriteBatch)
{
    for (int row = 0; row < _rows; row++)
    {
        for (int column = 0; column < _columns; column++)
        {
            int size = GetSize(IsOdd(column, row));
            int xPos = ((column * _tileSize) + (_tileSize - size) / 2) + (size / 2);
            int yPos = ((row * _tileSize) + (_tileSize - size) / 2) + (size / 2);

            spriteBatch.Draw(texture: SourceTexture,
                                destinationRectangle: new Rectangle(xPos, yPos, size, size),
                                sourceRectangle: new Rectangle(column * _tileSize, row * _tileSize, _tileSize, _tileSize),
                                color: Color.White,
                                rotation: GetRotation(IsOdd(column, row)),
                                origin: new Vector2(_tileSize, _tileSize) * 0.5f,
                                effects: SpriteEffects.None,
                                layerDepth: 0.0f);
        }
    }
}
```

Here we loop through through each row of the grid, looping through each column of the grid for each row.  For each column, we first get the size of the grid cell with the `GetSize(bool)` method. We then calculate the x and y position of the cell in the render.  Finally we draw it with the spritebatch.  

There are two other methods that are called from within here; the `IdOdd(int, int)` and `GetRotation(bool)` methods. We discuss these below.

### GetSize(bool)
The `GetSize(bool)` method is responsible for calculating the size of the grid cell.

```csharp
/// <summary>
///     Calcualtes and returns the size value to use for a tile.
/// </summary>
/// <param name="isOdd">
///     Is the tile one of the odd tiles. An odd tile is one that is ina  row and column that is both
///     even numbers, or both odd numbers.
/// </param>
/// <returns>
///     The size value to use for the tile.
/// </returns>
private int GetSize(bool isOdd)
{
    double timeLeft = TransitionTimeRemaining.TotalSeconds;

    if (isOdd)
    {
        timeLeft = Math.Min(timeLeft, _transitionHalfTime);
    }
    else
    {
        timeLeft = Math.Max(timeLeft - _transitionHalfTime, 0);
    }

    if (Kind == TransitionKind.Out)
    {
        return (int)((_tileSize) * (timeLeft / _transitionHalfTime));
    }
    else
    {
        return (int)((_tileSize) * (1 - (timeLeft / _transitionHalfTime)));
    }
}
```

The method takes a `bool` value that indicates if the grid cell is an odd cell.  We then interpolate the size of the cell based on if it is odd or even, and the amount of time left in the transition.

### GetRotation(bool)
The `GetRotation(bool)` method is responsible for determining the amount of rotation to apply to the grid cell when its rendered.

```csharp
/// <summary>
///     Calculates and returns the value to use for the tiles rotation.
/// </summary>
/// <param name="isOdd">
///     Is the tile one of the odd tiles. An odd tile is one that is ina  row and column that is both
///     even numbers, or both odd numbers.
/// </param>
/// <returns>
///     The rotation value to use for the tile.
/// </returns>
private float GetRotation(bool isOdd)
{
    double timeLeft = TransitionTimeRemaining.TotalSeconds;

    if (isOdd)
    {
        timeLeft = Math.Min(timeLeft, _transitionHalfTime);
    }
    else
    {
        timeLeft = Math.Max(timeLeft - _transitionHalfTime, 0);
    }

    if (Kind == TransitionKind.Out)
    {
        return 5.0f * (float)Math.Sin((timeLeft / _transitionHalfTime) - 1.0);
    }
    else
    {
        return 5.0f * (float)Math.Sin((timeLeft / _transitionHalfTime));
    }
}
```
Just like the `GetSize(bool)` method, this also takes a `bool` value that indicates if the grid cell is an odd cell.  We then interpolate the rotation of the cell based on if it is odd or even, and the amount of time left in the transition.

### IsOdd(int, int)
Finally, the last method is the `IsOdd(int, int)` method.  This one determines if the grid cell at the column and row position in the grid is an odd cell.

```csharp
/// <summary>
///     Given a column (x) and row (y) of a tile, determines if it is an 
///     odd tile.
/// </summary>
/// <remarks>
///     An odd tile is one where both the row and column are even numbers or
///     both the row and column are odd numbers
/// </remarks>
/// <param name="column">
///     The column the tile is in.
/// </param>
/// <param name="row">
///     The row the tile is in.
/// </param>
/// <returns></returns>
private bool IsOdd(int column, int row)
{
    return (column % 2 == 0 && row % 2 == 0) || (column % 2 != 0 && row % 2 != 0);
}
```

And odd cell is one were either both the row and column are even numbers, or both the row and column are odd numbers.

### Testing the Transition.
Now let's test our transition out.  First, open the `GreenCircleScene` class file.  In the `Update(GameTime)` method, change the transition effects we are using from `FadeTransition` to `EvenOddTileTransition`

```csharp
/// <summary>
///     Updates this scene.
/// </summary>
/// <param name="gameTime">
///     A snapshot of the frame specific timing values.
/// </param>
public override void Update(GameTime gameTime)
{
    if(_game.CurKeyboardState.IsKeyDown(Keys.Space) && _game.PrevKeyboardState.IsKeyUp(Keys.Space))
    {
        //  Tell the game to change to the OrangeCircleScene
        _game.ChangeScene(new OrangeCircleScene(_game),
                            new EvenOddTileTransition(_game, 32, TimeSpan.FromSeconds(1), Transition.TransitionKind.Out),
                            new EvenOddTileTransition(_game, 32, TimeSpan.FromSeconds(1), Transition.TransitionKind.In));
    }
}
```

Here, when creating the new `EventOddTileTransition` instnaces I used a tile size of `32`, but you can use whatever value you'd like. Experiement with it.

Nest, open the `OrangeCirlceScene` class fileand change the `Update(GameTime)` method there as well to use the new `EvenOddTileTransition` class.  Remember to have this one create a ne `GreenCircleScene` to switch to.

Once you've made thse changes, run the game.  As usual, you should see the green circle scene appear first.  Press the space key to switch scenes and watch the magic happen. 

![](/img/tutorials/scene-transitions/even-odd-transition.gif)


## Conclusion
In this tutorial, we have added the ability to change scenes in our game with transition effects.  We updated the code from the previous  tutorial to use `RenderTaget2D`'s and added in the `Transition` class that we can build upon to make neat transitions.  We updated the `Game1` class to handle switching the scens with the transitions.